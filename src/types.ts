import type { Component } from 'vue'

export type FieldType = 'string' | 'text' | 'boolean' | 'integer' | 'number' | 'decimal' | 'date' | 'datetime' | 'time' | 'choice'
export type BuiltinWidget = 'text' | 'textarea' | 'password' | 'number' | 'switch' | 'radio' | 'select' | 'date' | 'datetime' | 'time' | 'readonly' | 'hidden'

export interface FieldChoice<T = unknown> { value: T; label: string; disabled?: boolean }

export interface FormField<T = unknown> {
  name: string
  label?: string
  type?: FieldType | string
  format?: string
  defaultValue?: T
  required?: boolean
  readonly?: boolean
  read_only?: boolean
  disabled?: boolean
  hidden?: boolean
  multiple?: boolean
  choices?: Array<FieldChoice | [unknown, string] | string>
  rules?: unknown[]
  widget?: BuiltinWidget | Component
  widgetProps?: Record<string, unknown>
  span?: number | Record<string, number>
  colSpan?: number
  minLength?: number
  min_length?: number
  maxLength?: number
  max_length?: number
  placeholder?: string
  help?: string
  help_text?: string
  onChange?: (payload: FieldChangePayload) => void
  onChanged?: (payload: FieldChangePayload) => void
}

export interface NormalizedFormField extends Omit<FormField, 'label' | 'widget' | 'choices' | 'rules' | 'span'> {
  label: string
  widget: BuiltinWidget | Component
  choices: FieldChoice[]
  rules: unknown[]
  span: Record<string, number>
  readonly: boolean
  help?: string
}

export interface FieldChangePayload { value: unknown; field: NormalizedFormField; form: Record<string, unknown> }
export interface SubmitContext {
  value: Record<string, unknown>
  setErrors: (errors: Record<string, string | string[]>) => void
  clearErrors: () => void
}
