import { definePageLayout } from 'twenty-sdk/define';
import { AggregateOperations } from 'twenty-shared/types';
import {
  COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
  COBRANCA_UNIVERSAL_IDENTIFIER,
  COBRANCA_VALOR_FIELD_UNIVERSAL_IDENTIFIER,
} from '../objects/cobranca.object';
import {
  COTACAO_MARGEM_PCT_FIELD_UNIVERSAL_IDENTIFIER,
  COTACAO_UNIVERSAL_IDENTIFIER,
} from '../objects/cotacao.object';
import {
  PROCESSO_ETAPA_ATUAL_FIELD_UNIVERSAL_IDENTIFIER,
  PROCESSO_NOME_FIELD_UNIVERSAL_IDENTIFIER,
  PROCESSO_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  PROCESSO_UNIVERSAL_IDENTIFIER,
  PROCESSO_VALOR_ESTIMADO_FIELD_UNIVERSAL_IDENTIFIER,
} from '../objects/processo.object';

export const CEO_DASHBOARD_PAGE_LAYOUT_ID =
  '06f8b2d4-72a4-4a06-a496-647720901738';

// Every widget aggregates/groups by a single field instead of filtering (ChartFilter's exact
// value-encoding for SELECT fields has no working example anywhere in this SDK's own apps/fixtures
// to confirm against). Grouping by status/tipo gives the same numbers the spec asks for — e.g. the
// GANHO bar of "Valor Estimado por Status" is spec's "valor ganho no período" — while only relying
// on the aggregate+groupBy widget shape, which the SDK's manifest validator does check.
export default definePageLayout({
  universalIdentifier: CEO_DASHBOARD_PAGE_LAYOUT_ID,
  name: 'Dashboard do CEO',
  type: 'DASHBOARD',
  tabs: [
    {
      universalIdentifier: '2200f09e-f4f5-40ed-8dac-837faa904851',
      title: 'Pipeline',
      position: 0,
      icon: 'IconGavel',
      widgets: [
        {
          universalIdentifier: 'd49a0f3a-1ac6-44bd-87e8-b84fb052d97d',
          title: 'Processos por Etapa',
          type: 'BAR_CHART',
          objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 0, column: 0, rowSpan: 2, columnSpan: 8 },
          configuration: {
            configurationType: 'BAR_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              PROCESSO_NOME_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.COUNT,
            primaryAxisGroupByFieldMetadataUniversalIdentifier:
              PROCESSO_ETAPA_ATUAL_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
        {
          universalIdentifier: '73c73189-00f9-48da-af22-2dfb980118e8',
          title: 'Processos por Status',
          type: 'PIE_CHART',
          objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 0, column: 8, rowSpan: 2, columnSpan: 4 },
          configuration: {
            configurationType: 'PIE_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              PROCESSO_NOME_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.COUNT,
            groupByFieldMetadataUniversalIdentifier:
              PROCESSO_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
        {
          universalIdentifier: '5cc43876-9c95-4ffc-a41a-be295b13ce16',
          title: 'Valor Estimado por Status',
          type: 'BAR_CHART',
          objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 2, column: 0, rowSpan: 2, columnSpan: 12 },
          configuration: {
            configurationType: 'BAR_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              PROCESSO_VALOR_ESTIMADO_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.SUM,
            primaryAxisGroupByFieldMetadataUniversalIdentifier:
              PROCESSO_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
    {
      universalIdentifier: 'af007097-eb2a-44ce-bab4-cb8d509d477b',
      title: 'Financeiro',
      position: 1,
      icon: 'IconReceipt2',
      widgets: [
        {
          universalIdentifier: '3b8ce09f-0b81-406e-a8f6-85e76e7c73cc',
          title: 'Cobranças por Status',
          type: 'PIE_CHART',
          objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 0, column: 0, rowSpan: 2, columnSpan: 4 },
          configuration: {
            configurationType: 'PIE_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.COUNT,
            groupByFieldMetadataUniversalIdentifier:
              COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
        {
          universalIdentifier: '1bda5334-84eb-4dbe-b206-d65e38595818',
          title: 'Valor por Status de Cobrança',
          type: 'BAR_CHART',
          objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 0, column: 4, rowSpan: 2, columnSpan: 8 },
          configuration: {
            configurationType: 'BAR_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              COBRANCA_VALOR_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.SUM,
            primaryAxisGroupByFieldMetadataUniversalIdentifier:
              COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
        {
          universalIdentifier: '91ef9774-ae56-405f-a6fa-4bc4045f8c00',
          title: 'Valor por Tipo de Cobrança',
          type: 'BAR_CHART',
          objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 2, column: 0, rowSpan: 2, columnSpan: 8 },
          configuration: {
            configurationType: 'BAR_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              COBRANCA_VALOR_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.SUM,
            primaryAxisGroupByFieldMetadataUniversalIdentifier:
              COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
          },
        },
        {
          universalIdentifier: '52bebdbd-7cfc-49b2-9fad-48b2665e83c8',
          title: 'Margem Média das Cotações',
          type: 'AGGREGATE_CHART',
          objectUniversalIdentifier: COTACAO_UNIVERSAL_IDENTIFIER,
          gridPosition: { row: 2, column: 8, rowSpan: 2, columnSpan: 4 },
          configuration: {
            configurationType: 'AGGREGATE_CHART',
            aggregateFieldMetadataUniversalIdentifier:
              COTACAO_MARGEM_PCT_FIELD_UNIVERSAL_IDENTIFIER,
            aggregateOperation: AggregateOperations.AVG,
            label: 'Margem média (%)',
          },
        },
      ],
    },
  ],
});
