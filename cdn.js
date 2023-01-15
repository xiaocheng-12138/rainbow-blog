const config = require("./package.json");
function replace(str) {
  return str.replace("^", "").replace("~","");
}
const cdn = {
  css: [`https://cdn.bootcdn.net/ajax/libs/element-plus/${replace(config.dependencies["element-plus"])}/index.css`],
  js: [
    `https://cdn.bootcdn.net/ajax/libs/vue/${replace(config.dependencies.vue)}/vue.global.js`,
    `https://cdn.bootcdn.net/ajax/libs/vue-router/${replace(config.dependencies["vue-router"])}/vue-router.global.js`,
    `https://cdn.bootcdn.net/ajax/libs/vuex/${replace(config.dependencies.vuex)}/vuex.global.js`,
    `https://cdn.bootcdn.net/ajax/libs/axios/${replace(config.dependencies.axios)}/axios.js`,
    `https://cdn.bootcdn.net/ajax/libs/element-plus/${replace(config.dependencies["element-plus"])}/index.full.js`,
    `https://cdn.bootcdn.net/ajax/libs/vue-i18n/${replace(config.dependencies["vue-i18n"])}/vue-i18n.global.js`,
    `https://cdn.bootcdn.net/ajax/libs/localforage/${replace(config.dependencies.localforage)}/localforage.js`,
  ],
};

const exclusions = {
  vue: "Vue",
  axios: "axios",
  vuex: "Vuex",
  "vue-router": "VueRouter",
  "element-plus": "ElementPlus",
  "vue-i18n": "VueI18n",
  localforage: "LocalForage",
};
module.exports = {
  cdn,
  exclusions,
};
