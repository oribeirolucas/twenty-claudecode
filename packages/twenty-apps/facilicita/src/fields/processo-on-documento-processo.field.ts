import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';
import { DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/documento-processo.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const PROCESSO_ON_DOCUMENTO_PROCESSO_ID =
  '7714e63a-b767-456e-a12d-23490b71c370';
export const DOCUMENTOS_ON_PROCESSO_ID = '6ec17418-e7e8-4743-88b1-9ea9fdc55f6b';

export default defineField({
  universalIdentifier: PROCESSO_ON_DOCUMENTO_PROCESSO_ID,
  objectUniversalIdentifier: DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'processo',
  label: 'Processo',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: DOCUMENTOS_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'processoId',
  },
});
