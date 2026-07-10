export type CotacaoCurrency = {
  amountMicros?: string | null;
  currencyCode?: string | null;
};

export type CotacaoFinancialFields = {
  id: string;
  quantidade: number | null;
  valorUnitCompra: CotacaoCurrency | null;
  valorUnitVenda: CotacaoCurrency | null;
  comissaoPct: number | null;
  valorTotalCompra: CotacaoCurrency | null;
  valorTotalVenda: CotacaoCurrency | null;
  lucro: CotacaoCurrency | null;
  comissaoSobreLucro: CotacaoCurrency | null;
  margemPct: number | null;
};

export type CotacaoComputedFinancials = {
  valorTotalCompra: CotacaoCurrency;
  valorTotalVenda: CotacaoCurrency;
  lucro: CotacaoCurrency;
  comissaoSobreLucro: CotacaoCurrency;
  margemPct: number | null;
};

// Twenty stores CURRENCY as micros (value * 1_000_000) — plain Number arithmetic is fine for
// typical business amounts (safe up to ~9e15), no BigInt needed here.
const microsOf = (currency: CotacaoCurrency | null | undefined): number =>
  currency?.amountMicros ? Number(currency.amountMicros) : 0;

const toCurrency = (amountMicros: number, currencyCode: string): CotacaoCurrency => ({
  amountMicros: String(Math.round(amountMicros)),
  currencyCode,
});

export const computeCotacaoFinancials = (
  record: CotacaoFinancialFields,
): CotacaoComputedFinancials => {
  const quantidade = record.quantidade ?? 0;
  const currencyCode =
    record.valorUnitVenda?.currencyCode ?? record.valorUnitCompra?.currencyCode ?? 'BRL';

  const totalCompraMicros = microsOf(record.valorUnitCompra) * quantidade;
  const totalVendaMicros = microsOf(record.valorUnitVenda) * quantidade;
  const lucroMicros = totalVendaMicros - totalCompraMicros;
  const comissaoMicros = lucroMicros * ((record.comissaoPct ?? 0) / 100);
  const margemPct = totalVendaMicros !== 0 ? (lucroMicros / totalVendaMicros) * 100 : null;

  return {
    valorTotalCompra: toCurrency(totalCompraMicros, currencyCode),
    valorTotalVenda: toCurrency(totalVendaMicros, currencyCode),
    lucro: toCurrency(lucroMicros, currencyCode),
    comissaoSobreLucro: toCurrency(comissaoMicros, currencyCode),
    margemPct: margemPct !== null ? Math.round(margemPct * 100) / 100 : null,
  };
};

// The .updated trigger's own write-back re-fires the same event — this is the fixed-point check
// that breaks the loop: if nothing actually changed since last computed, skip the mutation.
export const hasFinancialsChanged = (
  record: CotacaoFinancialFields,
  computed: CotacaoComputedFinancials,
): boolean =>
  record.valorTotalCompra?.amountMicros !== computed.valorTotalCompra.amountMicros ||
  record.valorTotalVenda?.amountMicros !== computed.valorTotalVenda.amountMicros ||
  record.lucro?.amountMicros !== computed.lucro.amountMicros ||
  record.comissaoSobreLucro?.amountMicros !== computed.comissaoSobreLucro.amountMicros ||
  record.margemPct !== computed.margemPct;
