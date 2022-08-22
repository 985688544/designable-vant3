import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VantDatetimePicker as FormilyVantDateTimePicker } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { defineComponent } from 'vue'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

const PickerFile = defineComponent({
  name: 'VantDatetimePicker',
  setup(props, { slots, attrs }) {
    return () => {
      return (
        <FormilyVantDateTimePicker {...attrs} {...props}>
          {slots.default?.()}
        </FormilyVantDateTimePicker>
      )
    }
  },
})

export const VantDatetimePicker = composeExport(PickerFile, {
  Behvior: createBehavior({
    name: 'VantDatetimePicker',
    extends: ['Field'], // 匹配
    selector: (node) => {
      return node.props?.['x-component'] === 'VantDatetimePicker'
    },
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantDateTimePicker),
    },
    designerLocales: AllLocales.VantDateTimePicker,
  }),
  Resource: createResource({
    title: 'Vant-datetimePicker',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantDatetimePicker',
          'x-component-props': {
            // textContent: '上传',
          },
        },
      },
    ],
  }),
})
