import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType, h } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
  SlotTypes,
} from '@formily/element-plus/src/__builtins__'
import { PreviewText } from '@formily/element-plus'

import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus'

export type ElRadioProps = typeof ElRadio
export type RadioGroupProps = typeof ElRadioGroup & {
  value: any
  options?: (
    | (Omit<ElRadioProps, 'value'> & {
      value: ElRadioProps['label']
      label: SlotTypes
    })
    | string
  )[]
  optionType: 'defalt' | 'button'
}

const RadioGroupOption = defineComponent({
  name: 'FRadioGroup',
  props: {
    value: {},
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  emits: ['change'],
  setup(customProps, { attrs, slots, emit }) {
    return () => {
      const options = customProps.options || []
      const OptionType =
        customProps.optionType === 'button' ? ElRadioButton : ElRadio
      const children =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    OptionType,
                    { label: option },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option, { option }),
                      ],
                    }
                  )
                } else {
                  return h(
                    OptionType,
                    {
                      ...option,
                      value: undefined,
                      label: option.value,
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
      return (
        <ElRadioGroup {...{ modelValue: customProps.value, ...attrs, "onUpdate:modelValue": (value: any) => { emit('change', value) } }}>
          {children}
        </ElRadioGroup>
      )
    }
  },
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
