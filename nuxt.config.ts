// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041349/brentos/instagram/1_mb6fhs.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041348/brentos/instagram/6_gzlljd.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041347/brentos/instagram/4_ylhxml.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041347/brentos/instagram/5_bvezml.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041345/brentos/instagram/2_mmxbu7.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041343/brentos/instagram/3_juv5rv.jpg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041112/brentos/master_ar5mpd.svg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041110/brentos/check_v4x97j.svg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041109/brentos/express_e3lizg.svg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678041108/brentos/visa_yqrcps.svg
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083774/brentos/recent/recent2-srcset_wmsdhu.webp
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083771/brentos/recent/recent1-src_u2w1fk.webp
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083773/brentos/recent/recent3-srcset_u7kfon.webp
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083771/brentos/recent/recent1-srcset_gt0zui.webp
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083769/brentos/recent/recent3-src_j4jgiq.webp
// https://res.cloudinary.com/dhpxutwun/image/upload/v1678083769/brentos/recent/recent2-src_jnfsd4.webp

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
        productDetail:process.env.PRODUCT_DETAIL
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
        '~/assets/style/App.scss',
        '~/assets/style/Tailwind.config/Tailwind.base.scss',
        '~/assets/style/Tailwind.config/Tailwind.component.scss',
        '~/assets/style/Tailwind.config/Tailwind.utilities.scss',
    ],
    app:{
        rootId:'v-app',
        rootTag:'div',
        head:{

            link:[
                {rel:'icon',href:'https://cdn.shopify.com/s/files/1/0272/9548/1943/files/icon2.png?crop=center&height=32&v=1662527377&width=32'},
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
