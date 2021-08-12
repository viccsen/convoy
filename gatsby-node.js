const path = require('path')

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    // output: {
    //     // e.g. app-2e49587d85e03a033f58.js
    //     filename: '[name]-[contenthash].js',
    //     // e.g. component---src-blog-2-js-cebc3ae7596cbb5b0951.js
    //     chunkFilename: '[name]-[contenthash].js',
    //     path: 'public',
    //     publicPath: '/',
    // },
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'bugu-ui': path.resolve(__dirname, '../src/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  })
}
