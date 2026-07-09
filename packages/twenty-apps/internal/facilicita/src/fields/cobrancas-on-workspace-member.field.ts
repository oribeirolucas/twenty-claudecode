import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';
import {
  COBRANCAS_ON_WORKSPACE_MEMBER_ID,
  RESPONSAVEL_ON_COBRANCA_ID,
} from './responsavel-on-cobranca.field';

export default defineField({
  universalIdentifier: COBRANCAS_ON_WORKSPACE_MEMBER_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'cobrancas',
  label: 'Cobranças (responsável)',
  icon: 'IconReceipt2',
  relationTargetObjectMetadataUniversalIdentifier:
    COBRANCA_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: RESPONSAVEL_ON_COBRANCA_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
