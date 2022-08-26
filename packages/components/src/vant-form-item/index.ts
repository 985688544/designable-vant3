import { observer } from '@formily/reactive-vue'
import { connect, h, mapProps } from '@formily/vue'
import { isVoidField } from '@formily/core'
import { defineComponent } from 'vue'
import type { FieldType as VanFormItemProps } from 'vant'
import { Field as VanFormItem } from 'vant'
import { stylePrefix, resolveComponent } from '../__builtins__'
import { inputValidate } from '../vant-input'

export type FormItemProps = VanFormItemProps

export const VantBaseFormItem = defineComponent({
  name: 'FBaseFormItem',
  props: {
    // className: {},
    // required: {},
    label: {},
    colon: {},
    // layout: {},
    // tooltip: {},
    // labelStyle: {},
    // labelAlign: {},
    // labelWrap: {},
    // labelWidth: {},
    // wrapperWidth: {},
    // labelCol: {},
    // wrapperCol: {},
    // wrapperAlign: {},
    // wrapperWrap: {},
    // wrapperStyle: {},
    // fullness: {},
    // addonBefore: {},
    // addonAfter: {},
    // size: {},
    // extra: {},
    // feedbackText: {},
    // feedbackLayout: {},
    // tooltipLayout: {},
    // feedbackStatus: {},
    // feedbackIcon: {},
    asterisk: {},
    // gridSpan: {},
    // bordered: { default: true },
    // inset: { default: false },
  },
  setup(props, { attrs, slots, emit }) {
      
    return () => {
      const { label, asterisk, colon } = props as any
      // console.log(attrs, "1233")

      const prefixCls = `${stylePrefix}-form-item`

      // console.log(resolveComponent(label), "@22resolveComponent(label)")

      const renderLabelText = () => {
        const labelChildren = h(
          'div',
          {
            ref: 'containerRef',
          },
          {
            default: () => [
              asterisk &&
                h(
                  'span',
                  { class: `${prefixCls}-asterisk` },
                  { default: () => ['*'] }
                ),
              h('label', {}, { default: () => [resolveComponent(label)] }),
            ],
          }
        )
        return labelChildren
      }

      //
      const renderLabel =
        label &&
        h(
          'div',
          {},
          {
            default: () => [
              renderLabelText(),
              label &&
                h(
                  'span',
                  {
                    class: `${prefixCls}-colon`,
                  },
                  { default: () => [colon ? ':' : ''] }
                ),
            ],
          }
        )
      return h(
        VanFormItem,
        {
          class: [{ [`${stylePrefix}-input-asterisk`]: attrs.asterisk }],
          ...props,
          attrs,
          on: emit,
        },
        slots.default
          ? {
              input: () => slots.default?.() || [],
            }
          : {}
      )
    }
  },
})

export const FormItem = connect(
  VantBaseFormItem,
  mapProps(
    {
      validateStatus: true,
      required: true,
      title: 'label',
    },

    (props, field) => {
      // console.log(props.label, 'props===>labek')
      // console.log(field, "field")
      if (isVoidField(field)) {
        return props
      }
      return {
        ...props,
      }
    }
  ),
  inputValidate
)

export default FormItem
