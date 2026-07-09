import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  PROCESSOS_REPRESENTADOS_ON_COMPANY_ID,
  REPRESENTADO_ON_PROCESSO_ID,
} from './representado-on-processo.field';

export default defineField({
  universalIdentifier: PROCESSOS_REPRESENTADOS_ON_COMPANY_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'processosRepresentados',
  label: 'Processos (como representado)',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: REPRESENTADO_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
