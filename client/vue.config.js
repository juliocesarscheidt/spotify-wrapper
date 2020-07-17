const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_CLIENT_ID: JSON.stringify(process.env.VUE_APP_CLIENT_ID),
        }
      })
    ]
  }
}
