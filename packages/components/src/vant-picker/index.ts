import { usePlaceholder } from './../preview-text/index';
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Picker as VanPicker, Popup as VanPopup, Cell } from 'vant'
import VantFormItem from '../vant-form-item'
import { VantPreviewText, vantUsePlaceholder } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'

const BasePicker = observer(
  defineComponent({
    name: 'FBasePicker',
    props: {
      formItemProps:{},
      popupProps:{},
      pickerProps: {},
      popupListeners: {},
      pickerListeners: {}
    },
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps,
        popupProps,
        pickerProps,
        popupListeners,
        pickerListeners,
      } = props as any

      const show = ref(false)  
      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                VantFormItem,
                {
                  label: attrs.label,
                  class: [`${vantStylePrefix}-Picker`],
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
                slots
              ),
              h(
                VanPopup,
                {
                  attrs: {
                    show: show.value,
                    round: true,
                    teleport:'body',
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
  mapProps({ readOnly: 'readOnly' }),
  mapReadPretty(VantPreviewText.Picker)
)

export default VantPicker
