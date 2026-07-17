export const businessProfile = {
  companyName: 'AltaPress',
  phone: '(31) 9 7267-1038',
  whatsapp: '(31) 9 9187-8767',
  whatsappUrl:
    'https://wa.me/5531991878767?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20AltaPress%20sobre%20pe%C3%A7as%20hidr%C3%A1ulicas.',
  email: 'comercial@altapress.com.br',
  address: 'Rua Josias Machado, 236 - Inconfidentes, CEP 32260-520',
  hours: 'Segunda a sexta, em horário comercial.',
  products: [
    'válvulas para alta pressão',
    'conexões em ferro maleável',
    'componentes em aço carbono',
    'suporte técnico para escolha de peças',
  ],
  salesFocus: [
    'atender rapidamente',
    'qualificar a necessidade técnica',
    'recomendar a linha de produto mais adequada',
    'conduzir o cliente para pedido de orçamento no WhatsApp ou por e-mail',
  ],
  technicalChecklist: [
    'tipo da peça',
    'bitola ou tamanho nominal',
    'tipo de rosca ou conexão',
    'pressão de trabalho',
    'aplicação do sistema',
    'material desejado',
  ],
};

export const welcomeMessage =
  'Olá! Sou o Adriano, da AltaPress. Diga qual peça ou aplicação você precisa.';

export function buildSystemPrompt() {
  return [
    `Você é o assistente virtual da ${businessProfile.companyName}.`,
    'Responda sempre em português do Brasil, com objetividade, clareza técnica e tom comercial profissional.',
    'Seu objetivo principal é identificar a necessidade do cliente, recomendar os produtos da AltaPress e conduzir a conversa para pedido de orçamento ou contato comercial.',
    'Fale apenas sobre produtos, aplicações, atendimento, contato e dúvidas comerciais da empresa.',
    'Quando o cliente perguntar sobre tamanho, bitola, rosca, material, pressão ou aplicação da peça, explique o uso de forma consultiva e, se faltarem dados, peça as especificações técnicas antes de recomendar.',
    `Para qualificar tecnicamente, você pode pedir: ${businessProfile.technicalChecklist.join(', ')}.`,
    'Sempre que fizer sentido, destaque benefícios como segurança, resistência, compatibilidade e confiabilidade operacional.',
    'Ao recomendar um produto, finalize incentivando o cliente a enviar a especificação ou foto da peça para agilizar o orçamento.',
    'Se o cliente pedir preço, estoque, prazo final ou condição comercial exata, explique que a confirmação deve ser feita com a equipe humana e direcione para WhatsApp ou e-mail.',
    'Se não souber algo com segurança, diga isso de forma clara e ofereça o canal humano.',
    `Dados confirmados da empresa: telefone ${businessProfile.phone}; e-mail ${businessProfile.email}; endereço ${businessProfile.address}; horário ${businessProfile.hours}.`,
    `Linha principal: ${businessProfile.products.join(', ')}.`,
    `Foco comercial da empresa: ${businessProfile.salesFocus.join(', ')}.`,
    'Evite inventar marcas, medidas exatas, roscas, normas, preços, prazos ou políticas não informadas.',
    'Nunca escreva o número de WhatsApp na resposta. Quando precisar indicar esse canal, diga apenas para falar com a equipe no WhatsApp da empresa.',
    'Responda em, no máximo, 6 frases curtas.',
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
    return `Consigo orientar você na escolha da peça ideal. Para fechar orçamento e valores, envie a especificação ou foto da peça para ${businessProfile.email}.`;
  }

  if (includesAny(message, ['produto', 'valvula', 'valvulas', 'conexao', 'conexoes', 'peca', 'pecas'])) {
    return `A AltaPress trabalha com ${businessProfile.products.join(', ')}. Se você me informar a aplicação, a bitola e o tipo da conexão ou válvula, consigo indicar a linha mais adequada e direcionar você para um orçamento rápido.`;
  }

  if (includesAny(message, ['tamanho', 'bitola', 'medida', 'rosca', 'diametro', 'polegada', 'mm'])) {
    return `Para indicar a peça correta, preciso confirmar ${businessProfile.technicalChecklist.join(', ')}. Com esses dados, a AltaPress consegue recomendar a conexão ou válvula mais segura para sua aplicação e agilizar seu atendimento comercial.`;
  }

  if (includesAny(message, ['serve', 'aplicacao', 'uso', 'funcao', 'funciona'])) {
    return `Posso explicar a função da peça e indicar a melhor aplicação. Diga se você precisa de válvula, conexão ou componente em aço carbono e, se puder, envie também a pressão de trabalho e o tipo de sistema para eu orientar você com mais precisão.`;
  }

  if (includesAny(message, ['horario', 'atendimento', 'funciona', 'aberto'])) {
    return `O atendimento da AltaPress acontece em ${businessProfile.hours}`;
  }

  if (includesAny(message, ['endereco', 'onde fica', 'localizacao', 'localizacao', 'rua'])) {
    return `A AltaPress fica em ${businessProfile.address}. Se preferir, também posso informar o telefone ${businessProfile.phone} e o e-mail ${businessProfile.email}.`;
  }

  if (includesAny(message, ['telefone', 'whatsapp', 'contato', 'email'])) {
    return `Você pode falar com a AltaPress pelo telefone ${businessProfile.phone} ou pelo e-mail ${businessProfile.email}.`;
  }

  return 'Diga qual peça você procura ou qual é a sua aplicação para eu orientar melhor.';
}
