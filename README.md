# Dcard Junior Web Frontend Developer Take Home Test

Build a simple Dcard Reader with React from scratch.

## Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:5050
$ yarn start

# build for production
$ yarn build

# lint your code and fix if possible
$ yarn lint
```

## Structure

#### `src/core`
將 feature 相關的 component & hooks 放在這裡。

#### `src/domains`
放在這裡的 component 會以 core 底下的元件組合出頁面，並且大多是 Router 要使用的元件。

####  `src/icons`
為了結構化 icon 的使用，在此專案定義了 `IconDefinition`，並在使用 `<Icon />` 元件時引入物件而非 SVG 檔案。請將 Icon 轉換成 `IconDefinition` 並放在這裡

#### `src/ui`
- 在這裡定義了專案使用的 theme
- UI 相關的 component 放置在此


## Reflection

以下紀錄製作此專案的決策過程或反饋

#### CORS 處理
這裡是以假想情境————開發模式下 client & server 的 port 不一樣導致的 CORS 問題————來處理。

#### 自己用 webpack 建環境 vs craete-react-app
最終決定自己建有幾個考量：
1. 預期要使用 proxy
2. CRA + rewired 的方式去改寫 webpack 在過往的經驗不是很好
3. 個人練習考量：更新一下過去專案的環境建置，看有哪些地方變了

#### 使用 linters
在此專案中使用 linter，主要是想將這次機會當作啟動專案的練習（畢竟這個機會不多），且 lint-staged 算是蠻好提示自己哪裡出錯的一個機制。

#### 自己寫 Query vs 使用套件
最初沒有多想就以 apollo-client 的 API 形式自己拉了一支 query hook。雖然有達到目的但要注意的事情在寫的過程越來越多。想嘗試使用 `react-query` 但在引入的過程發生 `UncaughtPromiseError`，不太確定問題在哪裡而作罷。

#### 作業時間
- 環境建置： 3hr
- API: 3hr
- UI: 1hr
- infinite scroll: 2hr




