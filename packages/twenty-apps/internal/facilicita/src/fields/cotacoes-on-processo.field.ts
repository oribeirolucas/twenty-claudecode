import { defineField, FieldType, RelationType } from 'twenty-sdk/define';
import { COTACAO_UNIVERSAL_IDENTIFIER } from '../objects/cotacao.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  COTACOES_ON_PROCESSO_ID,
  PROCESSO_ON_COTACAO_ID,
} from './processo-on-cotacao.field';

export default defineField({
  universalIdentifier: COTACOES_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'cotacoes',
  label: 'Cotações',
  icon: 'IconCalculator',
  relationTargetObjectMetadataUniversalIdentifier: COTACAO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PROCESSO_ON_COTACAO_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
