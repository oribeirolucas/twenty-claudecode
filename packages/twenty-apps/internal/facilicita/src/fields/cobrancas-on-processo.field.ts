import { defineField, FieldType, RelationType } from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  COBRANCAS_ON_PROCESSO_ID,
  PROCESSO_ON_COBRANCA_ID,
} from './processo-on-cobranca.field';

export default defineField({
  universalIdentifier: COBRANCAS_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'cobrancas',
  label: 'Cobranças',
  icon: 'IconReceipt2',
  relationTargetObjectMetadataUniversalIdentifier:
    COBRANCA_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PROCESSO_ON_COBRANCA_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
