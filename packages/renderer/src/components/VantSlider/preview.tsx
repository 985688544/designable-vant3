import { Slider as FormilyVantSlider } from '@formily/element-plus'
import { composeExport, transformComponent } from '@formily/element-plus/src/__builtins__'
import { connect, mapProps, mapReadPretty, VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { PreviewText } from '@formily/element-plus'

const TransformSlider = transformComponent(FormilyVantSlider, {
  change: 'update:modelValue',
})

const InnerSlider = connect(
  TransformSlider,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input)
)

export const VantSlider = composeExport(
  InnerSlider,
  {
    Behavior: createBehavior({
      name: 'VantSlider',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'VantSlider',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.VantSlider),
      },
      designerLocales: AllLocales.VantSlider,
    }),
    Resource: createResource({
      icon: 'SliderSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'number',
            title: 'Slider',
            'x-decorator': 'FormItem',
            'x-component': 'VantSlider',
          },
        },
      ],
    }),
  }
)
