import {
  DnFC,
  useNodeIdProps,
  useTreeNode,
  VNode,
} from '@formily/element-plus-prototypes'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VantInput as FormilyVantInput } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { defineComponent } from 'vue'
import { ISchema } from '@formily/vue'
import { observable, observe } from '@formily/reactive'

// const Field = defineComponent({
//   name: 'VantInput',
//   setup(props: ISchema, { slots, attrs }) {
//     return () => {
//       return (
//         <FormilyVantInput class="vant-formily-input" {...attrs} {...props}>
//           {slots.default?.()}
//         </FormilyVantInput>
//       )
//     }
//   },
// })

export const VantInput: DnFC<VNode> = composeExport(FormilyVantInput, {
  Behavior: createBehavior({
    name: 'VantInput',
    extends: ['Field'], // 匹配
    selector: (node) => {
      // console.log(node.props?.['x-component'], '2334')
      return node.props?.['x-component'] === 'VantInput'
    },
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(AllSchemas.VantInput),
    },
    designerLocales: AllLocales.VantInput,
  }),
  Resource: createResource({
    // icon: 'InputSource',
    // title: 'vant-Field', // 覆盖表单左侧title
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-decorator': 'VantFormItem',
          'x-component': 'VantInput',
          'x-component-props': {
            // className: ['formily-in'],
          },
        },
      },
    ],
  }),
})
