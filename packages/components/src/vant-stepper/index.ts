import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Stepper as VanStepper } from 'vant'
import { vantStylePrefix } from '../__builtins__/configs'
import { VantPreviewText } from '../vant-preview-text'

export const VantBaseVanStepper = observer(
  defineComponent({
    name: 'FBaseVanStepper',
    props: {},
    setup(props, { attrs, slots, emit }) {
      return () => {
        return h(
          VanStepper,
          {
            class: [`${vantStylePrefix}-Stepper`],
            attrs: {
              ...attrs,
              ...props,
              style: attrs.style,
              modelValue: attrs.value,
            },
            on: emit,
          },
          slots
        )
      }
    },
  })
)

const TransformVanStepper = transformComponent(VantBaseVanStepper, {
  change: 'input',
})

export const VantStepper = connect(
  TransformVanStepper,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Stepper)
)

export default VantStepper
