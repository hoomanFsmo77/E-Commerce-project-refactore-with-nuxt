import { DefaultConfigOptions,defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/addons/css/floatingLabels'
const config: DefaultConfigOptions = defaultConfig({
    plugins:[
        createFloatingLabelsPlugin({      useAsDefault: true, // defaults to false
        }),
    ]
})


export default config