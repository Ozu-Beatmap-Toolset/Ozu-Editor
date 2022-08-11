const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Ozu Editor",
                win: {
                    icon: 'assets/logo/icon-v5.png',
                },
            },
        },
    },
})
