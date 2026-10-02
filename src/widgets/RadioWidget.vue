<template>
  <el-radio-group
    :model-value="modelValue"
    :disabled="field.disabled"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-radio
      v-for="choice in field.choices"
      :key="String(choice.value)"
      :value="choice.value"
      :disabled="choice.disabled"
    >
      {{ choice.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()
defineEmits<{ 'update:modelValue': [value: unknown] }>()
</script>
