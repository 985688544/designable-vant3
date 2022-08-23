import { defineComponent } from 'vue-demi'

const CardItem = defineComponent({
  name: 'Card-item',
  props: { title: {} },
  setup(props, { attrs }) {
    // console.log(props.title, "子组件的props")
    return () => {
      return <div>ceshi </div>
    }
  },
})

export default CardItem
