<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IBaseSchema } from '.'

export default defineComponent({
  name: 'FieldRender',
  props: {
    schema: {
      type: Object as PropType<IBaseSchema>,
      required: true
    }
  },
  setup(props) {
    return () => {}
  }
})
</script>
