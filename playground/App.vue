<template>
  <main class="playground">
    <h1>@xyz-element-plus/form</h1>
    <p>根据字段类型自动选择控件、生成校验并完成响应式排版。</p>
    <XyzForm v-model="form" :items="fields" :submit="save" />
    <pre>{{ form }}</pre>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormField, SubmitContext } from '../src'

const form = ref<Record<string, unknown>>({ enabled: true, age: 18 })
const fields: FormField[] = [
  { name: 'name', label: '姓名', type: 'string', required: true },
  { name: 'age', label: '年龄', type: 'integer', required: true },
  { name: 'enabled', label: '启用', type: 'boolean' },
  { name: 'role', label: '角色', choices: {admin:'管理员', editor:'编辑', guest:'访客', man: 'man'} },
  { name: 'birthday', label: '生日', type: 'date' },
  { name: 'description', label: '说明', format: 'textarea', help: '长文本自动占满一行' },
]

async function save({ value }: SubmitContext) {
  console.info('submit', value)
  return value
}
</script>

<style scoped>
.playground { max-width: 1100px; margin: 40px auto; padding: 0 24px; font-family: system-ui, sans-serif; }
pre { padding: 16px; border-radius: 8px; background: #f5f7fa; overflow: auto; }
</style>
