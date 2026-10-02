<template>
  <el-input
    :model-value="modelValue == null ? '' : String(modelValue)"
    :type="field.widget === 'textarea' ? 'textarea' : field.widget === 'password' ? 'password' : 'text'"
    :show-password="field.widget === 'password'"
    :disabled="field.disabled"
    :maxlength="field.maxLength ?? field.max_length"
    :placeholder="field.placeholder || `请输入${field.label}`"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
defineEmits<{ 'update:modelValue': [value: unknown] }>()
</script>
