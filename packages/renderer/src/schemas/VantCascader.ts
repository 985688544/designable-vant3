import { ISchema } from '@formily/vue'

export const VantCascader: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    label: {
        type: 'string',
        'x-decorator': 'VantFormItem',
        'x-component': 'Input',
        "x-component-props": {
            label: '级联选择器'
        }
      },
  },
}