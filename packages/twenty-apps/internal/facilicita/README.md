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
custom front-component — Twenty's own chart/aggregate widget system covers this). Two tabs:

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

**Known limitation, found via live sync:** this app's `DASHBOARD`-type page layout syncs fine as
metadata, but Twenty's native "Dashboards" sidebar list is backed by its own `dashboard` object
whose "+ New Dashboard" flow always mints a *fresh, empty* page layout tied 1:1 to the new record —
it has no picker to attach an existing one. So `Dashboard do CEO`'s widgets don't show up in that
list automatically the way the spec pictured; there's no navigation-menu-item type that points a
sidebar entry straight at a `DASHBOARD` layout either (`PAGE_LAYOUT` nav items only accept
`STANDALONE_PAGE` targets — confirmed by the server rejecting one). Reaching the built widgets
today means recreating them by hand once through "+ New Dashboard", or a follow-up investigation
into whether a post-install logic function can create a `dashboard` record pointing at this layout.

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

`yarn twenty dev:typecheck`, `yarn twenty dev:build`, and `yarn lint` all pass clean.

This has also been synced and exercised against a real running Twenty instance
(local Postgres/Redis/server/worker/frontend, seeded dev workspace) — not just structurally
validated. Three rounds of real server-side rejections were found and fixed this way, none of
which the local build/typecheck could have caught:

- SELECT option values can't start with a digit ("must follow snake_case") — `etapaAtual`'s
  `01_EDITAL` → `ETAPA_01_EDITAL` (ordering still comes from `position`, not the value).
- `labelIdentifierFieldMetadataUniversalIdentifier` must point at a TEXT field — `EtapaLog` now
  uses `observacao`; `Cobranca` gained a new `referencia` TEXT field for this (it had none before).
- Chart widgets need top-level `type: 'GRAPH'`, not the specific chart type — `configuration.
  configurationType` (`BAR_CHART`/`PIE_CHART`/`AGGREGATE_CHART`) still carries that. Bar charts
  also need an explicit `layout: 'VERTICAL'|'HORIZONTAL'` in their configuration.
- `PAGE_LAYOUT`-type navigation menu items only accept `STANDALONE_PAGE` targets, not `DASHBOARD`
  — removed the dashboard's nav item (see the Fatia 1 section above for the follow-up needed).

After those fixes, `yarn twenty apply` synced cleanly (0 errors), and both logic functions were
exercised for real:

- Created a `Processo`, moved it to `08_COBRANCA_ORGAO` via a GraphQL mutation → an `EtapaLog`
  (`etapaAnterior: ETAPA_01_EDITAL`, `etapaNova: ETAPA_08_COBRANCA_ORGAO`) and a `Cobranca`
  (`tipo: PAGAMENTO_ORGAO`, `status: ABERTA`, `dataVencimento` = +30 days) were both auto-created.
- Created a `Cotacao` (quantidade 10, custo unit. R$3.000, venda unit. R$4.500, comissão 70%) →
  `valorTotalCompra` R$30.000, `valorTotalVenda` R$45.000, `lucro` R$15.000, `comissaoSobreLucro`
  R$10.500, `margemPct` 33.33 — all computed correctly by the trigger.

The Kanban board, all field labels/icons/colors, and record creation were also confirmed rendering
correctly in the actual browser UI.

## Licensing note

Twenty core is AGPL-3.0. This app talks to a Twenty instance over its public app APIs and does
not modify or redistribute Twenty core code, but the licensing strategy for reselling this app to
other licitação representation companies (per the product spec) should still be checked with a
lawyer before any commercial rollout beyond Facilicita itself.
