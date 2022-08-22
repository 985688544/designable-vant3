import { VantSpace as FormilyVantSpace } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createVoidFieldSchema } from '../Field'
import { withContainer } from '../../common/Container'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const VantSpace: DnFC<VNode> = composeExport(
  withContainer(FormilyVantSpace),
  {
    Behavior: createBehavior({
      name: 'VantSpace',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'VantSpace',
      designerProps: {
        droppable: true,
        inlineChildrenLayout: true,
        propsSchema: createVoidFieldSchema(AllSchemas.VantSpace),
      },
      designerLocales: AllLocales.VantSpace,
    }),
    Resource: createResource({
      icon: 'SpaceSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'VantSpace',
          },
        },
      ],
    }),
  }
)
