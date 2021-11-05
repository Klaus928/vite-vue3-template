import { ElEmpty } from 'element-plus'
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'Empty',
  props: {
    message: {
      type: String,
      default: '没有数据'
    },
    imageSize: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    return () =>
      h(ElEmpty, {
        description: props.message,
        imageSize: props.imageSize
      })
  }
})
