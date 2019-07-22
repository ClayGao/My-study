# 網路知識

- TCP / IP 
- OSI 七層
- DNS
- 三次握手協定

上述這些需要了解

# 資料庫

- ACID
- 1NF 正規化 : 資料庫 table 的實作規則

# 系統架構基礎知識

- Load banlance
- replication ( master, slave)

# View - 虛擬的 Table

假設要做一些重複性的事情，並且只是想看其中幾攔的資訊，可以創一個 View ( 只能檢視，不能做 CRUD 的操作 )

```
CREATE VIEW order_detail 
AS
指令
```
但實務上不建議用太多的 View，或者說不要亂用

因為其實在語法中你分不出來你採用的是 table 還是 view，比如說 SELECT * FROM a_table，其實是看不出來 a_table 是資料表還是 VIEW

另外就是 VIEW 本身是不能更改的，如果要更改其實就是更改內中的 SQL query

再者，效能上也不會有太大的進步，因為實際上他也執行了 SQL query

## 補充

但有一個很合理的用途，比如說你的資料庫需要開放給外人讀資料，但是你不想給他看所有資料，這時候你可以創建一個 View 給對方使用

-------

# Stroed Procedure - 像是 SQL 的函式

先談談 SQL 的函式

```
SELECT SUM(price) FROM a_table WHERE 1
```

內中的 SUN() 是 SQL 內建的函式，內建函式也可以自己寫

但是 SP 本身還要更強大

比如說

```
SELECT * FROM `orders` WHERE user_id = 1
```

但這功能可能很常用，我不只想要看一個人，我想看誰就看誰

- 第一種方法 : 把這個函式寫在 php 裡面

```php
function getUserOrder($id) {
    $sql = 'SELECT * FROM `order` where user_id = ' . $id

    $conn->$sql
}
```
- 第二種方法 : 使用 SP ( 慎用 )

```
DELIMETER //
CREATE PROCEDURE GetOrders(id INT)
BEGIN
    SELECT * FROM orders WHERE user_id = id;
END
DELIMETER ; 
```

按下執行，創建完成

要呼叫則是

```
CALL Getoreders(2)
```
點選資料表上排上面的「預存程序」，這邊就是存放 SP 的地方

這邊也可以做編輯和刪除

## 補充

將邏輯放在資料庫，缺點是 debug 非常麻煩，你必須跳脫程式到資料庫才能修改邏輯

-------

# Triggers 發生事情前 / 後去做什麼事

所謂的「事情」其實就是 CRUD

最常用到的情境是你有一個 table，另外你想要有一個 log 去存該 table 的操作紀錄，這時候就可以使用 triggers

或者使用 php

- 第一種方法 php

```php
function updateProduct() {
    UPDATE products SET ... where product_id = id

    INSERT INTO table_log...
}
```

這邊有個缺點，就是我「必須呼叫該函式」才會記錄 log，這一邊但疏忽或偷懶都可能照成資料漏記

```
DELIMETER //
CREATE TRIGGER before _product_update BEFORE UPDATE ON products FOR EACH ROW
BEGIN
    INSERT INTO products_audit(product_id, name, price, action) VALUES(OLD.id, OLD.name, OLD.price, 'UPDATE');
END //

DELIMETER ;
```
OLD : 若時點為 AFTER，則 OLD 就是事件前的值 
NEW :若時點為 AFTER，則 NEW 就是事件後的值 








