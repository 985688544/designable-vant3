import { createBehavior, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { VantForm as FormilyVantForm } from '@formily/element-plus'
import { usePrefix, DnFC, useStyle } from '@formily/element-plus-prototypes'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

import { computed, defineComponent, getCurrentInstance, unref } from 'vue-demi'
import { composeExport } from '@formily/element-plus/src/__builtins__'

const FormComponent = observer(
  defineComponent({
    name: 'DnVantForm',
    setup(props, { slots, attrs }) {
      const prefix = usePrefix('designable-form')
      const formRef = computed(() =>
        createForm({
          designable: true,
        })
      )
      return () => {
        const form = unref(formRef)

        return (
          <FormilyVantForm class={prefix.value} form={form} {...attrs}>
            {slots.default?.()}
          </FormilyVantForm>
        )
      }
    },
  })
)

export const VantForm: DnFC<Vue.Component<
  any,
  any,
  any,
  typeof FormilyVantForm
>> = composeExport(FormComponent, {
  Behavior: createBehavior({
    name: 'VantForm',
    selector: (node) => node.componentName === 'VantForm',
    designerProps(node) {
      return {
        draggable: !node.isRoot,
        cloneable: !node.isRoot,
        deletable: !node.isRoot,
        droppable: true,
        propsSchema: {
          type: 'object',
          properties: {
            ...(AllSchemas.VantFormLayout.properties as any),
            style: AllSchemas.CSSStyle,
          },
        },
        defaultProps: {
          // 带默认值的组件
          labelCol: 6,
          wrapperCol: 24,
          colon: false,
          feedbackLayout: 'loose',
          size: 'default',
          layout: 'horizontal',
          tooltipLayout: 'icon',
          labelAlign: 'right',
          wrapperAlign: 'left',
          shallow: true,
          bordered: true,
        },
      }
    },
    designerLocales: AllLocales.VantForm,
  }),
  Resource: createResource({
    // title: { 'zh-CN': 'Form', 'en-US': 'Form' },
    title: 'Vant-Form',
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'object',
          'x-component': 'VantForm',
        },
      },
    ],
  }),
})
