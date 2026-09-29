# @xyz-element-plus/form

基于 Vue 3 和 Element Plus 的 Schema 驱动智能表单。它根据字段类型自动选择控件、生成基础校验规则并完成响应式排版，同时允许显式配置覆盖全部约定。

## 安装

```bash
npm install @xyz-element-plus/form element-plus vue
```

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import XyzElementPlusForm from '@xyz-element-plus/form'
import 'element-plus/dist/index.css'
import '@xyz-element-plus/form/style.css'

createApp(App).use(ElementPlus).use(XyzElementPlusForm).mount('#app')
```

## 使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormField, SubmitContext } from '@xyz-element-plus/form'

const form = ref({ name: '', age: 18, enabled: true })
const fields: FormField[] = [
  { name: 'name', label: '姓名', type: 'string', required: true },
  { name: 'age', label: '年龄', type: 'integer' },
  { name: 'enabled', label: '启用', type: 'boolean' },
  { name: 'description', label: '说明', format: 'textarea' },
]

async function save({ value, setErrors }: SubmitContext) {
  // 在应用层调用 API；服务端字段错误可通过 setErrors 回填。
  console.log(value, setErrors)
}
</script>

<template>
  <XyzForm v-model="form" :items="fields" :submit="save" />
</template>
```

## 默认推断

| 字段特征 | 默认控件 |
| --- | --- |
| `boolean` | Switch |
| `integer` / `number` / `decimal` | Input Number |
| `date` / `datetime` / `time` | 对应日期或时间控件 |
| 少量 `choices` | Radio |
| 较多或多选 `choices` | Select |
| `format: 'textarea'` 或长文本 | Textarea |
| `readonly` / `read_only` | 只读显示 |

显式的 `widget`、`rules`、`span` 和 `widgetProps` 优先于默认推断。`#field-字段名` 插槽可以完全接管单个字段的渲染。

## 项目边界

本项目只负责 Schema、表单渲染、校验和布局，不负责 HTTP 请求、鉴权或特定后端错误协议。

## 本地开发

```bash
npm install
npm run dev
npm test
```
