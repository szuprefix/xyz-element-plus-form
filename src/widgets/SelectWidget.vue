<template>
  <el-select
    :model-value="modelValue"
    :multiple="field.multiple"
    :disabled="field.disabled"
    :placeholder="field.placeholder || `请选择${field.label}`"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="choice in field.choices"
      :key="String(choice.value)"
      :label="choice.label"
      :value="choice.value"
      :disabled="choice.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
defineEmits<{ 'update:modelValue': [value: unknown] }>()
</script>
