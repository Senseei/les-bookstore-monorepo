export interface Tab {
  id: string
  label: string
}

export const ADMIN_TABS: Tab[] = [
  { id: 'customers', label: 'Clientes' },
  { id: 'books', label: 'Livros' },
]
