export const businessProfile = {
  companyName: 'Alta Press',
  phone: '(31) 9 7267-1038',
  whatsapp: '(31) 9 9187-8767',
  whatsappUrl:
    'https://wa.me/5531991878767?text=Ola%2C%20quero%20falar%20com%20a%20Alta%20Press%20sobre%20pecas%20hidraulicas.',
  email: 'comercial@altapress.com.br',
  address: 'Rua Josias Machado, 236 - Inconfidentes, CEP 32260-520',
  hours: 'Segunda a sexta, em horario comercial.',
  products: [
    'valvulas para alta pressao',
    'conexoes em ferro maleavel',
    'componentes em aco carbono',
    'suporte tecnico para escolha de pecas',
  ],
  salesFocus: [
    'atender rapidamente',
    'qualificar a necessidade tecnica',
    'recomendar a linha de produto mais adequada',
    'conduzir o cliente para pedido de orcamento no WhatsApp ou email',
  ],
  technicalChecklist: [
    'tipo da peca',
    'bitola ou tamanho nominal',
    'tipo de rosca ou conexao',
    'pressao de trabalho',
    'aplicacao do sistema',
    'material desejado',
  ],
};

export const welcomeMessage =
  'Ola! Sou o assistente virtual da Alta Press. Posso indicar pecas, explicar aplicacoes e te encaminhar rapidamente para um orcamento.';

export function buildSystemPrompt() {
  return [
    `Voce e o assistente virtual da ${businessProfile.companyName}.`,
    'Responda sempre em portugues do Brasil, com objetividade, clareza tecnica e tom comercial profissional.',
    'Seu objetivo principal e identificar a necessidade do cliente, recomendar os produtos da Alta Press e conduzir a conversa para pedido de orcamento ou contato comercial.',
    'Fale apenas sobre produtos, aplicacoes, atendimento, contato e duvidas comerciais da empresa.',
    'Quando o cliente perguntar sobre tamanho, bitola, rosca, material, pressao ou aplicacao da peca, explique o uso de forma consultiva e, se faltarem dados, peca as especificacoes tecnicas antes de recomendar.',
    `Para qualificar tecnicamente, voce pode pedir: ${businessProfile.technicalChecklist.join(', ')}.`,
    'Sempre que fizer sentido, destaque beneficios como seguranca, resistencia, compatibilidade e confiabilidade operacional.',
    'Ao recomendar um produto, finalize incentivando o cliente a enviar a especificacao ou foto da peca pelo botao "Falar no WhatsApp" para agilizar o orcamento.',
    'Se o cliente pedir preco, estoque, prazo final ou condicao comercial exata, explique que a confirmacao deve ser feita com a equipe humana e direcione para WhatsApp ou email.',
    'Se nao souber algo com seguranca, diga isso de forma clara e ofereca o canal humano.',
    `Dados confirmados da empresa: telefone ${businessProfile.phone}; email ${businessProfile.email}; endereco ${businessProfile.address}; horario ${businessProfile.hours}. O canal de WhatsApp deve ser indicado pelo botao "Falar no WhatsApp" exibido na conversa.`,
    `Linha principal: ${businessProfile.products.join(', ')}.`,
    `Foco comercial da empresa: ${businessProfile.salesFocus.join(', ')}.`,
    'Evite inventar marcas, medidas exatas, roscas, normas, precos, prazos ou politicas nao informadas.',
    'Nunca escreva o numero de WhatsApp na resposta. Quando precisar indicar esse canal, diga apenas para usar o botao "Falar no WhatsApp".',
    'Responda em no maximo 6 frases curtas.',
  ].join(' ');
}

export function sanitizeConversation(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message) => message && typeof message.content === 'string')
    .map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: message.content.trim().slice(0, 1200),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-10);
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

export function buildMockReply(userMessage) {
  const message = (userMessage || '').toLowerCase();

  if (includesAny(message, ['orcamento', 'cotacao', 'preco', 'valor', 'comprar'])) {
    return `Consigo te orientar na escolha da peca ideal e acelerar sua compra. Para fechar orcamento e valores, use o botao Falar no WhatsApp abaixo ou envie a especificacao ou foto da peca para ${businessProfile.email}.`;
  }

  if (includesAny(message, ['produto', 'valvula', 'valvulas', 'conexao', 'conexoes', 'peca', 'pecas'])) {
    return `A Alta Press trabalha com ${businessProfile.products.join(', ')}. Se voce me informar a aplicacao, a bitola e o tipo da conexao ou valvula, eu consigo indicar a linha mais adequada e te direcionar para um orcamento rapido.`;
  }

  if (includesAny(message, ['tamanho', 'bitola', 'medida', 'rosca', 'diametro', 'polegada', 'mm'])) {
    return `Para indicar a peca correta, preciso confirmar ${businessProfile.technicalChecklist.join(', ')}. Com esses dados, a Alta Press consegue recomendar a conexao ou valvula mais segura para sua aplicacao e agilizar seu atendimento comercial.`;
  }

  if (includesAny(message, ['serve', 'aplicacao', 'uso', 'funcao', 'funciona'])) {
    return `Eu posso te explicar a funcao da peca e indicar a melhor aplicacao. Me diga se voce precisa de valvula, conexao ou componente em aco carbono e, se puder, envie tambem a pressao de trabalho e o tipo de sistema para eu te orientar com mais precisao.`;
  }

  if (includesAny(message, ['horario', 'atendimento', 'funciona', 'aberto'])) {
    return `O atendimento da Alta Press acontece em ${businessProfile.hours} Para retorno rapido, use o botao Falar no WhatsApp abaixo.`;
  }

  if (includesAny(message, ['endereco', 'onde fica', 'localizacao', 'localizacao', 'rua'])) {
    return `A Alta Press fica em ${businessProfile.address}. Se preferir, eu tambem posso te passar o telefone ${businessProfile.phone} e o email ${businessProfile.email}.`;
  }

  if (includesAny(message, ['telefone', 'whatsapp', 'contato', 'email'])) {
    return `Voce pode falar com a Alta Press pelo telefone ${businessProfile.phone}, pelo botao Falar no WhatsApp abaixo ou pelo email ${businessProfile.email}.`;
  }

  return `${welcomeMessage} Se voce me disser qual peca procura ou qual e a sua aplicacao, eu consigo te orientar melhor e encaminhar para um orcamento com a equipe comercial.`;
}
