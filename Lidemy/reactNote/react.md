# React 心得筆記

這邊是因應課程結束後觀看 React 小書所記錄的筆記，

原因是因為即使 Week24 之後，仍覺得對 React 不夠熟悉

於是之後跑去看 React 小書，發現原來自己基礎概念相當不足

這記錄此筆記加深印象與熟悉用法

由於這篇只記錄重點，不是手把手教學

所以可能不會做得很細，要很細推薦您親自去看 React 小書

## JSX

JSX 在編譯的時候會變成 JavaScript Object 然後才轉換成 DOM，

也就是 JSX => JS Obj => DOM

之所以沒有直接轉化成 DOM 是因為中間的 JS DOM 可能要轉化成其他東西

比如說手機 APP，而這邊也跟 Virtual DOM 有些關聯

也就是說有了 JS Obj 之後就可以比較跟上一次的 Obj 相比有哪邊不同

有不同的部分才會渲染，大大提升效能

## Render

每一個組件都必須要有 render，，表達式用 `{}`，裡面可以放任何 JS 

```javascript
render () {
  return (
    <div>
      <h1>React 小书 {(function () { return 'is good'})()}</h1>
    </div>
  )
}
...
```

這樣也會回傳 "is good"，你可以注意到上面是一個 IFEE 執行函式，

注意 "{}" 表達式也可以放在標籤屬性之中，不一定要當作 children

關於這點補充，因為 `class` 是 JavaScript 的關鍵字，所以我們才要用 `className`

另外要介紹的就是關於二元運算子的特殊用法：

```javascript
<h1>
    <div>
        {isGood 
        ? <div> ok </div>
        :<div>not ok</div>}
    <div>
</h1>
```

這是我們在作業中常常寫到的，當然我們也可以使用以下這種用法：


```javascript
<h1>
    <div>
        {isShow
        ? <div>showMe!</div>
        :null}
    <div>
</h1>
```

比起之前將 `css` 中的 `display:none`，這樣的做法看起來更簡潔

另外我們還可以這樣做：

```javascript
const show = <div>showMe!</div>
const dispair = <div>youCantSeeMe</div>
<h1>
    <div>
        {isShow
        ? show
        : dispair}
    <div>
</h1>
```

這種作法稱為元素變數，個人是蠻喜歡這種用法的

```javascript
renderGoodWord (goodWord, badWord) {
  const isGoodWord = true
  return isGoodWord ? goodWord : badWord
}

render () {
  return (
    <div>
      <h1>
        React 小书
        {this.renderGoodWord(
          <strong> is good</strong>,
          <span> is not good</span>
        )}
      </h1>
    </div>
  )
}
```
這邊的解釋是，我有一個函式，最後會回傳兩個變數，然後我將兩個元素帶入當參數

覺得這用法很酷，但目前不知道會用在哪裏就是了

## 監聽事件

有一個重點是，`on*` 事件不能用在 Component 標籤上，只能用在 Html 標籤

我們如果放在 Component 標籤上，那樣會很像是 Props

另外就是 `e` 這個物件不是瀏覽器提供的，這和我們原本寫原生 JavaScript 與 jQuery 的概念不一樣，`e` 在這邊是由 React.js 幫忙建構的

這樣的好處是也不用考慮到不同瀏覽器對 `e` 的支援度，有一種齊頭式平等的感覺

```javascript
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(e.target.innerHTML)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle}>React 小书</h1>
    )
  }
}
// 每次都會印出 React 小書
```
另外關於監聽事件中 Function 的 this，會是 null or undefined

```javascript
  handleClickOnTitle (e) {
    console.log(this) // => null or undefined
  }
```
小書的寫法是：
>这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。

>如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js。

這邊就是老師教的，如果你要直接用同個 Component 裡面的 Function 內的 this，你就必須在執行的時候使用 `.bind(this)`

*這邊還是不太懂，可能需要回去看老師教材*  






