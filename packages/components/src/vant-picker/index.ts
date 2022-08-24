import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Picker as VanPicker, Popup as VanPopup } from 'vant'
import VantFormItem from '../vant-form-item'
import { VantPreviewText } from '../vant-preview-text'


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
                VantFormItem,
                {
                  attrs: {
                    modelValue: attrs.value,
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
// const BasePicker = observer(
//   defineComponent({
//     name: 'FBasePicker',
//     props: {
//       formItemProps:{},
//       popupProps:{},
//       pickerProps: {},
//       popupListeners: {},
//       pickerListeners: {}
//     } = attrs ad any,
//     setup(props, { attrs, emit, slots }) {
//       const {
//         formItemProps,
//         popupProps,
//         pickerProps,
//         popupListeners,
//         pickerListeners,
//       } = props as any

//       const show = ref(false)  
//       return () => {
//         return h(
//           'div',
//           {},
//           {
//             default: () => [
//               h(
//                 VantFormItem,
//                 {
//                   label: attrs.label,
//                   class: [`${vantStylePrefix}-Picker`],
//                   attrs: {
//                     modelValue: attrs.value,    
//                     placeholder: attrs.placeholder || '',
//                     ...formItemProps,   
//                   },
//                   on: {
//                     click: () => {
//                         show.value = true  
//                     },
//                   },
//                 },
//                 slots
//               ),
//               h(
//                 VanPopup,
//                 {
//                   attrs: {
//                     show: show.value,
//                     round: true,
//                     teleport:'body',
//                     position: 'bottom',
//                     ...popupProps,
//                   },
//                   on: {
//                     input: (val: any) => {
//                       show.value = val
//                     },
//                     ...popupListeners,
//                   },
//                 },
//                 {
//                   default: () => [
//                     h(
//                       VanPicker,
//                       {
//                         attrs: {
//                           showToolbar: true,
//                           ...pickerProps,
//                         },
//                         on: {
//                           cancel: () => {
//                             show.value = false
//                           },
//                           confirm: (val: string) => {
//                             emit('change', val)
//                             show.value = false
//                           },
//                           ...pickerListeners,
//                         },
//                       },
//                       {}
//                     ),
//                   ],
//                 }
//               ),
//             ],
//           }
//         )
//       }
//     },
//   })
// )

export const VantPicker = connect(
  BasePicker,
  mapProps({ readOnly: 'readOnly' }),
  mapReadPretty(VantPreviewText.Picker)
)

export default VantPicker
