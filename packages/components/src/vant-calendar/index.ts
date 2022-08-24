import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from 'vue'
import { Calendar as VanCalendar } from 'vant'
import { Field } from 'vant'
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

      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                'div',
                {
                  class: [`${vantStylePrefix}-Calendar`],
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
                      ...fieldListeners,
                    },
                  },
                  {}
                )
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
                      const formatDate = (date) =>
                        `${date.getFullYear()}/${
                          date.getMonth() + 1
                        }/${date.getDate()}`
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
