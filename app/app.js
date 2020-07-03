import Vue from 'nativescript-vue';

import Weather from './components/Weather';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <Weather />
        </Frame>`,

    components: {
        Weather
    }
}).$start();