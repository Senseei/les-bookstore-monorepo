import { Calendar, CreditCard, Package, X } from 'phosphor-react'
import { useState } from 'react'

import { Badge, Button, Card, ConfirmationModal } from '@/components'
import type { OrderDTO } from '@/dtos'

import * as S from './styles'

interface OrderCardProps {
  order: OrderDTO
  formatCurrency: (value: number) => string
  formatDate: (date: Date) => string
  onCancelOrder: (orderId: string) => Promise<{ success: boolean }>
  onPayOrder?: (orderId: string) => void
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
  onCancelOrder,
  onPayOrder,
}: OrderCardProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const statusInfo = getStatusBadge(order.status)

  // Only show cancel button for pending or confirmed orders
  const canCancel = order.status === 'pending'

  // Only show pay button for pending orders
  const canPay = order.status === 'pending'

  const handleCancelClick = () => {
    setIsConfirmModalOpen(true)
  }

  const handlePayClick = () => {
    onPayOrder?.(order.id)
  }

  const handleConfirmCancel = async () => {
    setIsCancelling(true)
    try {
      await onCancelOrder(order.id)
      setIsConfirmModalOpen(false)
    } catch {
      // Error handling is done in the parent component
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <>
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

        {(canCancel || canPay) && (
          <S.OrderFooter>
            {canPay && (
              <Button variant="primary" size="sm" onClick={handlePayClick}>
                <CreditCard size={14} />
                Pagar
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelClick}
                disabled={isCancelling}
              >
                <X size={14} />
                Cancelar Pedido
              </Button>
            )}
          </S.OrderFooter>
        )}
      </Card>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirmCancel}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Cancelar Pedido"
        message="Tem certeza de que deseja cancelar este pedido? Esta ação não pode ser desfeita."
        confirmText="Sim, cancelar pedido"
        cancelText="Não, manter pedido"
        variant="warning"
      />
    </>
  )
}
