import './styles.less'
import App from './app.vue'
import { createApp } from 'vue'
import WidgetsInstaller from './widgets'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import 'element-plus/theme-chalk/src/index.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'vant/lib/index.css';

export const app = createApp(App).use(ElementPlus, { locale: zhCn }).use(WidgetsInstaller).use(Vant)
app.config.warnHandler = function (msg, vm, trace) {
    // if (vm.label == '继承') return
    // console.log(vm, msg, trace)
    if (msg.startsWith('Invalid prop')) return
    return console.warn(msg, vm, trace)
}
app.mount('#app')
