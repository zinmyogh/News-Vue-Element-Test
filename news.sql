/\*
Navicat MySQL Data Transfer

Source Server : localhost
Source Server Version : 50553
Source Host : localhost:3306
Source Database : news

Target Server Type : MYSQL
Target Server Version : 50553
File Encoding : 65001

Date: 2020-04-19 17:55:08
\*/

SET FOREIGN_KEY_CHECKS=0;

---

-- Table structure for advertisement

---

DROP TABLE IF EXISTS `advertisement`;
CREATE TABLE `advertisement` (
`advID` int(11) NOT NULL AUTO_INCREMENT,
`caption` varchar(30) NOT NULL,
`advImage` varchar(255) NOT NULL,
`createDate` datetime NOT NULL,
`validDay` int(11) NOT NULL,
`activeStatus` tinyint(1) NOT NULL,
PRIMARY KEY (`advID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


---

-- Table structure for user

---

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`userID` int(11) NOT NULL AUTO_INCREMENT,
`userName` varchar(20) NOT NULL,
`phone` varchar(15) DEFAULT NULL,
`password` varchar(8) NOT NULL,
`createDate` datetime NOT NULL,
`profilePic` varchar(255) NOT NULL,
`IMEI` varchar(20) NOT NULL,
`QQ` varchar(30) DEFAULT NULL,
`sex` int(1) DEFAULT NULL COMMENT '性别,0:男 1:女 ',
`email` varchar(30) DEFAULT NULL,
`address` varchar(255) DEFAULT NULL,
`birthday` datetime DEFAULT NULL COMMENT ' 生日',
`introduction` varchar(30) DEFAULT NULL COMMENT '自我介绍,不超过 30 个字符',
PRIMARY KEY (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for userpost

---

DROP TABLE IF EXISTS `userpost`;
CREATE TABLE `userpost` (
`userPostID` int(11) NOT NULL AUTO_INCREMENT,
`userID` int(11) NOT NULL,
`createDate` datetime NOT NULL,
`categoryID` int(11) NOT NULL,
PRIMARY KEY (`userPostID`),
KEY `UserPost_fk0` (`userID`),
KEY `UserPost_fk1` (`categoryID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


---

-- Table structure for category

---

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
`categoryID` int(11) NOT NULL AUTO_INCREMENT,
`categoryName` varchar(20) NOT NULL,
PRIMARY KEY (`categoryID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for momentpost

---

DROP TABLE IF EXISTS `momentpost`;
CREATE TABLE `momentpost` (
`momentPostID` int(11) NOT NULL AUTO_INCREMENT,
`userPostID` int(11) NOT NULL,
`userID` int(11) NOT NULL,
`content` longtext NOT NULL,
`images` longtext NOT NULL COMMENT,
`likeCount` int(11) NOT NULL,
`createDate` datetime NOT NULL,
PRIMARY KEY (`ID`),
KEY `ImageAll_fk0` (`userPostID`)，
KEY `ImageAll_fk1` (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for articlepost

---

DROP TABLE IF EXISTS `articlepost`;
CREATE TABLE `articlepost` (
`articlePostID` int(11) NOT NULL AUTO_INCREMENT,
`userPostID` int(11) NOT NULL,
`userID` int(11) NOT NULL,
`categoryID` int(11) NOT NULL,
`caption` varchar(30) NOT NULL,
`content` longtext NOT NULL COMMENT '文章内容，前段传来 JSON 内容，后端转 HTML 或 base64 格式存，以 HTML 格式返回给前端',
`cover1` varchar(255) DEFAULT NULL COMMENT '文章封面图 1',
`cover2` varchar(255) DEFAULT NULL COMMENT '文章封面图 2',
`cover3` varchar(255) DEFAULT NULL COMMENT '文章封面图 3',
`viewCount` int(11) NOT NULL,
`likeCount` int(11) NOT NULL,
PRIMARY KEY (`imagePostID`),
KEY `ImagePost_fk0` (`userPostID`),
KEY `ImagePost_fk1` (`categoryID`),
KEY `ImagePost_fk2` (`userID`),
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for videopost

---

DROP TABLE IF EXISTS `videopost`;
CREATE TABLE `videopost` (
`videoPostID` int(11) NOT NULL AUTO_INCREMENT,
`videoURL` varchar(255) NOT NULL,
`caption` varchar(30) NOT NULL,
`categoryID` int(11) NOT NULL,
`userPostID` int(11) NOT NULL,
`userID` int(11) NOT NULL,
`viewCount` int(11) NOT NULL,
`likeCount` int(11) NOT NULL,
PRIMARY KEY (`videoPostID`),
KEY `VideoPost_fk0` (`categoryID`),
KEY `VideoPost_fk1` (`userPostID`),
KEY `VideoPost_fk2` (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


---

-- Table structure for comment

---

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
`commentID` int(11) NOT NULL AUTO_INCREMENT,
`userID` int(11) NOT NULL,
`postID` int(11) NOT NULL,
`commentText` varchar(50) NOT NULL,
`commentTime` datetime NOT NULL,
PRIMARY KEY (`commentID`),
KEY `Comment_fk0` (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for favourite

---

DROP TABLE IF EXISTS `favourite`;
CREATE TABLE `favourite` (
`favID` int(11) NOT NULL AUTO_INCREMENT COMMENT '收藏 ID',
`userID` int(11) NOT NULL COMMENT '用户 ID 的关联',
`createDate` datetime NOT NULL,
`videoPostID` int(11) DEFAULT NULL COMMENT '收藏的视频 ID，可以为空',
`articlePostID` int(11) DEFAULT NULL COMMENT '收藏的文章 ID，可以为空',
PRIMARY KEY (`favID`),
KEY `Favourite_fk0` (`userID`),
KEY `Favourite_fk1` (`videoPostID`),
KEY `Favourite_fk2` (`imagePostID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

---

-- Table structure for history

---

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
`historyID` int(11) NOT NULL AUTO_INCREMENT,
`userID` int(11) NOT NULL,
`createDate` datetime NOT NULL,
`articlePostID` int(11) DEFAULT NULL,
`videoPostID` int(11) DEFAULT NULL
PRIMARY KEY (`historyID`),
KEY `History_fk0` (`userID`),
KEY `History_fk1` (`articlePostID`),
KEY `History_fk2` (`videoPostID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


---

-- Table structure for userpost

---

DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
`followID` int(11) NOT NULL AUTO_INCREMENT,
`userID` int(11) NOT NULL,
`createDate` datetime NOT NULL,
`followerID` int(11) NOT NULL,
PRIMARY KEY (`followID`),
KEY `follow_fk0` (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
