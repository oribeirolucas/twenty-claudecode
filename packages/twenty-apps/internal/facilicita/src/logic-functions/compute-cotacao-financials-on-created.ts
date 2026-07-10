import { CoreApiClient } from 'twenty-client-sdk/core';
import {
  type DatabaseEventPayload,
  defineLogicFunction,
  type ObjectRecordCreateEvent,
} from 'twenty-sdk/define';
import {
  computeCotacaoFinancials,
  type CotacaoFinancialFields,
} from './utils/compute-cotacao-financials.util';

const COMPUTE_COTACAO_FINANCIALS_ON_CREATED_FN_ID =
  '62c1a69c-b326-4d43-9b16-8f7ca327d9f5';

export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordCreateEvent<CotacaoFinancialFields>>,
): Promise<Record<string, unknown>> => {
  const record = payload.properties.after;
  if (!record?.id) return {};

  const computed = computeCotacaoFinancials(record);

  const client = new CoreApiClient();

  await client.mutation({
    updateCotacao: {
      __args: { id: record.id, data: computed },
      id: true,
    },
  } as any);

  return { computed: true };
};

export default defineLogicFunction({
  universalIdentifier: COMPUTE_COTACAO_FINANCIALS_ON_CREATED_FN_ID,
  name: 'compute-cotacao-financials-on-created',
  description:
    'Computes valorTotalCompra/valorTotalVenda/lucro/comissaoSobreLucro/margemPct on Cotacao creation.',
  timeoutSeconds: 10,
  handler,
  databaseEventTriggerSettings: { eventName: 'cotacao.created' },
});
