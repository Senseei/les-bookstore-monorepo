import { Alert, Button, Card, Form, FormField, FormSection } from '@/components'
import { genderOptions, residenceTypeOptions } from '@/utils/constants'

import { Header } from './components'
import * as S from './styles'
import { useSignUp } from './use-sign-up'

export const SignUp = () => {
  const { form, onSubmit, isLoading, error } = useSignUp()

  return (
    <S.Container>
      <S.ContentWrapper>
        <Header />

        <Card>
          {/* Global error display */}
          {error && (
            <S.GlobalErrorAlert>
              <Alert variant="error">{error}</Alert>
            </S.GlobalErrorAlert>
          )}

          <Form form={form} onSubmit={onSubmit}>
            {/* Personal Data Section */}
            <FormSection title="Dados Pessoais">
              <FormField
                form={form}
                name="name"
                type="text"
                label="Nome Completo"
                placeholder="Seu nome completo"
              />

              <FormField
                form={form}
                name="cpf"
                type="cpf"
                label="CPF"
                placeholder="000.000.000-00"
              />

              <FormField
                form={form}
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
              />

              <FormField
                form={form}
                name="phone"
                type="phone"
                label="Telefone"
                placeholder="(11) 99999-9999"
              />

              <FormField
                form={form}
                name="gender"
                type="select"
                label="Gênero"
                placeholder="Selecione"
                options={genderOptions}
              />

              <FormField
                form={form}
                name="birthDate"
                type="date"
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
              />

              <FormField
                form={form}
                name="password"
                type="password"
                label="Senha"
              />

              <FormField
                form={form}
                name="confirmPassword"
                type="password"
                label="Confirmar Senha"
              />
            </FormSection>

            {/* Address Section */}
            <FormSection title="Endereço">
              <FormField
                form={form}
                name="address.zipCode"
                type="zipCode"
                label="CEP"
                placeholder="00000-000"
              />

              <FormField
                form={form}
                name="address.street"
                type="text"
                label="Rua"
                placeholder="Nome da rua"
              />

              <FormField
                form={form}
                name="address.number"
                type="text"
                label="Número"
                placeholder="123"
              />

              <FormField
                form={form}
                name="address.complement"
                type="text"
                label="Complemento"
                placeholder="Apartamento, bloco, etc."
              />

              <FormField
                form={form}
                name="address.neighborhood"
                type="text"
                label="Bairro"
                placeholder="Nome do bairro"
              />

              <FormField
                form={form}
                name="address.city"
                type="text"
                label="Cidade"
                placeholder="São Paulo"
              />

              <FormField
                form={form}
                name="address.state"
                type="text"
                label="Estado"
                placeholder="SP"
              />

              <FormField
                form={form}
                name="address.residenceType"
                type="select"
                label="Tipo de Residência"
                placeholder="Selecione"
                options={residenceTypeOptions}
              />

              <FormField
                form={form}
                name="address.identifier"
                type="text"
                label="Identificador do Endereço"
                placeholder="Casa, Trabalho, etc."
              />
            </FormSection>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </Form>
        </Card>

        <S.LoginLink>
          <S.LoginText>
            Já tem uma conta? {/* TODO <Link to="/login">Fazer login</Link> */}
            <S.LoginAnchor href="/login">Fazer login</S.LoginAnchor>
          </S.LoginText>
        </S.LoginLink>
      </S.ContentWrapper>
    </S.Container>
  )
}
