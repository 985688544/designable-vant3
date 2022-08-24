import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Switch as VanSwitch } from 'vant'
import { vantStylePrefix } from '../__builtins__/configs'
import { VantPreviewText } from '../vant-preview-text'
import VantFormItem from '../vant-form-item'

export const VantBaseSwitch = observer(
  defineComponent({
    name: 'FBaseSwitch',
    props: {},
    setup(props, { attrs, slots, emit }) {
      return () => {
        return h(
          VantFormItem,
          {
            label: "开关"
          },
          {
            default: () => [
              h(
                VanSwitch,
                {
                  class: [`${vantStylePrefix}-Switch`],
                  attrs: {
                    ...attrs,
                    ...props,
                    style: attrs.style,
                    modelValue: attrs.value,
                  },
                  on: emit,
                },
                slots
              ),
            ],
          }
        )
      }
    },
  })
)

const TransformVanSwitch = transformComponent(VantBaseSwitch, {
  change: 'modelValue',
})


export const VantSwitch = connect(
  TransformVanSwitch,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Switch)
)

export default VantSwitch
