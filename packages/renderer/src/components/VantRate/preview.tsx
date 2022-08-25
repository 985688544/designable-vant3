import { VantRate as FormilyVantRate } from '@formily/element-plus'
import {
  composeExport,
  transformComponent,
} from '@formily/element-plus/src/__builtins__'
import { connect, mapProps, VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

const RateInner = connect(
  transformComponent(FormilyVantRate, {
    change: 'onUpdate:modelValue',
  }),
  mapProps({ value: 'modelValue' })
)

export const VantRate: DnFC<VNode> = composeExport(RateInner, {
  Behavior: createBehavior({
    name: 'VantRate',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'VantRate',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantRate),
    },
    designerLocales: AllLocales.VantRate,
  }),
  Resource: createResource({
    icon: 'RateSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: '评分器',
          'x-decorator': 'FormItem',
          'x-component': 'VantRate',
        },
      },
    ],
  }),
})
