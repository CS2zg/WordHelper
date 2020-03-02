<?php
/**
 * 定义一个单词类，用于存储查询数据
 */
class Word{
    public $word;
    public $character;
    public $interpretation;
    public $pronunciation;
    public $difficulty;
    public $eng_expl;
    public $chs_expl;
    public $picture;
}
require "db_helper.php";
$type=isset($_POST['type'])?$_POST['type']:"";//中英类型, 特别地type=3是查询全部单词
$q_type=isset($_POST['q_type'])?$_POST['q_type']:"";//查询类型（精确/模糊）
$word=isset($_POST['word'])?$_POST['word']:"";//需查询的词

//测试用GET
// $type=isset($_GET['type'])?$_GET['type']:"";
// $word=isset($_GET['word'])?$_GET['word']:"";

//type=1时代表cn2eu,type=2时代表eu2cn
try {
    $db = new PDO($dsn, $user, $pass);
    //echo "链接ok";
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
    $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交 
    if($type==1){
        $base_sql="select *from vocabulary where word";
        if($q_type==1){
            //精确查询
            $sql=$base_sql."='".$word."'";
        }
        else if($q_type==2){
            //模糊查询
            $sql=$base_sql." LIKE '%".$word."%'";
        }       
    }else if($type==2){
        if($q_type==1){
            //精确查询
            $sql="select *from vocabulary where interpretation='%".$word."%'";
        }else if($q_type==2){
            //模糊查询
            $sql="select *from vocabulary where interpretation like '%".$word."%'";
        }
    }else if($type==3){
        $sql="SELECT * FROM vocabulary";
    }else{
        echo "请求出了点小问题";
    }
    //echo $sql;
    $stmt=$db->prepare($sql);	//PDO预处理
    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $wordBean=new Word;
        //初始化单词对象
        $wordBean->word=$row['word'];
        $wordBean->character=$row['character'];
        $wordBean->interpretation=$row['interpretation'];
        $wordBean->pronunciation=$row['pronunciation'];
        $wordBean->difficulty=$row['difficulty'];
        $wordBean->eng_expl=$row['eng_expl'];
        $wordBean->chs_expl=$row['chs_expl'];
        $wordBean->picture=$row['picture'];

        $data[]=$wordBean;

    }
    //没有查询到数据时这里有warning
    if(sizeof($data)>0){
        //把数据转成JSON数据
        $work_json=json_encode($data,JSON_UNESCAPED_UNICODE);
        echo $work_json;
    }else{
        echo "可惜，词库里没有这个词(　o=^•ェ•)o　┏━┓";
    }
    
}catch (PDOException $e) {
    echo $e->getMessage();
} 

?>