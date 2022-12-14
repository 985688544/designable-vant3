import { observer } from '@formily/reactive-vue'
import { isVoidField } from '@formily/core'
import { connect, mapProps, mapReadPretty, h, useField } from '@formily/vue'
import { defineComponent } from 'vue'
import type { FieldProps as VanInputProps } from 'vant'
import { Field as VanInput } from 'vant'
import { resolveComponent } from '../__builtins__/shared'
import { vantStylePrefix } from '../__builtins__/configs'
import { VantPreviewText } from '../vant-preview-text'

export type vantInputProps = VanInputProps

export const VantBaseInput = observer(
  defineComponent({
    name: 'FBaseInput',
    props: {
      label: {},
      required: {}
    },
    setup(props, { attrs, slots, emit }) {
      const { label, required } = props
      // console.log(required, "required")
      const Field = useField()
      return () => {
        const FieldRef = Field.value
      console.log(FieldRef, "props")

        return h(
          VanInput,
          {
            class: [`${vantStylePrefix}-input`],
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

export const inputValidate = mapProps<any>(
  { validateStatus: true, required: true },
  (props, field) => {
    if (isVoidField(field)) return props
    if (!field) return props
    const takeMessage = () => {
      const split = (messages: any[]) => {
        return messages.reduce((buf, text, index) => {
          if (!text) return buf
          return index < messages.length - 1
            ? buf.concat([text, ', '])
            : buf.concat([text])
        }, [])
      }

      if (field.validating) return
      if (props.feedbackText) return props.feedbackText
      if (field.selfErrors.length) return split(field.selfErrors)
      if (field.selfWarnings.length) return split(field.selfWarnings)
      if (field.selfSuccesses.length) return split(field.selfSuccesses)
    }
    const errorMessages = takeMessage()
    return {
      errorMessage: resolveComponent(
        Array.isArray(errorMessages) ? errorMessages.join('') : errorMessages
      ),
      extra: props.extra || field.description,
    }
  },
  (props, field) => {
    if (isVoidField(field)) return props
    if (!field) return props
    return {
      feedbackStatus:
        field.validateStatus === 'validating'
          ? 'pending'
          : (Array.isArray(field.decorator) &&
              field.decorator[1]?.feedbackStatus) ||
            field.validateStatus,
    }
  },
  (props, field) => {
    if (isVoidField(field)) return props

    if (!field) return props
    let asterisk = false
    if (field.required && field.pattern !== 'readPretty') {
      asterisk = true
    }
    if ('asterisk' in props) {
      asterisk = props.asterisk
    }

    return {
      asterisk,
    }
  }
)

export const VantInput = connect(
  VantBaseInput,
  mapProps({
    readOnly: 'readOnly',
  }),
  mapReadPretty(VantPreviewText.VantInput)
  // inputValidate
)

export default VantInput
