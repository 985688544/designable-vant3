import { defineComponent, h } from 'vue'
import { ElCard, ElEmpty, ElRow } from 'element-plus'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { composeExport } from '../__builtins__/shared'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}
const ArrayCardsInner = observer(
  defineComponent({
    name: 'FArrayCards',
    inheritAttrs: false,
    props: ['onChange'],
    setup(props, { attrs }) {
      // 自定义组件内读取当前字段属性，操作字段状态等
      const fieldRef = useField<ArrayField>()
      console.log(fieldRef, "fieldRef")

      // 自定义组件中读取当前字段的 Schema 信息
      const schemaRef = useFieldSchema()
      console.log(schemaRef, "schemaRef")

      // 样式前缀
      const prefixCls = `${stylePrefix}-array-cards`

      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        // 定义field值
        const field = fieldRef.value
        // schema的值
        const schema = schemaRef.value
        console.log(schema, "schema")
        // 绑定的初始数据结构
        const dataSource = Array.isArray(field.value) ? field.value : []

        // 没有schema 直接返回 【因为靠schema驱动】
        if (!schema) throw new Error('can not found schema object')

        const renderItems = () => {
          return dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items

            const title = h(
              'span',
              {},
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      schema: items,
                      name: index,
                      filterProperties: (schema: ISchema) => {
                        if (!isIndexComponent(schema)) return false
                        return true
                      },
                      onlyRenderProperties: true,
                    },
                    {}
                  ),
                  attrs.title || field.title,
                ],
              }
            )
            const extra = h(
              'span',
              {},
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      schema: items,
                      name: index,
                      filterProperties: (schema: ISchema) => {
                        if (!isOperationComponent(schema)) return false
                        return true
                      },
                      onlyRenderProperties: true,
                    },
                    {}
                  ),
                  attrs.extra,
                ],
              }
            )
            const content = h(
              RecursionField,
              {
                schema: items,
                name: index,
                filterProperties: (schema: ISchema) => {
                  if (isIndexComponent(schema)) return false
                  if (isOperationComponent(schema)) return false
                  return true
                },
              },
              {}
            )
            return h(
              ArrayBase.Item,
              {
                key: getKey(item, index),
                index,
                record: item,
              },
              {
                default: () =>
                  h(
                    ElCard,
                    {
                      shadow: 'never',
                      ...attrs,
                      class: [`${prefixCls}-item`].concat((attrs as any).class),
                    },
                    {
                      default: () => [content],
                      header: () =>
                        h(
                          ElRow,
                          {
                            type: 'flex',
                            justify: 'space-between',
                          },
                          {
                            default: () => [title, extra],
                          }
                        ),
                    }
                  ),
              }
            )
          })
        }
        const renderAddition = () => {
          return schema.reduceProperties((addition, schema) => {
            if (isAdditionComponent(schema)) {
              return h(
                RecursionField,
                {
                  schema,
                  name: 'addition',
                },
                {}
              )
            }
            return addition
          }, null)
        }
        const renderEmpty = () => {
          if (dataSource?.length) return
          return h(
            ElCard,
            {
              class: [`${prefixCls}-item`],
              shadow: 'never',
              ...attrs,
              header: attrs.title || field.title,
            },
            {
              default: () =>
                h(
                  ElEmpty,
                  { props: { description: 'No Data', imageSize: 100 } },
                  {}
                ),
            }
          )
        }

        return h(
          'div',
          {
            class: [prefixCls],
          },
          h(
            ArrayBase,
            {
              keyMap,
            },
            {
              default: () => {
                return [renderEmpty(), renderItems(), renderAddition()]
              },
            }
          )
        )
      }
    },
  })
)

export const ArrayCards = composeExport(ArrayCardsInner, {
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord,
})

export default ArrayCards
