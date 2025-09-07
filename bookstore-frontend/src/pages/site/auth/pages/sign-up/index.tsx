import { Alert, Button, Card, ToastContainer } from '@/components'
import { useToast } from '@/hooks/use-toast'

import { AddressForm, Header, PersonalDataForm } from './components'
import * as S from './styles'
import { useSignUp } from './use-sign-up'

export const SignUp = () => {
  const { toasts, removeToast, showSuccess, showError } = useToast()

  const {
    register,
    handleSubmit,
    errors,
    registerCPF,
    registerPhone,
    registerZipCode,
    registerBirthDate,
    control,
    passwordValue,
    isLoading,
    error,
  } = useSignUp(showSuccess, showError)

  return (
    <ToastContainer toasts={toasts} onRemoveToast={removeToast}>
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

            <S.Form onSubmit={handleSubmit}>
              <PersonalDataForm
                register={register}
                errors={errors}
                registerCPF={registerCPF}
                registerPhone={registerPhone}
                registerBirthDate={registerBirthDate}
                control={control}
                passwordValue={passwordValue}
              />

              <AddressForm
                register={register}
                errors={errors}
                registerZipCode={registerZipCode}
                control={control}
              />

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
            </S.Form>
          </Card>

          <S.LoginLink>
            <S.LoginText>
              Já tem uma conta?{' '}
              {/* TODO <Link to="/login">Fazer login</Link> */}
              <S.LoginAnchor href="/login">Fazer login</S.LoginAnchor>
            </S.LoginText>
          </S.LoginLink>
        </S.ContentWrapper>
      </S.Container>
    </ToastContainer>
  )
}
