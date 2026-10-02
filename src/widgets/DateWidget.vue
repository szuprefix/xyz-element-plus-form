<template>
  <el-date-picker
    :model-value="modelValue"
    :type="field.widget === 'datetime' ? 'datetime' : 'date'"
    :value-format="field.widget === 'datetime' ? 'YYYY-MM-DDTHH:mm:ss' : 'YYYY-MM-DD'"
    :disabled="field.disabled"
    :placeholder="field.placeholder || field.label"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
defineEmits<{ 'update:modelValue': [value: unknown] }>()
</script>
