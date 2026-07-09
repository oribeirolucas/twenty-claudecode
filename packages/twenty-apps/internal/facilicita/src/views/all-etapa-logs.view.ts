import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  ETAPA_LOG_DATA_ENTRADA_FIELD_UNIVERSAL_IDENTIFIER,
  ETAPA_LOG_UNIVERSAL_IDENTIFIER,
} from '../objects/etapa-log.object';

export const ALL_ETAPA_LOGS_VIEW_ID = '1abadcfc-dd04-4a97-b88c-d760be37497a';

export default defineView({
  universalIdentifier: ALL_ETAPA_LOGS_VIEW_ID,
  name: 'Todos os Logs de Etapa',
  objectUniversalIdentifier: ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconHistory',
  position: 0,
  fields: [
    {
      universalIdentifier: 'ab186667-9f6a-4451-b891-c803d055a332',
      fieldMetadataUniversalIdentifier:
        ETAPA_LOG_DATA_ENTRADA_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 180,
    },
  ],
});
