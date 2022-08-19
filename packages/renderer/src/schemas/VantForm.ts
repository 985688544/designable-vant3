import { ISchema } from '@formily/vue'
import { VantFormLayout } from './VantFormLayout'
import { CSSStyle } from './CSSStyle'

export const VantForm: ISchema = {
  type: 'object',
  properties: {
    ...(VantFormLayout.properties as any),
    style: CSSStyle,
  },
}
