import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
Vue.use(ElementUI);
import ElementResizeDetectorMaker from 'element-resize-detector'
Vue.prototype.$erd = ElementResizeDetectorMaker()

//codemirror
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
