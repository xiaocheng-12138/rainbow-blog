<template>
  <el-config-provider :locale="elementPlusLocales">
    <router-view/>
  </el-config-provider>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import {elementPlusMessages} from "@/config/i18n";
import {setHtmlLang} from "@/utils/i18n";

export default defineComponent({
  name: 'App',
  setup() {
    const {locale} = useI18n();
    const elementPlusLocales = computed(() => elementPlusMessages[locale.value]);

    onMounted(() => {
      setHtmlLang(locale.value);
    })

    return {
      elementPlusLocales
    }

  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>