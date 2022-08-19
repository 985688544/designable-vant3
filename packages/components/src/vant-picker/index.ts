import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Picker as VanPicker, Popup as VanPopup, Cell } from 'vant'
import VantFormItem from '../vant-form-item'
import { VantPreviewText } from '../vant-preview-text'

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

      console.log(formItemProps, "formItemProps")
      const show = ref(false)

      return () => {
        return h(
          Cell,
          {},
          {
            default: () => [
              h(
                VantFormItem,
                {
                  attrs: {
                    modelValue: attrs.value,  
                    readonly:true,           
                    ...formItemProps,   
                  },
                  on: {
                    click: () => {
                      // if(formItemProps.readonly) return
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
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(VantPreviewText.Picker)
)

export default VantPicker
