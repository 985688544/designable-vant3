import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Calendar as VanCalendar } from 'vant'
import VantFormItem from '../vant-form-item'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'

const BaseCalendar = observer(
  defineComponent({
    name: 'FBaseCalendar',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        calendarProps = {},
        fieldListeners = {},
        calendarListeners = {},
      } = attrs as any
      const { format } = formItemProps
      const show = ref(false)
      // console.log(props, "props")
      // console.log(attrs, "attrsattrs")
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
                  class: [`${vantStylePrefix}-Calendar`],
                  attrs: {
                    placeholder: attrs.placeholder || '',
                    modelValue: format ? format(attrs.value) : attrs.value, 
                    ...formItemProps,
                  },
                  on: {
                    click: () => {
                      show.value = true
                    },
                    ...fieldListeners,
                  },
                },
                slots
              ),
              h(
                VanCalendar,
                { 
                  teleport: 'body',
                  attrs: {
                    show: show.value,
                    ...calendarProps,
                  },
                  on: {
                    close: () => {
                      show.value = false
                    },
                    confirm: (val: any) => {
                      const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                      emit('change', formatDate(val))
                      show.value = false
                    },
                  },
                  ...calendarListeners,
                },
                {}
              ),
            ],
          }
        )
      }
    },
  })
)

export const VantCalendar = connect(
  BaseCalendar,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(VantPreviewText.Calendar)
)

export default VantCalendar
