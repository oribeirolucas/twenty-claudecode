import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';
import { CONCORRENTE_UNIVERSAL_IDENTIFIER } from '../objects/concorrente.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const PROCESSO_ON_CONCORRENTE_ID =
  '131e1109-7539-4024-b23a-614ac8166df2';
export const CONCORRENTES_ON_PROCESSO_ID =
  '7307e3a6-fe9b-4770-ae4b-a0d85f8f744b';

export default defineField({
  universalIdentifier: PROCESSO_ON_CONCORRENTE_ID,
  objectUniversalIdentifier: CONCORRENTE_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'processo',
  label: 'Processo',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: CONCORRENTES_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'processoId',
  },
});
