import XyzForm from './components/Form.vue'
import type { App, Plugin } from 'vue'
import { provideWidgetRegistry } from './widgets/registry'
import type { XyzFormPluginOptions } from './types'

export type {
  BuiltinWidget,
  FieldChangePayload,
  FieldChoice,
  FieldChoiceInput,
  FieldChoices,
  FieldType,
  FormField,
  NormalizedFormField,
  SubmitContext,
  WidgetName,
  WidgetRegistry,
  XyzFormPluginOptions,
} from './types'

export {
  createInitialValue,
  createFieldChangePayload,
  createRules,
  inferRules,
  inferSpan,
  inferWidget,
  normalizeChoices,
  normalizeField,
  normalizeFields,
} from './schema'

export { builtinWidgets, resolveWidget } from './widgets/registry'

export { XyzForm }

export function install(app: App, options: XyzFormPluginOptions = {}) {
  app.component(XyzForm.name!, XyzForm)
  provideWidgetRegistry(app, options.widgets)
}

const plugin: Plugin<[options?: XyzFormPluginOptions]> = { install }
export default plugin
