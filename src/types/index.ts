export interface Product {
  id: string;
  nome: string;
  categoria: 'Emagrecimento' | 'Academia';
  descricao_curta: string;
  descricao_longa: string;
  preco: string;
  imagem: string;
}

export interface CartItem extends Product {
  quantidade: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ContactForm {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
  consentimento: boolean;
}