import type { BuiltinWidget, FieldChangePayload, FieldChoice, FieldChoiceInput, FormField, NormalizedFormField } from './types'

function isChoiceTuple(choice: FieldChoiceInput): choice is readonly [unknown, string] {
  return Array.isArray(choice)
}

export function normalizeChoices(choices: FormField['choices'] = []): FieldChoice[] {
  if (!Array.isArray(choices)) {
    return Object.entries(choices).map(([value, label]) => ({ value, label }))
  }
  return choices.map((choice) => {
    if (typeof choice === 'string') return { value: choice, label: choice }
    if (isChoiceTuple(choice)) return { value: choice[0], label: choice[1] }
    return { ...choice, label: choice.label ?? String(choice.value ?? '') } as FieldChoice
  })
}

export function inferWidget(field: FormField): BuiltinWidget {
  const choiceCount = normalizeChoices(field.choices).length
  if (field.readonly || field.read_only) return 'readonly'
  if (field.hidden) return 'hidden'
  if (field.multiple && choiceCount) return 'select'
  if (choiceCount) {
    return choiceCount <= 4 ? 'radio' : 'select'
  }
  if (field.type === 'boolean') return 'switch'
  if (['integer', 'number', 'decimal'].includes(field.type ?? '')) return 'number'
  if (['date', 'datetime', 'time'].includes(field.type ?? '')) return field.type as 'date' | 'datetime' | 'time'
  if (field.format === 'password') return 'password'
  if (field.format === 'textarea' || (field.maxLength ?? field.max_length ?? 0) > 200) return 'textarea'
  return 'text'
}

export function inferSpan(field: Pick<NormalizedFormField, 'widget' | 'colSpan'>) {
  if (field.colSpan) {
    const span = Math.max(1, Math.min(3, field.colSpan)) * 8
    return { xs: 24, sm: 24, md: Math.min(24, span * 2), lg: span, xl: span }
  }
  if (field.widget === 'textarea') return { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
  return { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 }
}

export function inferRules(field: FormField) {
  const rules: Record<string, unknown>[] = []
  const type = field.multiple ? 'array' : ['integer', 'number', 'decimal'].includes(field.type ?? '') ? 'number' : undefined
  if (field.required) rules.push({ required: true, ...(type ? { type } : {}), message: `${field.label ?? field.name}不能为空` })
  const min = field.minLength ?? field.min_length
  const max = field.maxLength ?? field.max_length
  if (min != null) rules.push({ min, message: `长度最小为${min}` })
  if (max != null) rules.push({ max, message: `长度最大为${max}` })
  return rules
}

export function normalizeField(field: FormField): NormalizedFormField {
  const base = {
    ...field,
    label: field.label || field.name,
    readonly: Boolean(field.readonly ?? field.read_only),
    help: field.help ?? field.help_text,
    choices: normalizeChoices(field.choices),
    widget: field.widget || inferWidget(field),
    rules: field.rules ? [...field.rules] : inferRules(field),
  } as NormalizedFormField
  const explicitSpan = typeof field.span === 'number'
    ? { xs: field.span, sm: field.span, md: field.span, lg: field.span, xl: field.span }
    : field.span
  return { ...base, span: { ...inferSpan(base), ...explicitSpan } }
}

export const normalizeFields = (fields: FormField[] = []) => fields.map(normalizeField)
export const createRules = (fields: NormalizedFormField[]) => Object.fromEntries(fields.map((field) => [field.name, field.rules]))
export function createInitialValue(fields: NormalizedFormField[], value: Record<string, unknown> = {}) {
  const defaults = Object.fromEntries(fields.filter((field) => field.defaultValue !== undefined).map((field) => [field.name, field.defaultValue]))
  return { ...defaults, ...value }
}

export function createFieldChangePayload(
  value: unknown,
  field: NormalizedFormField,
  form: Record<string, unknown>,
): FieldChangePayload {
  return { value, field, form: { ...form, [field.name]: value } }
}
