import { Button, Form, FormField, NavigationLink } from '@/components'
import { ROUTES } from '@/routes/constants'

import * as S from './styles'
import { useSignIn } from './use-sign-in'

export const SignIn = () => {
  const { form, handleSignIn, isLoading, error } = useSignIn()

  return (
    <S.SignInContainer>
      <S.SignInCard>
        <S.SignInHeader>
          <S.SignInTitle>Entrar</S.SignInTitle>
          <S.SignInSubtitle>Acesse sua conta para continuar</S.SignInSubtitle>
        </S.SignInHeader>

        <Form form={form} onSubmit={handleSignIn} noPadding>
          <FormField
            form={form}
            name="email"
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
          />

          <FormField
            form={form}
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            Entrar
          </Button>
        </Form>

        <S.SignInActions>
          <NavigationLink to="/forgot-password" variant="muted">
            Esqueceu sua senha?
          </NavigationLink>

          <S.SignUpPrompt>
            Não tem uma conta?{' '}
            <NavigationLink to={ROUTES.SIGNUP} variant="primary">
              Criar conta
            </NavigationLink>
          </S.SignUpPrompt>
        </S.SignInActions>
      </S.SignInCard>
    </S.SignInContainer>
  )
}
