# 後端系統
    internet request ->
        load banlancer ->
            -> server01 -> cache -> DB ( slave, read )
            -> server02 -> cache -> DB ( slave, read )
            .....
            -> server n -> DB ( master, write) -同步-> DB ( slave, read ) -> cache

# Live coding

    https://cloud.google.com/free/docs/gcp-free-tier?hl=zh-tw GCP 問題
