import { Calendar, Package } from 'phosphor-react'

import { Badge } from '@/components'
import type { OrderDTO } from '@/dtos'

import * as S from './styles'

interface OrderCardProps {
  order: OrderDTO
  formatCurrency: (value: number) => string
  formatDate: (date: Date | string) => string
}

export const OrderCard = ({
  order,
  formatCurrency,
  formatDate,
}: OrderCardProps) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', variant: 'warning' as const }
      case 'confirmed':
        return { label: 'Confirmado', variant: 'default' as const }
      case 'shipped':
        return { label: 'Enviado', variant: 'secondary' as const }
      case 'delivered':
        return { label: 'Entregue', variant: 'success' as const }
      case 'cancelled':
        return { label: 'Cancelado', variant: 'danger' as const }
      default:
        return { label: status, variant: 'default' as const }
    }
  }

  const statusInfo = getStatusInfo(order.status)

  return (
    <S.OrderCard>
      <S.OrderHeader>
        <S.OrderBasicInfo>
          <S.OrderId>#{order.id}</S.OrderId>
          <S.OrderDate>
            <Calendar size={16} />
            {formatDate(order.orderDate)}
          </S.OrderDate>
        </S.OrderBasicInfo>
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
          <S.OrderTotal>
            {formatCurrency(order.subtotal - order.discount || order.subtotal)}
          </S.OrderTotal>
        </S.OrderSummary>

        <S.OrderItems>
          <S.ItemsTitle>Itens do Pedido:</S.ItemsTitle>
          {order.items.slice(0, 3).map((item, index) => (
            <S.OrderItem key={`${item.book.id}-${index}`}>
              <S.ItemInfo>
                <S.BookTitle>{item.book.title}</S.BookTitle>
                <S.BookAuthor>por {item.book.author}</S.BookAuthor>
              </S.ItemInfo>
              <S.ItemDetails>
                <S.ItemQuantity>Qtd: {item.quantity}</S.ItemQuantity>
                <S.ItemPrice>
                  {formatCurrency(item.unitPrice * item.quantity)}
                </S.ItemPrice>
              </S.ItemDetails>
            </S.OrderItem>
          ))}
          {order.items.length > 3 && (
            <S.MoreItems>+{order.items.length - 3} itens a mais</S.MoreItems>
          )}
        </S.OrderItems>

        {order.discount > 0 && (
          <S.OrderDiscount>
            <S.DiscountLabel>Desconto aplicado:</S.DiscountLabel>
            <S.DiscountValue>-{formatCurrency(order.discount)}</S.DiscountValue>
          </S.OrderDiscount>
        )}
      </S.OrderContent>
    </S.OrderCard>
  )
}
