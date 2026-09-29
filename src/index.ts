import XyzForm from './components/Form.vue'
import type { App, Plugin } from 'vue'

export type {
  BuiltinWidget,
  FieldChangePayload,
  FieldChoice,
  FieldType,
  FormField,
  NormalizedFormField,
  SubmitContext,
} from './types'

export {
  createInitialValue,
  createRules,
  inferRules,
  inferSpan,
  inferWidget,
  normalizeChoices,
  normalizeField,
  normalizeFields,
} from './schema'

export { XyzForm }

export function install(app: App) {
  app.component(XyzForm.name!, XyzForm)
}

const plugin: Plugin = { install }
export default plugin
