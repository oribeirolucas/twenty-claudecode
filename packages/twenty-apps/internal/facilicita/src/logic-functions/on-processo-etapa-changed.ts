import { CoreApiClient } from 'twenty-client-sdk/core';
import {
  type DatabaseEventPayload,
  defineLogicFunction,
  type ObjectRecordUpdateEvent,
} from 'twenty-sdk/define';
import { CobrancaStatus } from '../objects/cobranca.object';
import { ProcessoEtapa } from '../objects/processo.object';
import { ETAPA_TO_COBRANCA_TIPO } from './utils/etapa-cobranca-tipo.util';

const ON_PROCESSO_ETAPA_CHANGED_FN_ID = 'dd15789a-4c27-4af2-a9b0-50e599a60a81';

const COBRANCA_DEFAULT_DUE_DAYS = 30;

type ProcessoEtapaFields = {
  id: string;
  etapaAtual: ProcessoEtapa;
};

// Closes the previous transition's dataSaida (spec 6.2: "dataSaida ... auto no avanço") without
// relying on an unconfirmed null-filter operand — fetch the latest log for this processo and only
// touch it in JS if it's still open. A false negative here just skips closing it, it never
// double-closes or touches the wrong record.
const closePreviousEtapaLog = async (
  client: CoreApiClient,
  processoId: string,
): Promise<void> => {
  const result = await client.query({
    etapaLogs: {
      __args: {
        filter: { processoId: { eq: processoId } },
        orderBy: [{ createdAt: 'DescNullsLast' }],
        first: 1,
      },
      edges: { node: { id: true, dataSaida: true } },
    },
  } as any);

  const latest = (result as any).etapaLogs?.edges?.[0]?.node as
    | { id: string; dataSaida: string | null }
    | undefined;

  if (latest && !latest.dataSaida) {
    await client.mutation({
      updateEtapaLog: {
        __args: { id: latest.id, data: { dataSaida: 'now' } },
        id: true,
      },
    } as any);
  }
};

const createCobrancaIfMissing = async (
  client: CoreApiClient,
  processoId: string,
  etapaNova: ProcessoEtapa,
): Promise<void> => {
  const tipo = ETAPA_TO_COBRANCA_TIPO[etapaNova];
  if (!tipo) return;

  const existing = await client.query({
    cobrancas: {
      __args: {
        filter: { processoId: { eq: processoId }, tipo: { eq: tipo } },
        first: 1,
      },
      edges: { node: { id: true } },
    },
  } as any);

  if ((existing as any).cobrancas?.edges?.length > 0) return;

  const dataVencimento = new Date();
  dataVencimento.setDate(dataVencimento.getDate() + COBRANCA_DEFAULT_DUE_DAYS);

  await client.mutation({
    createCobranca: {
      __args: {
        data: {
          processoId,
          tipo,
          status: CobrancaStatus.ABERTA,
          dataVencimento: dataVencimento.toISOString(),
        },
      },
      id: true,
    },
  } as any);
};

export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<ProcessoEtapaFields>>,
): Promise<Record<string, unknown>> => {
  const { before, after, updatedFields } = payload.properties;

  if (!updatedFields?.includes('etapaAtual')) return {};

  const processoId = after?.id;
  const etapaNova = after?.etapaAtual;
  const etapaAnterior = before?.etapaAtual ?? null;

  if (!processoId || !etapaNova) return {};

  const client = new CoreApiClient();

  await closePreviousEtapaLog(client, processoId);

  await client.mutation({
    createEtapaLog: {
      __args: {
        data: { processoId, etapaAnterior, etapaNova },
      },
      id: true,
    },
  } as any);

  await createCobrancaIfMissing(client, processoId, etapaNova);

  return { etapaAnterior, etapaNova };
};

export default defineLogicFunction({
  universalIdentifier: ON_PROCESSO_ETAPA_CHANGED_FN_ID,
  name: 'on-processo-etapa-changed',
  description:
    'On every etapaAtual change: closes the previous EtapaLog, creates the new one, and auto-creates the matching Cobranca when entering stage 08/09/10.',
  timeoutSeconds: 15,
  handler,
  databaseEventTriggerSettings: { eventName: 'processo.updated' },
});
