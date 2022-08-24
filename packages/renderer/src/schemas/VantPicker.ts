import { ISchema } from '@formily/vue'

export const VantPicker: ISchema = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
      'x-decorator': 'VantFormItem',
      'x-component': 'Input',
      default: '选择器',
      'x-component-props': {
        label: '',
      },
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
