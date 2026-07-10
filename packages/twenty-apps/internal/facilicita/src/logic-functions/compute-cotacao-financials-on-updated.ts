import { CoreApiClient } from 'twenty-client-sdk/core';
import {
  type DatabaseEventPayload,
  defineLogicFunction,
  type ObjectRecordUpdateEvent,
} from 'twenty-sdk/define';
import {
  computeCotacaoFinancials,
  hasFinancialsChanged,
  type CotacaoFinancialFields,
} from './utils/compute-cotacao-financials.util';

const COMPUTE_COTACAO_FINANCIALS_ON_UPDATED_FN_ID =
  'c6ebd7b4-1284-4d2f-aab3-208cbd4ffa94';

// The fields this function itself writes — if an update touches only these, it's our own
// write-back from a previous run, not a real edit. Skipping it is what stops the update trigger
// from re-triggering itself forever.
const DERIVED_FIELD_NAMES = [
  'valorTotalCompra',
  'valorTotalVenda',
  'lucro',
  'comissaoSobreLucro',
  'margemPct',
];

export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<CotacaoFinancialFields>>,
): Promise<Record<string, unknown>> => {
  const { after, updatedFields } = payload.properties;
  if (!after?.id) return {};

  if (updatedFields?.every((field) => DERIVED_FIELD_NAMES.includes(field))) {
    return { skipped: 'derived-fields-only' };
  }

  const computed = computeCotacaoFinancials(after);

  if (!hasFinancialsChanged(after, computed)) {
    return { skipped: 'unchanged' };
  }

  const client = new CoreApiClient();

  await client.mutation({
    updateCotacao: {
      __args: { id: after.id, data: computed },
      id: true,
    },
  } as any);

  return { computed: true };
};

export default defineLogicFunction({
  universalIdentifier: COMPUTE_COTACAO_FINANCIALS_ON_UPDATED_FN_ID,
  name: 'compute-cotacao-financials-on-updated',
  description:
    'Recomputes valorTotalCompra/valorTotalVenda/lucro/comissaoSobreLucro/margemPct whenever a Cotacao is edited. Guards against retriggering itself.',
  timeoutSeconds: 10,
  handler,
  databaseEventTriggerSettings: { eventName: 'cotacao.updated' },
});
