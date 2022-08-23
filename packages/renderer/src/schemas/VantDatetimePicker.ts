import { ISchema } from '@formily/vue'

export const VantDatetimePicker: ISchema = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
      default: '日历',
      'x-decorator': 'VantFormItem',
      'x-component': 'Input',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'VantFormItem',
      'x-component': 'Input',
      default: 'please input',
      'x-component-props': {
        clearable: true,
        placeholder: '请输入',
      },
    },
  },
}
