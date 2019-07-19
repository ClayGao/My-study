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
## Stored procedures

Stored procedures 是 Stored Routines 的一種具體實現的方式

要呼叫建立好的 Stored procedures 是這樣的

```
CALL new_fruits('APPLE')
```
*******

### 建立 Stored procedures

```
DELIMITER // <-- DELIMITER 為重新定義結束符號 ( 原為 ; )

CREATE PROCEDURE [proc_name] ([參數)
BEGIN
    處理邏輯
END // <-- 結尾要加上 // 以表示結束
```
[proc_name] 為 procedures 名稱

*******

### 刪除 Stored procedures

```
DROP PROCEDURE [IF EXISTS] [proc_name] 
```
*******

### 呼叫 Stored procedures

```
CALL [proc_name] ([參數)
```
*******
## Stored functions

Stored Routines 提供的另一種元件，可以建立「自定義的函式」，看看下列例子

```
CREATE FUNCTION [fun_name] ... RETURNS double(40, 3)
```
此函式固定將一個引數數值四捨五入到小數第三位

*******
### 建立 Stored functions

```
CREATE FUNCTION [func_name] ([參數[,...]]) RETURNS 回傳型態
as
Return
(
    Function 程式碼
)
```

*******
### 刪除 Stored functions

```
DROP FUNCTION [IF EXISTS] [func_name] 
```

*******

### 呼叫 Stored functions

```
SELECT * FROM [fun_name](參數)
```

*******

## 小總結

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

先將一些特定要執行的狀況儲存，而資料庫會在**正確的時機點**執行之。

## 建立 trigger 元件

```
CREATE TRIGGER [trig_name] [time] [event] ON [table_name] FOR EACH ROW 
BEGIN
    敘述....
END
```
[time] : trigger 的啟動時機
[event] : 如 INSERT / UPDATE / DELETE，指定啟動的事件
[table_name] : 指定此 trigger 作用的表格
[敘述] : trigger 執行的工作，有 BEGIN 與 END 區塊

*******

trigger 元件 : 每一個表格最多可以建立**六種**trigger，每一種僅能一個

- BEFORE INSERT
- BEFORE UPDATE
- BEFORE DELETE
- AFTER INSERT
- AFTER UPDATE
- AFTER DELETE

******

待補..



