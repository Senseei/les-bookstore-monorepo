import { Calendar, Package } from 'phosphor-react'

import { Badge, Card } from '@/components'
import type { OrderDTO } from '@/dtos'

import * as S from './styles'

interface OrderCardProps {
  order: OrderDTO
  formatCurrency: (value: number) => string
  formatDate: (date: Date) => string
}

const getStatusBadge = (status: OrderDTO['status']) => {
  const statusMap = {
    pending: { variant: 'warning' as const, label: 'Pendente' },
    confirmed: { variant: 'secondary' as const, label: 'Confirmado' },
    shipped: { variant: 'secondary' as const, label: 'Enviado' },
    delivered: { variant: 'success' as const, label: 'Entregue' },
    cancelled: { variant: 'danger' as const, label: 'Cancelado' },
  }

  return (
    statusMap[status] || { variant: 'default' as const, label: 'Desconhecido' }
  )
}

export const OrderCard = ({
  order,
  formatCurrency,
  formatDate,
}: OrderCardProps) => {
  const statusInfo = getStatusBadge(order.status)

  return (
    <Card>
      <S.OrderHeader>
        <S.OrderInfo>
          <S.OrderDate>
            <Calendar size={16} />
            {formatDate(order.orderDate)}
          </S.OrderDate>
          <S.OrderTotal>{formatCurrency(order.totalPrice)}</S.OrderTotal>
        </S.OrderInfo>
        <Badge variant={statusInfo.variant} size="sm">
          {statusInfo.label}
        </Badge>
      </S.OrderHeader>

      <S.OrderContent>
        <S.OrderSummary>
          <S.SummaryItem>
            <Package size={16} />
            <span>
              {order.totalItems} {order.totalItems === 1 ? 'item' : 'itens'}
            </span>
          </S.SummaryItem>
        </S.OrderSummary>

        <S.OrderItems>
          {order.items.slice(0, 3).map((item, index) => (
            <S.OrderItem key={`${item.book.id}-${index}`}>
              <S.BookInfo>
                <S.BookTitle>{item.book.title}</S.BookTitle>
                <S.BookAuthor>por {item.book.author}</S.BookAuthor>
              </S.BookInfo>
              <S.ItemDetails>
                <S.ItemQuantity>Qtd: {item.quantity}</S.ItemQuantity>
                <S.ItemPrice>{formatCurrency(item.totalPrice)}</S.ItemPrice>
              </S.ItemDetails>
            </S.OrderItem>
          ))}

          {order.items.length > 3 && (
            <S.MoreItems>
              +{order.items.length - 3}{' '}
              {order.items.length - 3 === 1 ? 'item' : 'itens'}
            </S.MoreItems>
          )}
        </S.OrderItems>
      </S.OrderContent>
    </Card>
  )
}
