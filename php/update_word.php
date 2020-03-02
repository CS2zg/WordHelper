<?php
/**
 * 由于前端不知是修改的那个属性
 * 所以更新数据采取先删除后添加
 */
require "db_helper.php";
//获取前端参数
$form=isset($_POST['form']) ? $_POST['form'] : '';
//$form=isset($_GET['params']) ? $_GET['params'] : '';
//echo gettype($form) ;
//print_r($form) ;
//$form="";
if($form===""){
    echo "请求出错";
}else{
    $word=$form["word"];
    $cha=$form["character"];
    //echo $word.$cha;
    try { 
    //初始化PDO对象，创建数据库连接
    $db = new PDO($dsn, $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
    $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交
    $db->beginTransaction();		//开启事务处理
    $sql_d="DELETE FROM `vocabulary` WHERE `word`=? and `character`=?";
    $stmt_d=$db->prepare($sql_d);	//PDO预处理
    
    $stmt_d->bindValue(1, $word);
    $stmt_d->bindValue(2, $cha);
    $stmt_d->execute();
    $count = $stmt_d->rowCount();//受影响行
    
    //echo $count;
    if($count==1){
        
        //$sql="insert into vocabulary(word, character, interpretation, pronunciation, difficulty, eng_expl, chs_expl, picture) values(?,?,?,?,?,?,?,?)";
        $sql="INSERT INTO `vocabulary` (`word`, `character`, `interpretation`, `pronunciation`, `difficulty`, `eng_expl`, `chs_expl`, `picture`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt=$db->prepare($sql);	//PDO预处理
        $stmt->execute(array_values($form));       
    }
    $db->commit();		//提交事务
    echo "提交成功！";  
    }catch (PDOException $e) {
        $db->rollBack();		//事务回滚
        die("提交失败！".$e->getMessage());
    }    
}
 
?>