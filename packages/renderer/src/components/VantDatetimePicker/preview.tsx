import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VantDatetimePicker as FormilyVantDateTimePicker } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { defineComponent } from 'vue'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const VantDatetimePicker = composeExport(FormilyVantDateTimePicker, {
  Behavior: createBehavior({
    name: 'DnVantDatetimePicker',
    extends: ['Field'], // 匹配
    selector: (node) => {
      return node.props?.['x-component'] === 'VantDatetimePicker'
    },
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantDatetimePicker),
    },
    designerLocales: AllLocales.VantDateTimePicker,
  }),
  Resource: createResource({
    // title: 'datetimePicker',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: '时间选择器',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'VantDatetimePicker',
          'x-component-props': {},
        },
      },
    ],
  }),
})
