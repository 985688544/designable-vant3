import { composeExport } from '@formily/element-plus/src/__builtins__/shared/utils'
import { createBehavior, createResource } from '@designable/core'
import { defineComponent } from 'vue-demi'
import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field/shared'
import { AllSchemas } from '../../schemas'

const Query = defineComponent({
  name: 'Query',
  setup() {
    return () => {
      return <div>查询区域</div>
    }
  },
})

export const CardQuery = composeExport(Query, {
  Behavior: createBehavior({
    name: 'MyCard',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'CardQuery',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(AllSchemas.CardQuery),
    },
    designerLocales: AllLocales.MyCard,
  }),
  Resource: createResource({
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'CardQuery',
          'x-component-props': {
            title: '自定义组件',
          },
        },
      },
    ],
  }),
})
