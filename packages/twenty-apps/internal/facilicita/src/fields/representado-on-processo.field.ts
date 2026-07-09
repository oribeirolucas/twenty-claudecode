import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const REPRESENTADO_ON_PROCESSO_ID =
  '6e2059e8-3f6a-4fa8-b15d-569569037394';
export const PROCESSOS_REPRESENTADOS_ON_COMPANY_ID =
  '52a40250-e58d-4f10-bdfb-0c95456fd958';

export default defineField({
  universalIdentifier: REPRESENTADO_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'representado',
  label: 'Representado',
  description: 'Empresa que a Facilicita representa neste processo',
  icon: 'IconBuilding',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    PROCESSOS_REPRESENTADOS_ON_COMPANY_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'representadoId',
  },
});
