# 前言

以往在老師複習週的作業都是說，將前四週的心得寫下來，如果覺得複習很累，不寫也沒關係。

其實這不會發生在我身上，因為對我來說，寫心得和複習是同一件事

但往往會變成心得寫太多，code 寫太少，我的意思不是心得裡面的 code 太少，而是專注在寫 code 時間太少

一個是觀念，一個是實作技巧，兩者缺一不可，而後者的重要性不言可喻，太重要了，可以說寫 code 才是根本

不如這樣說，其實觀念要化為實作，都是要通過 coding。觀念講得太多，而沒寫太多 codo，跟光說不練似乎沒有兩樣

所以這是未來的複習周 ( 也只剩下一次 ) 我需要去調整的。

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

## 基礎 php

基礎的 php 的程式邏輯概念在之前的 Week5 的複習周內容都有講到

if / for / function 等概念幾乎都是一樣的，這也是各個程式語言差不多相同的部分，所以這邊就不多談論基礎語法。而 echo / print_r() 等等，另外結尾一定要加 ; 也不用多說，這邊想把重點放在之前一直很弱的 OOP

啊，另外就是 -> 是使用該函式的屬性，這邊不要弄亂了

所以這邊需要特別提的反而是利用 php 連接資料庫時會用到的語法，這邊會開始介紹這週作業歸納出來的一些技能 :

**注意，重點是概念，而不是制式寫法，寫法因人而異，所以不要硬記程式碼**

- 資料庫連線

    通常我們會先寫一個 conn.php，因為在任何 php 要操縱資料庫都必須先連線，所以我們乾脆把連線這件事情放在 conn.php，然後在之後的各個檔案引入就好 ( require_once )

    ```php
    // 通常先設定好我的變數為何
    $server_name='localhost';
    $user_name='root';
    $user_password='';
    $db_name='claygao_board';

    $conn = new mysqli($server_name ,$user_name, $user_password, $db_name);
    // 一切的起源就是 mysqli 這個 class
    // 內中的伺服器名稱 / 帳號 / 密碼 / 與資料庫名的排序是固定的

    if ($conn->connect_error) { // connect_error 是內建的語法，表示連線失敗
        die('連線失敗');
    } else {
        echo '連線成功';
    }
    ```

    使用 require_once 引入 conn.php 如果成功就會持續執行，如果失敗就會停止所有連線，因為我們在 connect_error 的判斷式使用 die()，所以一旦連線失敗，後面的程序都不會執行，所以可以將它當作一道閘門。

    ```php
    require_once('conn.php'); // 放在第一行
    ```
    使用 require 的好處也是若引入的程序有錯誤，後面也會一併停止執行，對於需要處理 bug 時不失為一個很好的判錯方式。

- 用 php 對資料庫下指令

    首先我們要介紹的是「查詢」，這邊都知道 SQL 語法是 SELECT * FROM [資料表名稱]

    在 php 中對於對資料庫下指令的基礎做法是，我們會先將 SQL 語法放入一個變數之中，然後再將這個變數作為引數放入內建函式，這個內建函式會執行變數中的字串 ( SQL 語法 )

    具體作法如下 :

    ```php
    require_once('conn.php');

    $sql = "SELECT * FROM clay_table WHERE username = 'kai'";
    $result = $conn->query($sql); // 使用 query() 語法執行，同 mysql_query()，回傳執行語法的結果
    $row = $result->fetch_assoc(); // 與 fetch_array()、 fetch_row() 不同，回傳該我們找到的那一 row 並放入 $row;

    echo row['nickname']; // kaikai

    $result->free(); // 釋放記憶體
    $conn->close();
    ```
    延伸閱讀 : [fetch_assoc() 與 fetch_array()、 fetch_row() 的不同 By RicharLin.Tw](https://richarlin.tw/blog/php-mysql-fetch/)

    $result 會根據 $sql 的內容而有所不同，比如說 $sql 是 INSERT INTO ... / DELETE ... / UPDATE ... 就僅會回傳成功 ( TRUE ) 或失敗 ( FALSE )，這邊應該很好理解，根據你對資料庫做的動作決定回傳值

    ```php
    require_once('./conn.php');
    $title = $_POST['title']; // $_POST 用來接收前端 FORM 中 name 為 title 的 input/ textarea value
    $content = $_POST['content']; // 同上
    
    if ( empty($title) || empty($content)) {
        echo "<script>alert('標題和內容不可空白唷 !');parent.location.href='./write.php';</script>";
    } else {
        $sql = "INSERT INTO claygao_comments(title, content, nickname, id_number) VALUES('$title', '$content', '$nickName', '$id_number')"; // 變數以 '' 包起
        $result = $conn->query($sql); // 由於是 INSERT INTO，這邊的 result 將會是 TRUE / FALSE
        if ($result) {   
            echo "<script>alert('發文成功 !');parent.location.href='./index.php';</script>";
        } else {
            echo "<script>alert('發文失敗，請洽管理員 !');parent.location.href='./write.php';</script>";
        }
        $result->free();
    }

    $conn->close();
    ```

    至於 $sql 中的語法格式正不正確，老師提供一個很好的建議，就是直接將語法丟到 phpMyAdmin 的 SQL 執行看是否成功就好。

- 其餘 php 語法

    另外這一周也有提到一些 php 常用語法，這邊一一介紹，這周的作業是寫一個簡易留言板，相對而言也代表我們僅用到了以下語法就可以做出基礎留言板的創建。

    ```php
    empty() // 判斷值是否為 null
    isset() // 判斷變數是否為空
    ```
    這邊原本在課程作業中使用沒有感覺，因為在作業中，我們用 empty() 判斷輸入值是否為空 ( null )，用 isset 判斷「變數有沒有被賦值」

    但其實兩者很像，所以我們特別提一下如何區分兩者，看看下列的測試

    ```php
    // $a 不設置
    $b = null;
    $c = 0;
    $d = 1;
    $e = "";
    $f = "abc";

    // 變數是否設置 ?
    echo isset($a); // $a 不存在 => FALSE 
    echo isset($b); // $b = null => FALSE
    echo isset($c); // $c = 0 => TRUE 
    echo isset($d); // $d = 1 => TRUE
    echo isset($e); // $e = "" => TRUE
    echo isset($f); // $f = "abc" => TRUE

    // 變數內值是否為空 ? 沒有就回傳 1 ( TRUE )
    echo empty($a); // $a 不存在 => TRUE
    echo empty($b); // $b = null => TRUE
    echo empty($c); // $c = 0 => TRUE 
    echo empty($d); // $d = 1 => FALSE
    echo empty($e); // $e = "" => TRUE
    echo empty($f); // $f = "abc" => FALSE
    ```
    有趣的是，對於 empty() 來說，$a 算是空值，而對 isset() 來說，$b = null 也算是變數沒有被賦值。

    所以歸納而言 :
    
        isset() 判斷的在於「變數有沒有被賦值」，沒有賦值的情況包括變數為 null，變數為 0、空字串或 false 都會被當作有被賦軸。

        empty() 則是判斷變數內的值，值為空的情況包括變數不存在。變數為 0、空字串或 false 都會被當作值為空。

    -------

    繼續來看

    ```php
    $_POST['input_name'] // 接收 method 為 POST 的 From input
    $_GET['input_name'] // 接收 method 為 GET 的 From input
    ```
    這邊就是後端來接收前端傳來的值，不論前端用 form / ajax 都是同樣用法。

    ```php
    header:('location: ./index.php') // 回傳 header 內容為 location : 路徑，如此會跳回首頁
    die(); // 中斷後面程序並顯示內容，() 內可以輸入訊息字串
    exit(); // 功能上同 die()
    ```
    基本功能上 die() 與 exit () 是相同的，只有在使用時有些許的不同：

    如果需要提前終止程序，使用 exit()
    如果判斷程序出錯，使用 die()

    但初學者可以先不用注意這類分別。

    ```php
    $conn->close(); // 關閉資料庫連線
    $result->free(); // 釋放記憶體空間 
    ```
    關閉資料庫連線是一個良好習慣，通常會放在腳本型頁尾 ( 雖然我的作業都沒有加QQ )
    釋放記憶體這邊就見仁見智了，不過我覺得這習慣應該也不錯就是了

## cookie 與 SESSION 機制

這邊經過四週作業的洗禮，總算比較明白 Cookie 與 Session 機制，所以這邊再重新闡述一次兩者。

首先，初學者應該明白的是，網路上討論 Cookie 和 Session 時，都沒有特地去講他們當下討論的是「機制」還是 Cookie 或 Session 本身，這樣很容易造成對象混淆，所以我們先從機制來講。

- **Cookie 機制**與 **Cookie**

    Cookie 機制簡單來說就是產生前端與後端互傳的小紙條，而這張小紙條有個特性，那就是當前端發送 Request 到 Server 時就會「自動帶上」，這張小紙條我們稱之為 Cookie。

    根據這個自動帶上的特性，我們可以把一些必要資訊夾帶在 Cookie 裡面，以免在同一時期我都需要特定再設定這些資訊帶上。所以 Cookie 機制可以很方便我們在某一段時間內重複瀏覽網頁時帶上這些會重複使用的資訊，省下許多的工作。

    Cookie 本身可以由後端發送給前端，但 Cookie 本身存放的位置會在「使用者」端，大多數都由瀏覽器這邊發送給後端。這意味著使用者可以自行更改 Cookie 本身的內容，所以 Cookie 本身是不夠安全的。

    基本上 Cookie 本身就是一個容器，裝載的內容無所限制，儘管 Cookie 的內容分為 Name 與 Value，但是由於 Value 可以自行更改，所以 Cookie 本身並不適合存放一些高機密資料，以免被盜取偽造。
    
    另外就是 Cookie 本身的大小也有所限制，是 1024 KB。

- **Session 機制**與 **Session**

    SESSION 機制並非一開始就被內建在程式語言之中，這個機制的概念可以比擬「通行證」的設計，假設你是一位訪客，你造訪一棟大廈，警衛室發給你一張「通行證」，之後你只要出示這張通行證，我就會認為你是誰誰誰，並且我就知道你有通行的資格。

    並且當你確定結束這趟造訪的時候，你需要把通行證繳交回來，斷開你與通行證的關係。

    這邊有三個重點：
    1. 當使用者出示通行證的時候，我就會認為你是「誰」
    2. 當使用者出示通行證的時候，我知道你有「通行的資格」
    3. 當你確定「結束」這趟造訪的時候，「斷開」你與通行證的關係。

    第一點，也就是認證不認人，如果別人拿著你的通行證來驗證，我也會把那個人當作你，讓他通過。
    第二點，承上，只要你有證，你就有通行的資格。
    第三點，如同你造訪大樓一樣，離開時要換證，要把通行證還給警衛室，如此你就與這張通行證沒有關係了。

    那麼，第一個問題，如果這樣的功能要加入我們留言板網站的會員驗證，該怎麼做呢？

    核心關鍵「通行證」該如何實現？

    在 Week9 的作業中，我們的作法是將這個「通行證」用 Cookie 機制來實現，只要每次連線都可以帶上可以驗證我們身分的 Cookie，那我就不必每次都要輸入帳號密碼登入了。

    而由於「通行證」是大樓本身－也就是後端要發給我的，所以當我第一次登入成功的時候，後端若要發給我這張通行證 Cookie，需要使用以下語法：
    
    ```php
    if ( verify === true ) {
        echo "登入成功 ! ";
        setcookie("member_id", "001", time()+3600*24); //setcookit(name,value,有效時間)
    }
    ```
    使用 setcookie 這個語法，我發送了一個名為 member_id 的 Cookie 給使用者，而這個 Cookie 過了 24 小時之後便會自動銷毀。

    而在驗證上，我做了一個最簡單的驗證，只要你名為 member_id 的 Cookie 值不為空，我就當作你擁有通行證，有通行資格。

    ```php
    // 使用者連線到網站

    require_once('./conn.php');

    if(!isset($_COOKIE["member_id"])) { 
        echo "目前是登出狀態";
    } else {
        echo "目前是登入狀態";
    }
    ```

    $_COOKIE["member_id"] 可讓後端接收名為 member_id 的 Cookie 的值，這邊可以看到我的驗證條件設定為「裡面有值」就能通過

    這樣當然是非常非常非常非常不安全的，前面有提過，Cookie 是可以由使用者自己創造與修改的，所以我只要在瀏覽的時候自行創造一個名為 member_id 的 Cookie，然後在 Value 裡面打幾個字，我就可以登入成功了。

    上述其實都已經實現了「第一點」與「第二點」，現在如果我們要斷開與此通行證的連結，要怎麼做呢？

    我們把這個斷開實作在網站的「登出」功能。

    在 Week9 中我們的做法是，當你按下登出時，發送一個同樣名為 member_id 但值為空的 Cookie，基於 Cookie 同名會覆蓋的特性，這份值為空的 Cookie 會覆蓋會員原先的那份 Cookie，如此等同於你擁有的 Cookie 無效。

    ```php
    // 按下登出之後

    setcookie("member_id", "", time()+3600*24); // 雖然是賦予""，但其實是空值，而非空字串
    header("Location: ./index.php");
    ```

    這就是我們最初設計的 Session 機制，後面幾週都還會再升級，請繼續往下看下幾週心得。

## php 物件導向

