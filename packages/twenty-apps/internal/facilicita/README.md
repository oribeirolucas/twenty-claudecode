# Facilicita

A Twenty App implementing the vertical data model for **Facilicita**, a company that represents
suppliers in Brazilian public procurement (licitações). Built with [twenty-sdk](https://docs.twenty.com/developers/extend/apps/getting-started)
on top of a standard Twenty CRM instance — no fork of Twenty core.

## Scope of this slice (Sprint 0 — Fundação)

This is the first slice of the roadmap: the vertical data model only. It defines:

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

## Deliberately out of scope here

Per the roadmap in the product spec, these are separate slices:

- **Automation** (Fatia 2): auto-creating an `EtapaLog` on every `etapaAtual` change, auto-creating
  `Cobranca` records on entering stages 08/09/10, and computing `Cotacao`'s derived fields
  (`valorTotalCompra`, `lucro`, `comissaoSobreLucro`, `margemPct`). The fields exist as plain
  stored values; nothing populates them yet. This needs `defineLogicFunction` triggers
  (`databaseEventTriggerSettings`) on `processo.updated` / `cotacao.created|updated`.
  `DocumentoProcesso.uploadPor` / `uploadEm` and `EtapaLog.dataEntrada` follow the same pattern —
  `dataEntrada`/`uploadEm` default to `now`, but `uploadPor` needs a logic function to stamp the
  current user.
- **CEO dashboard** (Fatia 1/2): the four indicator blocks from the spec. Twenty's reporting is
  the acknowledged gap this app is meant to fill, but it needs its own front-component work.
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

## Licensing note

Twenty core is AGPL-3.0. This app talks to a Twenty instance over its public app APIs and does
not modify or redistribute Twenty core code, but the licensing strategy for reselling this app to
other licitação representation companies (per the product spec) should still be checked with a
lawyer before any commercial rollout beyond Facilicita itself.
