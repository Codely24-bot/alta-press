import { useEffect, useRef, useState } from 'react';
import { businessProfile, suggestedQuestions } from '../../shared/supportKnowledge';
import { createInitialMessages, requestSupportReply } from '../lib/supportChatApi';
import altaPressChatLogo from '../assets/alta-press-chat-logo.png';

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11.8L20.2 4.2C20.8 3.94 21.46 4.54 21.26 5.16L16 21C15.79 21.64 14.91 21.73 14.57 21.15L10.84 14.76L4.44 11.03C3.87 10.69 3.95 9.82 4.58 9.61L20.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageBubble({ message }) {
  return (
    <div className={`support-chat__message support-chat__message--${message.role}`}>
      <div className="support-chat__message-label">{message.role === 'assistant' ? 'Alta Press IA' : 'Voce'}</div>
      <p>{message.content}</p>
    </div>
  );
}

function createMessage(role, content) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(() => createInitialMessages());
  const [connectionMode, setConnectionMode] = useState(import.meta.env.VITE_CHATBOT_MODE === 'mock' ? 'mock' : 'live');
  const messageListRef = useRef(null);

  useEffect(() => {
    const container = messageListRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (rawContent) => {
    const content = rawContent.trim();

    if (!content || isLoading) {
      return;
    }

    const nextUserMessage = createMessage('user', content);
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await requestSupportReply(nextMessages);

      setConnectionMode(result.source === 'openai' ? 'live' : 'mock');
      setMessages((currentMessages) => [...currentMessages, createMessage('assistant', result.reply)]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'assistant',
          `Nao consegui responder agora. Chame a equipe no WhatsApp ${businessProfile.whatsapp} ou no email ${businessProfile.email}.`,
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(inputValue);
  };

  return (
    <div className={`support-chat ${isOpen ? 'is-open' : ''}`}>
      {isOpen ? (
        <section className="support-chat__panel" aria-label="Assistente virtual da Alta Press">
          <header className="support-chat__header">
            <div className="support-chat__brand">
              <img className="support-chat__brand-logo" src={altaPressChatLogo} alt="Logo Alta Press" />
              <div>
                <span className="support-chat__eyebrow">Assistente virtual</span>
                <strong>Alta Press IA</strong>
              </div>
            </div>

            <button
              className="support-chat__icon-button"
              type="button"
              aria-label="Fechar chat"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="support-chat__status">
            <span className={`support-chat__status-dot support-chat__status-dot--${connectionMode}`} />
            <span>{connectionMode === 'live' ? 'Conectado com IA' : 'Modo demonstracao'}</span>
          </div>

          <div ref={messageListRef} className="support-chat__messages">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading ? (
              <div className="support-chat__typing" aria-live="polite">
                Alta Press IA esta digitando...
              </div>
            ) : null}
          </div>

          <div className="support-chat__suggestions" aria-label="Sugestoes de perguntas">
            {suggestedQuestions.map((question) => (
              <button key={question} type="button" onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <form className="support-chat__composer" onSubmit={handleSubmit}>
            <input
              type="text"
              name="support-chat-message"
              placeholder="Digite sua duvida..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Enviar mensagem">
              <SendIcon />
            </button>
          </form>
        </section>
      ) : null}

      <button
        className="support-chat__launcher"
        type="button"
        aria-expanded={isOpen}
        aria-label="Abrir chat de atendimento"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span className="support-chat__launcher-icon">
          <img src={altaPressChatLogo} alt="" />
        </span>
        <span className="support-chat__launcher-copy">
          <strong>Tire duvidas</strong>
          <small>Converse com a Alta Press</small>
        </span>
      </button>
    </div>
  );
}
