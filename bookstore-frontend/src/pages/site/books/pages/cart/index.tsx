import { useToast } from '@/providers'
import { useCart } from '@/providers'

import { CartItem, CartSummary, EmptyCart } from './components'
import * as S from './styles'

export const Cart = () => {
  const { items, summary, updateQuantity, removeItem } = useCart()
  const { showSuccess } = useToast()

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    showSuccess(
      'Checkout iniciado - Redirecionando para a página de pagamento...',
    )
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
          <CartSummary summary={summary} onCheckout={handleCheckout} />
        </S.CartSidePanel>
      </S.CartContent>
    </S.CartContainer>
  )
}
