-- phpMyAdmin SQL Dump
-- version 4.0.10.11
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2017-11-17 11:10:48
-- 服务器版本: 5.7.17-log
-- PHP 版本: 5.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `about_table`
--

CREATE TABLE IF NOT EXISTS `about_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `site` varchar(255) NOT NULL COMMENT '地址',
  `QQ` varchar(20) NOT NULL COMMENT 'QQ',
  `weibo` varchar(50) NOT NULL COMMENT '微博',
  `WX` varchar(20) NOT NULL COMMENT '微信',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `admin_table`
--

CREATE TABLE IF NOT EXISTS `admin_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin_table`
--

INSERT INTO `admin_table` (`ID`, `username`, `password`) VALUES
(1, 'jzb1006', '298c6111a164aa5ebd5b1736a1890b64');

-- --------------------------------------------------------

--
-- 表的结构 `blog_table`
--

CREATE TABLE IF NOT EXISTS `blog_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL COMMENT '文章标题',
  `intro` varchar(100) NOT NULL COMMENT '文章简介',
  `content` text NOT NULL,
  `author` varchar(15) NOT NULL DEFAULT 'jzb1006' COMMENT '作者',
  `post_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '文章发布时间',
  `pic_src` varchar(300) DEFAULT NULL COMMENT '缩略图',
  `pic_big_src` varchar(300) DEFAULT NULL COMMENT '文章图片',
  `classify_ID` varchar(10) NOT NULL COMMENT '文章分类',
  `last_modify_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=123 ;

--
-- 转存表中的数据 `blog_table`
--

INSERT INTO `blog_table` (`ID`, `title`, `intro`, `content`, `author`, `post_time`, `pic_src`, `pic_big_src`, `classify_ID`, `last_modify_time`) VALUES
(122, '我去二翁群', '撒地方', '==第三方广东省发给撒地方==', '撒地方', '2017-11-13 17:34:10', NULL, NULL, '1', '2017-11-13 17:34:10'),
(118, '我去二', '玩儿', '玩儿', '玩儿', '2017-11-13 17:29:00', NULL, NULL, '2', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `comment_table`
--

CREATE TABLE IF NOT EXISTS `comment_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '评论标题',
  `description` varchar(255) DEFAULT NULL COMMENT '评论详情',
  `time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `essayclassify_table`
--

CREATE TABLE IF NOT EXISTS `essayclassify_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `essayclassify_table`
--

INSERT INTO `essayclassify_table` (`ID`, `class`) VALUES
(1, 'javascript'),
(2, 'css'),
(3, 'node'),
(4, '教程'),
(5, '随记');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
