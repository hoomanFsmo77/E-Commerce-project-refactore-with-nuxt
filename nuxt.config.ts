
export default defineNuxtConfig({
    image:{
      cloudinary:{
          baseURL:'https://res.cloudinary.com/dhpxutwun/image/upload/'
      }
    },
    runtimeConfig:{
        apiBase:process.env.API_BASE,
        cookieName:process.env.COOKIE_NAME,
        navbar:process.env.NAVBAR_DATA,
        productList:process.env.PRODUCT_LIST,
        popularProduct:process.env.POPULAR_PRODUCT,
        collections:process.env.COLLECTIONS,
        recentWork:process.env.RECENT_WORK,
        instagramFeed:process.env.INSTAGRAM_FEED,
        productDetail:process.env.PRODUCT_DETAIL,
        pagesData:process.env.PAGES,
        policyData:process.env.POLICY_DATA,
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
