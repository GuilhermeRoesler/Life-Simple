import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

// --- INSTRUÇÕES DE CONFIGURAÇÃO ---
// 1. Cole sua chave de API do Google Gemini aqui.
//    Você pode obter uma em: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Cole a configuração do seu projeto Firebase abaixo.
//    Veja o arquivo README.md para instruções detalhadas.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
// --- FIM DAS INSTRUÇÕES ---

// Componentes de Ícones SVG (substituindo lucide-react)
const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
);
const Send = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);
const X = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const Minimize2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="M14 10l7-7" /><path d="M3 21l7-7" /></svg>
);


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');

  // Estados do Firebase
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);

  const messagesEndRef = useRef(null);

  // Efeito para inicializar o Firebase e autenticar o usuário
  useEffect(() => {
    try {
      if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("SUA_API_KEY_AQUI")) {
        throw new Error("Configuração do Firebase não encontrada ou inválida. Verifique o objeto firebaseConfig.");
      }
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const auth = getAuth(app);
      setDb(firestore);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          try {
            await signInAnonymously(auth);
          } catch (authError) {
            console.error("Erro na autenticação anônima:", authError);
            setError("Falha ao autenticar. O chat não funcionará.");
          }
        }
      });
    } catch (e) {
      console.error("Erro ao inicializar Firebase:", e);
      setError(e.message);
    }
  }, []);

  // Efeito para buscar mensagens do Firestore em tempo real
  useEffect(() => {
    if (db && userId) {
      const messagesCollectionPath = `chats/${userId}/messages`;
      const q = query(collection(db, messagesCollectionPath), orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });

        // Adiciona a mensagem inicial se o chat estiver vazio
        if (msgs.length === 0) {
          const initialBotMessage = {
            text: 'Olá! Bem-vindo à Life Simple. Em que posso ajudar? Você tem interesse por algum produto?😀',
            sender: 'bot',
            timestamp: Timestamp.now()
          };
          addDoc(collection(db, messagesCollectionPath), initialBotMessage);
        }

        setMessages(msgs);
      }, (err) => {
        console.error("Erro ao buscar mensagens:", err);
        setError("Não foi possível carregar o histórico de mensagens.");
      });

      // Limpa o listener ao desmontar o componente
      return () => unsubscribe();
    }
  }, [db, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !db || !userId) return;

    const messagesCollectionPath = `chats/${userId}/messages`;
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: Timestamp.now()
    };

    setInputMessage('');

    try {
      await addDoc(collection(db, messagesCollectionPath), userMessage);

      setIsTyping(true);

      if (!GEMINI_API_KEY) {
        throw new Error('Chave de API do Gemini não configurada.');
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

      const systemPrompt = `
      Você é o assistente virtual da farmácia de manipulados Life Simple, treinado para auxiliar clientes com dúvidas comuns. Seu tom de voz deve ser sempre educado, atencioso, assertivo e claro, evitando respostas frias, impessoais ou técnicas demais. Use linguagem simples e acessível, trazendo emojis à conversa. Sempre cumprimente o cliente de forma acolhedora e apresente-se como assistente virtual da farmácia no início da conversa.

      Você pode responder perguntas relacionadas a informações sobre manipulação de medicamentos (sem prescrever), horários de funcionamento, prazos de entrega, formas de pagamento, diferenciais da farmácia e orientações gerais sobre como solicitar orçamentos ou pedidos. Nunca forneça diagnósticos médicos, não recomende tratamentos e nem prescreva medicamentos, reforçando sempre que não substitui um profissional de saúde.

      Quando não souber responder, oriente educadamente o cliente a entrar em contato diretamente com a farmácia, fornecendo os canais oficiais: telefone (51) 99999-9999, e-mail lifesimple@gmail.com, endereço Tv. São José, 455 - Navegantes, Porto Alegre - RS, 90240-200 e horário de atendimento presencial e virtual das 9h às 17h.

      Suas respostas devem ser claras, objetivas e formadas por frases curtas, sem termos técnicos ou jargões desnecessários. Utilize o nome do cliente sempre que ele for fornecido e adapte a resposta de acordo com a dúvida apresentada. Finalize cada interação com uma despedida cordial, como por exemplo: “Foi um prazer ajudar! Caso precise de mais informações, estamos à disposição.”

      Se a pergunta do cliente estiver totalmente fora do escopo de atendimento, responda de forma amigável: “Posso não ter a resposta para isso, mas nossa equipe terá prazer em ajudar. Por favor, entre em contato com a farmácia pelos nossos canais de atendimento”, repetindo telefone, e-mail e endereço.
      
      Nunca mencione que é um modelo de linguagem ou IA. Sempre se apresente como assistente virtual da farmácia Life Simple.
      
      De produtos que a loja possui, podemos listar: Slim Fórmula A, Bloqueador Carbo, Termo Fit, Detox Plus, Seca Barriga, Control Apetite, Lipo Redux, Fibras Plus, Night Burn, Shake Proteico Slim, Creatina Pura, Pré-Treino Focus, Mass Builder, Glutamina Premium, ZMA Complex, Beta Alanina, Whey Isolado, Test Booster, Hair Vitamins, Colágeno Capilar, Anti-Queda Max, Keratin Plus, Grow Formula, Shine Complex, Capilar Detox, Repair Intensive, Colágeno Premium, Antioxidante Complex, Ácido Hialurônico, Vitamina C Pura, Ceramidas Skin, Glutationa Clareador, Zinco Quelado, Beauty Omegas, Probióticos Skin, Retinol Natural.`;

      const payload = {
        contents: [{ parts: [{ text: inputMessage }] }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Erro da API: ${response.statusText}`);
      }

      const data = await response.json();
      const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua solicitação no momento.';

      const botMessage = {
        text: botResponseText,
        sender: 'bot',
        timestamp: Timestamp.now()
      };
      await addDoc(collection(db, messagesCollectionPath), botMessage);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = {
        text: `Ocorreu um erro: ${error.message}. Por favor, verifique a configuração da API ou tente novamente mais tarde.`,
        sender: 'bot',
        timestamp: Timestamp.now()
      };
      await addDoc(collection(db, messagesCollectionPath), errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full text-primary-foreground gradient-primary flex items-center justify-center hover:bg-blue-700 transition-all"
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-8 w-8" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-40 shadow-2xl transition-all duration-300 rounded-lg bg-card border border-border ${isMinimized ? 'h-14' : 'h-[500px]'
      } w-[350px] md:w-[400px] flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50 gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-base">Assistente Virtual</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 rounded-full text-primary-foreground hover:bg-black/10 flex items-center justify-center transition-colors"
            aria-label="Minimizar chat"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full text-primary-foreground hover:bg-black/10 flex items-center justify-center transition-colors"
            aria-label="Fechar chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background h-[calc(100%-120px)]">
            {error && <p className="text-destructive text-center text-sm p-2 bg-destructive/20 rounded-md">{error}</p>}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}
                >
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp && typeof message.timestamp.toDate === 'function'
                      ? message.timestamp.toDate().toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      : ''
                    }
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-xl p-3 rounded-bl-none">
                  <div className="flex space-x-1 items-center">
                    <span className="text-sm text-secondary-foreground/80">Digitando</span>
                    <div className="w-1.5 h-1.5 bg-secondary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-secondary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-secondary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex space-x-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border border-border bg-input text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 flex-shrink-0 gradient-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 disabled:bg-muted disabled:opacity-50 transition-all"
                aria-label="Enviar mensagem"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}