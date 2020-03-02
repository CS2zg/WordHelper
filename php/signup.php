<?php
/*
    插入数据时，先查找是否有相同的用户名。
    如果有，返回0，不予插入；
    如果没有，插入数据，返回1.
*/
$userForm=$_POST['user'];
require "db_helper.php";
try{
    $db = new PDO($dsn, $user, $pass);
    $sql_q="select * FROM user where name=?";
    $stmt=$db->prepare($sql_q);
    $stmt->bindValue(1,$userForm['name']);
    $stmt->execute();
    $res=$stmt->fetchColumn();
    if(empty($res)){
        $sql_i="insert into user(name,pwd) values(?,?)";
        $stmt_i=$db->prepare($sql_i);
        //把确认密码这个属性弹出
        //array_pop($userForm);
        //把密码使用MD5加密,新建数组
        $userNForm=array($userForm["name"],md5($userForm["pwd"]));
        //把表单的键去除
        $stmt_i->execute(array_values($userNForm));
        //返回1，插入数据成功
        echo "1";
    }else{
        //返回0，找到相同用户名
        echo "0";
    }
    
}catch(Exception $e){
    echo $e->getMessage();
}finally{
    $db=null;    
}
?>