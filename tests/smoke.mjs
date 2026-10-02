import assert from 'node:assert/strict'
import { builtinWidgets, createFieldChangePayload, createInitialValue, createRules, inferWidget, normalizeFields, resolveWidget, XyzForm } from '../dist/index.js'

assert.equal(inferWidget({ name: 'enabled', type: 'boolean' }), 'switch')
assert.equal(inferWidget({ name: 'status', choices: ['a', 'b'] }), 'radio')
assert.equal(inferWidget({ name: 'role', choices: { admin: '管理员', editor: '编辑' } }), 'radio')
assert.equal(inferWidget({ name: 'status', choices: ['a', 'b', 'c', 'd', 'e'] }), 'select')
assert.equal(inferWidget({ name: 'bio', maxLength: 500 }), 'textarea')

const fields = normalizeFields([
  { name: 'age', label: '年龄', type: 'integer', required: true, defaultValue: 18 },
  { name: 'bio', format: 'textarea' },
])
assert.equal(fields[0].widget, 'number')
assert.equal(fields[1].span.lg, 24)
const mappedChoices = normalizeFields([{ name: 'role', choices: { admin: '管理员', editor: '编辑' } }])[0]
assert.deepEqual(mappedChoices.choices, [
  { value: 'admin', label: '管理员' },
  { value: 'editor', label: '编辑' },
])
assert.deepEqual(createInitialValue(fields, { age: 20 }), { age: 20 })
assert.equal(createRules(fields).age[0].required, true)
const change = createFieldChangePayload(21, fields[0], { age: 20, name: 'Ada' })
assert.deepEqual(change.form, { age: 21, name: 'Ada' })
assert.equal(change.value, 21)
const customWidget = { name: 'CustomWidget', render: () => null }
assert.equal(resolveWidget('text'), builtinWidgets.text)
assert.equal(resolveWidget('custom', { custom: customWidget }), customWidget)
assert.equal(resolveWidget('text', { text: customWidget }), customWidget)
assert.equal(resolveWidget('missing'), undefined)
assert.equal(XyzForm.name, 'XyzForm')
console.log('Smoke tests passed')
