<?php
class Essay{
    public $id;
    public $title;
    public $content;
}
require "db_helper.php";
$type=isset($_POST['type'])?$_POST['type']:"";
//$type=isset($_GET['type'])?$_GET['type']:"";
if($type===""){
    echo "请求出了问题";
}else{
    try{
        if($type==="all"){
            $sql="SELECT id,title FROM essay";
        }else{
            $sql="SELECT * FROM essay WHERE id='".$type."'";
        }
        
        $db = new PDO($dsn, $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
        $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交 
        $stmt=$db->prepare($sql);	//PDO预处理
        $stmt->execute();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $essay=new Essay();
            $essay->id=$row['id'];
            $essay->title=$row['title'];
            $type==="all" ? $essay->content="" : $essay->content=$row['contents'];
            $data[]=$essay;
        }
        //没有查询到数据时这里有warning
        if(sizeof($data)>0){
            if($type==="all"){
                //把数据转成JSON数据
                $essay_json=json_encode($data,JSON_UNESCAPED_UNICODE);
                echo $essay_json;
               
            }else{ 
                echo $essay->content;
            }
            

        }else{
            echo "0";
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }finally{
        $db=null;
    }
}
?>