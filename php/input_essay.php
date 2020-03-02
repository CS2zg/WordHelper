<?php
header ( "Content-type: text/html; charset=UTF-8" ); //设置文件编码格式
if(!empty($_FILES["essay"])){
  function check($var) { 
    //验证数组的返回值是否为空
		return ($var != "");
  }
  //去除数组中空值
  $array = array_filter ( $_FILES ["essay"] ["name"], "check" ); 
  //print_r($array);
  //循环读取数组中数据
  foreach ( $array as $key => $value ) { 
      $original = '../tmp/';
      //定义原始文件的存储位置
      $path = $original . $value; 
      //执行上传操作
			move_uploaded_file ( $_FILES ["essay"] ["tmp_name"] [$key], $path ); 		
  }
  //把文件保存至数据库
  saveMysql($array);
  // $essay=file_get_contents("../tmp/vsCode2py.txt");
  // $essay=iconv("gb2312","utf-8" ,$essay);
  // echo $essay;
  /* 
  $fileinfo = $_FILES["upfile"]; 			//获取文件信息
  move_uploaded_file($fileinfo['tmp_name'],"tmp/".$fileinfo['name']); 	//将上传的文件移动到 
  */
}
function saveMysql($array){
  require "db_helper.php";
  try { 
    //初始化PDO对象，创建数据库连接
    $db = new PDO($dsn, $user, $pass);
    //$db->insert("set names utf8");
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
    $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	              //关闭 PDO的自动提交
    $db->beginTransaction();		                                  //开启事务处理
    
    $sql="INSERT INTO `essay` (`title`, `contents`) VALUES (?, ?)";
    //echo $sql;
    //PDO预处理
    $stmt=$db->prepare($sql);	
    foreach($array as $key => $value ){
      //构建数据
      $essay=file_get_contents('../tmp/'.$value);
      //Windows下的txt默认是为gb2312，只有将其转为utf-8才能正常使用
      $essay=iconv("gb2312","utf-8" ,$essay);
      //读取数据时为保留原格式，把空格替换成&nbsp，把换行替换成<br>
      $essay = str_replace(chr(32),"&nbsp",$essay);
      $essay = str_replace(chr(10),"<br>",$essay);
      //文件名作为文章标题，此处将文件名切成两块
      $title=explode(".",$value);
      $data=array($title[0],$essay);
      //执行
      $stmt->execute($data);
    }
    //提交事务
    $db->commit();		
    echo "<script>alert('提交成功！');window.location.href='../vocabulary.html'</script>  ";  
    }catch (PDOException $e) {
      //事务回滚
      $db->rollBack();		
      die("提交失败！".$e->getMessage());
    }finally{
      $db=null;
    }
}
?>