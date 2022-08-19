import { observer } from '@formily/reactive-vue'
import { connect, h, mapProps } from '@formily/vue'
import { isVoidField } from '@formily/core'
import { defineComponent } from 'vue'
import type { FieldType as VanFormItemProps } from 'vant'
import { Field as VanFormItem } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { inputValidate } from '../vant-input'

export type VantFormItemProps = VanFormItemProps

export const VantBaseFormItem = observer(
  defineComponent({
    name: 'FBaseFormItem',
    setup(props, { attrs, slots, emit }) 
    {
      return () => {
        return h(
          VanFormItem,
          {
            class: [
              // { [`${stylePrefix}-input-asterisk`]: attrs.asterisk },
            ],
            ...props,
            readonly: true,
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
)

export const VantFormItem = connect(
  VantBaseFormItem,
  mapProps(
    {
      title: 'label',
    },
    (props, field) => {
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

export default VantFormItem
