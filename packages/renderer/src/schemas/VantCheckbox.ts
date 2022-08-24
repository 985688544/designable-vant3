import { ISchema } from '@formily/vue'

export const VantCheckbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

VantCheckbox.Group = {
  type: 'object',
  properties: {
    direction: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        direction: 'horizontal',
      },
    },
    // size: {
    //   default: 'default',
    //   type: 'string',
    //   enum: ['large', 'default', 'small', null],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props': {
        
    //   },
    //   'x-reactions': (field) => {
    //     field.visible =
    //       field.form?.values?.['x-component-props']?.optionType === 'horizontal'
    //   },
    // },
  },
}
