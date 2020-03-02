<?php
if(!isset($_SESSION)){
    session_start();
}
//从session中取出验证码
$syz=$_SESSION['check_num'];
$userForm=$_POST['user'];
//echo $user['checkcode'];
if($syz!=$userForm['checkcode']){
    echo "0";//返回0，验证码错误
}else{
    require "db_helper.php";
    try{
        $db = new PDO($dsn, $user, $pass);
        //$sql="select * FROM user where name='".$userForm['name']."' and pwd='".$userForm['pwd']."'";
        $sql="select * FROM user where name=? and pwd=?";
        $stmt=$db->prepare($sql);
        array_pop($userForm); 
        $stmt->bindValue(1,$userForm['name']);
        //把密码进行md5加密
        $stmt->bindValue(2,md5($userForm['pwd']));
        $stmt->execute();
        $res=$stmt->fetchColumn();
        if(empty($res)){
            echo "-1";
        }else{
            echo "1";
        }
    }catch(Exception $e){
        echo $e->getMessage();
    }finally{
        $db=null;    
    } 
}

?>