import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { DatetimePicker as VanDatetimePicker, Popup as VanPopup } from 'vant'
import { Field } from 'vant'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'

const BaseDatetimePicker = observer(
  defineComponent({
    name: 'FBaseDatetimePicker',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        popupProps = {},
        datetimePickerProps = {},
        fieldListeners = {},
        popupListeners = {},
        datetimePickerListeners = {},
      } = attrs as any
      const show = ref(false)

      // console.log(attrs, "!22")

      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                'div',
                {
                  class: [`${vantStylePrefix}-Datetime-picker`],
                },
                {
                  default: () => [
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
                          ...fieldListeners,
                        },
                      },
                      {}
                    ),
                  ],
                }
              ),
              h(
                VanPopup,
                {
                  attrs: {
                    show: show.value,
                    round: true,
                    position: 'bottom',
                    teleport: 'body',
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
                      VanDatetimePicker,
                      {
                        attrs: {
                          showToolbar: true,
                          ...datetimePickerProps,
                        },
                        on: {
                          cancel: () => {
                            show.value = false
                          },
                          confirm: (val: any) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...datetimePickerListeners,
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

export const VantDatetimePicker = connect(
  BaseDatetimePicker,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(VantPreviewText.DatetimePicker)
)

export default VantDatetimePicker
