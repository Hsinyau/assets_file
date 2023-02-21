// 用户名
var username;
// 密码
var password;
// 用户名下span标签
var userMsg;
// 密码下span标签
var pwdMsg;
// 声明一个标识
var flag = false;

//当前项目url
var url = document.getElementById("url").value;

// 编写检查用户名非空判断
function checkUsername() {
    //获取id值是username的html元素对象里的值
    username = document.getElementById("username").value;
    //获取id值是userMsg的html元素span
    userMsg = document.getElementById("userMsg");
    //非空判断
    if (username == "") {
        //alert("用户名不能为空!");
        //设置userMsg的css样式 字体颜色红色
        userMsg.style.color = 'red';
        //设置userMsg的值
        userMsg.innerText = "用户名不能为空!!";

        return false;
    }
    return true;
}

// 编写提交表单的ajax请求
function sendUsername() {
    if (checkUsername()) {
        //axios请求到Servlet
        axios.get(url + 'CheckUsernameServlet?username=' + username)
            //成功的回调函数<箭头函数>
            .then((res) => {
                //没有账户时不用提示
                if (res.data == 'success') {
                    userMsg.style.color = 'red';
                    userMsg.innerHTML = "该账户不存在，请先去<a href='./register.jsp'>注册</a>!";
                    flag = false;
                    return flag;
                } else {
                    flag = true;
                    //有账户时去掉提示信息
                    userMsg.innerHTML = "";
                    return flag;
                }
                //错误的回调函数
            }).catch((err) => {
            alert(err);
            return flag;
        })
    }
}

// 密码非空判断
function checkPwd() {
    // 获取id属性值是password  html元素属性的值
    password = document.getElementById("pwd").value;
    // 获取pwdMsg元素用来提示
    pwdMsg = document.getElementById("pwdMsg");

    //密码非空判断
    if (password == "") {
        pwdMsg.style.color = "red";
        pwdMsg.innerText = "密码不能为空!";
        return false;
    }
    return true;
}

/**
 * 登录提交
 */
function login() {

    if (flag == false) {
        //跳出函数
        return;
    }
    if (checkPwd() == false) {
        return;
    }
    //ajax提交到注册Servlet
    axios.post(url + '/LoginServlet?username=' + username + '&password=' + password)
        .then((res) => {
            if (res.data == 'success') {
                alert("登录成功,1秒后跳转到首页");
                //时间函数 三秒后跳转到登录页面
                setTimeout(() => {
                    window.location.href = url + 'news/index.jsp';
                }, 1 * 1000);
            } else {
                alert("用户名或密码错误，请重新输入!")
            }
        }).catch((err) => {
        alert("登录失败，请联系管理员!")
    })

}