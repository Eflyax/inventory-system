const path = require('path');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"@composables": path.resolve(__dirname, 'src/composables/')
			}
		}
	}
}
