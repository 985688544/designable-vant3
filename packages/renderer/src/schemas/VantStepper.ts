import { ISchema } from '@formily/vue'

export const VantStepper: ISchema = {
  type: 'object',
  properties: {
    max: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    min: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    'step': {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    }
  }
}
