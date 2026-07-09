import { defineApplicationRole } from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';
import { CONCORRENTE_UNIVERSAL_IDENTIFIER } from '../objects/concorrente.object';
import { COTACAO_UNIVERSAL_IDENTIFIER } from '../objects/cotacao.object';
import { DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/documento-processo.object';
import { ETAPA_LOG_UNIVERSAL_IDENTIFIER } from '../objects/etapa-log.object';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export const DEFAULT_ROLE_UNIVERSAL_IDENTIFIER =
  'd9b711bc-3e87-49b3-9ba8-4c8c7f5c08fb';

const VERTICAL_OBJECT_UNIVERSAL_IDENTIFIERS = [
  PROCESSO_UNIVERSAL_IDENTIFIER,
  COTACAO_UNIVERSAL_IDENTIFIER,
  CONCORRENTE_UNIVERSAL_IDENTIFIER,
  ETAPA_LOG_UNIVERSAL_IDENTIFIER,
  COBRANCA_UNIVERSAL_IDENTIFIER,
  DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
];

export default defineApplicationRole({
  universalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Facilicita — Equipe',
  description:
    'Papel padrão para a equipe da Facilicita: leitura e escrita nos objetos verticais de licitação.',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: true,
  canBeAssignedToApiKeys: true,
  objectPermissions: VERTICAL_OBJECT_UNIVERSAL_IDENTIFIERS.map(
    (objectUniversalIdentifier) => ({
      objectUniversalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: true,
      canDestroyObjectRecords: false,
    }),
  ),
});
