import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Slider as VanSlider } from 'vant'
import { VantPreviewText } from '../vant-preview-text'
import { vantStylePrefix } from '../__builtins__/configs'
import { observer } from '@formily/reactive-vue'
import { defineComponent, h } from 'vue'

// const TransformVanSlider = transformComponent(VanSlider, {
//   change: 'modelValue',
// })

const BaseSlider = observer(defineComponent({
  name: 'baseSlider',
  setup(props, {attrs, slots}) {
    return () => {
      return (
        h(VanSlider, {
          class: [`${vantStylePrefix}-slider1`],
          ...props,
          attrs: {
            ...attrs,
          modelValue: attrs.value
          },
        }, {
          slots
        })
      )
    }
  }
}))

export const VantSlider = connect(
  BaseSlider,
  mapProps({
    readOnly: 'readonly',
    value: 'modelValue',
  }),
  mapReadPretty(VantPreviewText.Slider)
)
export default VantSlider
