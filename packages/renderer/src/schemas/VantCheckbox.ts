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
    label: {
      type: 'string',
      default: '复选框组',
      'x-decorator': 'VantFormItem',
      'x-component': 'Input',
    },
    direction: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
      'x-decorator': 'VantFormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        direction: 'horizontal',
      },
    },
    // size: {
    //   default: 'default',
    //   type: 'string',
    //   enum: ['large', 'default', 'small', null],
    //   'x-decorator': 'VantFormItem',
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
