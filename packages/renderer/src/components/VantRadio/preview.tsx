import { VantRadio as FormilyVantRadio } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const VantRadio: DnFC<VNode> = composeExport(FormilyVantRadio, {
  Behavior: createBehavior({
    name: 'VantRadio.Group',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'VantRadio.Group',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantRadio.Group),
    },
    designerLocales: AllLocales.VantRadioGroup,
  }),
  Resource: createResource({
    icon: 'RadioGroupSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string | number',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantRadio.Group',
          enum: [
            { label: '单位一', name: 1 },
            { label: '单位二', name: 2 },
            { label: '单位三', name: 3, disabled: true },
          ],
        },
      },
    ],
  }),
})
