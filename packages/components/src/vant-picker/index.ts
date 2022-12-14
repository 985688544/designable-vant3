import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Picker as VanPicker, Popup as VanPopup } from 'vant'
import FormItem from '../form-item'
import { Field } from 'vant'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'
const BasePicker = observer(
  defineComponent({
    name: 'FBasePicker',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        popupProps = {},
        pickerProps = {},
        popupListeners = {},
        pickerListeners = {},
      } = attrs as any
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
                  class: [`${vantStylePrefix}-Picker`],
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
                  attrs: {
                    show: show.value,
                    round: true,
                    teleport: 'body',
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
                      VanPicker,
                      {
                        attrs: {
                          showToolbar: true,
                          ...pickerProps,
                        },
                        on: {
                          cancel: () => {
                            show.value = false
                          },
                          confirm: (val: string) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...pickerListeners,
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

export const VantPicker = connect(
  BasePicker,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(VantPreviewText.Picker)
)

export default VantPicker
