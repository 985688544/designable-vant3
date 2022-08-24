import { VantCheckbox as FormilyVantCheckbox } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const VantCheckbox: DnFC<VNode> = composeExport(FormilyVantCheckbox, {
  Behavior: createBehavior({
    name: 'VantCheckbox.Group',
    extends: ['Field'],
    selector: (node) => {
      return node.props?.['x-component'] === 'VantCheckbox.Group'
    },
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantCheckbox.Group),
    },
    designerLocales: AllLocales.VantCheckboxGroup,
  }),
  Resource: createResource({
    // icon: 'CheckboxGroupSource',
    // title: 'vant-Checkbox',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'array' || 'Array<string | number>',
          'x-decorator': 'FormItem',
          'x-component': 'VantCheckbox.Group',
          'x-component-props': {
            direction: 'horizontal',
          },
          enum: [
            { label: '单位一', name: 1 },
            { label: '单位二', name: 2 },
            { label: '单位三', name: 3, disabled: true },
            { label: '单位四', name: 4 },
          ],
        },
      },
    ],
  }),
})
