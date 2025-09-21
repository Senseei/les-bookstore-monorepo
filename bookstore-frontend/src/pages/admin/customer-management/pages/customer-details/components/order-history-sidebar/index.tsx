import { Package, ShoppingBag } from 'phosphor-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components'

import * as S from './styles'

interface OrderHistorySidebarProps {
  customerId: string
}

// Mock order data - will be replaced with real API call later
const mockOrders = [
  {
    id: '001',
    orderNumber: '#12345',
    date: new Date('2024-12-10'),
    value: 89.9,
    status: 'Entregue',
    items: 2,
  },
  {
    id: '002',
    orderNumber: '#12344',
    date: new Date('2024-11-28'),
    value: 156.45,
    status: 'Entregue',
    items: 3,
  },
  {
    id: '003',
    orderNumber: '#12343',
    date: new Date('2024-11-15'),
    value: 75.3,
    status: 'Em Trânsito',
    items: 1,
  },
  {
    id: '004',
    orderNumber: '#12342',
    date: new Date('2024-10-22'),
    value: 234.6,
    status: 'Entregue',
    items: 4,
  },
  {
    id: '005',
    orderNumber: '#12341',
    date: new Date('2024-10-05'),
    value: 45.9,
    status: 'Cancelado',
    items: 1,
  },
]

export const OrderHistorySidebar = ({
  customerId: _customerId,
}: OrderHistorySidebarProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const totalOrderValue = mockOrders
    .filter((order) => order.status === 'Entregue')
    .reduce((sum, order) => sum + order.value, 0)

  const completedOrders = mockOrders.filter(
    (order) => order.status === 'Entregue',
  ).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Package size={24} />
          Histórico de Pedidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Order Statistics */}
        <S.StatsSection>
          <S.StatsGrid>
            <S.StatItem>
              <S.StatLabel>Total de Pedidos</S.StatLabel>
              <S.StatValue>{mockOrders.length}</S.StatValue>
            </S.StatItem>

            <S.StatItem>
              <S.StatLabel>Pedidos Concluídos</S.StatLabel>
              <S.StatValue>{completedOrders}</S.StatValue>
            </S.StatItem>

            <S.StatItem>
              <S.StatLabel>Valor Total Comprado</S.StatLabel>
              <S.StatValue>{formatCurrency(totalOrderValue)}</S.StatValue>
            </S.StatItem>
          </S.StatsGrid>
        </S.StatsSection>

        {/* Recent Orders */}
        <S.OrderHistoryContainer>
          <S.SectionTitle>Pedidos Recentes</S.SectionTitle>

          {mockOrders.length > 0 ? (
            mockOrders.slice(0, 5).map((order) => (
              <S.OrderCard key={order.id}>
                <S.OrderHeader>
                  <S.OrderNumber>{order.orderNumber}</S.OrderNumber>
                  <S.OrderDate>{formatDate(order.date)}</S.OrderDate>
                </S.OrderHeader>

                <S.OrderDetails>
                  <S.OrderValue>{formatCurrency(order.value)}</S.OrderValue>
                  <S.OrderStatus status={order.status}>
                    {order.status}
                  </S.OrderStatus>
                  <S.ItemCount>
                    {order.items} {order.items === 1 ? 'item' : 'itens'}
                  </S.ItemCount>
                </S.OrderDetails>
              </S.OrderCard>
            ))
          ) : (
            <S.EmptyOrders>
              <ShoppingBag size={48} />
              <p>Nenhum pedido encontrado</p>
            </S.EmptyOrders>
          )}
        </S.OrderHistoryContainer>
      </CardContent>
    </Card>
  )
}
