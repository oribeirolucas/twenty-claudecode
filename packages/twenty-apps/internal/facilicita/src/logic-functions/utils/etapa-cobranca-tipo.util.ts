import { CobrancaTipo } from '../../objects/cobranca.object';
import { ProcessoEtapa } from '../../objects/processo.object';

// The three stages where the spec calls out manual follow-up as the biggest source of leaked
// revenue (section 3) — entering one of these auto-creates the matching Cobranca if it doesn't
// exist yet.
export const ETAPA_TO_COBRANCA_TIPO: Partial<Record<ProcessoEtapa, CobrancaTipo>> = {
  [ProcessoEtapa.ETAPA_08_COBRANCA_ORGAO]: CobrancaTipo.PAGAMENTO_ORGAO,
  [ProcessoEtapa.ETAPA_09_COBRANCA_COMISSAO]: CobrancaTipo.COMISSAO_REPRESENTADO,
  [ProcessoEtapa.ETAPA_10_COBRANCA_ATESTADO]: CobrancaTipo.ATESTADO_TECNICO,
};
