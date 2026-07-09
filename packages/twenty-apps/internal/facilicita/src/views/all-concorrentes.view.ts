import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  CONCORRENTE_NOME_EMPRESA_FIELD_UNIVERSAL_IDENTIFIER,
  CONCORRENTE_UNIVERSAL_IDENTIFIER,
} from '../objects/concorrente.object';

export const ALL_CONCORRENTES_VIEW_ID = '6f5a812a-44c5-4be4-b02e-cedc9294c320';

export default defineView({
  universalIdentifier: ALL_CONCORRENTES_VIEW_ID,
  name: 'Todos os Concorrentes',
  objectUniversalIdentifier: CONCORRENTE_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconUsersGroup',
  position: 0,
  fields: [
    {
      universalIdentifier: '474cef6c-abcd-4ca7-aac0-7b5c857a0085',
      fieldMetadataUniversalIdentifier:
        CONCORRENTE_NOME_EMPRESA_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 200,
    },
  ],
});
