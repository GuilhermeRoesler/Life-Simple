import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChatMessage } from '@/types';
import { CHATBOT_API_URL, CHATBOT_API_KEY } from '@/utils/products';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Olá! Bem-vindo à Life Simple. Em que posso ajudar? Você quer ver produtos para Emagrecimento ou Academia?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('pharmacy-chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save chat history to localStorage
    localStorage.setItem('pharmacy-chat-history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Attempt to call the API
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATBOT_API_KEY}`
        },
        body: JSON.stringify({ message: inputMessage })
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'Desculpe, não entendi. Pode reformular?',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      // Mock response when API is not available
      console.log('Using mock response - API integration pending');
      
      let mockResponse = 'Obrigado pela sua mensagem! ';
      
      if (inputMessage.toLowerCase().includes('emagrecimento')) {
        mockResponse += 'Temos ótimas opções de produtos para emagrecimento. Você pode ver nosso catálogo na seção de produtos ou falar conosco pelo WhatsApp para orientação personalizada.';
      } else if (inputMessage.toLowerCase().includes('academia')) {
        mockResponse += 'Nossos produtos para academia são formulados para maximizar seus resultados. Confira o catálogo ou entre em contato para uma consultoria gratuita.';
      } else if (inputMessage.toLowerCase().includes('preço') || inputMessage.toLowerCase().includes('valor')) {
        mockResponse += 'Nossos preços variam de acordo com a formulação. Você pode ver os valores no catálogo de produtos ou solicitar um orçamento personalizado pelo WhatsApp.';
      } else {
        mockResponse += 'Para melhor atendê-lo, recomendo entrar em contato pelo WhatsApp onde nossa equipe pode fornecer orientação personalizada. Você também pode navegar pelo nosso catálogo de produtos.';
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: mockResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg gradient-primary hover:opacity-90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-40 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-[500px]'
    } w-[350px] md:w-[400px]`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">Assistente Virtual</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[380px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-accent text-accent-foreground rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                className="gradient-primary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}