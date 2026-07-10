import { defineObject, FieldType } from 'twenty-sdk/define';
import { ProcessoEtapa } from './processo.object';

export const ETAPA_LOG_UNIVERSAL_IDENTIFIER =
  '2fbb59d8-c2bd-4e56-bf4e-49ebf616d903';

export const ETAPA_LOG_DATA_ENTRADA_FIELD_UNIVERSAL_IDENTIFIER =
  '14d39be3-614b-4dd8-b126-071a81b4c9ea';
export const ETAPA_LOG_OBSERVACAO_FIELD_UNIVERSAL_IDENTIFIER =
  'a72a796e-7b9d-4eb2-870d-4ca97a97bd75';

// The 11 stage options are duplicated from Processo.etapaAtual (twenty-sdk selects
// are per-field, not shared) — keep both option lists in sync if the esteira changes.
const ETAPA_OPTIONS = [
  { value: ProcessoEtapa.ETAPA_01_EDITAL, label: '01 Edital', color: 'gray' },
  {
    value: ProcessoEtapa.ETAPA_02_DOCUMENTACAO,
    label: '02 Documentação',
    color: 'gray',
  },
  { value: ProcessoEtapa.ETAPA_03_COTACAO, label: '03 Cotação', color: 'gray' },
  {
    value: ProcessoEtapa.ETAPA_04_PARTICIPACAO_PREGAO,
    label: '04 Participação de pregão',
    color: 'yellow',
  },
  {
    value: ProcessoEtapa.ETAPA_05_DOC_HOMOLOGACAO,
    label: '05 Documentação p/ homologar',
    color: 'yellow',
  },
  {
    value: ProcessoEtapa.ETAPA_06_CONTRATO_EMPENHO,
    label: '06 Contrato e empenho',
    color: 'blue',
  },
  {
    value: ProcessoEtapa.ETAPA_07_COMPRAS_LOGISTICA,
    label: '07 Compras e logística',
    color: 'blue',
  },
  {
    value: ProcessoEtapa.ETAPA_08_COBRANCA_ORGAO,
    label: '08 Cobrança do órgão',
    color: 'orange',
  },
  {
    value: ProcessoEtapa.ETAPA_09_COBRANCA_COMISSAO,
    label: '09 Cobrança de comissão',
    color: 'orange',
  },
  {
    value: ProcessoEtapa.ETAPA_10_COBRANCA_ATESTADO,
    label: '10 Cobrança de atestado',
    color: 'orange',
  },
  {
    value: ProcessoEtapa.ETAPA_11_FINALIZADO,
    label: '11 Finalizado',
    color: 'green',
  },
] as const;

const ETAPA_ANTERIOR_OPTION_IDS = [
  'd99dd562-1444-4f72-82e3-1eec8af160c1',
  'aaae7a8b-2f09-4a33-9a5e-9d5540df29ec',
  '128a1314-da4a-49a7-aee4-7f82711f4f90',
  'da4ccc3d-301e-492c-89df-a22fd7ccdec5',
  '6deac010-5081-48b2-ba98-f3c17542dcc7',
  '07b1cd38-6c44-4ee0-b487-829d128bb561',
  '9f13ab3a-2897-44e4-b90d-63e2d6649a6b',
  'ff3d6cec-88fb-4d88-aa20-5ae17ed9f186',
  'b2690fe1-1839-4030-b806-08e406e48ca9',
  '590569d7-24c0-482d-bdd5-6a44fd3b9a8c',
  'a65d1a4f-8038-40d8-a6c0-d6fe526f4c5f',
];

const ETAPA_NOVA_OPTION_IDS = [
  '3206a801-e4de-48ec-bd70-fab72fa0cdd7',
  '48ea556e-5010-4839-9694-01d5f1cbc051',
  '5c9584c0-84d0-4c44-87a7-54733dbc5fb1',
  'de06a347-7541-46e6-b9ed-7bd30d553ede',
  '4d320d15-9db3-4e5c-9f66-536d4e66165b',
  '3ec2d379-aaee-4930-b19c-97a3bc134768',
  'f2a849cb-7c47-4321-bf2e-ba5313a5cc29',
  '6f209911-d526-4972-a895-ca4422f06e1a',
  '0edf77e9-1923-4020-8f41-10c7a3cae597',
  '18ed1508-5b0f-4edb-812e-912d30160e48',
  '3d445271-9499-4922-b479-79547c9fcabe',
];

export default defineObject({
  universalIdentifier: ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  nameSingular: 'etapaLog',
  namePlural: 'etapaLogs',
  labelSingular: 'Etapa Log',
  labelPlural: 'Etapa Logs',
  description:
    'Histórico imutável de transições de etapa de um processo — a formalização de cada avanço na esteira. Nunca editar ou apagar um registro existente.',
  icon: 'IconHistory',
  // DATE_TIME/SELECT fields aren't valid label identifiers on this server — observacao (TEXT,
  // nullable) is the only TEXT-typed field on this object.
  labelIdentifierFieldMetadataUniversalIdentifier:
    ETAPA_LOG_OBSERVACAO_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: 'a064d67f-21cf-438f-b355-0add5bc2db0a',
      type: FieldType.SELECT,
      name: 'etapaAnterior',
      label: 'Etapa anterior',
      icon: 'IconArrowLeft',
      isNullable: true,
      defaultValue: null,
      options: ETAPA_OPTIONS.map((option, index) => ({
        id: ETAPA_ANTERIOR_OPTION_IDS[index],
        value: option.value,
        label: option.label,
        position: index,
        color: option.color,
      })),
    },
    {
      universalIdentifier: 'a32ed8b3-7260-46a8-84f1-3e2f65001dab',
      type: FieldType.SELECT,
      name: 'etapaNova',
      label: 'Etapa nova',
      icon: 'IconArrowRight',
      isNullable: true,
      defaultValue: null,
      options: ETAPA_OPTIONS.map((option, index) => ({
        id: ETAPA_NOVA_OPTION_IDS[index],
        value: option.value,
        label: option.label,
        position: index,
        color: option.color,
      })),
    },
    {
      universalIdentifier: ETAPA_LOG_OBSERVACAO_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'observacao',
      label: 'Observação',
      icon: 'IconNote',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: ETAPA_LOG_DATA_ENTRADA_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'dataEntrada',
      label: 'Data de entrada',
      icon: 'IconCalendarPlus',
      defaultValue: 'now',
    },
    {
      universalIdentifier: 'd8fc4c07-018f-4c36-994c-a0d8a1dcfd40',
      type: FieldType.DATE_TIME,
      name: 'dataSaida',
      label: 'Data de saída',
      description: 'Preenchida automaticamente no próximo avanço de etapa',
      icon: 'IconCalendarMinus',
      isNullable: true,
      defaultValue: null,
    },
  ],
});
