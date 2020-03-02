<?php
$word=isset($_POST['word'])?$_POST['word']:"";//单词
$username=isset($_POST['username'])?$_POST['username']:"";//用户名
// $username="we";
//$word="we";
if($word==""||$username==""){
    echo "get不到数据哦😂";
}else{
    try {
        require "db_helper.php";
        $sql="DELETE from glossary where username=? and word=?";
        $db = new PDO($dsn, $user, $pass);
        // $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
        // $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交 
        $stmt=$db->prepare($sql);	//PDO预处理
        $stmt->bindValue(1,$username);
        $stmt->bindValue(2,$word);
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
