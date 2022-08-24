import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VantPicker as FormilyVantPicker } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { AllLocales } from '../../locales'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { DnFC } from '@formily/element-plus-prototypes'
import { defineComponent, VNode } from 'vue'
import { ISchema, useField, useFieldSchema } from '@formily/vue'

export const VantPicker: DnFC<VNode> = composeExport(FormilyVantPicker, {
  Behavior: createBehavior({
    name: 'VantPicker',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'VantPicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantPicker),
    },
    designerLocales: AllLocales.VantPicker,
  }),
  Resource: createResource({
    // icon: '',
    // title: 'Filed-Picker',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-index': 20,
          'x-decorator': 'FormItem',
          'x-component': 'VantPicker',
          title: '选择框',
          'x-component-props': {
            enum: ['事业一部', '事业二部', '事业三部'],
            pickerProps: {
              // formItemProps: {
              //   label: '选择器',
              // },
              columns: ['事业一部', '事业二部', '事业三部'],
            },
          },
        },
      },
    ],
  }),
})
