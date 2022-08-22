import { ISchema } from '@formily/vue'

export const VantRadio: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

VantRadio.Group = {
  type: 'object',
  properties: {
    optionType: {
      type: 'string',
      enum: ['default', 'button'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'default',
        optionType: 'button',
      },
    },
    buttonStyle: {
      type: 'string',
      enum: ['outline', 'solid'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'outline',
        optionType: 'button',
      },
    },
  },
}
