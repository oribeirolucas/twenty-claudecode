import { defineView } from 'twenty-sdk/define';
import { ViewType } from 'twenty-shared/types';
import {
  COBRANCA_DATA_VENCIMENTO_FIELD_UNIVERSAL_IDENTIFIER,
  COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  COBRANCA_UNIVERSAL_IDENTIFIER,
} from '../objects/cobranca.object';

export const ALL_COBRANCAS_VIEW_ID = 'db150795-bf06-4620-b1e9-847a07681be5';

export default defineView({
  universalIdentifier: ALL_COBRANCAS_VIEW_ID,
  name: 'Todas as Cobranças',
  objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconReceipt2',
  position: 0,
  fields: [
    {
      universalIdentifier: 'de80843a-65b3-4ead-8ddb-5435edbaf6ad',
      fieldMetadataUniversalIdentifier:
        COBRANCA_DATA_VENCIMENTO_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '0f6c0dcb-f782-4084-b0cd-0463aaac9266',
      fieldMetadataUniversalIdentifier:
        COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 150,
    },
  ],
});
