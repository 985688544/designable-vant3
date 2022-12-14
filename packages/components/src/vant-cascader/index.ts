import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Cascader as VanCascader, Popup as VanPopup } from 'vant'
import { Field } from 'vant'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'

const BaseCascader = observer(
  defineComponent({
    name: 'FBaseCascader',
    setup(props: any, { attrs, emit, slots }: any) {
      const {
        formItemProps = {},
        popupProps = {},
        cascaderProps = {},
        popupListeners = {},
        cascaderListeners = {},
      } = attrs as any
      const { format } = formItemProps
      const show = ref(false)

      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                'div',
                {
                  class: [`${vantStylePrefix}-Cascader`],
                },
                h(
                  Field,
                  {
                    attrs: {
                      modelValue: attrs.value,
                      placeholder: attrs.placeholder || '',
                      ...formItemProps,
                    },
                    on: {
                      click: () => {
                        show.value = true
                      },
                    },
                  },
                  {}
                )
              ),
              h(
                VanPopup,
                {
                  teleport: 'body',
                  attrs: {
                    show: show.value,
                    round: true,
                    position: 'bottom',
                    ...popupProps,
                  },
                  on: {
                    input: (val: any) => {
                      show.value = val
                    },
                    ...popupListeners,
                  },
                },
                {
                  default: () => [
                    h(
                      VanCascader,
                      {
                        attrs: {
                          ...cascaderProps,
                        },
                        on: {
                          close: () => {
                            show.value = false
                          },
                          finish: ({ selectedOptions }: any) => {
                            // const { options }  = cascaderProps

                            const fieldVal = selectedOptions
                              .map((option) => option.text)
                              .join('/')

                            emit('change', fieldVal)
                            show.value = false
                          },
                          ...cascaderListeners,
                        },
                      },
                      {}
                    ),
                  ],
                }
              ),
            ],
          }
        )
      }
    },
  })
)

export const VantCascader = connect(
  BaseCascader,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(VantPreviewText.Cascader)
)

export default VantCascader
