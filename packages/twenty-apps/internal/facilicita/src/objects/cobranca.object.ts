import { defineObject, FieldType } from 'twenty-sdk/define';

export enum CobrancaTipo {
  PAGAMENTO_ORGAO = 'PAGAMENTO_ORGAO',
  COMISSAO_REPRESENTADO = 'COMISSAO_REPRESENTADO',
  ATESTADO_TECNICO = 'ATESTADO_TECNICO',
}

export enum CobrancaStatus {
  ABERTA = 'ABERTA',
  PAGA = 'PAGA',
  ATRASADA = 'ATRASADA',
}

export const COBRANCA_UNIVERSAL_IDENTIFIER =
  '9a296121-f203-47b0-952c-3e306ec8d876';

export const COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER =
  'ee7afa36-61c9-432d-a2f2-f2a81d16ebc2';
export const COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER =
  '34b78952-5841-49b7-9d7d-ad19f1c4ecd6';
export const COBRANCA_DATA_VENCIMENTO_FIELD_UNIVERSAL_IDENTIFIER =
  'ea91806f-fb1b-499d-8b27-0b2d7c3ef83f';

export default defineObject({
  universalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
  nameSingular: 'cobranca',
  namePlural: 'cobrancas',
  labelSingular: 'Cobrança',
  labelPlural: 'Cobranças',
  description:
    'Uma cobrança do ciclo de recebimento de um processo: pagamento do órgão, comissão do representado ou atestado técnico.',
  icon: 'IconReceipt2',
  labelIdentifierFieldMetadataUniversalIdentifier:
    COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: COBRANCA_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'tipo',
      label: 'Tipo',
      icon: 'IconTag',
      options: [
        {
          id: 'ce35a02e-35a1-4746-b67f-1ff2e77f3de6',
          value: CobrancaTipo.PAGAMENTO_ORGAO,
          label: 'Pagamento do órgão',
          position: 0,
          color: 'blue',
        },
        {
          id: '25110594-d8ef-4b6a-a4b6-7858f2d3529b',
          value: CobrancaTipo.COMISSAO_REPRESENTADO,
          label: 'Comissão do representado',
          position: 1,
          color: 'green',
        },
        {
          id: 'dda85c83-5815-43db-acc0-455f333f9ce0',
          value: CobrancaTipo.ATESTADO_TECNICO,
          label: 'Atestado de capacidade técnica',
          position: 2,
          color: 'purple',
        },
      ],
    },
    {
      universalIdentifier: 'c420add4-f8ab-46e6-902e-8d768acbc67b',
      type: FieldType.CURRENCY,
      name: 'valor',
      label: 'Valor',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: COBRANCA_DATA_VENCIMENTO_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'dataVencimento',
      label: 'Data de vencimento',
      description: 'Dispara alertas de cobrança (automação — Fatia 2)',
      icon: 'IconCalendarDue',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '2b5ffc26-82cc-459e-a59b-2e80ba30fd12',
      type: FieldType.DATE_TIME,
      name: 'dataRecebimento',
      label: 'Data de recebimento',
      description: 'Vazio enquanto a cobrança está em aberto',
      icon: 'IconCalendarCheck',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: COBRANCA_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconFlag',
      defaultValue: `'${CobrancaStatus.ABERTA}'`,
      options: [
        {
          id: '2aa330d5-bc58-4c43-ab51-2ef51213f5d7',
          value: CobrancaStatus.ABERTA,
          label: 'Aberta',
          position: 0,
          color: 'blue',
        },
        {
          id: '1270d865-296c-4d25-a112-5dbaa80879c9',
          value: CobrancaStatus.PAGA,
          label: 'Paga',
          position: 1,
          color: 'green',
        },
        {
          id: '0f10e5a2-6f4e-4bce-8c15-a56bf1fc45a4',
          value: CobrancaStatus.ATRASADA,
          label: 'Atrasada',
          position: 2,
          color: 'red',
        },
      ],
    },
  ],
});
