<?php
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
$username=isset($_POST['username'])?$_POST['username']:"";
//$type=isset($_POST['type'])?$_POST['type']:"";;

if($username===""){
    echo "请求出了问题";
}else{
    try{
        require "db_helper.php";
        $sql="SELECT g.word,`character`,`interpretation`, `pronunciation`, `difficulty`, `eng_expl`, `chs_expl`, `picture` 
                FROM glossary g,vocabulary v 
                where username=? and g.word=v.word;";
        $db = new PDO($dsn, $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  //设置为异常模式
        $db->setAttribute(PDO::ATTR_AUTOCOMMIT, false);	//关闭 PDO的自动提交 
        $stmt=$db->prepare($sql);	//PDO预处理
        $stmt->bindValue(1,$username);
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
            $word_json=json_encode($data,JSON_UNESCAPED_UNICODE);
            echo $word_json;
        }else{
            echo "可惜，词库里没有这个词(　o=^•ェ•)o　┏━┓";
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }finally{
        $db=null;
    }
}
?>