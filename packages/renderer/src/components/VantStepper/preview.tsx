import { VantStepper as FormilyVantStepper } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const VantStepper: DnFC<VNode> = composeExport(FormilyVantStepper, {
  Behavior: createBehavior({
    name: 'VantStepper',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'VantStepper',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantStepper),
    },
    designerLocales: AllLocales.VantStepper,
  }),
  Resource: createResource({
    icon: '',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string | number',
          title: 'Stepper',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantStepper',
        },
      },
    ],
  }),
})
