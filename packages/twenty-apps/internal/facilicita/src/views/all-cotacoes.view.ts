import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  COTACAO_ITEM_FIELD_UNIVERSAL_IDENTIFIER,
  COTACAO_UNIVERSAL_IDENTIFIER,
} from '../objects/cotacao.object';

export const ALL_COTACOES_VIEW_ID = '8f3f3860-2b4c-4006-9e0e-167da1f09a9d';

export default defineView({
  universalIdentifier: ALL_COTACOES_VIEW_ID,
  name: 'Todas as Cotações',
  objectUniversalIdentifier: COTACAO_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconCalculator',
  position: 0,
  fields: [
    {
      universalIdentifier: '0dc75069-5c7a-48f2-a8c4-500f938abd2b',
      fieldMetadataUniversalIdentifier: COTACAO_ITEM_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 200,
    },
  ],
});
