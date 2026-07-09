import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const PROCESSO_ON_ETAPA_LOG_ID = 'e6526d68-8e7c-4a54-a62d-57b30a6b6e36';
export const ETAPA_LOGS_ON_PROCESSO_ID = 'c41c217a-bfa1-4852-bb3b-edb7e6461fc2';

export default defineField({
  universalIdentifier: PROCESSO_ON_ETAPA_LOG_ID,
  objectUniversalIdentifier: ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'processo',
  label: 'Processo',
  icon: 'IconGavel',
  relationTargetObjectMetadataUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: ETAPA_LOGS_ON_PROCESSO_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'processoId',
  },
});
