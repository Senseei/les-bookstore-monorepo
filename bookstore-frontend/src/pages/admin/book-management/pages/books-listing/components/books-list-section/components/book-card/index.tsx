import { Eye, Trash } from 'phosphor-react'

import { Button, Card, CardContent, CardHeader } from '@/components'

import type { Book } from '../../types'
import * as S from './styles'

interface BookCardProps {
  book: Book
  onDeleteBook?: (bookId: string) => Promise<void>
}

export const BookCard = ({ book, onDeleteBook }: BookCardProps) => {
  const handleDeleteClick = async () => {
    if (onDeleteBook) {
      await onDeleteBook(book.id)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <Card data-testid="book-card">
      <CardHeader>
        <S.BookCardHeader>
          <S.BookMainInfo>
            <S.BookTitle>{book.title}</S.BookTitle>
            <S.BookAuthor>por {book.author}</S.BookAuthor>
            <S.BookISBN>ISBN: {book.isbn}</S.BookISBN>
          </S.BookMainInfo>
          <S.StatusBadge status={book.status}>{book.status}</S.StatusBadge>
        </S.BookCardHeader>
      </CardHeader>
      <CardContent>
        <S.BookContent>
          <S.BookDetails>
            <S.DetailRow>
              <S.DetailLabel>Editora:</S.DetailLabel>
              <S.DetailValue>{book.publisher}</S.DetailValue>
            </S.DetailRow>
            <S.DetailRow>
              <S.DetailLabel>Estoque:</S.DetailLabel>
              <S.DetailValue>{book.stock} unidades</S.DetailValue>
            </S.DetailRow>
            <S.DetailRow>
              <S.DetailLabel>Preço:</S.DetailLabel>
              <S.Price>{formatPrice(book.price)}</S.Price>
            </S.DetailRow>
          </S.BookDetails>

          <S.ActionButtons>
            <Button
              variant="outline"
              size="sm"
              startIcon={<Eye size={16} />}
              fullWidth
            >
              Visualizar
            </Button>
            {onDeleteBook && (
              <Button
                variant="danger"
                size="sm"
                startIcon={<Trash size={16} />}
                onClick={handleDeleteClick}
                fullWidth
              >
                Excluir
              </Button>
            )}
          </S.ActionButtons>
        </S.BookContent>
      </CardContent>
    </Card>
  )
}
