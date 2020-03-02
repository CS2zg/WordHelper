<?php
// $username=isset($_GET['username']) ? $_GET['username'] : '12';
// $word=isset($_GET['word']) ? $_GET['word'] : '21';
$username=isset($_POST['username']) ? $_POST['username'] : '';
$word=isset($_POST['word']) ? $_POST['word'] : '';
//echo $username." ".$word."10";
/**/
if($username!="" && $word!=""){
    $arr=array($username,$word);
    require "db_helper.php";
    try{
        $db = new PDO($dsn, $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);    //设置为异常模式
        $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	                //关闭 PDO的自动提交
        $db->beginTransaction();//开启事务处理
        $sql_q="SELECT *from `glossary` WHERE `username`=? and `word`=?";
        $stmt_q=$db->prepare($sql_q);
        $stmt_q->execute($arr);
        $count=$stmt_q->rowCount();
        if($count>=1){
            echo "-1";
        }else{
            $sql="INSERT INTO `glossary` (`username`,`word`) VALUES (?, ?)";
            $stmt=$db->prepare($sql);
            $stmt->execute($arr);
            echo "1"; //插入成功，返回1
        }
        $db->commit();		  //提交事务                   
    }catch(PDOException $e){
        $db->rollBack();
        echo $e->getMessage();
    }

}else{
    echo "0";//参数为空，返回0
} 
?>