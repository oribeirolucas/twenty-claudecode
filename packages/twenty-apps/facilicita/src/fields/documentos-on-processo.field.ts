import { defineField, FieldType, RelationType } from 'twenty-sdk/define';
import { DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/documento-processo.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  DOCUMENTOS_ON_PROCESSO_ID,
  PROCESSO_ON_DOCUMENTO_PROCESSO_ID,
} from './processo-on-documento-processo.field';

export default defineField({
  universalIdentifier: DOCUMENTOS_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'documentos',
  label: 'Documentos',
  icon: 'IconPaperclip',
  relationTargetObjectMetadataUniversalIdentifier:
    DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    PROCESSO_ON_DOCUMENTO_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
