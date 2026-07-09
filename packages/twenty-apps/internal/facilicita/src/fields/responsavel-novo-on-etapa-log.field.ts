import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';

export const RESPONSAVEL_NOVO_ON_ETAPA_LOG_ID =
  '75aba0d7-9b1b-4d33-9263-408dfd1e583e';
export const ETAPA_LOGS_COMO_RESPONSAVEL_NOVO_ON_WORKSPACE_MEMBER_ID =
  '705312b9-0a2b-446d-9e06-98346b388424';

export default defineField({
  universalIdentifier: RESPONSAVEL_NOVO_ON_ETAPA_LOG_ID,
  objectUniversalIdentifier: ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'responsavelNovo',
  label: 'Responsável novo',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    ETAPA_LOGS_COMO_RESPONSAVEL_NOVO_ON_WORKSPACE_MEMBER_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'responsavelNovoId',
  },
});
