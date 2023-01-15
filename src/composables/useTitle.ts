/**
 * 设置 html Title  composables
 * @author LiQingSong
 */
import { ComputedRef, onMounted, Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import settings from '@/config/settings';
import router  from '@/router';
import { RouteRecordRaw } from 'vue-router';

export default function useTitle(route: Array<RouteRecordRaw>): void {
    const{ t } = useI18n();

    const setTitle = (title: string): void => {
        document.title = `${t(title)} - ${settings.siteTitle}`;
    } 

    watch(route,() => {

        //setTitle(router || '');
    })

    onMounted(()=> {
        console.log(router);
        
        //setTitle(route.value.title);
    })

}