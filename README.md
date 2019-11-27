# Project Regulation

## STAFF
- Producer:
- Planner:
- Director:
- Designer:
- Front-end Engineer:


## リンク集

### dev環境

https://dev.pre-stages.net/l/1900_project-name/dist/

id：plus-d / pw：user0501

### pre環境

https://pre-stages.net/_s/1900_project-name/www/

id：plus-d / pw：stage0501

### gitlub

http://52.197.84.127:8888/client/1812_project-name



## 保証ブラウザ

- IE11
- Microsoft Edge
- Google Chrome最新版
- FireFox最新版
- Safari最新版
- Android OS 4.4以上 （Chromeブラウザ）
- iOS最新


## node-version
10.15.3 （2019年3月末現在の最新安定バージョン）



## フォルダ構成

```
.
|-- README.md
|-- gulpfile.js
|-- dist 〜 検証環境に表示されるデータ（いじるべからず）
|   |-- css
|   |-- img
|   |-- index.html
|   `-- js
|
|-- package-lock.json
|-- package.json
|-- src 〜　基本的に作業するフォルダ
|   |-- _sass
|   |-- img
|   |-- js
|   |-- static 〜　コンパイルが必要ない、フォントや動画ファイルを入れる。
|   `-- pug
|-- webpack.config.js
`-- works 〜　.gitに無視されるフォルダ。デザインデータやメモ書きなど入れる。
```



- src 〜 **基本ここで作業します。pug(html)、sass(css)、javaScript、画像の追加・削除はここで。**
  **コンパイル不要なファイル（.htaccess・フォントファイルやphp、.movなどの動画ファイルやpdf等）は、staticフォルダに格納してください。**

- dist 〜 コンパイル後のフォルダ。

  pugはHTMLに、sassはCSSとしてここに吐き出される。

  **検証環境で表示されるのはこのフォルダです。**

  **このフォルダを編集してはいけません。**

- works 〜 gitで無視される作業フォルダ。

  例えば、psdデータやpptデータ、メモ等はここに格納すれば便利!



## コマンド

参考 : [【デザイナー向け】どうしてもgulp、npm、sass、pugを操作しなければならない人への説明書](https://qiita.com/yukiTTT/items/08daa80a6a3062f3e16e)


### Step.1

まず最初に

```
$ npm install
```



### Step.2

コンパイルをスタートさせたいとき

```
$ npx gulp
```

コンパイル他、browser Syncも立ち上がります。



## HTML/Pug

- BEM形式で記述。[Get BEM](http://getbem.com/)

- 各ページのpugで```block append params```以下に変数を記述。meta情報などを定義

  ここでdescriptionやtitle、ogpが管理されています。



## CSS/SASS

- **まず/src/_sass/setting/_variables.scssを確認。**

  ここでブレイクポイントや色・フォントファミリーを指定している。

### 基本的なCSSの書き方

```scss
.component {
    font-weight: bold;

    @include pc {
        font-size: pxtorem(25,'pc');
    }

    @include sp {
        font-size: pxtovw(20,'sp');
    }

    &__test {

    }
}
```



- pcだけに当てたい → ``@include pc``の中に書く。
- spだけに当てたい → ``@include sp``の中に書く。
- pcの場合、フォントサイズはremで。```pxtorem(デザインデータの値,'デバイス')```
- spの場合、フォントサイズはvwで。```pxtovw(デザインデータの値,'デバイス')```



#### ユーティリティクラス

- ```.sp-hide``` 〜 SPでは非表示にしたい時に。（brとかimgとかに使うと便利）
- ```.pc-hide``` 〜 PCでは非表示にしたい時に。



#### その他便利mixin




#### ブラウザ・OS判定

- bodyタグにOSとブラウザ名が付与されます。それを使用してください。
  - 例 : ```<body class="top mac chrome">```など。



## JavaScript

- ここだけWebpack / babel / babel polyfillを使用。ES2019で書いても、IE11で認識できるES5にトランスパイルされます。
  - エントリーポイントはmain.jsです。
  - 上記ファイルでは、例えばconstやlet、class構文、アロー関数が使用可能です。
- **外部ライブラリを使用する場合、ライブラリをnpm installした後、「import TweenMax from "gsap/TweenMax"」のように記述してください。webpackのsplitchunksによって、自動的にvendor.jsに格納されます。**

- 最初から入れている外部ライブラリは、以下の通りです。
  - jQuery v3.4.2
  - TweenMax
  - ScrollToPlugin


