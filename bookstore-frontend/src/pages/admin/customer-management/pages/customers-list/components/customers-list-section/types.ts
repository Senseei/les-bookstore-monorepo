export interface Customer {
  id: string
  name: string
  customerId: string
  email: string
  status: 'Ativo' | 'Inativo' | 'Suspenso'
  ranking: number
  // phoneAreaCode: string
  phoneNumber: string
  address: string
  lastOrder: string
}
