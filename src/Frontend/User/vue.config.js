const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
	transpileDependencies: true,
	// devServer: { proxy: process.env.VUE_APP_HOST_BACK },
	// outputDir: path.resolve(__dirname, '../../Backend/public'),
    outputDir: path.resolve(__dirname, '/var/www/html'),
    lintOnSave: false,
    devServer: {
        allowedHosts: "all"
    }
});
