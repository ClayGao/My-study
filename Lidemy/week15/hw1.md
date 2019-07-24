# Week9

## 資料庫基礎語法

- 建立資料庫

    ```sql
    CREATE DATABASE [資料庫名稱];
    ```
-----
- 刪除資料庫

    ```sql
    DROP DATABASE [資料庫名稱];
    ```
-----
- 使用資料庫

     ```sql
    USE [資料庫名稱];
    ```
-----
- 列出所有資料庫

    ```sql
    SHOW DATABASE;
    ```
-----
- 列出資料表內容

    ```sql
    DESCRIBE [資料表名稱];
    ```
-----
- 改資料表欄位

    ```sql
    ALTER TABLE [資料表名稱] CHANGE COLUMN [原欄位名] [新欄位名稱] [新欄位資料型態]
    ```
-----
- 新增資料表欄位

    ```sql
    ALTER TABLE [資料表名稱] ADD COLUMN [新欄位名稱]  [新欄位資料型態];
    ```
-----
- 刪除資料表欄位

    ```sql
    ALTER TABLE [資料表名稱] DROP COLUMN [新欄位名稱];
    ```
-----
- 刪除資料表

    ```sql
    DROP TABLE [資料表名稱];
    ```
-----
- 清空資料表 ( 保留結構、欄位與索引 )

    ```sql
    TRUNCATE TABLE [資料表名稱];
    ```
-----
**以下為重要 SQL 語法**

- 插入新欄位

    ```sql
    INSERT INTO [資料表名稱]([欄位1],[欄位2]...) VALUES([值1],[值2]...);
    ```
- 更新欄位資料

    ```sql
    UPDATE 資料表名稱 SET [欄位1]='[值1]',[欄位2]='[值2]',[欄位3]='[值3]'... [欄位n]='[值n]'
    WHERE [條件式];
    ```
    條件式 : 比如說 class = 'student', color = 'red'
-----
- 刪除資料欄位

    ```sql
    DELETE FROM [資料表名稱] WHERE [條件式];
    ```
    條件式 : 條件式與條件式之間可以用 AND 串聯

    ```sql
    DELETE FROM [資料表名稱] WHERE [條件式1] AND [條件式2];
    ```
    有 AND 當然也可以使用 OR

    ```sql
    DELETE FROM [資料表名稱] WHERE [條件式1] OR [條件式2];
    ```
    - 比對刪除

        ```sql
        DELETE FROM [資料表名稱] WHERE [條件式] LIKE '%[字串]%';
        ```
-----
- 查詢全部資料

    ```sql
    SELECT * FROM [資料表名稱];
    ```
    與 DELETE 一樣可以搭配條件式 WHERE

    ```sql
    SELECT * FROM [資料表名稱] WHERE [條件式];
    ```
    AND

    ```sql
    SELECT * FROM [資料表名稱] WHERE [條件式1] AND [條件式2];
    ```
    OR
    ```sql
    SELECT * FROM [資料表名稱] WHERE [條件式1] OR [條件式2];
    ```
-----
- 查詢**某一範圍**的欄位資料

    ```sql
    SELECT * FROM [資料表名稱] WHERE [欄位] BETWEEN [值1] AND [值2]
    ```
-----
- 查詢**單個**欄位資料

    ```sql
    SELECT [欄位名稱] FROM [資料表名稱];
    ```
-----
- 查詢**多個**欄位資料

    ```sql
    SELECT [欄位名稱1],[欄位名稱2].. FROM [資料表名稱];
    ```
-----
- 查詢**值為空**的欄位名

    ```sql
    SELECT * FROM [資料表名稱] WHERE [欄位] IS NULL;
    ```

- 查詢**特定筆數**資料

    ```sql
    SELECT * FROM [資料表名稱] LIMIT [n], [n 之後取幾筆];
    ```
    ```sql
    SELECT * FROM sample_table LIMIT 5, 20;
    ```
    就是從第 6 筆開始取 20 筆，所以是取第 6 ~ 第 26 筆
-----
- 查詢結果排序

    - 遞增

        ```sql
        SELECT * FROM [資料表名稱] ORDER BY [欄位];
        ```
        概念是比如這個欄位是 ID，有 1, 2, 3, 4....

        如此就是按照 1 2 3 4 排列

    - 遞減 ( 反向排列 )

        ```sql
        SELECT * FROM [資料表名稱] ORDER BY [欄位] DESC;
        ```
-----
- 比對字串來查詢欄位 ( 列出單一個 )

    ```sql
    SELECT [欄位] FROM [資料表名稱] WHERE [欄位] LIKE '%[字串]%';
    ```
-----
- 比對字串來查詢欄位 ( 列出所有欄位 )

    ```sql
    SELECT * FROM [資料表名稱] WHERE [欄位] LIKE '%[字串]%';
    ```
-----
**搭配 SELECT 使用的一些內建函式**

- 計算**筆數**

    ```sql
    SELECT COUNT([欄位]) 
    FROM [資料表名稱]
    WHERE [條件式];
    ```
    **條件式可以附加 IS NOT NULL 條件，表裏面有值的欄位**
    
    ```sql
    SELECT COUNT([欄位]) 
    FROM [資料表名稱]
    WHERE [欄位] IS NOT NULL;
    ```

    **搭配 DISTINCT 使用，可以不計入重複筆數，在算有幾種種類時頗好用**
    ```sql
    SELECT COUNT(DISTINCT [欄位]) 
    FROM [資料表名稱]
    WHERE [欄位] IS NOT NULL;
    ```
-----

- 取該欄位底下最大值 / 最小值

    ```sql
    SELECT MAX([欄位]) FROM [資料表名稱];
    ```

    ```sql
    SELECT MIN([欄位]) FROM [資料表名稱];
    ```

-----

- 欄位底下值加總

    ```sql
    SELECT SUM([欄位]) FROM [資料表名稱];
    ```

-----

- 欄位值總平均

    ```sql
    SELECT AVG([欄位]) FROM [資料表名稱];
    ```

##