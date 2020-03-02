<?php
$pwd=isset($_POST['pwd'])?$_POST['pwd']:"";//密码
$username=isset($_POST['username'])?$_POST['username']:"";//用户名
if($pwd==""||$username==""){
    echo "get不到数据哦😂";
}else{
    try {
        require "db_helper.php";
        $sql="UPDATE `user` set `pwd`=? where `name`=?";
        $db = new PDO($dsn, $user, $pass);
        // $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
        //$sql="update user set pwd='".$pwd."'"." where user"
        $stmt=$db->prepare($sql);	//PDO预处理
        $stmt->bindValue(1,md5($pwd));
        $stmt->bindValue(2,$username);
        $stmt->execute();
        $count = $stmt->rowCount();//受影响行
        echo $count;
    }catch (PDOException $e) {
        echo $e->getMessage();
    }finally{
        $db=null;
    } 
}
?>