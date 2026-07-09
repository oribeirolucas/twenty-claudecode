import { defineField, FieldType, RelationType } from 'twenty-sdk/define';
import { CONCORRENTE_UNIVERSAL_IDENTIFIER } from '../objects/concorrente.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';
import {
  CONCORRENTES_ON_PROCESSO_ID,
  PROCESSO_ON_CONCORRENTE_ID,
} from './processo-on-concorrente.field';

export default defineField({
  universalIdentifier: CONCORRENTES_ON_PROCESSO_ID,
  objectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'concorrentes',
  label: 'Concorrentes',
  icon: 'IconUsersGroup',
  relationTargetObjectMetadataUniversalIdentifier:
    CONCORRENTE_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PROCESSO_ON_CONCORRENTE_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
