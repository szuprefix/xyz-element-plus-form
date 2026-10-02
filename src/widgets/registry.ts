import type { App, Component, InjectionKey } from 'vue'
import DateWidget from './DateWidget.vue'
import NumberWidget from './NumberWidget.vue'
import RadioWidget from './RadioWidget.vue'
import ReadonlyWidget from './ReadonlyWidget.vue'
import SelectWidget from './SelectWidget.vue'
import SwitchWidget from './SwitchWidget.vue'
import TextWidget from './TextWidget.vue'
import TimeWidget from './TimeWidget.vue'
import type { WidgetRegistry } from '../types'

export const builtinWidgets: Readonly<WidgetRegistry> = Object.freeze({
  text: TextWidget,
  textarea: TextWidget,
  password: TextWidget,
  number: NumberWidget,
  switch: SwitchWidget,
  radio: RadioWidget,
  select: SelectWidget,
  date: DateWidget,
  datetime: DateWidget,
  time: TimeWidget,
  readonly: ReadonlyWidget,
})

export const widgetRegistryKey: InjectionKey<WidgetRegistry> = Symbol('xyz-form-widgets')

export function provideWidgetRegistry(app: App, widgets: WidgetRegistry = {}) {
  app.provide(widgetRegistryKey, widgets)
}

export function resolveWidget(widget: string | Component, registry: WidgetRegistry = {}): Component | undefined {
  if (typeof widget !== 'string') return widget
  return registry[widget] ?? builtinWidgets[widget]
}
