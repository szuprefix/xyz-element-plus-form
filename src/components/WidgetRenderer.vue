<template>
  <span v-if="field.widget === 'readonly'" class="xyz-form-widget__readonly">
    <a v-if="isLink(modelValue)" :href="String(modelValue)" target="_blank" rel="noopener noreferrer">{{ modelValue }}</a>
    <template v-else>{{ modelValue }}</template>
  </span>

  <el-radio-group v-else-if="field.widget === 'radio'" :model-value="modelValue" :disabled="field.disabled" @update:model-value="update">
    <el-radio v-for="choice in field.choices" :key="String(choice.value)" :value="choice.value" :disabled="choice.disabled">{{ choice.label }}</el-radio>
  </el-radio-group>

  <el-select v-else-if="field.widget === 'select'" :model-value="modelValue" :multiple="field.multiple" :disabled="field.disabled" :placeholder="field.placeholder || `请选择${field.label}`" v-bind="field.widgetProps" @update:model-value="update">
    <el-option v-for="choice in field.choices" :key="String(choice.value)" :label="choice.label" :value="choice.value" :disabled="choice.disabled" />
  </el-select>

  <el-switch v-else-if="field.widget === 'switch'" :model-value="modelValue" :disabled="field.disabled" v-bind="field.widgetProps" @update:model-value="update" />
  <el-input-number v-else-if="field.widget === 'number'" :model-value="modelValue as number" :disabled="field.disabled" v-bind="field.widgetProps" @update:model-value="update" />

  <el-date-picker
    v-else-if="field.widget === 'date' || field.widget === 'datetime'"
    :model-value="modelValue"
    :type="field.widget === 'datetime' ? 'datetime' : 'date'"
    :value-format="field.widget === 'datetime' ? 'YYYY-MM-DDTHH:mm:ss' : 'YYYY-MM-DD'"
    :disabled="field.disabled"
    :placeholder="field.placeholder || field.label"
    v-bind="field.widgetProps"
    @update:model-value="update"
  />

  <el-time-picker v-else-if="field.widget === 'time'" :model-value="modelValue" :disabled="field.disabled" v-bind="field.widgetProps" @update:model-value="update" />

  <component
    :is="field.widget"
    v-else-if="typeof field.widget === 'object' || typeof field.widget === 'function'"
    :model-value="modelValue"
    :field="field"
    :context="context"
    v-bind="field.widgetProps"
    @update:model-value="update"
  />

  <el-input
    v-else
    :model-value="modelValue == null ? '' : String(modelValue)"
    :type="field.widget === 'textarea' ? 'textarea' : field.widget === 'password' ? 'password' : 'text'"
    :show-password="field.widget === 'password'"
    :disabled="field.disabled"
    :maxlength="field.maxLength ?? field.max_length"
    :placeholder="field.placeholder || `请输入${field.label}`"
    v-bind="field.widgetProps"
    @update:model-value="update"
  />
</template>

<script setup lang="ts">
import type { FieldChangePayload, NormalizedFormField } from '../types'

const props = defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [payload: FieldChangePayload]
}>()

function update(value: unknown) {
  emit('update:modelValue', value)
  const payload = { value, field: props.field, form: props.context }
  props.field.onChange?.(payload)
  props.field.onChanged?.(payload)
  emit('change', payload)
}

function isLink(value: unknown) {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}
</script>

<style scoped>
.xyz-form-widget__readonly { white-space: pre-wrap; overflow-wrap: anywhere; }
</style>
