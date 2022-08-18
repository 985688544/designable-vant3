import { usePosition, usePrefix } from '../hooks'
import { Layout } from '../containers'
import cls from 'classnames'
import { StyleValue } from '@vue/runtime-dom'
import { defineComponent, unref } from 'vue-demi'
import { VNode } from 'vue'
import { IDesignerLayoutProps } from '../types'

export interface IStudioPanelProps {
  style?: StyleValue
  className?: string
  logo?: VNode | Vue.FunctionalComponentOptions
  actions?: VNode | Vue.FunctionalComponentOptions
  prefixCls?: string
  theme?: string
  position?: IDesignerLayoutProps['position']
}

const StudioPanelInternal = defineComponent({
  name: 'StudioPanelInternal',
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('main-panel')
    const positionRef = usePosition()

    return () => {
      const position = unref(positionRef)
      const prefix = unref(prefixRef)
      if (slots.logo || slots.actions) {
        return (
          <div {...attrs} class={cls(prefix + '-container', 'root', position)}>
            <div class={prefix + '-header'}>
              <div class={prefix + '-header-logo'}>
                {slots.logo?.()}
              </div>
              <div class={prefix + '-header-actions'}>
                {slots.actions?.()}
              </div>
            </div>
            <div class={prefix}>{slots.default?.()}</div>
          </div>
        )
      }
      return (
        <div {...attrs} class={cls(prefixRef.value, 'root', position)}>
          {slots.default?.()}
        </div>
      )
    }
  },
})

export const StudioPanel = defineComponent({
  name: 'StudioPanel',
  props: {
    theme: { type: String, default: 'light' },
    prefixCls: { type: String, default: 'dn-' },
    position: { type: String, default: 'fixed' }
  },
  setup(props, { slots }) {
    // const scopedSlots = {
    //   logo: slots.logo,
    //   actions: slots.actions,
    // }
    return () => (
      <Layout
        {...{ theme: props.theme, prefixCls: props.prefixCls, position: props.position }}
      >
        <StudioPanelInternal {...props} v-slots={slots} />
      </Layout>
    )
  },
})
