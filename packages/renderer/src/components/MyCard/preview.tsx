import {
  DnFC,
  useNodeIdProps,
  useTreeNode,
  VNode,
} from '@formily/element-plus-prototypes'
import { composeExport } from '@formily/element-plus/src/__builtins__/shared/utils'
import { createBehavior, createResource } from '@designable/core'
import { MyCard as FormIlyCard } from '@formily/element-plus'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { defineComponent } from 'vue-demi'
import { createVoidFieldSchema } from '../Field/shared'
import CardItem from './cardItem'
import { CardQuery } from './query'
import { observe } from '@formily/reactive'
import { createArrayBehavior } from '../ArrayBase/index'
import './MyCard.less'
import { ElCard } from 'element-plus'
// export interface IResourceCreator {
//     title?: string ;
//     description?: string;
//     icon?: any;
//     thumb?: string;
//     span?: number;
//     elements?: any;
// }

// export interface IBehaviorCreator<T> {
//     name: string;
//     extends?: string[];
//     selector: string | ((node) => T);
//     designerProps?: any;
//     designerLocales?: any;
// }

// export const MyCard: DnFC<VNode> = composeExport(
//   defineComponent({
//     name: 'MyCard',
//     props: {
//       title: {
//         type: String,
//       },
//       QueryOptions: {
//         type: Array,
//       },
//     },
//     setup(props, { slots, attrs }) {
//       const nodeRef = useTreeNode()
//       const nodeIdRef = useNodeIdProps()

//       return () => {
//         const node = nodeRef.value
//         const nodeId = nodeIdRef.value
//         console.log(nodeId, 'nodeid')
//         return (
//           <div>
//             <div {...nodeId} class="dn-array-cards">
//               <div class="flex">
//                 {props.QueryOptions.map(
//                   (item: { label: string; field: string }) => {
//                     return (
//                       <div class="flex">
//                         {item.label} <ElInput></ElInput>
//                       </div>
//                     )
//                   }
//                 )}
//               </div>
//               <ElCard
//                 {...props}
//                 v-slots={{
//                   header: () => <span>{props.title}</span>,
//                 }}
//                 {...slots}
//               ></ElCard>
//             </div>
//           </div>
//         )
//       }
//     },
//   }),
//   {
//     Behavior: createArrayBehavior('MyCard'),
//     Resource: createResource({
//       icon: 'Lunbo',
//       elements: [
//         {
//           componentName: 'Field',
//           props: {
//             type: 'array',
//             'x-decorator': 'FormItem',
//             'x-component': 'MyCard',
//             maxItems: 3,
//             'x-component-props': {
//               title: `Title`,
//               stylle: {},
//               QueryOptions: [
//                 {
//                   label: 'label1',
//                   field: 'label1',
//                 },
//                 {
//                   label: 'label1',
//                   field: 'label1',
//                 },
//                 {
//                   label: 'label1',
//                   field: 'label1',
//                 },
//               ],
//             },
//           },
//         },
//       ],
//     }),
//   }
// )

// x-component 名称不可重复
export const MyCard: DnFC<VNode> = composeExport(
  defineComponent({
    name: 'MyCard',
    setup(props, { attrs, slots }) {
      return () => {
        const renderCardLayout = () => {
          return <span>2222</span>
        }
        return <div>{renderCardLayout()}</div>
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'MyCard',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'MyCard',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.MyCard),
      },
      designerLocales: AllLocales.MyCard,
    }),
    Resource: createResource({
      icon: 'Lunbo',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'MyCard',
            'x-component-props': {
              title: '自定义组件',
            },
          },
        },
      ],
    }),
  }
)
