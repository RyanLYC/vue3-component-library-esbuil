import { createApp } from 'vue'
import ZgUI from '../packages'
import App from './App.vue'

const app = createApp(App)
console.log(ZgUI)
app.use(ZgUI)
app.mount('#app')
