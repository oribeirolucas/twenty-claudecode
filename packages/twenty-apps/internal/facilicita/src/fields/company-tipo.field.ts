import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

export enum CompanyTipo {
  REPRESENTADO = 'REPRESENTADO',
  ORGAO = 'ORGAO',
}

export const COMPANY_TIPO_FIELD_UNIVERSAL_IDENTIFIER =
  '0a0646f5-8c83-4ed3-ab43-beeacc549d62';

export default defineField({
  universalIdentifier: COMPANY_TIPO_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.SELECT,
  name: 'tipo',
  label: 'Tipo',
  description:
    'Diferencia um Representado (empresa que a Facilicita representa) de um Órgão (comprador público)',
  icon: 'IconTag',
  isNullable: true,
  defaultValue: null,
  options: [
    {
      id: '61bc67c8-551a-4cf0-ab56-24edb54e70e5',
      value: CompanyTipo.REPRESENTADO,
      label: 'Representado',
      position: 0,
      color: 'blue',
    },
    {
      id: '9e11eedd-d52e-44e5-a1ae-634a920ee657',
      value: CompanyTipo.ORGAO,
      label: 'Órgão',
      position: 1,
      color: 'orange',
    },
  ],
});
