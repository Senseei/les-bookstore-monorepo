import React from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Input, Select } from '@/components'
import type { SelectOption } from '@/components/Select'

import { getFieldMask, getFieldValidation } from './utils'

type InputChangeEvent = React.ChangeEvent<{ value: string }>

interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
  // Special prop for confirmPassword validation
  dependsOn?: Path<T>
}

interface InputFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'cpf'
    | 'phone'
    | 'date'
    | 'zipCode'
    | 'street'
    | 'neighborhood'
    | 'city'
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
  required = false,
  className,
  disabled = false,
  options,
  dependsOn,
}: FormFieldProps<T>) => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = form

  const error = errors[name]
  const errorMessage = error?.message as string | undefined

  // Get the value of the field this one depends on (for confirmPassword)
  const dependentValue = dependsOn ? watch(dependsOn) : undefined

  // Get validation rules based on field type and dependent value
  const validation = getFieldValidation(type, required, dependentValue)

  // For masked inputs, create a special register function
  const createMaskedRegister = (maskFunction: (value: string) => string) => ({
    ...register(name, validation),
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
        rules={validation}
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

  // For masked inputs
  const maskFunction = getFieldMask(type)
  if (maskFunction) {
    const maskedRegister = createMaskedRegister(maskFunction)
    return (
      <Input
        label={label}
        type={
          type === 'password' || type === 'confirmPassword'
            ? 'password'
            : type === 'email'
              ? 'email'
              : 'text'
        }
        {...maskedRegister}
        error={!!error}
        errorMessage={errorMessage}
        placeholder={placeholder}
        required={required}
        className={className}
        disabled={disabled}
      />
    )
  }

  // Regular input fields
  return (
    <Input
      label={label}
      type={
        type === 'password' || type === 'confirmPassword'
          ? 'password'
          : type === 'email'
            ? 'email'
            : 'text'
      }
      {...register(name, validation)}
      error={!!error}
      errorMessage={errorMessage}
      placeholder={placeholder}
      required={required}
      className={className}
      disabled={disabled}
    />
  )
}
