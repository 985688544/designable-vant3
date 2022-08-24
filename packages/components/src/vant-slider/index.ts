import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Slider as VanSlider } from 'vant'
import { vantStylePrefix } from '../__builtins__/configs'
import { VantPreviewText } from '../vant-preview-text'
import VantFormItem from '../vant-form-item'

export const VantBaseSlider = observer(
  defineComponent({
    name: 'FBaseSlider',
    props: {},
    setup(props, { attrs, slots, emit }) {
      return () => {
        return h(
          VantFormItem,
          {
            label: "滑动条"
          },
          {
            default: () => [
              h(
                VanSlider,
                {
                  class: [`${vantStylePrefix}-Slider`],
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

const TransformVanSlider = transformComponent(VantBaseSlider, {
  change: 'modelValue',
})

export const VantSlider = connect(
  TransformVanSlider,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Slider)
)
export default VantSlider
