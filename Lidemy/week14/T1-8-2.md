# Lesson 8-2 

- 網址 https://www.lidemy.com/courses/378582/lectures/5786360

- NoSQL ( Not Only SQL )

    - 不是叫你不要用資料庫，稱為非關聯資料庫，沒有 Scema
    - 可以存類似 JSON 結構的資料，而且資料通常都存很大量
    - 不支援 JOIN
    - 代表性資料庫 : MongoDB

- Transaction 交易

    - 想像成交易，比如說 A 給 20 塊給 B， A -20 , B +20 這是兩步驟，兩步驟不可分割
    - 應用有轉帳 / 交易 / 購物

- ACID [參考文章](https://www.zhihu.com/question/31346392)

    基於保證 Transaction 的正確性，有以下四特性

    - Atomicity 原子性 - 像原子般緊密的不可分割，要嘛都成功，或者都失敗
    - consistency 一致性 - 維持資料一致性 ( 如錢的數目相同 )
    - isolation 隔離性 - 多筆交易不會相互影響 ( 不能同時改同一個值，每筆交易分開處理 )
    - durability 持久性 - 交易成功之後，寫入的資料不會不見 ( 如帳目 )

- 在 Mysql 用 Transaction

    ```php
    $conn->autocommit(FALSE); //關掉，避免自動 commit
    $conn->begin_transaction();//啟動 transaction
    $conn->query("update from money set amount = 20");
    $conn->query("update from money set sum = 10");
    $conn->commit(); // 真正執行上述兩個指令，要嘛一起成功，或者一起失敗
    ```
    如此就是一個 transaction

    另外你也可以多設一點指令，甚至弄一千個，這樣也會比較快

    另外在 MySQL 裡面的型態可以看到 InnoDB，代表這是支援 transcation，與 LOCK

- Lock

     ```php
    $conn->autocommit(FALSE); //關掉，避免自動 commit
    $conn->begin_transaction();//啟動 transaction
    $conn->query("SELECT amount form products for update");// for update 
    $conn->commit(); // 真正執行上述兩個指令，要嘛一起成功，或者一起失敗
    ```
    先談談競爭危害

    這邊講的是說如果有兩個 request 都往同一個後端，那要怎麼辦？

    如果今天有一千個獲一萬個呢？

    ```php
    require_once('./conn.php');

    $stmt = $conn->prepare("SELECT amount from products where id = 1");
    $stmt-> execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "amount" . $row['amount'];

        if($row['amount'] > 0){
            $stmt = $conn->prepare("UPDATE products SET amount = amount - 1 where id = 1");
            if ($stmt->execute()) {
                echo '購買成功 !';
            }
        }
    }

    $conn->close();
    ```

    上列是看資料庫裏面如果數量大於 0，我就 -1 ，很像搶購的意思

    由於非同步的關係所以同步傳送同時到，這時候同時處理就會造成可能剩一個但是 1 -2 少於 0..

    所以我們需要 LOCK，將資料鎖起來，避免這種狀況

    - LOCK 要在 transcation 裡面才有用 ($conn->begin_transaction();)

        ```php
        require_once('./conn.php')

        $conn->autocommit(FALSE); //關閉自動 commit
        $conn->begin_transcation();// 開啟 transcation
        $stmt = $conn->prepare("SELECT amount from products where id = 1 for update");//for update -> LOCK
        $stmt-> execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo "amount" . $row['amount'];

            if($row['amount'] > 0){
                $stmt = $conn->prepare("UPDATE products SET amount = amount - 1 where id = 1");
                if ($stmt->execute()) {
                    echo '購買成功 !';
                }
            }
        }

        $conn->commit();
        $conn->close();

        ```
        
        for update 加在指令中，將會把 id=1 的這個 row 給 LOCK 起來 ( 伴隨一點點效能損耗 )
        當跑到 $stmt = $conn->prepare，的時候，程式碼就被鎖起來了
        鎖起來之後就會開始判斷程式邏輯
        一直到　$conn->commit();　時，鎖才解開（斷開鎖鍊！）然後讀到的數量是你上面邏輯判斷完之後的數量

        其實簡單來講只要一鎖起來就像是你蝦皮下訂單一樣，你可以先下，之後你就不用擔心你在付款這段期間東西被別人買走

        這樣就可以解決超賣的問題，但要注意效能上的損耗

        - LOCK 的等級

            有指定，如 id = 1 是鎖該列

            沒有指定，如果沒有 id = 1 的時候是「鎖整個 TABLE」但其實沒什麼必要

        







