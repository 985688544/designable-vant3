import { ISchema } from '@formily/vue'



export const CardQuery: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': { size: 'small', clearable: true },
    },
    shadow: {
      type: 'string',
      enum: ['always', 'hover', 'never'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {}
    },
    speed: {
        type: 'string',
        default: 10,
        'x-decorator': 'FormItem',
        'x-component': 'InputNumber',
        'x-component-props': { size: 'small', clearable: true },  
    },
    properties: {

    }
  },
}
