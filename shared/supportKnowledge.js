export const businessProfile = {
  companyName: 'Alta Press',
  phone: '(31) 9 7267-1038',
  whatsapp: '(31) 9 9187-8767',
  whatsappUrl:
    'https://wa.me/5531991878767?text=Ola%2C%20quero%20falar%20com%20a%20Alta%20Press%20sobre%20pecas%20hidraulicas.',
  email: 'comercial@altapress.com.br',
  address: 'Rua Carme, 165 - Nova Lima',
  hours: 'Segunda a sexta, em horario comercial.',
  products: [
    'valvulas para alta pressao',
    'conexoes em ferro maleavel',
    'componentes em aco carbono',
    'suporte tecnico para escolha de pecas',
  ],
};

export const welcomeMessage =
  'Ola! Sou o assistente virtual da Alta Press. Posso ajudar com produtos, formas de contato e como pedir um orcamento.';

export const suggestedQuestions = [
  'Quais produtos voces atendem?',
  'Como pedir um orcamento?',
  'Qual o horario de atendimento?',
];

export function buildSystemPrompt() {
  return [
    `Voce e o assistente virtual da ${businessProfile.companyName}.`,
    'Responda sempre em portugues do Brasil, com objetividade e tom profissional.',
    'Fale apenas sobre produtos, atendimento, contato e duvidas comerciais da empresa.',
    'Se o cliente pedir preco, estoque, prazo final ou condicao comercial exata, explique que a confirmacao deve ser feita com a equipe humana e direcione para WhatsApp ou email.',
    'Se nao souber algo com seguranca, diga isso de forma clara e ofereca o canal humano.',
    `Dados confirmados da empresa: telefone ${businessProfile.phone}; WhatsApp ${businessProfile.whatsapp}; email ${businessProfile.email}; endereco ${businessProfile.address}; horario ${businessProfile.hours}.`,
    `Linha principal: ${businessProfile.products.join(', ')}.`,
    'Evite inventar marcas, precos, prazos ou politicas nao informadas.',
    'Responda em no maximo 5 frases curtas.',
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
    return `Para orcamentos e valores, o ideal e falar com a equipe comercial pelo WhatsApp ${businessProfile.whatsapp} ou pelo email ${businessProfile.email}. Se quiser, eu tambem posso te orientar sobre a linha de produtos antes do atendimento humano.`;
  }

  if (includesAny(message, ['produto', 'valvula', 'valvulas', 'conexao', 'conexoes', 'peca', 'pecas'])) {
    return `A Alta Press trabalha com ${businessProfile.products.join(', ')}. Se voce me disser a aplicacao ou o tipo de sistema, eu consigo te orientar melhor antes de encaminhar para o comercial.`;
  }

  if (includesAny(message, ['horario', 'atendimento', 'funciona', 'aberto'])) {
    return `O atendimento da Alta Press acontece em ${businessProfile.hours} Para retorno rapido, voce pode chamar no WhatsApp ${businessProfile.whatsapp}.`;
  }

  if (includesAny(message, ['endereco', 'onde fica', 'localizacao', 'localizacao', 'rua'])) {
    return `A Alta Press fica em ${businessProfile.address}. Se preferir, eu tambem posso te passar o telefone ${businessProfile.phone} e o email ${businessProfile.email}.`;
  }

  if (includesAny(message, ['telefone', 'whatsapp', 'contato', 'email'])) {
    return `Voce pode falar com a Alta Press pelo telefone ${businessProfile.phone}, pelo WhatsApp ${businessProfile.whatsapp} ou pelo email ${businessProfile.email}.`;
  }

  return `${welcomeMessage} Se a sua duvida for sobre produtos, orcamento ou contato, eu consigo te direcionar rapidamente.`;
}
