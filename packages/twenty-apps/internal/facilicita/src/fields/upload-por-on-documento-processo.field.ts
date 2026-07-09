import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/documento-processo.object';

export const UPLOAD_POR_ON_DOCUMENTO_PROCESSO_ID =
  '225bd5bf-58b9-4d90-857c-1baa3e7e6117';
export const DOCUMENTOS_UPLOAD_ON_WORKSPACE_MEMBER_ID =
  '766a3782-d6ed-4900-84bc-facece8beadf';

export default defineField({
  universalIdentifier: UPLOAD_POR_ON_DOCUMENTO_PROCESSO_ID,
  objectUniversalIdentifier: DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'uploadPor',
  label: 'Upload por',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    DOCUMENTOS_UPLOAD_ON_WORKSPACE_MEMBER_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'uploadPorId',
  },
});
