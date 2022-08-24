import { ISchema } from '@formily/vue'

export const VantCalendar: ISchema = {
  type: 'object',
  properties: {
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: 'please input',
      'x-component-props': {
        clearable: true,
        placeholder: '请输入',
      },
    },
  },
}
