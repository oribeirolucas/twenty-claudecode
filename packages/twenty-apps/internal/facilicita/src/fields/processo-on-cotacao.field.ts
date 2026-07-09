import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';
import { COTACAO_UNIVERSAL_IDENTIFIER } from '../objects/cotacao.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const PROCESSO_ON_COTACAO_ID = 'dea90698-4460-4107-847e-88b9fb9fdedc';
export const COTACOES_ON_PROCESSO_ID = '4765edeb-4c69-4536-a2b7-7beacc36b5e2';

export default defineField({
  universalIdentifier: PROCESSO_ON_COTACAO_ID,
  objectUniversalIdentifier: COTACAO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'processo',
  label: 'Processo',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: COTACOES_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'processoId',
  },
});
