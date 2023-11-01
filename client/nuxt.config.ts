
export default defineNuxtConfig({
    image:{
      cloudinary:{
          baseURL:'https://res.cloudinary.com/dhpxutwun/image/upload/'
      }
    },
    runtimeConfig:{
        apiUrl:process.env.API_URL,
        apiBase:'https://mzrbnbpweekrzxizspuj.supabase.co/storage/v1/object/sign/brentos/',
        cookieName:'brentos_x_token_x',
        navbar:'NavbarData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL05hdmJhckRhdGEuanNvbiIsImlhdCI6MTY3NzgzNjA5NCwiZXhwIjoxZSszMn0.83rhKCCferYO6WTyZ4-CisMLycv5ZbtgaW0WNHHCQf8&t=2023-03-03T09%3A34%3A52.508Z',
        productList:'product/productListData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL3Byb2R1Y3QvcHJvZHVjdExpc3REYXRhLmpzb24iLCJpYXQiOjE2NzgzNDgwNjAsImV4cCI6MWUrMzJ9.Dhee7XhHm0KAtSinAgJRtb-NILP6z_h5jY1bw7Ivv-A&t=2023-03-09T07%3A47%3A40.456Z',
        popularProduct:'product/popularProducts.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL3Byb2R1Y3QvcG9wdWxhclByb2R1Y3RzLmpzb24iLCJpYXQiOjE2NzgzNDk1NDEsImV4cCI6MWUrMzJ9.jtqfooYWV6aT_7rW-bsh4GGmnW4yEhiw-FZlgAaIjAs&t=2023-03-09T08%3A12%3A21.326Z',
        collections:'AllCollectionLists.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL0FsbENvbGxlY3Rpb25MaXN0cy5qc29uIiwiaWF0IjoxNjc4MDg3MzQyLCJleHAiOjFlKzMyfQ.oKa4sMuZibC6oToxVCVv3HWiraCvdeRf_1netS6Xj6Y&t=2023-03-06T07%3A22%3A22.173Z',
        recentWork:'RecentWorkData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL1JlY2VudFdvcmtEYXRhLmpzb24iLCJpYXQiOjE2Nzg2MDUwNDEsImV4cCI6MWUrMzJ9.wy8pLUOzUA3oUHcBJDKV6SkSNxljNeOuCeVHXTlNmZs&t=2023-03-12T07%3A10%3A41.923Z',
        instagramFeed:'InstagramFeedData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL0luc3RhZ3JhbUZlZWREYXRhLmpzb24iLCJpYXQiOjE2NzgwNDE3NDQsImV4cCI6MWUrMzJ9.1kAFgOcyVs4HkjA3xK6UN0fNduMKMsY3ED_mdL9FHzg&t=2023-03-05T18%3A42%3A23.509Z',
        productDetail:'product/productDetailData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL3Byb2R1Y3QvcHJvZHVjdERldGFpbERhdGEuanNvbiIsImlhdCI6MTY3ODMxMDI5MywiZXhwIjoxZSszMn0.WAZaX3ni4T_uiu2BKaLVuiIog6isX2-xixOO_sdt9LU&t=2023-03-08T21%3A18%3A16.219Z',
        pagesData:'pagesData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL3BhZ2VzRGF0YS5qc29uIiwiaWF0IjoxNjc4NTIwNjExLCJleHAiOjFlKzMyfQ.B4F1XfynG58VnIpbSbBBe7nN9-_OJQ-0cedLC79d0b0&t=2023-03-11T07%3A43%3A32.860Z',
        policyData:'PolicyData.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmVudG9zL1BvbGljeURhdGEuanNvbiIsImlhdCI6MTY3ODYwNTI5NSwiZXhwIjoxZSszMn0.rnz32O-1wXeN8o9JmdW2GHBSzwPrjY1b3DW75sO8riY&t=2023-03-12T07%3A14%3A55.428Z',
        countryApi:'https://battuta.medunes.net/api/country/all/?key=3b469a237e20c3b4e17a41ce08e097d3'
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
