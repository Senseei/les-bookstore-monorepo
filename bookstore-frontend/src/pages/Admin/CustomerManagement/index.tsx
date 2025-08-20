import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@/components'

import { CustomerHeader } from './components'
import * as S from './styles'

export const CustomerManagement = () => {
  const handleAddCustomer = () => {
    // TODO: Navigate to new customer form or open modal
  }

  return (
    <S.CustomerContainer>
      <CustomerHeader onAddCustomer={handleAddCustomer} />

      {/* Input Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Input Component Showcase</CardTitle>
          <CardDescription>
            Different variants of our Input component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <S.InputDemo>
            <div>
              <Input placeholder="Search customers..." label="Search" />
              <Input
                placeholder="Enter email"
                label="Email"
                type="email"
                startIcon="✉️"
              />
              <Input
                placeholder="Phone number"
                label="Phone"
                type="tel"
                startIcon="📞"
                helperText="Include country code"
              />
            </div>
          </S.InputDemo>
        </CardContent>
      </Card>

      {/* Customer Management Card */}
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
    </S.CustomerContainer>
  )
}
