import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';

export const RESPONSAVEL_ON_COBRANCA_ID = '4ee2a21e-9ec7-4da1-b8e4-6f2be87edcb0';
export const COBRANCAS_ON_WORKSPACE_MEMBER_ID =
  'bcd5948a-f972-495e-863c-52d1c0990538';

export default defineField({
  universalIdentifier: RESPONSAVEL_ON_COBRANCA_ID,
  objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'responsavel',
  label: 'Responsável',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    COBRANCAS_ON_WORKSPACE_MEMBER_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'responsavelId',
  },
});
