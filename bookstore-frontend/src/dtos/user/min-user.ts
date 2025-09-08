import type { MinAddressDTO } from './min-address'

export interface MinUserDTO {
  id: string
  name: string
  email: string
  status: 'Ativo' | 'Inativo' | 'Suspenso'
  ranking: number
  // TODO refatorar pra incluir o DDD junto com o número
  // phoneAreaCode: string
  phoneNumber: string
  address: MinAddressDTO
  lastOrder: Date | null
}
