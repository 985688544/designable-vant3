import { VantCascader as FormilyVantCascader } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const VantCascader: DnFC<VNode> = composeExport(FormilyVantCascader, {
  Behavior: createBehavior({
    name: 'VantCascader',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'VantCascader',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantCascader),
    },
    designerLocales: AllLocales.VantCascader,
  }),
  Resource: createResource({
    icon: 'VantCascader',
    title: 'VantCascader',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantCascader',
          'x-component-props': {
            cascaderProps: {
              options: [
                {
                  text: '浙江省',
                  value: '330000',
                  children: [{ text: '杭州市', value: '330100' }],
                },
                {
                  text: '江苏省',
                  value: '320000',
                  children: [{ text: '南京市', value: '320100' }],
                },
              ],
            },
            // 'controls-position': 'right',
          },
        },
      },
    ],
  }),
})
