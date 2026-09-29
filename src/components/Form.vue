<template>
  <el-form
    ref="formRef"
    v-loading="loading"
    :element-loading-text="loadingText"
    :model="formValue"
    :rules="rules"
    :label-width="noLabel ? '0px' : labelWidth"
    v-bind="$attrs"
  >
    <slot name="header" :value="formValue" />

    <el-alert v-if="errors.non_field_errors" :title="errors.non_field_errors" type="error" :closable="false" show-icon />

    <el-row :gutter="gutter">
      <template v-for="field in normalizedFields" :key="field.name">
        <el-col v-if="!field.hidden && field.widget !== 'hidden'" v-bind="oneColumn ? { span: 24 } : field.span">
          <slot :name="`field-${field.name}`" :field="field" :value="formValue[field.name]" :form="formValue">
            <FormItem
              :model-value="formValue[field.name]"
              :field="field"
              :context="formValue"
              :error="errors[field.name]"
              :no-label="noLabel"
              @update:model-value="updateField(field.name, $event)"
              @change="$emit('field-change', $event)"
            />
          </slot>
        </el-col>
      </template>
    </el-row>

    <slot name="footer" :value="formValue" :submit="submitForm">
      <el-form-item v-if="submitName">
        <el-button type="primary" :loading="loading" @click="submitForm">{{ submitName }}</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import FormItem from './FormItem.vue'
import { createInitialValue, createRules, normalizeFields } from '../schema'
import type { FieldChangePayload, FormField, SubmitContext } from '../types'

defineOptions({ name: 'XyzForm', inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: Record<string, unknown>
  /** @deprecated 请使用 modelValue / v-model。 */
  value?: Record<string, unknown>
  items?: FormField[]
  submit?: (context: SubmitContext) => unknown | Promise<unknown>
  submitName?: string
  successMessage?: string | false
  labelWidth?: string | number
  noLabel?: boolean
  oneColumn?: boolean
  gutter?: number
}>(), {
  modelValue: undefined,
  value: undefined,
  items: () => [],
  submit: undefined,
  submitName: '提交',
  successMessage: '提交成功',
  labelWidth: '120px',
  noLabel: false,
  oneColumn: false,
  gutter: 16,
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
  'update:value': [value: Record<string, unknown>]
  'before-submit': [value: Record<string, unknown>]
  beforesubmit: [value: Record<string, unknown>]
  submitted: [result: unknown]
  'form-posted': [result: unknown]
  'field-change': [payload: FieldChangePayload]
}>()

const formRef = ref()
const loading = ref(false)
const loadingText = ref('正在提交')
const errors = ref<Record<string, string>>({})
const normalizedFields = computed(() => normalizeFields(props.items))
const rules = computed(() => createRules(normalizedFields.value))
const formValue = ref<Record<string, unknown>>({})

watch(
  [() => props.modelValue, () => props.value, normalizedFields],
  ([modelValue, legacyValue]) => {
    formValue.value = createInitialValue(normalizedFields.value, modelValue ?? legacyValue ?? {})
  },
  { immediate: true },
)

function publish(value: Record<string, unknown>) {
  formValue.value = value
  emit('update:modelValue', value)
  emit('update:value', value)
}

function updateField(name: string, value: unknown) {
  publish({ ...formValue.value, [name]: value })
}

function setErrors(nextErrors: Record<string, string | string[]>) {
  errors.value = Object.fromEntries(
    Object.entries(nextErrors).map(([name, message]) => [name, Array.isArray(message) ? message.join('；') : message]),
  )
}

function clearErrors() {
  errors.value = {}
}

async function validate() {
  return formRef.value?.validate()
}

async function submitForm() {
  clearErrors()
  try {
    await validate()
  } catch {
    ElMessage.error('表单校验未通过，请按提示修改')
    return false
  }

  const snapshot = { ...formValue.value }
  emit('before-submit', snapshot)
  emit('beforesubmit', snapshot)
  if (!props.submit) return snapshot

  loading.value = true
  try {
    const result = await props.submit({ value: snapshot, setErrors, clearErrors })
    if (result === false) return false
    if (props.successMessage) ElMessage.success(props.successMessage)
    emit('submitted', result)
    emit('form-posted', result)
    return result
  } finally {
    loading.value = false
  }
}

function resetFields() {
  formRef.value?.resetFields()
  publish(createInitialValue(normalizedFields.value, props.modelValue ?? props.value ?? {}))
  clearErrors()
}

defineExpose({ validate, submit: submitForm, resetFields, clearValidate: () => formRef.value?.clearValidate(), setErrors, clearErrors })
</script>
