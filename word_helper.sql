-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: word_helper
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `essay`
--

DROP TABLE IF EXISTS `essay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `essay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `contents` mediumtext,
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `essay`
--

LOCK TABLES `essay` WRITE;
/*!40000 ALTER TABLE `essay` DISABLE KEYS */;
INSERT INTO `essay` VALUES (5,'vsCode2py',' File \"<stdin>\", line 1\r\n    F:/Anaconda3/python.exe \"c:/Users/Asus/Desktop/第2章 Python基础知识/任务程序/code/实训1.py\"\r\n      ^\r\nSyntaxError: invalid syntax\r\n\r\n重置python路径为：python\r\n\r\n网易MUMU模拟器：adb connect 127.0.0.1:7555\r\n\r\n \"男装内衣\":{\r\n        \"男士T恤\":[\"\"],\r\n        \"休闲裤\":[],\r\n        \"男子外套\":[],\r\n        \"衬衫\":[],\r\n        \"男士配饰\":[]\r\n    },\r\n'),(6,'python小猪佩奇','# coding:utf-8\r\nimport turtle as t\r\n\r\nt.pensize(4)\r\nt.hideturtle()\r\nt.colormode(255)\r\nt.color((255,155,192),\"pink\")\r\nt.setup(840,500)\r\nt.speed(10)\r\n\r\n#鼻子\r\nt.pu()\r\nt.goto(-100,100)\r\nt.pd()\r\nt.seth(-30)\r\nt.begin_fill()\r\na=0.4\r\nfor i in range(120):\r\n    if 0<=i<30 or 60<=i<90:\r\n        a=a+0.08\r\n        t.lt(3) #向左转3度\r\n        t.fd(a) #向前走a的步长\r\n    else:\r\n        a=a-0.08\r\n        t.lt(3)\r\n        t.fd(a)\r\nt.end_fill()\r\n\r\nt.pu()\r\nt.seth(90)\r\nt.fd(25)\r\nt.seth(0)\r\nt.fd(10)\r\nt.pd()\r\nt.pencolor(255,155,192)\r\nt.seth(10)\r\nt.begin_fill()\r\nt.circle(5)\r\nt.color(160,82,45)\r\nt.end_fill()\r\n\r\nt.pu()\r\nt.seth(0)\r\nt.fd(20)\r\nt.pd()\r\nt.pencolor(255,155,192)\r\nt.seth(10)\r\nt.begin_fill()\r\nt.circle(5)\r\nt.color(160,82,45)\r\nt.end_fill()\r\n\r\n#头\r\nt.color((255,155,192),\"pink\")\r\nt.pu()\r\nt.seth(90)\r\nt.fd(41)\r\nt.seth(0)\r\nt.fd(0)\r\nt.pd()\r\nt.begin_fill()\r\nt.seth(180)\r\nt.circle(300,-30)\r\nt.circle(100,-60)\r\nt.circle(80,-100)\r\nt.circle(150,-20)\r\nt.circle(60,-95)\r\nt.seth(161)\r\nt.circle(-300,15)\r\nt.pu()\r\nt.goto(-100,100)\r\nt.pd()\r\nt.seth(-30)\r\na=0.4\r\nfor i in range(60):\r\n    if 0<=i<30 or 60<=i<90:\r\n        a=a+0.08\r\n        t.lt(3) #向左转3度\r\n        t.fd(a) #向前走a的步长\r\n    else:\r\n        a=a-0.08\r\n        t.lt(3)\r\n        t.fd(a)\r\nt.end_fill()\r\n\r\n#耳朵\r\nt.color((255,155,192),\"pink\")\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-7)\r\nt.seth(0)\r\nt.fd(70)\r\nt.pd()\r\nt.begin_fill()\r\nt.seth(100)\r\nt.circle(-50,50)\r\nt.circle(-10,120)\r\nt.circle(-50,54)\r\nt.end_fill()\r\n\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-12)\r\nt.seth(0)\r\nt.fd(30)\r\nt.pd()\r\nt.begin_fill()\r\nt.seth(100)\r\nt.circle(-50,50)\r\nt.circle(-10,120)\r\nt.circle(-50,56)\r\nt.end_fill()\r\n\r\n#眼睛\r\nt.color((255,155,192),\"white\")\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-20)\r\nt.seth(0)\r\nt.fd(-95)\r\nt.pd()\r\nt.begin_fill()\r\nt.circle(15)\r\nt.end_fill()\r\n\r\nt.color(\"black\")\r\ncreate table 360urls(\r\n    id int primary key auto_increment,\r\n    urlname varchar(50),\r\n    urlhref varchar(1000)\r\n     );\r\n\r\nt.pu()\r\nt.seth(90)\r\nt.fd(12)\r\nt.seth(0)\r\nt.fd(-3)\r\nt.pd()\r\nt.begin_fill()\r\nt.circle(3)\r\nt.end_fill()\r\n\r\nt.color((255,155,192),\"white\")\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-25)\r\nt.seth(0)\r\nt.fd(40)\r\nt.pd()\r\nt.begin_fill()\r\nt.circle(15)\r\nt.end_fill()\r\n\r\nt.color(\"black\")\r\nt.pu()\r\nt.seth(90)\r\nt.fd(12)\r\nt.seth(0)\r\nt.fd(-3)\r\nt.pd()\r\nt.begin_fill()\r\nt.circle(3)\r\nt.end_fill()\r\n\r\n#腮\r\nt.color((255,155,192))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-95)\r\nt.seth(0)\r\nt.fd(65)\r\nt.pd()\r\nt.begin_fill()\r\nt.circle(30)\r\nt.end_fill()\r\n\r\n#嘴\r\nt.color(239,69,19)\r\nt.pu()\r\nt.seth(90)\r\nt.fd(15)\r\nt.seth(0)\r\nt.fd(-100)\r\nt.pd()\r\nt.seth(-80)\r\nt.circle(30,40)\r\nt.circle(40,80)\r\n\r\n#身体\r\nt.color(\"red\",(255,99,71))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-20)\r\nt.seth(0)\r\nt.fd(-78)\r\nt.pd()\r\nt.begin_fill()\r\nt.seth(-130)\r\nt.circle(100,10)\r\nt.circle(300,30)\r\nt.seth(0)\r\nt.fd(230)\r\nt.seth(90)\r\nt.circle(300,30)\r\nt.circle(100,3)\r\nt.color((255,155,192),(255,100,100))\r\nt.seth(-135)\r\nt.circle(-80,63)\r\nt.circle(-150,24)\r\nt.end_fill()\r\n\r\n#手\r\nt.color((255,155,192))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-40)\r\nt.seth(0)\r\nt.fd(-27)\r\nt.pd()\r\nt.seth(-160)\r\nt.circle(300,15)\r\nt.pu()\r\nt.seth(90)\r\nt.fd(15)\r\nt.seth(0)\r\nt.fd(0)\r\nt.pd()\r\nt.seth(-10)\r\nt.circle(-20,90)\r\n\r\nt.pu()\r\nt.seth(90)\r\nt.fd(30)\r\nt.seth(0)\r\nt.fd(237)\r\nt.pd()\r\nt.seth(-20)\r\nt.circle(-300,15)\r\nt.pu()\r\nt.seth(90)\r\nt.fd(20)\r\nt.seth(0)\r\nt.fd(0)\r\nt.pd()\r\nt.seth(-170)\r\nt.circle(20,90)\r\n\r\n#脚\r\nt.pensize(10)\r\nt.color((240,128,128))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(-75)\r\nt.seth(0)\r\nt.fd(-180)\r\nt.pd()\r\nt.seth(-90)\r\nt.fd(40)\r\nt.seth(-180)\r\nt.color(\"black\")\r\nt.pensize(15)\r\nt.fd(20)\r\n\r\nt.pensize(10)\r\nt.color((240,128,128))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(40)\r\nt.seth(0)\r\nt.fd(90)\r\nt.pd()\r\nt.seth(-90)\r\nt.fd(40)\r\nt.seth(-180)\r\nt.color(\"black\")\r\nt.pensize(15)\r\nt.fd(20)\r\n\r\n#尾巴\r\nt.pensize(4)\r\nt.color((255,155,192))\r\nt.pu()\r\nt.seth(90)\r\nt.fd(70)\r\nt.seth(0)\r\nt.fd(95)\r\nt.pd()\r\nt.seth(0)\r\nt.circle(70,20)\r\nt.circle(10,330)\r\nt.circle(70,30)\r\nt.done()'),(10,'README','MySQL Connector/J @MYSQL_CJ_VERSION@ (formerly MM.MySQL)\r\nMySQL AB\'s JDBC Driver for MySQL\r\nCopyright (c) 2003 MySQL AB\r\n\r\nCONTENTS\r\n\r\n* License\r\n* Documentation Location\r\n\r\n\r\nLICENSE\r\n\r\nMySQL Connector/J is licensed under the GPL or a commercial license\r\nfrom MySQL AB. \r\n\r\nIf you have licensed this product under the GPL, please see the COPYING\r\nfile for more information. \r\n\r\nThere are special exceptions to the terms and conditions of the GPL \r\nas it is applied to this software. View the full text of the \r\nexception in file EXCEPTIONS-CONNECTOR-J in the directory of this \r\nsoftware distribution.\r\n\r\nIf you have licensed this product under a commercial license from\r\nMySQL AB, please see the file \"MySQLEULA.txt\" that comes with this \r\ndistribution for the terms of the license.\r\n\r\nIf you need non-GPL licenses for commercial distribution please contact \r\nme <mark@mysql.com> or <sales@mysql.com>.\r\n\r\n\r\nDOCUMENTATION LOCATION\r\n \r\nThe documentation formerly contained in this file has moved into the \r\n\'doc\' directory, where it is available in HTML, PDF and plaintext\r\nforms.\r\n\r\nYou may also find the latest copy of the documentation on the MySQL\r\nwebsite at http://dev.mysql.com/doc/refman/5.0/en/connector-j.html\r\n\r\n--\r\nThis software is OSI Certified Open Source Software.\r\nOSI Certified is a certification mark of the Open Source Initiative.\r\n\r\n\r\n');
/*!40000 ALTER TABLE `essay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `glossary`
--

DROP TABLE IF EXISTS `glossary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `glossary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `word` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `glossary`
--

LOCK TABLES `glossary` WRITE;
/*!40000 ALTER TABLE `glossary` DISABLE KEYS */;
INSERT INTO `glossary` VALUES (6,'root','route'),(7,'root','obey'),(9,'root','discard'),(10,'root','yield'),(11,'zg','abandon'),(12,'zg','address');
/*!40000 ALTER TABLE `glossary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `name` varchar(45) NOT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('me','123456'),('root','e10adc3949ba59abbe56e057f20f883e'),('zg','e10adc3949ba59abbe56e057f20f883e');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vocabulary`
--

DROP TABLE IF EXISTS `vocabulary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vocabulary` (
  `word` varchar(30) NOT NULL,
  `character` varchar(5) NOT NULL,
  `interpretation` varchar(50) DEFAULT NULL,
  `pronunciation` varchar(20) DEFAULT NULL,
  `difficulty` tinyint(5) DEFAULT NULL,
  `eng_expl` varchar(1000) DEFAULT NULL,
  `chs_expl` varchar(500) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`word`,`character`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vocabulary`
--

LOCK TABLES `vocabulary` WRITE;
/*!40000 ALTER TABLE `vocabulary` DISABLE KEYS */;
INSERT INTO `vocabulary` VALUES ('abandon','n.','放任，狂热','ə\'bænd(ə)n',2,'He approached life with reckless abandon–I don\'t think he himself knew what he was going to do next. ','他以不计后果的放纵态度对待生活–我想他自己都不知道他接下来要做什么。','imgs/pictures/chulan.jpg'),('abandon','v.','遗弃；离开；放弃；终止；陷入','ə\'bænd(ə)n',2,'He claimed that his parents had abandoned him.','他声称他的父母抛弃了他。','imgs/pictures/chulan.jpg'),('address','v.',' 演说；从事；忙于；写姓名地址；向…致辞；与…说话；提出；处理','ə\'dres',4,'He is due to address a conference on human rights next week.','他下周要在一个人权会议上发言。','imgs/pictures/chulan.jpg'),('attempt','n.','企图，试图；攻击','ə\'tem(p)t',2,'You should see some activity on the screen as the tool completes each attempt. ','您应该在工具完成每次尝试时在屏幕上看到一些活动。','imgs/pictures/chulan.jpg'),('discard','n.','抛弃；被丢弃的东西或人','dɪ\'skɑːd',2,'null','null','imgs/pictures/chulan.jpg'),('discard','v.','抛弃；放弃；丢弃','dɪ\'skɑːd',2,'You have to discard any thoughts of disbanding.','你必须丢弃一切解散军队的念头。','imgs/pictures/chulan.jpg'),('eloquent','adj.',' 意味深长的；雄辩的，有口才的；有说服力的；动人的','\'eləkwənt',5,'A man is seldom eloquent till his life is part of his voice.','一个人很少雄辩直到他的生命变成他的声音的一部分。','imgs/pictures/chulan.jpg'),('obey','v.','服从，听从；按照……行动','ə(ʊ)\'beɪ',3,'But you have to obey some rules as well.','但是你必须同时遵守一些规定。','imgs/pictures/favicon.ico'),('reserve','n.','储备，储存；自然保护区；预备队；缄默；[金融] 储备金','rɪ\'zɜːv',4,'A double room with a balcony overlooking the sea had been reserved for him.','一个带一座阳台的海景双人间已被预留给他了。','imgs/pictures/chulan.jpg'),('reserve','v.','储备；保留；预约；预订','rɪ\'zɜːv',4,'He poked around the top of his cabinet for the bottle of whisky that he kept in reserve.','他在壁橱的上面翻找他留的那瓶威士忌。','imgs/pictures/chulan.jpg'),('route','n.','路线，航线；道路，公路；（交通工具的）固定路线；巡访；途径，渠道；','ruːt',3,'We traced out our route on the map . ','我们在地图上画出我们的路线。','imgs/pictures/banner.jpg'),('route','v.','按特定路线发送，为……规定路线','ruːt',3,'null','null','imgs/pictures/chulan.jpg'),('yield','n.','产量；收益','jiːld',4,'The high yields available on the dividend shares made them attractive to private investors.','股息股能获得的高收益使它们对私人投资者们很有吸引力。','imgs/pictures/chulan.jpg'),('yield','v.','屈服；出产，产生；放弃','jiːld',4,'Last year 400,000 acres of land yielded a crop worth $1.75 billion.','去年40万英亩的土地出产了价值17.5亿美元的粮食。','imgs/pictures/chulan.jpg');
/*!40000 ALTER TABLE `vocabulary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-02 20:55:15
