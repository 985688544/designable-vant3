import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { defineComponent, PropType } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from '../__builtins__/shared'
import type {
  RadioProps as VanRadioProps,
  RadioGroupProps as VanRadioGroupProps,
} from 'vant'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'
import { vantStylePrefix } from '../__builtins__/configs'
import VantFormItem from '../vant-form-item'
import { VantPreviewText } from '../vant-preview-text'

export type VantRadioGroupProps = VanRadioGroupProps & {
  value: any
  options?: any[]
}

export type VantRadioProps = VanRadioProps

export const VantBaseRadioGroup = observer(
  defineComponent({
    name: 'FBaseRadioGroup',
    props: {},
    setup(props, { attrs, slots, emit }) {
      return () => {
        return h(
          VanRadioGroup,
          {
            class: [`${vantStylePrefix}-Radio`],
            attrs: {
              ...attrs,
              ...props,
              style: attrs.style,
              modelValue: attrs.value,
            },
            on: emit,
          },
          slots
        )
      }
    },
  })
)

const TransformVanRadioGroup = transformComponent(VantBaseRadioGroup, {
  change: 'update:modelValue',
})

const RadioGroupOption = defineComponent({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<VantRadioGroupProps['options']>,
      default: () => [],
    },
  },
  setup(customProps, { attrs, slots, emit }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      VanRadio,
                      { props: { label: option, name: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      VanRadio,
                      {
                        props: {
                          ...option,
                        },
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option.label, {
                            option,
                          }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(VantFormItem, {
        label: '单选框组',
      }, {
        default: () => [
          h(
            TransformVanRadioGroup,
            {
              direction: 'horizontal',
              attrs: {
                ...attrs,
              },
              on: emit,
            },
            children
          )
        ]

      })
    }
  },
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Checkbox)
)
export const VantRadio = composeExport(VanRadio, {
  Group: RadioGroup,
})

export default VantRadio
