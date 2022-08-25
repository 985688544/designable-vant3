import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Switch as VanSwitch, Cell } from 'vant'
import { VantPreviewText } from '../vant-preview-text'

const TransformVanSwitch = transformComponent(VanSwitch, {
  change: 'modelValue',
}, Cell)


export const VantSwitch = connect(
  TransformVanSwitch,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Switch)
)

export default VantSwitch
