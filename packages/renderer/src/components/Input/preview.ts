import { Input as FormilyInput } from '@formily/element-plus'

import { createBehavior, createResource } from '@designable/core'
// 描述文件
import { DnFC } from '@formily/element-plus-prototypes'

// 创建一份schema结构
import { createFieldSchema } from '../Field'

// 总的一份配置schema
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

import { composeExport } from '@formily/element-plus/src/__builtins__'

import { merge } from '@formily/shared'

/**
 * 使用渲染
 * 1、引入element-plus基础组件
 * 2、确认组件最后抛出的数据 Resource?: IResource[];   Behavior?: IBehavior[];
 * 3、createBehavior() 创建一个行为
 * 4、createResource() 创建一个数据源
 * 5、composeExport 合并导出
 * 
 * selector() 关键方法
 */

// console.log(FormilyInput, "FormilyInput")
export const Input: DnFC<any> =
  composeExport(FormilyInput, {
    Behavior: createBehavior(
      {
        name: 'Input',
        extends: ['Field'], // 匹配
        selector: (node) =>{
          // console.log('寻找符合标签配置')
         return node.props?.['x-component'] === 'Input' 
        }, 
        designerProps: {
          propsSchema: createFieldSchema(AllSchemas.Input),
        },
        designerLocales: AllLocales.Input,
      },
      // {
      //   name: 'Input.TextArea',
      //   extends: ['Field'],
      //   selector: (node) => node.props?.['x-component'] === 'Input.TextArea',
      //   designerProps: {
      //     propsSchema: createFieldSchema(AllSchemas.Input.TextArea),
      //   },
      //   designerLocales: merge(AllLocales.Input, {
      //     'zh-CN': {
      //       title: '多行输入',
      //     },
      //     'en-US': {
      //       title: 'TextArea',
      //     },
      //   }),
      // }
    ),
    Resource: createResource(
      {
        icon: 'InputSource',
        elements: [
          {
            componentName: 'Field',
            props: {
              type: 'string',
              title: 'Input',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        ],
      },
      // {
      //   icon: 'TextAreaSource',
      //   elements: [
      //     {
      //       componentName: 'Field',
      //       props: {
      //         type: 'string',
      //         title: 'TextArea',
      //         'x-decorator': 'FormItem',
      //         'x-component': 'Input.TextArea',
      //       },
      //     },
      //   ],
      // }
    ),
  })
