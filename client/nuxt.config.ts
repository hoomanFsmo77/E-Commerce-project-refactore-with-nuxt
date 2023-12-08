
export default defineNuxtConfig({
    image:{
      cloudinary:{
          baseURL:'https://res.cloudinary.com/dhpxutwun/image/upload/'
      }
    },
    runtimeConfig:{
        apiUrl:process.env.API_URL,
        cookieName:process.env.COOKIE_NAME,
        countryApi:process.env.COUNTRY_API
    },
    postcss:{
        plugins: {
            'postcss-import': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build:{
        transpile:['vue-toastification'],
    },
    css:[
        '~/assets/style/App.css',
        '~/assets/style/Tailwind.config/Tailwind.base.css',
        '~/assets/style/Tailwind.config/Tailwind.component.css',
        '~/assets/style/Tailwind.config/Tailwind.utilities.css',
    ],
    app:{
        rootId:'v-app',
        rootTag:'div',
        head:{

            link:[
                {rel:'icon',href:'https://cdn.shopify.com/s/files/1/0272/9548/1943/files/icon2.png?crop=center&height=32&v=1662527377&width=32'},
            ],
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
        '@pinia/nuxt','@nuxt/image-edge','@formkit/nuxt'
    ],
    formkit:{
        defaultConfig:false,
        configFile:'./formkit.config.ts'
    }
})
