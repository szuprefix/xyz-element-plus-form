<template>
  <el-form-item v-if="field.widget !== 'hidden'" :prop="field.name" :error="error" :style="noLabel ? undefined : { minWidth: '280px' }">
    <template v-if="!noLabel" #label>
      <span>{{ field.label }}</span>
      <el-tooltip v-if="field.help" placement="top" :content="field.help">
        <span class="xyz-form-item__help" aria-label="帮助">?</span>
      </el-tooltip>
    </template>
    <Widget
      :model-value="modelValue"
      :field="field"
      :context="context"
      @update:model-value="$emit('update:modelValue', $event)"
      @change="$emit('change', $event)"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import Widget from './WidgetRenderer.vue'
import type { FieldChangePayload, NormalizedFormField } from '../types'

withDefaults(defineProps<{
  modelValue?: unknown
  field: NormalizedFormField
  context: Record<string, unknown>
  error?: string
  noLabel?: boolean
}>(), { modelValue: undefined, error: undefined, noLabel: false })

defineEmits<{
  'update:modelValue': [value: unknown]
  change: [payload: FieldChangePayload]
}>()
</script>

<style scoped>
.xyz-form-item__help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-left: 0.35rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 0.75rem;
  cursor: help;
  opacity: 0.65;
}
</style>
