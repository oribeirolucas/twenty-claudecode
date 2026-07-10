import { defineObject, FieldType } from 'twenty-sdk/define';

export enum DocumentoProcessoTipo {
  EDITAL = 'EDITAL',
  PROPOSTA = 'PROPOSTA',
  CONTRATO = 'CONTRATO',
  ATESTADO = 'ATESTADO',
  OUTRO = 'OUTRO',
}

export const DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER =
  '46d8acbb-3116-4b03-80db-133cc29cfca2';

export const DOCUMENTO_PROCESSO_DESCRICAO_FIELD_UNIVERSAL_IDENTIFIER =
  'd850846d-d128-495c-b965-4b940d545d44';

export default defineObject({
  universalIdentifier: DOCUMENTO_PROCESSO_UNIVERSAL_IDENTIFIER,
  nameSingular: 'documentoProcesso',
  namePlural: 'documentoProcessos',
  labelSingular: 'Documento do Processo',
  labelPlural: 'Documentos do Processo',
  description: 'Um anexo (edital, proposta, contrato, atestado...) de um processo.',
  icon: 'IconPaperclip',
  labelIdentifierFieldMetadataUniversalIdentifier:
    DOCUMENTO_PROCESSO_DESCRICAO_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier:
        DOCUMENTO_PROCESSO_DESCRICAO_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'descricao',
      label: 'Descrição',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: 'fd7ace22-873b-44a8-9621-ab253a90c480',
      type: FieldType.TEXT,
      name: 'arquivoUrl',
      label: 'URL do arquivo',
      description: 'Localização do arquivo no armazenamento (MinIO/S3)',
      icon: 'IconLink',
      isNullable: true,
      defaultValue: null,
    },
    {
      universalIdentifier: '004ead0a-d2c4-4b36-b85c-cbdb30da41c0',
      type: FieldType.SELECT,
      name: 'tipo',
      label: 'Tipo',
      icon: 'IconTag',
      isNullable: true,
      defaultValue: null,
      options: [
        {
          id: 'fa6b44d2-73f3-420a-b479-d43faee1328e',
          value: DocumentoProcessoTipo.EDITAL,
          label: 'Edital',
          position: 0,
          color: 'blue',
        },
        {
          id: '1b13539b-a386-453e-9867-65d467bf2838',
          value: DocumentoProcessoTipo.PROPOSTA,
          label: 'Proposta',
          position: 1,
          color: 'purple',
        },
        {
          id: '3762bd1d-a42f-4175-9589-f14fb5f58788',
          value: DocumentoProcessoTipo.CONTRATO,
          label: 'Contrato',
          position: 2,
          color: 'green',
        },
        {
          id: '76cdd24e-0f72-4e82-9423-8f6d4a4a114d',
          value: DocumentoProcessoTipo.ATESTADO,
          label: 'Atestado',
          position: 3,
          color: 'orange',
        },
        {
          id: 'b99fd82d-238d-4cd3-ab43-f50fc6bd53ab',
          value: DocumentoProcessoTipo.OUTRO,
          label: 'Outro',
          position: 4,
          color: 'gray',
        },
      ],
    },
    {
      universalIdentifier: '11aea27a-00f1-46bd-94e0-88fc9471a435',
      type: FieldType.DATE_TIME,
      name: 'uploadEm',
      label: 'Upload em',
      description: 'Preenchido automaticamente na criação (automação — Fatia 2)',
      icon: 'IconUpload',
      defaultValue: 'now',
    },
  ],
});
