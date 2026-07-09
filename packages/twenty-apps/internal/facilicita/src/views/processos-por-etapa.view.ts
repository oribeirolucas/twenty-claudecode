import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  PROCESSO_ETAPA_ATUAL_FIELD_UNIVERSAL_IDENTIFIER,
  PROCESSO_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  PROCESSO_UNIVERSAL_IDENTIFIER,
  PROCESSO_VALOR_ESTIMADO_FIELD_UNIVERSAL_IDENTIFIER,
  ProcessoEtapa,
} from '../objects/processo.object';

export const PROCESSOS_POR_ETAPA_VIEW_ID =
  'de4dc6e0-6302-4cd4-9f2c-f7ecccf68e31';

// Group order matches the 11-stage esteira (PRODUCT.md section 7). The visual
// grouping into 4 phases (Originação/Disputa/Operação/Recebimento) from the
// spec is left for a later dashboard slice — Kanban groups map 1:1 to enum values.
const ETAPA_GROUPS: { etapa: ProcessoEtapa; groupId: string }[] = [
  { etapa: ProcessoEtapa.ETAPA_01_EDITAL, groupId: '40ac8a90-2f6c-4ce7-a71e-49530a67c5e0' },
  { etapa: ProcessoEtapa.ETAPA_02_DOCUMENTACAO, groupId: '0a21c1c9-1a01-4ed4-aa91-82fcce20c8ee' },
  { etapa: ProcessoEtapa.ETAPA_03_COTACAO, groupId: '6889da18-fef2-492f-abbd-268284de1379' },
  { etapa: ProcessoEtapa.ETAPA_04_PARTICIPACAO_PREGAO, groupId: 'dd8a9b76-e7e3-46c9-accf-f224b63a4472' },
  { etapa: ProcessoEtapa.ETAPA_05_DOC_HOMOLOGACAO, groupId: '6a4b7483-46a7-42bf-8669-e6b4bab577ad' },
  { etapa: ProcessoEtapa.ETAPA_06_CONTRATO_EMPENHO, groupId: 'a1894b8c-f598-4211-89ee-dda7093ba82f' },
  { etapa: ProcessoEtapa.ETAPA_07_COMPRAS_LOGISTICA, groupId: 'aa55426c-a4d3-4151-89e1-8f86939a72f3' },
  { etapa: ProcessoEtapa.ETAPA_08_COBRANCA_ORGAO, groupId: '69a6ff01-a54c-452b-be4d-5b022d1ef189' },
  { etapa: ProcessoEtapa.ETAPA_09_COBRANCA_COMISSAO, groupId: '50635e30-09fc-42ee-947a-cd16c4a4258a' },
  { etapa: ProcessoEtapa.ETAPA_10_COBRANCA_ATESTADO, groupId: 'f8924d87-6c2d-4fc4-85f0-52d4f15a6c0d' },
  { etapa: ProcessoEtapa.ETAPA_11_FINALIZADO, groupId: '24733efb-d17e-464b-892e-be031db2b0d4' },
];

export default defineView({
  universalIdentifier: PROCESSOS_POR_ETAPA_VIEW_ID,
  name: 'Por Etapa',
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: ViewType.KANBAN,
  icon: 'IconLayoutKanban',
  position: 0,
  mainGroupByFieldMetadataUniversalIdentifier:
    PROCESSO_ETAPA_ATUAL_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: 'c1e1986b-14f9-4ffa-b5e3-bdff705981b5',
      fieldMetadataUniversalIdentifier:
        PROCESSO_VALOR_ESTIMADO_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '5d0d65ee-d92f-4b62-97e4-1ea61849bdce',
      fieldMetadataUniversalIdentifier:
        PROCESSO_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 150,
    },
  ],
  groups: ETAPA_GROUPS.map(({ etapa, groupId }, index) => ({
    universalIdentifier: groupId,
    fieldValue: etapa,
    position: index,
    isVisible: true,
  })),
});
