import { defineField, FieldType, RelationType } from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  ETAPA_LOGS_ON_PROCESSO_ID,
  PROCESSO_ON_ETAPA_LOG_ID,
} from './processo-on-etapa-log.field';

export default defineField({
  universalIdentifier: ETAPA_LOGS_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'etapaLogs',
  label: 'Histórico de etapas',
  icon: 'IconHistory',
  relationTargetObjectMetadataUniversalIdentifier:
    ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PROCESSO_ON_ETAPA_LOG_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
