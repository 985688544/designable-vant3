import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Slider as VanSlider } from 'vant'
import { VantPreviewText } from '../vant-preview-text'

const TransformVanSlider = transformComponent(VanSlider, {
  change: 'modelValue',
})

export const VantSlider = connect(
  TransformVanSlider,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Slider)
)
export default VantSlider
