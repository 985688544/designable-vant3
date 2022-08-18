import {
  provide,
  inject,
  InjectionKey,
  defineComponent,
  Ref,
  ref,
  watch,
  SetupContext,
} from 'vue'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__'
import { useResponsiveFormLayout } from './useResponsiveFormLayout'

export type VantFormLayoutProps = {
  className?: string
  colon?: boolean
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?:
    | 'vertical'
    | 'horizontal'
    | 'inline'
    | ('vertical' | 'horizontal' | 'inline')[]
  direction?: 'rtl' | 'ltr'
  shallow?: boolean
  feedbackLayout?: 'loose' | 'terse' | 'popover'
  tooltipLayout?: 'icon' | 'text'
  bordered?: boolean
  breakpoints?: number[]
  inset?: boolean
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
}

export const VantFormLayoutDeepContext: InjectionKey<Ref<VantFormLayoutProps>> = Symbol(
  'FormLayoutDeepContext'
)

export const VantFormLayoutShallowContext: InjectionKey<Ref<VantFormLayoutProps>> =
  Symbol('FormLayoutShallowContext')

export const useVantFormDeepLayout = (): Ref<VantFormLayoutProps> =>
  inject(VantFormLayoutDeepContext, ref({}))

export const useVantFormShallowLayout = (): Ref<VantFormLayoutProps> =>
  inject(VantFormLayoutShallowContext, ref({}))

export const useVantFormLayout = (): Ref<VantFormLayoutProps> => {
  const shallowLayout = useVantFormShallowLayout()
  const deepLayout = useVantFormDeepLayout()
  const formLayout = ref({
    ...deepLayout.value,
    ...shallowLayout.value,
  })

  watch(
    [shallowLayout, deepLayout],
    () => {
      formLayout.value = {
        ...deepLayout.value,
        ...shallowLayout.value,
      }
    },
    {
      deep: true,
    }
  )
  return formLayout
}

export const VantFormLayout = defineComponent({
  name: 'FFormLayout',
  props: {
    className: {},
    colon: { default: true },
    labelAlign: {},
    wrapperAlign: {},
    labelWrap: { default: false },
    labelWidth: {},
    wrapperWidth: {},
    wrapperWrap: { default: false },
    labelCol: {},
    wrapperCol: {},
    fullness: { default: false },
    size: { default: 'default' },
    layout: { default: 'horizontal' },
    direction: { default: 'ltr' },
    shallow: { default: true },
    feedbackLayout: {},
    tooltipLayout: {},
    bordered: { default: true },
    inset: { default: false },
    breakpoints: {},
    spaceGap: {},
    gridColumnGap: {},
    gridRowGap: {},
  },
  setup(customProps: any, { slots }: SetupContext) {
    const { props }: any = useResponsiveFormLayout(customProps as any)

    const deepLayout = useVantFormLayout()
    const newDeepLayout = ref({
      ...deepLayout.value,
    })
    const shallowProps = ref({})
    watch(
      [props, deepLayout],
      () => {
        shallowProps.value = props.value.shallow ? props.value : undefined
        if (!props.value.shallow) {
          Object.assign(newDeepLayout.value, props.value)
        } else {
          if (props.value.size) {
            newDeepLayout.value.size = props.value.size
          }
          if (props.value.colon) {
            newDeepLayout.value.colon = props.value.colon
          }
        }
      },
      { deep: true, immediate: true }
    )

    provide(VantFormLayoutDeepContext, newDeepLayout)
    provide(VantFormLayoutShallowContext, shallowProps)

    const formPrefixCls = `${stylePrefix}-form`
    return () => {
      const classNames = {
        [`${formPrefixCls}-${props?.value.layout}`]: true,
        [`${formPrefixCls}-rtl`]: props?.value.direction === 'rtl',
        [`${formPrefixCls}-${props?.value.size}`]:
          props?.value.size !== undefined,
        [`${props?.value.className}`]: props?.value.className !== undefined,
      }
      return h(
        'div',
        {
          ref: 'root',
          class: classNames,
        },
        slots
      )
    }
  },
})

export default VantFormLayout
