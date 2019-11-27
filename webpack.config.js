
const webpack = require('webpack');
const MODE = 'production';

module.exports = {
  context: __dirname,
  cache: true,

  mode: MODE,
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    script: "./src/js/main.js"
    //   script: ["@babel/polyfill", "./src/js/index.js"]
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/js`,
    // 出力ファイル名
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // node_modules配下のモジュールをバンドル対象とする
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /(node_modules)/,
        // include: [
        //   srcPath,
        //   path.resolve(__dirname, 'node_modules/gsap'),
        // ],
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              "presets": [
                ["@babel/preset-env", {
                  "useBuiltIns": false,
                }],
              ],
              "plugins": [
                "@babel/plugin-transform-runtime",
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],// importするときに省略できる拡張子の設定
    // modules: [// モジュールを読み込むときに検索するディレクトリの設定
    //   'node_modules'
    // ],
    // alias: {// 例えばmain.js内で `import Vue from 'vue';` と記述したときの`from vue`が表すファイルパスを指定
    //   vue$: 'vue/dist/vue.esm.js'
    // }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
};