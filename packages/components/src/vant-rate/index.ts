import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Rate as VanRate } from 'vant'
import { VantPreviewText } from '../vant-preview-text'

const TransformVanRate = transformComponent(VanRate, {
  change: 'input',
})

export const VantRate = connect(
  TransformVanRate,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Rate)
)
export default VantRate
