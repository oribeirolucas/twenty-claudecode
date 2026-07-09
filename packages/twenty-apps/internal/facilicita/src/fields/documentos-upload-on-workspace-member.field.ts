import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/documento-processo.object';
import {
  DOCUMENTOS_UPLOAD_ON_WORKSPACE_MEMBER_ID,
  UPLOAD_POR_ON_DOCUMENTO_PROCESSO_ID,
} from './upload-por-on-documento-processo.field';

export default defineField({
  universalIdentifier: DOCUMENTOS_UPLOAD_ON_WORKSPACE_MEMBER_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'documentosUpload',
  label: 'Documentos enviados',
  icon: 'IconPaperclip',
  relationTargetObjectMetadataUniversalIdentifier:
    DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    UPLOAD_POR_ON_DOCUMENTO_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
