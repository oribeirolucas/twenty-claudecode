import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';
import {
  ETAPA_LOGS_COMO_RESPONSAVEL_ANTERIOR_ON_WORKSPACE_MEMBER_ID,
  RESPONSAVEL_ANTERIOR_ON_ETAPA_LOG_ID,
} from './responsavel-anterior-on-etapa-log.field';

export default defineField({
  universalIdentifier:
    ETAPA_LOGS_COMO_RESPONSAVEL_ANTERIOR_ON_WORKSPACE_MEMBER_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'etapaLogsComoResponsavelAnterior',
  label: 'Logs de etapa (como responsável anterior)',
  icon: 'IconHistory',
  relationTargetObjectMetadataUniversalIdentifier:
    ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    RESPONSAVEL_ANTERIOR_ON_ETAPA_LOG_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
