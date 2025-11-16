import { ChatCircle, PaperPlaneTilt, X } from 'phosphor-react'
import React, { useEffect, useRef, useState } from 'react'

import type { ChatMessageDTO } from '@/dtos/chat'
import { useToast } from '@/providers'
import { ChatService } from '@/services'

import * as S from './styles'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageDTO[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line no-undef
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  // Load active conversation when opening chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadActiveConversation()
    }
  }, [isOpen])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadActiveConversation = async () => {
    try {
      const conversation = await ChatService.getConversation()
      setMessages(conversation.messages)
    } catch (error) {
      console.error('Erro ao carregar conversa:', error)
      toast.showError('Erro ao carregar conversa. Tente novamente.')
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return

    const userMessage = inputMessage
    setInputMessage('')
    setLoading(true)

    // Add user message optimistically
    const tempTimestamp = Date.now()
    const tempUserMsg: ChatMessageDTO = {
      content: userMessage,
      role: 'user',
      sentAt: new Date(tempTimestamp),
      booksRecommended: [],
    }

    setMessages((prev) => [...prev, tempUserMsg])

    try {
      const response = await ChatService.sendMessage(userMessage)

      // Replace temp message and add assistant response
      // Remove the temp message by matching content and timestamp
      setMessages((prev) => {
        const filtered = prev.filter(
          (m) =>
            !(
              m.role === 'user' &&
              m.content === userMessage &&
              m.sentAt.getTime() === tempTimestamp
            ),
        )
        return [...filtered, response.userMessage, response.assistantMessage]
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.showError('Erro ao enviar mensagem. Tente novamente.')
      // Remove temp message on error
      setMessages((prev) =>
        prev.filter(
          (m) =>
            !(
              m.role === 'user' &&
              m.content === userMessage &&
              m.sentAt.getTime() === tempTimestamp
            ),
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line no-undef
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <S.FloatingButton
          onClick={() => setIsOpen(true)}
          aria-label="Abrir assistente virtual"
        >
          <ChatCircle size={24} weight="fill" />
        </S.FloatingButton>
      )}

      {/* Chat window */}
      {isOpen && (
        <S.ChatWindow>
          {/* Header */}
          <S.ChatHeader>
            <S.ChatTitle>Assistente Virtual</S.ChatTitle>
            <S.CloseButton
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              <X size={20} weight="bold" />
            </S.CloseButton>
          </S.ChatHeader>

          {/* Messages */}
          <S.MessagesContainer>
            {messages.length === 0 && (
              <S.EmptyState>
                <ChatCircle size={48} weight="duotone" />
                <S.EmptyStateTitle>
                  Olá! Como posso ajudar você hoje?
                </S.EmptyStateTitle>
                <S.EmptyStateSubtitle>
                  Posso recomendar livros baseado no seu histórico!
                </S.EmptyStateSubtitle>
              </S.EmptyState>
            )}

            {messages.map((msg, index) => (
              <S.MessageWrapper
                key={`${msg.role}-${index}-${msg.sentAt.getTime()}`}
                isUser={msg.role === 'user'}
              >
                <S.MessageBubble isUser={msg.role === 'user'}>
                  {msg.content}
                  {msg.booksRecommended && msg.booksRecommended.length > 0 && (
                    <S.RecommendedBooksContainer>
                      <S.RecommendedBooksTitle>
                        Livros recomendados:
                      </S.RecommendedBooksTitle>
                      <S.RecommendedBooksList>
                        {msg.booksRecommended.map((book) => (
                          <S.RecommendedBookCard key={book.id}>
                            {book.title}
                          </S.RecommendedBookCard>
                        ))}
                      </S.RecommendedBooksList>
                    </S.RecommendedBooksContainer>
                  )}
                </S.MessageBubble>
              </S.MessageWrapper>
            ))}

            {loading && (
              <S.LoadingIndicator>
                <S.LoadingBubble>
                  <S.LoadingDots>
                    <S.LoadingDot delay="0s" />
                    <S.LoadingDot delay="0.1s" />
                    <S.LoadingDot delay="0.2s" />
                  </S.LoadingDots>
                </S.LoadingBubble>
              </S.LoadingIndicator>
            )}
            <div ref={messagesEndRef} />
          </S.MessagesContainer>

          {/* Input */}
          <S.InputContainer>
            <S.InputWrapper>
              <S.ChatInput
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                disabled={loading}
              />
              <S.SendButton
                onClick={sendMessage}
                disabled={loading || !inputMessage.trim()}
                aria-label="Enviar mensagem"
              >
                <PaperPlaneTilt size={20} weight="bold" />
              </S.SendButton>
            </S.InputWrapper>
          </S.InputContainer>
        </S.ChatWindow>
      )}
    </>
  )
}
