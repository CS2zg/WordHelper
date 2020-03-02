<?php

if(!isset($_SESSION)){
    session_start();
}
header("content-type:image/png");//设置创建图像的格式
$image_width=70;//设置图像宽度
$image_height=18;//设置图像高度
srand((double)microtime()*100000);//设置随机数种子
$new_number="";
//随机输出一个4位的随机数
for($i=0;$i<4;$i++){
    $new_number.=dechex(rand(0,15));
}
$_SESSION['check_num']=$new_number; //把随机数存进session里
$num_image=imagecreate($image_width,$image_height);//创建一个画布
imagecolorallocate($num_image,255,255,255);//设置画布的颜色
for($i=0;$i<strlen($_SESSION['check_num']);$i++){
    $font=mt_rand(3,5);//设置随机数字体
    $x=mt_rand(1,8)+$image_width*$i/4;//设置随机数的x
    $y=mt_rand(1,$image_height/4);
    $color=imagecolorallocate($num_image,mt_rand(0,100),mt_rand(0,150),mt_rand(0,200));
    imagestring($num_image,$font,$x,$y,$_SESSION['check_num'][$i],$color);
}
imagepng($num_image);
imagedestroy($num_image);
?>