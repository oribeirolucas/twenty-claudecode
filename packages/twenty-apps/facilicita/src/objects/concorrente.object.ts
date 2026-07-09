import { defineObject, FieldType } from 'twenty-sdk/define';

export const CONCORRENTE_UNIVERSAL_IDENTIFIER =
  'e6a9925e-86ac-47ac-8a11-0076d7819bf5';

export const CONCORRENTE_NOME_EMPRESA_FIELD_UNIVERSAL_IDENTIFIER =
  '653e2f8a-8e66-4e7f-b325-8fc7cb27e1e1';

export default defineObject({
  universalIdentifier: CONCORRENTE_UNIVERSAL_IDENTIFIER,
  nameSingular: 'concorrente',
  namePlural: 'concorrentes',
  labelSingular: 'Concorrente',
  labelPlural: 'Concorrentes',
  description: 'Uma empresa concorrente em uma disputa de pregão.',
  icon: 'IconUsersGroup',
  labelIdentifierFieldMetadataUniversalIdentifier:
    CONCORRENTE_NOME_EMPRESA_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: CONCORRENTE_NOME_EMPRESA_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'nomeEmpresa',
      label: 'Nome da empresa',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '18a727f6-7a8b-49eb-a78e-39da7445293c',
      type: FieldType.TEXT,
      name: 'marca',
      label: 'Marca',
      icon: 'IconTag',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '37f5985e-911f-49ef-858d-1a53af63fdf4',
      type: FieldType.CURRENCY,
      name: 'valorProposta',
      label: 'Valor da proposta',
      icon: 'IconCoin',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '7fe6e729-e5d8-445b-9d70-77217516c740',
      type: FieldType.NUMBER,
      name: 'posicao',
      label: 'Posição',
      description: 'Posição do concorrente na disputa (1 = primeiro colocado)',
      icon: 'IconListNumbers',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '6bac04f5-50d1-436a-9df5-12478eac09e0',
      type: FieldType.DATE_TIME,
      name: 'data',
      label: 'Data',
      icon: 'IconCalendarEvent',
      isNullable: true,
      defaultValue: null,
    },
  ],
});
