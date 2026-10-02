<template>
  <span class="xyz-form-widget__readonly">
    <a v-if="isLink(modelValue)" :href="String(modelValue)" target="_blank" rel="noopener noreferrer">{{ modelValue }}</a>
    <template v-else>{{ modelValue }}</template>
  </span>
</template>

<script setup lang="ts">
import type { NormalizedFormField } from '../types'

defineProps<{ modelValue?: unknown; field: NormalizedFormField; context: Record<string, unknown> }>()

function isLink(value: unknown) {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}
</script>

<style scoped>
.xyz-form-widget__readonly { white-space: pre-wrap; overflow-wrap: anywhere; }
</style>
