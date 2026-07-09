import { defineObject, FieldType } from 'twenty-sdk/define';

export const COTACAO_UNIVERSAL_IDENTIFIER =
  '0326013e-ebf8-481c-ae44-70b37b698c9e';

export const COTACAO_ITEM_FIELD_UNIVERSAL_IDENTIFIER =
  '4a87f9a9-6840-4c8e-910c-cf1052032183';

export default defineObject({
  universalIdentifier: COTACAO_UNIVERSAL_IDENTIFIER,
  nameSingular: 'cotacao',
  namePlural: 'cotacoes',
  labelSingular: 'Cotação',
  labelPlural: 'Cotações',
  description:
    'Cálculo comercial de um item de um processo: custo, venda, margem e comissão.',
  icon: 'IconCalculator',
  labelIdentifierFieldMetadataUniversalIdentifier:
    COTACAO_ITEM_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: COTACAO_ITEM_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'item',
      label: 'Item',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '5551f7c0-57c5-427d-93ac-4a5c4ed54c51',
      type: FieldType.NUMBER,
      name: 'quantidade',
      label: 'Quantidade',
      icon: 'IconNumber',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '05ebaac4-3322-4a86-95b7-3b7625809441',
      type: FieldType.TEXT,
      name: 'fornecedor',
      label: 'Fornecedor',
      icon: 'IconBuildingWarehouse',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '8e3283c4-3954-4b66-8ed0-b4568eeafb16',
      type: FieldType.CURRENCY,
      name: 'valorUnitCompra',
      label: 'Valor unitário de compra',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: 'e8338371-c053-465c-b5aa-4c664a0c780f',
      type: FieldType.CURRENCY,
      name: 'valorTotalCompra',
      label: 'Valor total de compra',
      description:
        'Calculado a partir de valorUnitCompra × quantidade. Preenchido por automação (Fatia 2).',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '59276405-7bfc-466e-8b74-de6c43b858fe',
      type: FieldType.CURRENCY,
      name: 'valorUnitVenda',
      label: 'Valor unitário de venda',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '0542c744-745b-4c6e-9fa7-02d1a4d1fa30',
      type: FieldType.CURRENCY,
      name: 'valorTotalVenda',
      label: 'Valor total de venda',
      description:
        'Calculado a partir de valorUnitVenda × quantidade. Preenchido por automação (Fatia 2).',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '785e71a0-90f0-436f-ba1a-8568ebf64796',
      type: FieldType.NUMBER,
      name: 'comissaoPct',
      label: 'Comissão (%)',
      icon: 'IconPercentage',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '4b782d52-2895-44f9-b502-34ebdb58d555',
      type: FieldType.CURRENCY,
      name: 'lucro',
      label: 'Lucro',
      description:
        'Calculado a partir de valorTotalVenda − valorTotalCompra. Preenchido por automação (Fatia 2).',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '5ebe632e-126c-4ed5-b9dd-130068a3fd36',
      type: FieldType.CURRENCY,
      name: 'comissaoSobreLucro',
      label: 'Comissão sobre o lucro',
      description:
        'Calculado a partir de lucro × comissaoPct. Preenchido por automação (Fatia 2).',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: 'c26743ef-29df-479b-90bc-d2ebb783f6b4',
      type: FieldType.NUMBER,
      name: 'margemPct',
      label: 'Margem (%)',
      description:
        'Calculado a partir de lucro / valorTotalVenda. Preenchido por automação (Fatia 2).',
      icon: 'IconPercentage',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: 'c677b3a2-6ab2-40ce-8a0f-ff3f2232521e',
      type: FieldType.BOOLEAN,
      name: 'srp',
      label: 'SRP',
      description: 'Sistema de Registro de Preços',
      icon: 'IconChecklist',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: 'caf8d68c-d92f-4672-9ea8-acd122cccd22',
      type: FieldType.NUMBER,
      name: 'garantiaMeses',
      label: 'Garantia (meses)',
      icon: 'IconShieldCheck',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '06876d37-4c9c-42a8-a792-cc7126588baa',
      type: FieldType.TEXT,
      name: 'prazoEntregaVenda',
      label: 'Prazo de entrega (venda)',
      icon: 'IconTruckDelivery',
      isNullable: true,
      defaultValue: null,
    },
  ],
});
