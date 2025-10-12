import { useState } from 'react'

import { useToast } from '@/providers'
import { useCart } from '@/providers'

import { CartItem, CartSummary, EmptyCart } from './components'
import * as S from './styles'

export const Cart = () => {
  const { items, summary, updateQuantity, removeItem, checkout } = useCart()
  const { showSuccess, showError } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    try {
      const result = await checkout()

      if (result.success) {
        showSuccess(
          `Pedido realizado com sucesso! Número do pedido: ${result.orderId}`,
        )
        // The cart will be automatically cleared by the checkout function
      } else {
        showError(result.error || 'Erro ao finalizar pedido. Tente novamente.')
      }
    } catch {
      showError('Erro inesperado ao finalizar pedido. Tente novamente.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <S.CartContainer>
      <S.CartHeader>
        <S.CartTitle>Meu Carrinho</S.CartTitle>
        <S.CartItemCount>
          {summary.totalItems} item{summary.totalItems > 1 ? 's' : ''}
        </S.CartItemCount>
      </S.CartHeader>

      <S.CartContent>
        <S.CartItemsList>
          {items.map((item) => (
            <CartItem
              key={item.book.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </S.CartItemsList>

        <S.CartSidePanel>
          <CartSummary
            summary={summary}
            onCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />
        </S.CartSidePanel>
      </S.CartContent>
    </S.CartContainer>
  )
}
