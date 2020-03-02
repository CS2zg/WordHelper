<?php

if(!empty($_FILES["uploadFile"]["name"])){
    $fileinfo = $_FILES["uploadFile"]; 			//获取文件信息\
    $path="imgs/pictures/".$fileinfo['name'];
    move_uploaded_file($fileinfo['tmp_name'],"../".$path); 	//将上传的文件移动到新位置
    echo $path;//上传成功,返回文件名
}else{
    echo "0";//无文件返回0
}

?>