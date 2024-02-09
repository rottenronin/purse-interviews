import { createApp } from 'vue'
import CreshUI from '@long2x/cresh-ui'

import routerPlugin from './router-plugin'

import '@long2x/cresh-ui/style.css'
import '@long2x/cresh-ui/default-theme.css'
import './styles/notify.css'

import App from './App.vue'

const app = createApp(App)

app.use(CreshUI)
app.use(routerPlugin)

app.mount('#app')
