import webpack from 'webpack'

const WDS_PORT = 7000

const PROD = JSON.parse(process.env.PROD_ENV || '0')

const libraryName = 'experimentBoxes'
const outputFile = `${libraryName}${PROD ? '.min' : '.max'}.js`
const plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
]
const prodPlugins = plugins.concat(new webpack.optimize.UglifyJsPlugin())
// not really working
export default {
  entry: './builder.js',
  target: 'web',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],

  },
  devtool: PROD ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    jquery: 'jQuery',
    chartjs: 'Chart',
    lodash: '_',
    'experiment-mathjs': 'math',
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
  },
  plugins: PROD ? prodPlugins : plugins,
}
