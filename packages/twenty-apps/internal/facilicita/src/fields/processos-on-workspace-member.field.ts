import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  AGENTE_ON_PROCESSO_ID,
  PROCESSOS_ON_WORKSPACE_MEMBER_ID,
} from './agente-on-processo.field';

export default defineField({
  universalIdentifier: PROCESSOS_ON_WORKSPACE_MEMBER_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'processos',
  label: 'Processos (agente)',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: AGENTE_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
