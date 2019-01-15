import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faPlay,
    faPause,
    faStop,
    faVolumeUp,
    faVolumeMute,
    faExpand,
} from '@fortawesome/free-solid-svg-icons'
import App from './App.vue';

library.add(
    faPlay,
    faPause,
    faStop,
    faVolumeUp,
    faVolumeMute,
    faExpand,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    render: function (h) {
        return h(App);
    },
}).$mount('#app');
