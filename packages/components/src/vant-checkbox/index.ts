import { PropType } from 'vue-demi'

import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
  SlotTypes,
} from '../__builtins__/shared'
import {
  Checkbox as VanCheckbox,
  CheckboxGroup as VanCheckboxGroup,
  Cell
} from 'vant'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'

const TransformVanCheckbox = transformComponent(VanCheckbox, {
  change: 'update:modelValue',
})

const CheckboxOption = defineComponent({
  name: 'FCheckboxOption',
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      default: null,
    },
  },
  setup(customProps: any, { attrs, slots, emit }) {
    return () => {
      const props = attrs as any
      const option = customProps?.option

      if (option) {
        const children = {
          default: () => [
            resolveComponent(slots.default ?? option.label, { option }),
          ],
        }

        const newProps = {} as any
        Object.assign(newProps, option)
        newProps.label = option.value
        delete newProps.value

        return h(
          VanCheckbox,
          {
            class: [`${vantStylePrefix}-Checkbox`],
            shape: 'square',
            attrs: {
              ...newProps,
            },
          },
          children
        )
      }
      return h(
        'div',
        {},
        {
          default: () => [
            h(
              TransformVanCheckbox,
              {
                attrs: {
                  ...props,
                },
                on: emit,
              },
              {
                default: () => [props.label],
              }
            ),
          ],
        }
      )
    }
  },
})

const TransformVanCheckboxGroup = transformComponent(VanCheckboxGroup, {
  change: 'update:modelValue',
})

const CheckboxGroupOption = defineComponent({
  name: 'FCheckboxGroupOption',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionType: {
      type: String,
      default: 'horizontal',
    },
    direction: {
      type: String,
      default: 'default',
    },
  },
  setup(customProps: any, { attrs, slots, emit }: any) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option: any) => {
                  if (typeof option === 'string') {
                    return h(
                      VanCheckbox,
                      {
                        props: {
                          option: {
                            label: option,
                            name: option,
                          },
                        },
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  } else {
                    return h(
                      VantCheckbox,
                      {
                        props: {
                          option,
                        },
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  }
                }),
            }
          : slots
      return h(
        Cell,
        {
          // label: '默认',
        },
        {
          default: () => [
            h(
              TransformVanCheckboxGroup,
              {
                direction: 'horizontal',
                attrs: {
                  ...attrs,
                },
                on: emit,
              },
              children
            ),
          ],
        }
      )
    }
  },
})

const CheckboxGroup = connect(
  CheckboxGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Checkbox, {
    multiple: true,
  })
)

export const VantCheckbox = composeExport(
  connect(CheckboxOption, mapProps({ value: 'modelValue' })),
  {
    Group: CheckboxGroup,
  }
)

export default VantCheckbox
