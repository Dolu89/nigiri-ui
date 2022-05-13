import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Chip from 'primevue/chip';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue);
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Chip', Chip);
    nuxtApp.vueApp.component('Tag', Tag);
    nuxtApp.vueApp.component('Dropdown', Dropdown);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
    nuxtApp.vueApp.component('Textarea', Textarea);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Menubar', Menubar);
});