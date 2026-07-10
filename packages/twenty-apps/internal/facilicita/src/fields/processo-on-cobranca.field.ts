import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const PROCESSO_ON_COBRANCA_ID = '1d6979a4-8eea-4ef6-8ff4-9571b0dd49eb';
export const COBRANCAS_ON_PROCESSO_ID = 'ece11d2c-69e4-4c99-afac-d4af621d680b';

export default defineField({
  universalIdentifier: PROCESSO_ON_COBRANCA_ID,
  objectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'processo',
  label: 'Processo',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: COBRANCAS_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'processoId',
  },
});
