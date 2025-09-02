import React, { useState } from 'react'

import { Button, Card } from '@/components'

import { AddressForm, Header, PersonalDataForm } from './components'
import * as S from './styles'
import type { FormErrors, SignUpFormData } from './types'

export const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
    phone: '',
    // Address
    addressIdentifier: 'Casa Principal',
    residenceType: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    observations: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Basic validation - you can implement more complex validation here
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório'
    if (!formData.password.trim()) newErrors.password = 'Senha é obrigatória'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }
    if (!formData.gender) newErrors.gender = 'Gênero é obrigatório'
    if (!formData.birthDate)
      newErrors.birthDate = 'Data de nascimento é obrigatória'
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'

    // Address validation
    if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório'
    if (!formData.street.trim()) newErrors.street = 'Logradouro é obrigatório'
    if (!formData.number.trim()) newErrors.number = 'Número é obrigatório'
    if (!formData.neighborhood.trim())
      newErrors.neighborhood = 'Bairro é obrigatório'
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória'
    if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório'
    if (!formData.residenceType)
      newErrors.residenceType = 'Tipo de residência é obrigatório'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => window.setTimeout(resolve, 2000))

      // Here you would call your actual registration API
      // eslint-disable-next-line no-console
      console.log('Registration data:', formData)

      // On success, redirect to login or dashboard
      // navigate('/login')
    } catch {
      setSubmitError('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <Header />

        <Card>
          <S.Form onSubmit={handleSubmit}>
            {submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}

            <PersonalDataForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <AddressForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
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
