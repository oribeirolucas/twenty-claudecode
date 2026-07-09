import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const ORGAO_ON_PROCESSO_ID = '87571ef7-8ada-4266-b058-593ea137a1b1';
export const PROCESSOS_ORGAO_ON_COMPANY_ID =
  '46ac8bc9-0ba4-402f-9e1b-00af6349b9c6';

export default defineField({
  universalIdentifier: ORGAO_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'orgao',
  label: 'Órgão',
  description: 'Ente público comprador neste processo',
  icon: 'IconBuildingBank',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    PROCESSOS_ORGAO_ON_COMPANY_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'orgaoId',
  },
});
