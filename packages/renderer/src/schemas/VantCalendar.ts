import { ISchema } from '@formily/vue'

export const VantCalendar: ISchema = {
    type: 'object',
    properties: {
        label: {
            type: 'string',
            default: '日历',
            'x-decorator': 'VantFormItem',
            'x-component': 'Input',
          },
    }
}