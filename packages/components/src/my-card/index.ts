
import { observe } from '@formily/reactive';
import { defineComponent } from 'vue-demi';
import { useField, useFieldSchema } from '@formily/vue';
import { h } from 'vue';
import { composeExport } from '../__builtins__/shared/utils';
// import { ElCard } from 'element-plus';



const CardLayout  = defineComponent({
        name: 'CardLayout',
        setup(props, { slots}) {
            // 获取schema
            const fieldRef = useField()
            const cardSchema = useFieldSchema()
        
            // console.log(cardSchema.value, "212")
            return () =>{
                return h('div', {}, "测试")
            }
        }
    })


// console.log('23233')
const MyCardOption = defineComponent({
        name: 'FMyCard',
        inheritAttrs: false,
        setup() {
            const FieldRef = useField()
            const SchemaRef = useFieldSchema()
            console.log(FieldRef, "FieldRef")
            console.log(SchemaRef, "SchemaRef")

            return () => {
                return h('div', {}, 'ttttt')
            }
        }
    })


export const MyCard = composeExport(CardLayout, {
    MyCardOption,
})

export default MyCard