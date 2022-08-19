import { VantFormLayout as FormilyVantFormLayout } from '@formily/element-plus'
import { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { withContainer } from '../../common/Container'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@formily/element-plus/src/__builtins__'

export const VantFormLayout = composeExport(
  withContainer(FormilyVantFormLayout),
  {
    Behavior: createBehavior({
      name: 'VantFormLayout',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'VantFormLayout',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.VantFormLayout),
      },
      designerLocales: AllLocales.VantFormLayout,
    }),
    Resource: createResource({
      icon: 'FormLayoutSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'VantFormLayout',
          },
        },
      ],
    }),
  }
)
