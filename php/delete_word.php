<?php
$word=isset($_POST['word'])?$_POST['word']:"";//单词
$cha=isset($_POST['character'])?$_POST['character']:"";//词性

if($word==""||$cha==""){
    echo "get不到数据哦😂";
}else{
    try {
        require "db_helper.php";
        $db = new PDO($dsn, $user, $pass);
        //echo "链接ok";
        //$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
        //$db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交 
        #注：列名character是一个坑，貌似是mysql里的专用词

        $sql="DELETE FROM `vocabulary` WHERE `word`=? and `character`=?";
        $stmt=$db->prepare($sql);	//PDO预处理
        
        $stmt->bindValue(1, $word);
        $stmt->bindValue(2, $cha);
        //$sql="DELETE FROM vocabulary WHERE word= '".$word."' and interpretation= '".$cha."'";
        
        //get请求删除不了它
        $stmt->execute();
        $count = $stmt->rowCount();//受影响行
        echo $count;//删除成功返回1
        //echo $word.$cha;
    }catch (PDOException $e) {
        echo $e->getMessage();
    }finally{
        $db=null;
    } 
}
?>