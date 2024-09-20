import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'

setup((app) => {
  app.use(Antd);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
