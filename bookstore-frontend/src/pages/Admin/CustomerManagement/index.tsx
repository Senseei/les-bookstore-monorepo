import { CustomerHeader } from './components'
import { CustomerContainer } from './styles'

export const CustomerManagement = () => {
  const handleAddCustomer = () => {
    // TODO: Navigate to new customer form or open modal
  }

  return (
    <CustomerContainer>
      <CustomerHeader onAddCustomer={handleAddCustomer} />
      {/* TODO: Add customer list/table here */}
    </CustomerContainer>
  )
}
