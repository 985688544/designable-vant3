import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType, h } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from '../__builtins__/shared'
import { PreviewText } from '../preview-text'
import type {
  RadioProps as VanRadioProps,
  RadioGroupProps as VanRadioGroupProps,
} from 'vant'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'

export type VantRadioGroupProps = VanRadioGroupProps & {
  value: any
  options?: any[]
}

export type VantRadioProps = VanRadioProps

const TransformVanRadioGroup = transformComponent(VanRadioGroup, {
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
      return h(
        TransformVanRadioGroup,
        {
          attrs: {
            ...attrs,
          },
          on: emit,
        },
        children
      )
    }
  },
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Checkbox)
)
export const VantRadio = composeExport(VanRadio, {
  Group: RadioGroup,
})

export default VantRadio
