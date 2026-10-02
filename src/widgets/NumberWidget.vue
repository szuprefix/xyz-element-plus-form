<template>
  <el-input-number
    :model-value="modelValue as number"
    :disabled="field.disabled"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
defineEmits<{ 'update:modelValue': [value: unknown] }>()
</script>
