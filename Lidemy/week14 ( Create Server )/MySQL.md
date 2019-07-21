# MySQL View 視圖

一個關於效能的指令選擇，用途有點像是 Session 和 cache，可以將常用的指令保存一段時間，在這一段時間來利用，可以省去每次查詢重複內容的時間。

如此做可以將實體資料表的結構隱藏起來，限制使用者只可以檢視我視圖的資料表欄位

另外就是視圖是唯讀的，外部使用者無法透過視圖去修改資料庫本身內部的資料

- 省去查詢時間
- 唯讀特性
- 簡化查詢複雜度
- 就算資料表結構變更，也可以直接修改視圖即可

*******

## 「建立」視圖的具體用法為

```
CREATE VIEW view_name [(column_list)] AS
SELECT column_name(s)
FROM table_name
WHERE condition;

```
```
 CREATE VIEW TableView AS SELECT a, b, c FROM table WHERE condition
```

創建一個 View 名為 TableView，用途是來搜尋 table 內的 a, b, c, 欄位並依照 d, e, f 排序

```
 CREATE VIEW v AS SELECT qty, price, qty*price AS value FROM t;
```

創建一個 View 名為 e，用途為來資搜尋料表 t 中的　qty, price　與 qty*price 作為值的欄位

- 一個 View 可以由查詢實體資料表而建立，亦可以查詢其它已存在的 View 而建立
- View 的名稱不可重複

*******

## 「使用時」的具體用法為，這樣的使用是將 View 當作一元件做查詢

```
SELECT * FROM TableView
```

View 也可以視為一種「虛擬表格」，所以可以和一般表格一起做處理

```
SELECT, COUNT(*) FROM tableView GROUP BY g
```

*******

## 更新時的具體用法為，在 CREATE　後面加上 OR REPLACE

```
CREATE OR REPLACE VIEW view_name [(column_list)] AS
SELECT column_name(s)
FROM table_name
WHERE condition;
```

## 刪除視圖時的具體用法為

```
DROP VIEW view_name;
```

*******

## 操作案例

有一個表叫做 class_orders

| Class | Price | Quantity | 
| ------|-------|----------|
| Apple |  500  |   6000   | 
| Banana|  400  |   500    | 

創造一個 View，查詢 Apple 與 Banana 兩者產品的售出總額 ( Price * Quantity )

```
CREATE VIEW view_p_sum ( Class, P_SUM ) AS SELECT Class, Price*Quantity FROM class_orders GROUP BY Class;
```

然後我們就可以直接操作這個資料表

```
SELECT * FROM class_orders
```

*******

## View 補充

簡單來說，View 可以當作我們在寫程式時所使用的變數，將我們所需要取得的資料放裡面

這樣就可以直接使用這個 View 即可，不用每次都重複搜尋

如果要更了解，可以看[這裡](http://www.codedata.com.tw/database/mysql-tutorial-11-views/)

*******

# Stored Routines

Stored Routines 的應用，可以想像成一個腳本，從字面意思上就可以看出

由於 SQL 指令都是一行一行執行，Stored Routines 的功能就是 CREATE 一個腳本，讓我們可以一次執行 / 呼叫 ( CALL ) **數行**指令

*******
# Stored procedures

Stored procedures 是 Stored Routines 的一種具體實現的方式

要呼叫建立好的 Stored procedures 是這樣的

```
CALL new_fruits('APPLE')
```
*******

## 建立 Stored procedures

```
DELIMITER // <-- DELIMITER 為重新定義結束符號 ( 原為 ; )

CREATE PROCEDURE [proc_name] ([參數)
BEGIN
    處理邏輯
END // <-- 結尾要加上 // 以表示結束
```
[proc_name] 為 procedures 名稱

*******

## 刪除 Stored procedures

```
DROP PROCEDURE [IF EXISTS] [proc_name] 
```
*******

## 呼叫 Stored procedures

```
CALL [proc_name] ([參數)
```
*******
# Stored functions

Stored Routines 提供的另一種元件，可以建立「自定義的函式」，看看下列例子

```
CREATE FUNCTION [fun_name] ... RETURNS double(40, 3)
```
此函式固定將一個引數數值四捨五入到小數第三位

*******
## 建立 Stored functions

```
CREATE FUNCTION [func_name] ([參數1 參數1型態], [參數2 參數2型態])
RETURNS 回傳型態
BEGIN
    Function 程式碼
END
```
*******

## 使用 Stored functions

使用時也要按照參數規格，比如說我建立一個 FUNCTION

```
DELIMITER //

CREATE FUNCTION num_sum (num_a INT, num_b INT)
RETURNS INT
BEGIN
    num_a + num_b;
END

DELIMITER ;
```

那下列兩種使用方法是錯誤的:

1. 參數數量錯誤
```
-- 少一個參數
SELECT num_sum(4)

-- 多一個參數
SELECT num_sum(4, 8, 7)
```

2. 參數型態錯誤
```
-- 型態錯誤
SELECT num_sum('A', 'apple')

-- 型態錯誤，仍是字串
SELECT num_sum('4', '8')
```

*******
## 刪除 Stored functions

```
DROP FUNCTION [IF EXISTS] [func_name] 
```

*******

# 小總結

Stored Routines 其實就是 Stored procedures 與 Stored functions 的合稱

*******

# Triggers

- 案例 :
    我有一個資料表叫做 table，每當有人新增一次 table 這個資料表的資料，我都想要增加一筆訊息到 table_count 裡面，來統計我這份資料表的被新增次數。

    照理來說我可能要寫兩行：

    ```
    INSERT INTO table ....

    INSERT INTO table_count ....
    ```

這時候可以使用「triggers」，中文稱之為「觸發器」，用途是：

**先將一些特定要執行的狀況儲存 ( event )，而資料庫會在正確的時機點 ( time )執行之。**

意思就是我可以針對 table 掛一個觸發器，這個觸發器有觸發條件，當條件觸發後我可以執行敘述

## 建立 trigger 元件

```
CREATE TRIGGER [trigger_name] [time] [event] ON [table_name] FOR EACH ROW 
BEGIN
    [stmt]...
END
```

- [trigger_name] : 該觸發器的名稱，必須是唯一的不可重複

- [time] : trigger 的啟動時機，只有 BEFORE / AFTER 兩種，前者是 [event] 之前，後者反之

- [event] : 如 INSERT / UPDATE / DELETE，指定啟動的事件

    其實可以直接將 [time] 和 [event] 綜合一起看

    trigger 元件 : 每一個表格最多可以建立**六種**trigger事件，每一種僅能一個

    - BEFORE <-- [time] INSERT <-- [event]
    - BEFORE UPDATE
    - BEFORE DELETE
    - AFTER INSERT
    - AFTER UPDATE
    - AFTER DELETE


- [table_name] : 對哪個 table 掛觸發器

- [stmt] : 敘述，簡單來說就是當事件被觸發時我要幹嘛的意思，注意不可用和 transaction 相關的敘述

可以用 Javascript 的 addEventLister 理解，比如說 
```javascript
aaa.addEventLister("click",function printTarget(e) {
    console.log(e.target)
})
```
可以簡單理解是
```php
DELIMITER //

CREATE TRIGGER printTarget AFTER CLICK ON aaa FOR EACH ROW
BEGIN
    console.log(e.target);
END

DELIMITER ;
// 當然實際中沒有這種用法，只是概念理解而已
```
**要注意的是，如果資料庫發現觸發事件並沒有真的成立，也就是沒有執行成功，那麼也不會執行敘述裡面的東西**

*******

## 查看 triggers

phpmyadmin 中的「觸發器」頁面，這邊也可以直接設定

*******

## 刪除 trigger

```
DROP PROCEDURE [IF EXISTS] [trigger_name] 
```

**如果你要修改該 trigger 的敘述，必須先刪除該 trigger 再新增新的

*******


# 關於 Stored Procedures 的討論

- [討論一](https://www.facebook.com/groups/616369245163622/permalink/1315254285275111/)：

    - Stored Procedures 不應該處理所有的程式邏輯，如此一但有 Bug，找起來會很麻煩
    - 承上，還有另一個問題是如果都寫在 Stored Procedures 會造成效能過載
    - 有再次提到大型系統中，資料庫會建立「讀寫分流」與「cluster」
    - 資料庫的資源是很珍貴的

- [討論二](https://www.facebook.com/groups/616369245163622/permalink/1316314398502433/)

    - 這份討論的主內文是對於 Stored Procedures 的優點做討論，有提到在高階後端會盡量將運算和儲存弄在一個機器
    - 嗯...其他看不是很懂，如果有看懂再補上

- [討論三](https://www.facebook.com/groups/616369245163622/permalink/1315406481926558/)

    - Stored Procedures 寫出來之後要更動內容非常困難
    - 承上，所以程式邏輯不該寫在 Stored Procedures 之中
    - Stored Procedures 基本上來說是無法做單元測試的
    - 在後端中寫東西不論成功或者出錯盡量都要有 log 可以看，但是 Stored Procedures 無法顯示出 log

- [討論四](https://www.facebook.com/yftzeng.tw/posts/10209307179835921)

    - 討論四中已整理好，可以直接點進去看