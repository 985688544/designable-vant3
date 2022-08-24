import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VantCalendar as FormilyVantCalendar } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const VantCalendar = composeExport(FormilyVantCalendar, {
  Behavior: createBehavior({
    name: 'VantCalendar',
    extends: ['Field'], // 匹配
    selector: (node) => {
      // console.log('寻找符合标签配置')
      return node.props?.['x-component'] === 'VantCalendar'
    },
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.VantCalendar),
    },
    designerLocales: AllLocales.VantCalendar,
  }),
  Resource: createResource({
    // title: 'vant-calendar',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantCalendar',
          'x-component-props': {
            label: '日历',
          },
        },
      },
    ],
  }),
})
