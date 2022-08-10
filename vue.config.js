const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Ozu Editor",
                appId: 'test.com',
                win: {
                    "target": ["nsis"],
                    icon: 'assets/logo/icon-v5.png',
                },
            },
        },
    },
})
