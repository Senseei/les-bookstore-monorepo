import {
  AddressSelectionModal,
  CartItem,
  CartSummary,
  EmptyCart,
  TicketInput,
} from './components'
import * as S from './styles'
import { useCartPage } from './use-cart-page'

export const Cart = () => {
  const {
    items,
    summary,
    appliedTicket,
    isEmpty,
    currentUserWithAddresses,
    isCheckingOut,
    isValidatingTicket,
    showAddressModal,
    updateQuantity,
    removeItem,
    handleApplyTicket,
    handleCheckout,
    handleAddressSelected,
    setShowAddressModal,
  } = useCartPage()

  if (isEmpty) {
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
          <TicketInput
            onApplyTicket={handleApplyTicket}
            appliedTicket={
              appliedTicket
                ? {
                    code: appliedTicket.code,
                    discount: appliedTicket.discountAmount,
                  }
                : null
            }
            isLoading={isValidatingTicket}
          />
          <CartSummary
            summary={summary}
            onCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />
        </S.CartSidePanel>
      </S.CartContent>

      {currentUserWithAddresses && (
        <AddressSelectionModal
          isOpen={showAddressModal}
          addresses={currentUserWithAddresses.addresses}
          onConfirm={handleAddressSelected}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </S.CartContainer>
  )
}
