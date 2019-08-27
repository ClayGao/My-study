576# 前言

由於這週所教的部分筆記有做起來，所以實際上的心得筆記可以回看之前的就好

這週想針對這個月 ( Week16 - Week19 ) 做一些補充，而複習的部分寫心得

會這樣做的原因是因為，第十六與十八週都是教工具應用，第十七週教 JavaScript 底層運作與程式機制，第十九週談網頁架構

所以本週複習週不會以週區分，而是以主題區分，Sass / Gulp / Webpack 一區，JavaScript 一區，MVC / SPA / MPA 架構一區

心得筆記由於已經有撰寫，這邊就不再重寫了

# Webpack

## 所以 Webpack 到底是什麼 ? 它與 Gulp 又有什麼區別 ?

當我們把這個問題提出來的時候，基本上這個問題本身就很有問題了

在問這個問題之前，必須先下一個前提，那就是：在 XXX 功能上，Webpack 與 Gulp 有什麼區別 ?

假設我今天的前提，是要讓 Scss 自動轉成 css，那兩者的功能可以說是毫無區別

但假設今天我的問題的前提是，兩者將 Scss 轉成 css 的 Work flow 是否一樣 ? 那答案就是有所差別

所以我認為這一個問題，其實不能算是問題，因為就實務上來說，你沒有必要擇一，你可以都使用

於是乎我們來談談實務上 Webpack 到底能為我們做什麼，至少，就目前我們所學而言，它能怎麼做？

## webpack.config.js

其實 webpack 就是一個打包工具，目的是打包，其餘套件僅僅是附帶的功能，所以如果談套件，那其實 gulp 也可以做到一樣的事情

但打包引入這個功能是 gulp 無法做到的，`export { }` 與 `import { }` 的運行環境是僅在 node.js 才被允許，這點可不能忘記

但通過 webpack 「打包」之後，我們就可以讓瀏覽器裡的 JavaScript 做到這個功能

現在讓我們來了解 webpack.config.js 的構造

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // 引入要編譯的 code
  output: {
    // 輸出的位置，__dirname 所指為 webpack.config.js 所在位置
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js' // 打包完成品
  },
  module: {
    rules: [   // 一個 Array, 編譯這份 code 的順序
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader:"file-loader",
        options:{
          name:'[name].[ext]',
          outputPath:'assets/images/'
          //the images will be emited to dist/assets/images/ folder
        }
      },
      {
        test: /\.s[ac]ss$/i, // 一種 regex (正規表達式)，用來比對檔名，也可寫 /\.(scss|sass)$/
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],  
        // 總結，只要是 sass/scss 的副檔名，都要經過　use: [ ] 內的 loader 處理，處理順序是由最尾至前頭
      },
    ],
  },
  resolve: {
    alias: {
      //
      jquery:  'jquery/dist/jquery.min.js',
      "jquery-ui": "jquery-ui/jquery-ui.js",  
      'jquery-ui': path.resolve('./node_modules/jquery-ui/ui'),      
      // bind to modules;
      modules: path.join(__dirname, "node_modules"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery"
    })
  ]
};
```
https://ithelp.ithome.com.tw/articles/10194056

## loader 與　plugins 的差別 ?

兩者的差別在於，loader 用於轉化檔案，使 webpack 打包過程中添加原本不附帶的能力 (講是這樣講，但其實一些 loader - 如 babel 的編譯與 mibify-JS 的壓縮都內建在 webpack 之中了)，一個 loader 檔案格式為 xxx-loader.js，所以也可以自己寫來測試看看。

另外，loader 的執行順序是由下至上

而 plugins 則是就「Webpack 本身就有的能力」做強化，比如說引入是 webpack 本身的功能，我們可以利用 plugins 的設定提供引入 jQuery 等套件的能力

若更進一步從工作機制來看，loader 本身就是將一個檔案「編譯」成另一個檔案，

而 plugins 則是一個擴展工具，他處理的時點是「loader 結束後」，根據 webpack 在正常打包的過程中執行所屬任務。也就是說，就算沒有設定 plugins，webpack 也是這樣打包，設定了，也是這樣打包，只是多做一點事

https://blog.csdn.net/qq_34629352/article/details/83628917

https://blog.csdn.net/keliyxyz/article/details/51579078

## test 的寫法

陣列名稱用 use 或 loader 似乎都可以，以下用 loader 舉例

第一種 :

```javascript
  test: /\.css$/,
  loader: "style!css!sass"
```

第二種比較推薦，好讀：

```javascript
  test: /\.css$/,
  loader: ["style" , "css" , "sass"]
```

