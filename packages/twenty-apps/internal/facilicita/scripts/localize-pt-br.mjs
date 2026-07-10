#!/usr/bin/env node
// Applies a full pt-BR localization pass to a running Twenty instance: standard/system
// object labels, field labels, SELECT/MULTI_SELECT option labels, view names, and the
// handful of navigation menu items whose text isn't derived from object metadata.
//
// This exists because Twenty has no "as-code" mechanism for relabeling *standard*
// objects/fields the way twenty-sdk's defineObject covers *new* custom objects - those
// labels are plain per-workspace strings that only exist in the metadata database. This
// script is how that database state gets reproduced instead of living only as one-off
// mutations run by hand.
//
// Usage:
//   TWENTY_API_URL=http://localhost:3000 TWENTY_API_KEY=<jwt> node localize-pt-br.mjs
//
// TWENTY_API_KEY must be a workspace API key (see `workspace:generate-api-key`).

const API_URL = process.env.TWENTY_API_URL ?? 'http://localhost:3000';
const API_KEY = process.env.TWENTY_API_KEY;

if (!API_KEY) {
  console.error('Missing TWENTY_API_KEY environment variable.');
  process.exit(1);
}

const request = async (query, variables) => {
  const res = await fetch(`${API_URL}/metadata`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
};

// nameSingular -> [labelSingular, labelPlural]
const OBJECT_LABELS = {
  company: ['Empresa', 'Empresas'],
  person: ['Pessoa', 'Pessoas'],
  task: ['Tarefa', 'Tarefas'],
  note: ['Nota', 'Notas'],
  opportunity: ['Negócio', 'Negócios'],
  dashboard: ['Painel', 'Painéis'],
  workflow: ['Fluxo de Trabalho', 'Fluxos de Trabalho'],
  surveyResult: ['Resultado de pesquisa', 'Resultados de pesquisa'],
  employmentHistory: ['Histórico de emprego', 'Históricos de emprego'],
  rocket: ['Foguete', 'Foguetes'],
  petCareAgreement: ['Acordo de cuidado de animal', 'Acordos de cuidado de animal'],
  pet: ['Animal de estimação', 'Animais de estimação'],
  attachment: ['Anexo', 'Anexos'],
  blocklist: ['Lista de bloqueio', 'Listas de bloqueio'],
  workspaceMember: ['Membro do workspace', 'Membros do workspace'],
  calendarEvent: ['Evento', 'Eventos'],
  calendarEventParticipant: ['Participante do evento', 'Participantes do evento'],
};

// 'nameSingular.fieldName' -> label
const FIELD_LABELS = {
  'company.domainName': 'Domínio',
  'company.people': 'Pessoas',
  'company.workPolicy': 'Política de trabalho',
  'company.visaSponsorship': 'Patrocínio de visto',
  'company.caredForPets': 'Animais cuidados',
  'company.employees': 'Funcionários',
  'company.previousEmployees': 'Ex-funcionários',
  'company.accountOwner': 'Responsável',
  'company.address': 'Endereço',
  'company.opportunities': 'Negócios',
  'company.annualRevenue': 'Receita anual',
  'company.name': 'Nome',
  'company.tagline': 'Slogan',
  'company.introVideo': 'Vídeo de introdução',
  'company.taskTargets': 'Tarefas',
  'company.noteTargets': 'Notas',
  'company.timelineActivities': 'Eventos',
  'company.attachments': 'Arquivos',
  'person.previousCompanies': 'Empresas anteriores',
  'person.noteTargets': 'Notas',
  'person.caredForPets': 'Animais cuidados',
  'person.taskTargets': 'Tarefas',
  'person.workPreference': 'Preferência de trabalho',
  'person.name': 'Nome',
  'person.phones': 'Telefones',
  'person.performanceRating': 'Avaliação de desempenho',
  'person.calendarEventParticipants': 'Participantes de eventos',
  'person.pointOfContactForOpportunities': 'Negócios (ponto de contato)',
  'person.timelineActivities': 'Eventos',
  'person.emails': 'E-mails',
  'person.jobTitle': 'Cargo',
  'person.messageParticipants': 'Participantes de mensagens',
  'person.attachments': 'Arquivos',
  'person.listMemberships': 'Listas',
  'person.company': 'Empresa',
  'person.intro': 'Introdução',
  'opportunity.noteTargets': 'Notas',
  'opportunity.company': 'Empresa',
  'opportunity.taskTargets': 'Tarefas',
  'opportunity.owner': 'Responsável',
  'opportunity.pointOfContact': 'Ponto de contato',
  'opportunity.timelineActivities': 'Eventos',
  'opportunity.amount': 'Valor',
  'opportunity.attachments': 'Arquivos',
  'opportunity.closeDate': 'Data de fechamento',
  'opportunity.name': 'Nome',
  'opportunity.stage': 'Etapa',
  'task.assignee': 'Responsável',
  'task.title': 'Título',
  'task.taskTargets': 'Relações',
  'task.attachments': 'Arquivos',
  'task.timelineActivities': 'Eventos',
  'task.dueAt': 'Data de vencimento',
  'task.bodyV2': 'Descrição',
  'note.timelineActivities': 'Eventos',
  'note.attachments': 'Arquivos',
  'note.title': 'Título',
  'note.noteTargets': 'Relações',
  'note.bodyV2': 'Descrição',
  'dashboard.attachments': 'Arquivos',
  'dashboard.pageLayoutId': 'ID do layout de página',
  'dashboard.timelineActivities': 'Eventos',
  'dashboard.title': 'Título',
  'workflow.timelineActivities': 'Eventos',
  'workflow.lastPublishedVersionId': 'ID da última versão publicada',
  'workflow.automatedTriggers': 'Gatilhos automáticos',
  'workflow.versions': 'Versões',
  'workflow.name': 'Nome',
  'workflow.runs': 'Execuções',
  'workflow.attachments': 'Arquivos',
  'workflowRun.enqueuedAt': 'Enfileirado em',
  'workflowRun.name': 'Nome',
  'workflowRun.timelineActivities': 'Eventos',
  'workflowRun.workflowVersion': 'Versão do fluxo',
  'workflowRun.endedAt': 'Terminado em',
  'workflowRun.startedAt': 'Iniciado em',
  'workflowRun.status': 'Status',
  'workflowRun.workflow': 'Fluxo de trabalho',
  'workflowVersion.workflow': 'Fluxo de trabalho',
  'workflowVersion.name': 'Nome',
  'workflowVersion.status': 'Status',
  'workflowVersion.timelineActivities': 'Eventos',
  'workflowVersion.runs': 'Execuções',
  'workflowAutomatedTrigger.workflow': 'Fluxo de trabalho',
  'workflowAutomatedTrigger.type': 'Tipo de gatilho',
  'workspaceMember.accountOwnerForCompanies': 'Responsável por empresas',
  'workspaceMember.blocklist': 'Lista de bloqueio',
  'workspaceMember.timelineActivities': 'Eventos',
  'workspaceMember.ownedOpportunities': 'Negócios (responsável)',
  'workspaceMember.name': 'Nome',
  'workspaceMember.calendarEventParticipants': 'Participantes de eventos',
  'workspaceMember.assignedTasks': 'Tarefas atribuídas',
  'workspaceMember.messageParticipants': 'Participantes de mensagens',
  'calendarEvent.isCanceled': 'Cancelado',
  'calendarEvent.description': 'Descrição',
  'calendarEvent.externalCreatedAt': 'Data de criação',
  'calendarEvent.location': 'Local',
  'calendarEvent.isFullDay': 'Dia inteiro',
  'calendarEvent.title': 'Título',
  'calendarEvent.externalUpdatedAt': 'Data de atualização',
  'calendarEvent.endsAt': 'Data de término',
  'calendarEvent.calendarEventParticipants': 'Participantes',
  'calendarEvent.startsAt': 'Data de início',
  'calendarEvent.callRecordings': 'Gravações de chamada',
  'calendarEvent.calendarChannelEventAssociations': 'Associações de canal',
  'calendarEvent.conferenceLink': 'Link da reunião',
  'calendarEvent.conferenceSolution': 'Solução de conferência',
  'calendarEventParticipant.person': 'Pessoa',
  'calendarEventParticipant.isOrganizer': 'É organizador',
  'calendarEventParticipant.responseStatus': 'Status da resposta',
  'calendarEventParticipant.handle': 'Identificador',
  'calendarEventParticipant.workspaceMember': 'Membro do workspace',
  'calendarEventParticipant.displayName': 'Nome de exibição',
  'calendarEventParticipant.calendarEvent': 'Evento',
  'callRecording.endedAt': 'Terminou em',
  'callRecording.video': 'Vídeo',
  'callRecording.transcript': 'Transcrição',
  'callRecording.startedAt': 'Iniciou em',
  'callRecording.status': 'Status',
  'callRecording.calendarEvent': 'Evento',
  'callRecording.title': 'Título',
  'callRecording.recordingRequestStatus': 'Status da solicitação',
  'callRecording.summary': 'Resumo',
  'callRecording.audio': 'Áudio',
  'blocklist.handle': 'Identificador',
  'blocklist.workspaceMember': 'Membro do workspace',
  'attachment.name': 'Nome',
  'attachment.file': 'Arquivo',
  'processo.name': 'Nome (interno)',
  'cotacao.name': 'Nome (interno)',
  'concorrente.name': 'Nome (interno)',
  'etapaLog.name': 'Nome (interno)',
  'cobranca.name': 'Nome (interno)',
  'documentoProcesso.name': 'Nome (interno)',
  'processo.noteTargets': 'Notas',
  'processo.timelineActivities': 'Eventos',
  'processo.attachments': 'Arquivos',
  'processo.taskTargets': 'Tarefas',
  'cobranca.taskTargets': 'Tarefas',
  'cobranca.timelineActivities': 'Eventos',
  'cobranca.noteTargets': 'Notas',
  'cobranca.attachments': 'Arquivos',
  'cotacao.taskTargets': 'Tarefas',
  'cotacao.attachments': 'Arquivos',
  'cotacao.timelineActivities': 'Eventos',
  'cotacao.noteTargets': 'Notas',
  'concorrente.taskTargets': 'Tarefas',
  'concorrente.attachments': 'Arquivos',
  'concorrente.timelineActivities': 'Eventos',
  'concorrente.noteTargets': 'Notas',
  'etapaLog.attachments': 'Arquivos',
  'etapaLog.noteTargets': 'Notas',
  'etapaLog.taskTargets': 'Tarefas',
  'etapaLog.timelineActivities': 'Eventos',
  'documentoProcesso.noteTargets': 'Notas',
  'documentoProcesso.attachments': 'Arquivos',
  'documentoProcesso.taskTargets': 'Tarefas',
  'documentoProcesso.timelineActivities': 'Eventos',
  'pet.averageCostOfKibblePerMonth': 'Custo médio de ração por mês',
  'pet.interestingFacts': 'Fatos interessantes',
  'pet.soundSwag': 'Estilo de som',
  'pet.age': 'Idade',
  'pet.traits': 'Características',
  'pet.caretakers': 'Cuidadores',
  'pet.pictures': 'Fotos',
  'pet.timelineActivities': 'Eventos',
  'pet.vetEmail': 'E-mail do veterinário',
  'pet.noteTargets': 'Notas',
  'pet.species': 'Espécie',
  'pet.taskTargets': 'Tarefas',
  'pet.comments': 'Comentários',
  'pet.location': 'Localização',
  'pet.vetPhone': 'Telefone do veterinário',
  'pet.attachments': 'Arquivos',
  'pet.birthday': 'Aniversário',
  'pet.bio': 'Biografia',
  'pet.isGoodWithKids': 'É bom com crianças',
  'pet.name': 'Nome',
  'pet.makesOwnerThinkOf': 'Faz o dono lembrar de',
  'rocket.timelineActivities': 'Eventos',
  'rocket.taskTargets': 'Tarefas',
  'rocket.name': 'Nome',
  'rocket.helpedPets': 'Animais ajudados',
  'rocket.ownedPets': 'Animais possuídos',
  'rocket.attachments': 'Arquivos',
  'rocket.noteTargets': 'Notas',
  'petCareAgreement.pet': 'Animal',
  'petCareAgreement.timelineActivities': 'Eventos',
  'petCareAgreement.attachments': 'Arquivos',
  'petCareAgreement.taskTargets': 'Tarefas',
  'petCareAgreement.noteTargets': 'Notas',
  'employmentHistory.person': 'Pessoa',
  'employmentHistory.company': 'Empresa',
  'employmentHistory.noteTargets': 'Notas',
  'employmentHistory.taskTargets': 'Tarefas',
  'employmentHistory.timelineActivities': 'Eventos',
  'employmentHistory.attachments': 'Arquivos',
  'surveyResult.attachments': 'Arquivos',
  'surveyResult.participants': 'Participantes',
  'surveyResult.comments': 'Comentários',
  'surveyResult.ownedPets': 'Animais possuídos',
  'surveyResult.timelineActivities': 'Eventos',
  'surveyResult.percentageOfCompletion': 'Percentual de conclusão',
  'surveyResult.files': 'Arquivos',
  'surveyResult.name': 'Nome',
  'surveyResult.noteTargets': 'Notas',
  'surveyResult.taskTargets': 'Tarefas',
  'surveyResult.score': 'Pontuação',
  'surveyResult.helpedPets': 'Animais ajudados',
  'surveyResult.shortNotes': 'Notas curtas',
};

// 'nameSingular.fieldName' -> { oldOptionLabel: newOptionLabel }
const OPTION_LABELS = {
  'person.workPreference': { 'On-Site': 'Presencial', Hybrid: 'Híbrido', 'Remote Work': 'Remoto' },
  'company.workPolicy': { 'On-Site': 'Presencial', Hybrid: 'Híbrido', 'Remote Work': 'Remoto' },
  'task.status': { 'To do': 'A fazer', 'In progress': 'Em andamento', Done: 'Concluído' },
  'pet.traits': {
    Playful: 'Brincalhão',
    Friendly: 'Amigável',
    Protective: 'Protetor',
    Shy: 'Tímido',
    Brave: 'Corajoso',
    Curious: 'Curioso',
  },
  'pet.species': {
    Dog: 'Cachorro',
    Cat: 'Gato',
    Bird: 'Pássaro',
    Fish: 'Peixe',
    Rabbit: 'Coelho',
    Hamster: 'Hamster',
  },
  'opportunity.stage': {
    New: 'Novo',
    Screening: 'Triagem',
    Meeting: 'Reunião',
    Proposal: 'Proposta',
    Customer: 'Cliente',
  },
};

// 'nameSingular:type:oldName' -> newName (views are matched by object + type + current
// English name since view ids are workspace-specific)
const VIEW_NAMES = {
  'attachment:TABLE:All Anexos': 'Todos os Anexos',
  'blocklist:TABLE:All Listas de bloqueio': 'Todas as Listas de Bloqueio',
  'calendarChannelEventAssociation:TABLE:All Calendar Channel Event Associations':
    'Todas as Associações de Canal e Evento',
  'calendarEvent:TABLE:All Eventos': 'Todos os Eventos',
  'calendarEventParticipant:TABLE:All Participantes do evento': 'Todos os Participantes do Evento',
  'callRecording:TABLE:All Call Recordings': 'Todas as Gravações de Chamada',
  'company:TABLE:All Empresas': 'Todas as Empresas',
  'dashboard:TABLE:All Painéis': 'Todos os Painéis',
  'message:TABLE:All Messages': 'Todas as Mensagens',
  'messageCampaign:TABLE:All Campaigns': 'Todas as Campanhas',
  'messageChannelMessageAssociation:TABLE:All Message Channel Message Associations':
    'Todas as Associações de Mensagem',
  'messageChannelMessageAssociationMessageFolder:TABLE:All Message Channel Message Association Message Folders':
    'Todas as Pastas de Associação de Mensagem',
  'messageList:TABLE:All Lists': 'Todas as Listas',
  'messageParticipant:TABLE:All Message Participants': 'Todos os Participantes de Mensagem',
  'messageThread:TABLE:All Message Threads': 'Todas as Conversas',
  'note:TABLE:All Notas': 'Todas as Notas',
  'noteTarget:TABLE:All Note Targets': 'Todas as Relações de Nota',
  'opportunity:TABLE:All Negócios': 'Todos os Negócios',
  'person:TABLE:All Pessoas': 'Todas as Pessoas',
  'task:TABLE:All Tarefas': 'Todas as Tarefas',
  'taskTarget:TABLE:All Task Targets': 'Todas as Relações de Tarefa',
  'timelineActivity:TABLE:All Timeline Activities': 'Todos os Eventos de Linha do Tempo',
  'workflow:TABLE:All Fluxos de Trabalho': 'Todos os Fluxos de Trabalho',
  'workflowAutomatedTrigger:TABLE:All Workflow Automated Triggers': 'Todos os Gatilhos Automáticos',
  'workflowRun:TABLE:Runs': 'Execuções',
  'workflowVersion:TABLE:Versions': 'Versões',
  'workspaceMember:TABLE:All Membros do workspace': 'Todos os Membros do Workspace',
  'rocket:TABLE:All Foguetes': 'Todos os Foguetes',
  'pet:TABLE:All Animais de estimação': 'Todos os Animais de Estimação',
  'surveyResult:TABLE:All Resultados de pesquisa': 'Todos os Resultados de Pesquisa',
  'employmentHistory:TABLE:All Históricos de emprego': 'Todos os Históricos de Emprego',
  'petCareAgreement:TABLE:All Acordos de cuidado de animal': 'Todos os Acordos de Cuidado de Animal',
  'task:KANBAN:By Status': 'Por Status',
  'opportunity:KANBAN:By Stage': 'Por Etapa',
  'task:TABLE:Assigned to Me': 'Atribuídas a Mim',
};

// Navigation menu items with no target object (FOLDER/PAGE_LAYOUT types) - matched by
// their current literal name text.
const NAV_ITEM_NAMES = {
  Workflows: 'Fluxos de Trabalho',
  'Star History': 'Histórico de Estrelas',
};

const main = async () => {
  console.log('Fetching objects, fields, views, navigation menu items...');
  const [{ objects }, { fields }, { getViews: views }, { navigationMenuItems }] = await Promise.all([
    request('query { objects(paging: {first: 200}) { edges { node { id nameSingular } } } }'),
    request(
      'query { fields(paging: {first: 2000}) { edges { node { id name label options object { nameSingular } } } } }',
    ),
    request('query { getViews { id name type objectMetadataId } }'),
    request('query { navigationMenuItems { id name type } }'),
  ]);

  const objectIdByName = new Map(objects.edges.map((e) => [e.node.nameSingular, e.node.id]));
  const objectNameById = new Map(objects.edges.map((e) => [e.node.id, e.node.nameSingular]));

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  // 1. Object labels
  for (const [nameSingular, [labelSingular, labelPlural]] of Object.entries(OBJECT_LABELS)) {
    const id = objectIdByName.get(nameSingular);
    if (!id) {
      console.log(`SKIP object ${nameSingular}: not found in this workspace`);
      skipped += 1;
      continue;
    }
    try {
      await request(
        'mutation($id: UUID!, $labelSingular: String, $labelPlural: String) { updateOneObject(input: {id: $id, update: {labelSingular: $labelSingular, labelPlural: $labelPlural}}) { id } }',
        { id, labelSingular, labelPlural },
      );
      ok += 1;
    } catch (e) {
      console.log(`FAIL object ${nameSingular}:`, e.message);
      failed += 1;
    }
  }

  // 2. Field labels
  for (const field of fields.edges.map((e) => e.node)) {
    const key = `${field.object.nameSingular}.${field.name}`;
    const label = FIELD_LABELS[key];
    if (!label || field.label === label) continue;
    try {
      await request(
        'mutation($id: UUID!, $label: String) { updateOneField(input: {id: $id, update: {label: $label}}) { id } }',
        { id: field.id, label },
      );
      ok += 1;
    } catch (e) {
      // Twenty core system fields (createdAt/updatedAt/deletedAt/position/searchVector/
      // createdBy/updatedBy, plus a handful of workspaceMember settings fields) reject any
      // label change - "System fields only allow updating: universalSettings, isActive."
      // There is no supported way around this short of forking Twenty core, so these
      // stay in English. See the README's "Known limitations" section.
      skipped += 1;
    }
  }

  // 3. SELECT/MULTI_SELECT option labels
  for (const field of fields.edges.map((e) => e.node)) {
    const key = `${field.object.nameSingular}.${field.name}`;
    const mapping = OPTION_LABELS[key];
    if (!mapping || !field.options) continue;
    const newOptions = field.options.map((opt) =>
      mapping[opt.label] ? { ...opt, label: mapping[opt.label] } : opt,
    );
    try {
      await request(
        'mutation($id: UUID!, $options: JSON) { updateOneField(input: {id: $id, update: {options: $options}}) { id } }',
        { id: field.id, options: newOptions },
      );
      ok += 1;
    } catch (e) {
      console.log(`FAIL options ${key}:`, e.message);
      failed += 1;
    }
  }

  // 4. View names
  for (const view of views) {
    const objectName = objectNameById.get(view.objectMetadataId);
    const key = `${objectName}:${view.type}:${view.name}`;
    const newName = VIEW_NAMES[key];
    if (!newName) continue;
    try {
      await request('mutation($id: String!, $name: String) { updateView(id: $id, input: {name: $name}) { id } }', {
        id: view.id,
        name: newName,
      });
      ok += 1;
    } catch (e) {
      console.log(`FAIL view ${key}:`, e.message);
      failed += 1;
    }
  }

  // 5. Navigation menu items with no target object
  for (const item of navigationMenuItems) {
    const newName = NAV_ITEM_NAMES[item.name];
    if (!newName) continue;
    try {
      await request(
        'mutation($id: UUID!, $name: String) { updateNavigationMenuItem(input: {id: $id, update: {name: $name}}) { id } }',
        { id: item.id, name: newName },
      );
      ok += 1;
    } catch (e) {
      console.log(`FAIL nav item ${item.name}:`, e.message);
      failed += 1;
    }
  }

  console.log(`\nDone. applied=${ok} skipped=${skipped} failed=${failed}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
