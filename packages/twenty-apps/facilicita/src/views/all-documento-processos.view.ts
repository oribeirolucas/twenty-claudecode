import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  DOCUMENTO_PROCESSO_DESCRICAO_FIELD_UNIVERSAL_IDENTIFIER,
  DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
} from '../objects/documento-processo.object';

export const ALL_DOCUMENTO_PROCESSOS_VIEW_ID =
  'ca901b1a-3345-4090-a137-ef10d487fbb0';

export default defineView({
  universalIdentifier: ALL_DOCUMENTO_PROCESSOS_VIEW_ID,
  name: 'Todos os Documentos',
  objectUniversalIdentifier: DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconPaperclip',
  position: 0,
  fields: [
    {
      universalIdentifier: '55abfa70-f0ac-4b16-9597-7470ffbf753c',
      fieldMetadataUniversalIdentifier:
        DOCUMENTO_PROCESSO_DESCRICAO_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 200,
    },
  ],
});
