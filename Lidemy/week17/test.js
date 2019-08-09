var a = 1
function test() {
    var b = 2
    function inner() {
        var c = 3
        console.log(b)
        console.log(a)
    }
    inner()
}

test()