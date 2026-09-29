import assert from 'node:assert/strict'
import { createInitialValue, createRules, inferWidget, normalizeFields, XyzForm } from '../dist/index.js'

assert.equal(inferWidget({ name: 'enabled', type: 'boolean' }), 'switch')
assert.equal(inferWidget({ name: 'status', choices: ['a', 'b'] }), 'radio')
assert.equal(inferWidget({ name: 'status', choices: ['a', 'b', 'c', 'd', 'e'] }), 'select')
assert.equal(inferWidget({ name: 'bio', maxLength: 500 }), 'textarea')

const fields = normalizeFields([
  { name: 'age', label: '年龄', type: 'integer', required: true, defaultValue: 18 },
  { name: 'bio', format: 'textarea' },
])
assert.equal(fields[0].widget, 'number')
assert.equal(fields[1].span.lg, 24)
assert.deepEqual(createInitialValue(fields, { age: 20 }), { age: 20 })
assert.equal(createRules(fields).age[0].required, true)
assert.equal(XyzForm.name, 'XyzForm')
console.log('Smoke tests passed')
