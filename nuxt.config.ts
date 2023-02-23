

export default defineNuxtConfig({
    postcss:{
        plugins: {
            'postcss-import': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build:{
        transpile:[],
    },
    css:[
        '~/assets/style/App.scss',
        '~/assets/style/Tailwind.config/Tailwind.base.scss',
        '~/assets/style/Tailwind.config/Tailwind.component.scss',
        '~/assets/style/Tailwind.config/Tailwind.utilities.scss',
    ],
    app:{
        rootId:'v-app',
        rootTag:'main',
        head:{

            link:[
                {rel:'icon',href:'https://cdn.shopify.com/s/files/1/0272/9548/1943/files/icon2.png?crop=center&height=32&v=1662527377&width=32'}
            ],
            title:'Brentos – Australian Art by Illustrator and Author Brent Turner',
            meta: [
                { name: 'viewport', content: 'width=device-width ,initial-scale=1.0' },
                { name: 'description', content: 'welcome to My project' },
                { name: 'keyword', content: 'HTML,CSS,Js developer' },
                { "http-equiv": 'X-UA-Compatible', content: 'ie=edge' },
            ],
            bodyAttrs:{}
        }
    },
    srcDir: './src',
    modules: [
        '@pinia/nuxt','@nuxt/image-edge'
    ],
})
