import React from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller, get } from 'react-hook-form'

import { Input, Select } from '@/components'
import type { SelectOption } from '@/components/Select'

import { getFieldMask } from './utils'

type InputChangeEvent = React.ChangeEvent<{ value: string }>

interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

interface InputFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'cpf' | 'phone' | 'date' | 'zipCode'
  options?: never
}

interface SelectFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type: 'select'
  options: SelectOption[]
}

type FormFieldProps<T extends FieldValues> =
  | InputFormFieldProps<T>
  | SelectFormFieldProps<T>

export const FormField = <T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  className,
  disabled = false,
  options,
}: FormFieldProps<T>) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = form

  // Use get function to properly access nested field errors
  const error = get(errors, name)
  const errorMessage =
    error?.message || (typeof error === 'string' ? error : undefined)

  // For masked inputs, create a special register function
  const createMaskedRegister = (maskFunction: (value: string) => string) => ({
    ...register(name),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = maskFunction(e.target.value)
      setValue(name, maskedValue as T[Path<T>], { shouldValidate: true })
    },
  })

  // Handle different field types
  if (type === 'select' && options) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={label}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={errorMessage}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
          />
        )}
      />
    )
  }

  // Get mask for the field type
  const mask = getFieldMask(type)

  return (
    <Input
      label={label}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      error={!!error}
      errorMessage={errorMessage}
      type={
        type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'
      }
      {...(mask ? createMaskedRegister(mask) : register(name))}
    />
  )
}
