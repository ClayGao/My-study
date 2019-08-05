**這邊主要談 flexfrog 的玩後感**

flex 的重點在於主軸與次軸．

flex 預設是由左至右嗎 ? 錯

這個說法基本上是有錯誤的，基本上是根據「語言的方向」

也就是書寫的方向

英文與中文都是由左至右，但希伯來文是由右至左

另外就是父層沒有設定寬高，可能沒有辦法達成你所要的

flex 可以應用在與 Bootstrap 與 RWD 上面，這邊的應用會比較多

- justify-content 

    控制的是「主軸」

    - center : 中間
    - space-around : 分配到每一個項目的邊邊
    - space-between : 分配在每一個項目之間

- align-items

    控制的是「次軸」, 就是「垂直」於主軸的，這點超級重要

    - flex-end : 放在尾端
    
    其餘可參考 justify-content


所有東西先去處理「主軸」再去處理「次軸」，才不會亂掉

確定好處理順序之後順序會簡單很多

- flex-ditection

    決定方向

    row -> 正向
    row-reverse -> 反向
    column -> 垂直正向
    column-reverse -> 垂直反向

    當反向之後不單只是元素反向，連起始點也是反向的

    所以

    ｜１２３　　　　　｜
　
    會變成

    ｜　　　　　３２１｜


- 順序 order

    只要比 0 大，就會往「資料的尾端」移動

    只要比 0 小，就會往「資料的起點」移動

    如果相同，就照原始碼的順序

    那何謂資料的方向？一樣是文字的方向。

- align-self

    通常用在垂直置中的技巧，只用在特定者

    [同場加映 : 23 種垂直置中方法](http://csscoke.com/2018/08/21/css-vertical-align/)

   
    其餘和 alin-item 同樣

- flex-wrap

    -　wrap : 就一般換行

    補充 : 通常先處理主軸，再處理換行

- flex-flow

    簡單來說就是一行綜合，一句話搞定一切

    ```css
    flex-flow: column wrap
    ```

- align-content 次軸的對齊

    flex-start 對齊起點

    flex-content 對其中間

    flex-end 對其終點

- 青蛙最後一關

主軸是直的 flex-flow : column-reverse wrap-reverse; 
justfy-content : center -> 主軸搞定

align-content : space-between

這邊要注意，次軸沒有逆向，因為次軸永遠是跟主軸垂直，次軸的逆向就是「換列」
所以 wrap-reverse 是換列

