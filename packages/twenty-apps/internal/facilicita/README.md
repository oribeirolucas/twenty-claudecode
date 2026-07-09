# Facilicita

A Twenty App implementing the vertical data model for **Facilicita**, a company that represents
suppliers in Brazilian public procurement (licitações). Built with [twenty-sdk](https://docs.twenty.com/developers/extend/apps/getting-started)
on top of a standard Twenty CRM instance — no fork of Twenty core.

## Scope shipped so far

### Sprint 0 — Fundação: the vertical data model

- **`Processo`** — a licitação, the card that moves through the 11-stage esteira
  (`etapaAtual`), plus a Kanban view grouped by that field (`src/views/processos-por-etapa.view.ts`).
- **`Cotacao`** — the commercial calculation for an item (cost, sale price, margin, commission).
- **`Concorrente`** — a competing company in a pregão dispute.
- **`EtapaLog`** — the immutable audit trail of stage transitions. Never edit or delete an
  existing record; only ever insert new ones.
- **`Cobranca`** — a receivable tied to stages 08/09/10 (órgão payment, representado commission,
  atestado técnico).
- **`DocumentoProcesso`** — attachments for a processo.
- A `tipo` field (Representado / Órgão) added to the standard `Company` object, so the same
  object type covers both sides of a processo relationship.

Every object has at least one table view and every relation is wired both ways (see
`src/fields/`), matching the two common pitfalls called out for Twenty apps: an object with no
view is unusable in the generic UI, and a view with no navigation menu item never shows up in the
sidebar. `Processo` and `Cobranca` get sidebar entries; `Cotacao`, `Concorrente`, `EtapaLog` and
`DocumentoProcesso` are reached through the Processo record page's related-records tables.

### Fatia 1 — Dashboard do CEO

`src/page-layouts/ceo-dashboard.page-layout.ts` is a native Twenty `DASHBOARD` page layout (not a
custom front-component — Twenty's own chart/aggregate widget system covers this), with a
navigation menu entry. Two tabs:

- **Pipeline**: processos por etapa (bar), processos por status (pie), valor estimado por status
  (bar — the GANHO bar *is* the spec's "valor ganho no período", EM_ANDAMENTO is "valor em
  disputa").
- **Financeiro**: cobranças por status (pie), valor por status de cobrança (bar — ABERTA/ATRASADA
  bars are the spec's "a receber em aberto" / "atrasado"), valor por tipo de cobrança (bar),
  margem média das cotações (single stat).

Every widget aggregates+groups by a single field rather than using `ChartFilter` — there's no
working example of a populated chart filter anywhere in this SDK's own fixtures/examples to
confirm the value-encoding against, so grouping by status/tipo was used to get the same numbers
without touching that unconfirmed path. Not shipped: "taxa de conversão por etapa" (needs
`EtapaLog` time-series data, which only exists once Fatia 2's automation below has been running for
a while) and month-scoping on "comissão realizada no mês" (needs a relative-date chart filter,
same unconfirmed-path concern).

### Fatia 2 — Automação

- `src/logic-functions/on-processo-etapa-changed.ts` — triggers on `processo.updated`, guarded to
  only act when `etapaAtual` is in `updatedFields`. Closes the previous `EtapaLog`'s `dataSaida`,
  creates the new `EtapaLog` row, and auto-creates the matching `Cobranca` (skipping if one for
  that `tipo` already exists) on entering stage 08/09/10 — the quick-win the spec calls out
  (section 3) as where a representation company's money "vaza" today.
- `src/logic-functions/compute-cotacao-financials-on-created.ts` /
  `-on-updated.ts` — compute `valorTotalCompra`, `valorTotalVenda`, `lucro`, `comissaoSobreLucro`,
  `margemPct` from `quantidade`/`valorUnitCompra`/`valorUnitVenda`/`comissaoPct`. The `.updated`
  variant guards against re-triggering itself (skips when the update only touched the derived
  fields it just wrote, and skips again if the computed values are unchanged from what's stored).

Not shipped: `DocumentoProcesso.uploadPor` auto-stamping the current user (needs the actor/user id
off the event payload, not yet investigated) and hard blocking of backward stage moves without an
observação (a trigger fires *after* the write already landed, so it can only react, not block —
that needs a different hook, out of scope here).

## Deliberately out of scope here

Per the roadmap in the product spec, these are separate, later slices:

- **CRM comercial bridge** (Fatia 3): wiring the native `Opportunity` pipeline to auto-create a
  `Representado` + first `Processo` on `CONTRATO_ASSINADO`.
- **Effecti / PNCP ingestion** (Fatia 4): pulling editais into `Processo` at stage 01.
- **Financial layer / NF-e integration** (Fatia 5).
- Real seed data — no production Facilicita process data was available while building this slice.

## Development

```bash
yarn install
yarn twenty remote:add   # point the CLI at a running Twenty instance
yarn twenty dev          # sync objects/fields/views to that instance and watch for changes
```

See `docs.twenty.com/developers/extend/apps` for the full CLI reference.

## Validation status

`yarn twenty dev:typecheck` and `yarn twenty dev:build` both pass (0 type errors, manifest builds
and validates, including the dashboard's graph widgets and the three logic function triggers).
`yarn lint` is clean.

Not verified, because it needs a live Twenty instance (`yarn twenty dev` against a real server):
the logic functions' GraphQL query/mutation calls are written against the exact mutation-naming
convention used elsewhere in this SDK's own apps (`create<Singular>`/`update<Singular>`, `data:`
argument — see `twenty-partners`/`call-recorder`), but the specific filter operand (`eq`) and
`orderBy` direction string (`DescNullsLast`) used in `on-processo-etapa-changed.ts` haven't been
run against a real GraphQL schema. If they're wrong, the practical effect is limited: the previous
`EtapaLog`'s `dataSaida` might not get closed, or the create-`Cobranca` duplicate-check might not
find an existing one — not a crash, but worth a live-server smoke test before relying on this in
production.

## Licensing note

Twenty core is AGPL-3.0. This app talks to a Twenty instance over its public app APIs and does
not modify or redistribute Twenty core code, but the licensing strategy for reselling this app to
other licitação representation companies (per the product spec) should still be checked with a
lawyer before any commercial rollout beyond Facilicita itself.
