import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Stepper as VanStepper } from 'vant'
import { VantPreviewText } from '../vant-preview-text'


const TransformVanStepper = transformComponent(VanStepper, {
  change: 'input',
})

export const VantStepper = connect(
  TransformVanStepper,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Stepper)
)

export default VantStepper
