import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const AGENTE_ON_PROCESSO_ID = '6a6d6ad9-7b94-457d-9090-f89b0026fca7';
export const PROCESSOS_ON_WORKSPACE_MEMBER_ID =
  '5676da92-3b6b-4bc1-a27d-e10b7960a550';

export default defineField({
  universalIdentifier: AGENTE_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'agente',
  label: 'Agente',
  description: 'Colaborador interno responsável por conduzir o processo',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    PROCESSOS_ON_WORKSPACE_MEMBER_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'agenteId',
  },
});
