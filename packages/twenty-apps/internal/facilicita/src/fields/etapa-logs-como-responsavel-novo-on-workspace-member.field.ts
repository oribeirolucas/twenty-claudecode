import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';
import {
  ETAPA_LOGS_COMO_RESPONSAVEL_NOVO_ON_WORKSPACE_MEMBER_ID,
  RESPONSAVEL_NOVO_ON_ETAPA_LOG_ID,
} from './responsavel-novo-on-etapa-log.field';

export default defineField({
  universalIdentifier: ETAPA_LOGS_COMO_RESPONSAVEL_NOVO_ON_WORKSPACE_MEMBER_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'etapaLogsComoResponsavelNovo',
  label: 'Logs de etapa (como responsável novo)',
  icon: 'IconHistory',
  relationTargetObjectMetadataUniversalIdentifier:
    ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    RESPONSAVEL_NOVO_ON_ETAPA_LOG_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
