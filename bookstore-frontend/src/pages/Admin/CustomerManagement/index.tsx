import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components'

import { CustomerHeader } from './components'
import { CustomerContainer } from './styles'

export const CustomerManagement = () => {
  const handleAddCustomer = () => {
    // TODO: Navigate to new customer form or open modal
  }

  return (
    <CustomerContainer>
      <CustomerHeader onAddCustomer={handleAddCustomer} />

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>Manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Add customer list/table here */}
          <p>Customer list will be implemented here</p>
        </CardContent>
      </Card>
    </CustomerContainer>
  )
}
