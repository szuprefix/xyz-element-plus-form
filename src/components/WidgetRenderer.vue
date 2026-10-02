<template>
  <component
    :is="resolvedWidget"
    v-if="resolvedWidget"
    :model-value="modelValue"
    :field="field"
    :context="context"
    v-bind="field.widgetProps"
    @update:model-value="update"
  />
  <span v-else class="xyz-form-widget__unsupported" role="alert">不支持的控件：{{ String(field.widget) }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createFieldChangePayload } from '../schema'
import { resolveWidget } from '../widgets/registry'
import type { FieldChangePayload, NormalizedFormField, WidgetRegistry } from '../types'

const props = withDefaults(defineProps<{
  modelValue?: unknown
  field: NormalizedFormField
  context: Record<string, unknown>
  widgets?: WidgetRegistry
}>(), { modelValue: undefined, widgets: () => ({}) })
const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [payload: FieldChangePayload]
}>()

const resolvedWidget = computed(() => resolveWidget(props.field.widget, props.widgets))

function update(value: unknown) {
  emit('update:modelValue', value)
  const payload = createFieldChangePayload(value, props.field, props.context)
  props.field.onChange?.(payload)
  props.field.onChanged?.(payload)
  emit('change', payload)
}
</script>

<style scoped>
.xyz-form-widget__unsupported { color: var(--el-color-danger); }
</style>
