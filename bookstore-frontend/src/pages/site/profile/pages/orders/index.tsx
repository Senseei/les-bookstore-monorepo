import { ArrowClockwise, Package, Storefront } from 'phosphor-react'

import { Button } from '@/components'

import { OrderCard } from './components'
import * as S from './styles'
import { useOrders } from './use-orders'

export const Orders = () => {
  const {
    orders,
    totalOrders,
    orderStatistics,
    isLoading,
    error,
    handleRefreshOrders,
    formatCurrency,
    formatDate,
  } = useOrders()

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <div>Carregando seus pedidos...</div>
        </S.LoadingContainer>
      </S.Container>
    )
  }

  if (error) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <h3>Erro ao carregar pedidos</h3>
          <p>Não foi possível carregar seus pedidos. Tente novamente.</p>
          <Button onClick={handleRefreshOrders} variant="outline">
            <ArrowClockwise size={16} />
            Tentar novamente
          </Button>
        </S.ErrorContainer>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Meus Pedidos</S.Title>
        <Button onClick={handleRefreshOrders} variant="outline" size="sm">
          <ArrowClockwise size={16} />
          Atualizar
        </Button>
      </S.Header>

      {totalOrders > 0 && (
        <S.OrdersStats>
          <S.StatCard>
            <h3>{totalOrders}</h3>
            <p>Total de Pedidos</p>
          </S.StatCard>
          <S.StatCard>
            <h3>{formatCurrency(orderStatistics.totalSpent)}</h3>
            <p>Valor Total Gasto</p>
          </S.StatCard>
          <S.StatCard>
            <h3>{formatCurrency(orderStatistics.averageOrderValue)}</h3>
            <p>Valor Médio por Pedido</p>
          </S.StatCard>
          <S.StatCard>
            <h3>{orderStatistics.totalItems}</h3>
            <p>Total de Livros</p>
          </S.StatCard>
        </S.OrdersStats>
      )}

      {orders.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>
            <Package size={48} />
          </S.EmptyIcon>
          <S.EmptyTitle>Nenhum pedido encontrado</S.EmptyTitle>
          <S.EmptyDescription>
            Você ainda não fez nenhum pedido. Que tal começar explorando nossa
            coleção de livros?
          </S.EmptyDescription>
          <Button onClick={() => (window.location.href = '/books')}>
            <Storefront size={16} />
            Explorar Livros
          </Button>
        </S.EmptyState>
      ) : (
        <S.OrdersList>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ))}
        </S.OrdersList>
      )}
    </S.Container>
  )
}
