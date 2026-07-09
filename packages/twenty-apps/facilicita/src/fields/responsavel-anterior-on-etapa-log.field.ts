import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';

export const RESPONSAVEL_ANTERIOR_ON_ETAPA_LOG_ID =
  'f16249b9-bd82-44ff-99b4-80c231f55f8c';
export const ETAPA_LOGS_COMO_RESPONSAVEL_ANTERIOR_ON_WORKSPACE_MEMBER_ID =
  '39b0fc58-0348-4e55-80f7-d4b1cbd2a850';

export default defineField({
  universalIdentifier: RESPONSAVEL_ANTERIOR_ON_ETAPA_LOG_ID,
  objectUniversalIdentifier: ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'responsavelAnterior',
  label: 'Responsável anterior',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    ETAPA_LOGS_COMO_RESPONSAVEL_ANTERIOR_ON_WORKSPACE_MEMBER_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'responsavelAnteriorId',
  },
});
