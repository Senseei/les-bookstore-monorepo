import { Button, Card } from '@/components'

import { AddressForm, Header, PersonalDataForm } from './components'
import * as S from './styles'
import { useSignUp } from './use-sign-up'

export const SignUp = () => {
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
  } = useSignUp()

  return (
    <S.Container>
      <S.ContentWrapper>
        <Header />

        <Card>
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

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Criar Conta
            </Button>
          </S.Form>
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
