import { createApp } from 'vue';
// 引入 ElementUI
import ElementPlus from 'element-plus';

// 导入 svg
// import { importAllSvg } from "@/components/IconSvg/index";
// importAllSvg();

import App from '@/App.vue';
import router from '@/router';
import store from '@/config/store';
import i18n from '@/config/i18n';
console.log("阿萨啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");

const app = createApp(App)
app.use(store);
app.use(router)
app.use(ElementPlus, { size: 'default'});
app.use(i18n);
app.mount('#app');