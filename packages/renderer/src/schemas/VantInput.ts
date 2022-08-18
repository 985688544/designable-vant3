import { merge } from '@formily/shared'
import { ISchema } from '@formily/vue'

export const VantInput: ISchema & { TextArea?: ISchema } = {
  type: 'object',
  readOnly: true,
  properties: {
    label: {
        type: 'string',
        'x-decorator': 'VantFormItem',
        'x-component': 'Input',
        default: '标题',
        'x-component-props': {
        }
    },
    maxlength: {
      type: 'number',
      'x-decorator': 'VantFormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    'show-word-limit': {
      type: 'number',
      'x-decorator': 'VantFormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    placeholder: {
      type: 'string',
      default: '请输入',
      'x-decorator': 'VantFormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
      },
    },
    // formatter: {
    //     type: 'string',
    //     'x-decorator': 'FormItem',
    //     'x-component': 'Input',
    //     'x-component-props': {
    //       clearable: true,
    //     },
    // },
    'is-link': {
        type: 'boolean',
        // default: true,
        'x-decorator': 'VantFormItem',
        'x-component': 'Switch'
    },
    clearable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    border: {
        type: 'boolean',
        default: true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    required: {
        type: 'boolean',
        default: true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
     },
    // autofocus: {
    //     type: 'boolean',
    //     'x-decorator': 'FormItem',
    //     'x-component': 'Switch',
    //   },
    size: {
      default: 'default',
      type: 'string',
      enum: ['large', 'default', 'large', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}

VantInput.TextArea = merge(VantInput, {
  properties: {
    rows: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    autoSize: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      'x-visible': false,
    },
  },
})
