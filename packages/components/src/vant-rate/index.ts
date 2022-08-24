import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { Rate as VanRate } from 'vant'
import { vantStylePrefix } from '../__builtins__/configs'
import { VantPreviewText } from '../vant-preview-text'
import VantFormItem from '../vant-form-item'

export const VantBaseRate = observer(
  defineComponent({
    name: 'FBaseRate',
    props: {},
    setup(props, { attrs, slots, emit }) {
      return () => {
        return h(
          VanRate,
          {
            class: [`${vantStylePrefix}-Rate`],
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

const TransformVanRate = transformComponent(VantBaseRate, {
  change: 'input',
})

export const VantRate = connect(
  TransformVanRate,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(VantPreviewText.Rate)
)
export default VantRate
