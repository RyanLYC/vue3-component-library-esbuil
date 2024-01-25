import { App } from 'vue'
import Button from './src/ZgButton.vue'
import '@packages/assets/scss/button.scss'

Button.name = 'ZgButton'
Button.install = (app: App) => {
  app.component(Button.name, Button)
}

export default Button
