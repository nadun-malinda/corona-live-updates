import * as riot from 'riot'
import App from './components/main/main.riot'
import '../node_modules/@fortawesome/fontawesome-free/js/all'
import './scss/app.scss'
import photo from './images/sl-flag.png'

const mountApp = riot.component(App)
const app = mountApp(document.getElementById('root'), {
    api: 'https://hpb.health.gov.lk/api/get-current-statistical'
})