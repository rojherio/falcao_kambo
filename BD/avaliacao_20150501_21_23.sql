-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: avaliacao
-- ------------------------------------------------------
-- Server version	5.5.38

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
-- Table structure for table `ava_grade_linha`
--

DROP TABLE IF EXISTS `ava_grade_linha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_grade_linha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` mediumtext COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL,
  `pergunta_id` int(11) NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ava_opcao_grade_ava_pergunta1_idx` (`pergunta_id`),
  CONSTRAINT `fk_ava_opcao_grade_ava_pergunta1` FOREIGN KEY (`pergunta_id`) REFERENCES `ava_pergunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_grade_linha`
--

LOCK TABLES `ava_grade_linha` WRITE;
/*!40000 ALTER TABLE `ava_grade_linha` DISABLE KEYS */;
INSERT INTO `ava_grade_linha` VALUES (33,'op linha 01',1,129,'2015-05-02 02:20:08'),(34,'op linha 02',1,129,'2015-05-02 02:20:08'),(35,'op linha 03',1,129,'2015-05-02 02:20:08'),(36,'op linha 04',1,129,'2015-05-02 02:20:08');
/*!40000 ALTER TABLE `ava_grade_linha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ava_opcao`
--

DROP TABLE IF EXISTS `ava_opcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_opcao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resposta` mediumtext COLLATE utf8_unicode_ci,
  `valor` int(11) DEFAULT NULL,
  `direcao` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `controle` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `pergunta_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `grade_linha_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ava_opcao_ava_pergunta1_idx` (`pergunta_id`),
  KEY `fk_ava_opcao_ava_grade_linha1_idx` (`grade_linha_id`),
  CONSTRAINT `fk_ava_opcao_ava_grade_linha1` FOREIGN KEY (`grade_linha_id`) REFERENCES `ava_grade_linha` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ava_opcao_ava_pergunta1` FOREIGN KEY (`pergunta_id`) REFERENCES `ava_pergunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1101618 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_opcao`
--

LOCK TABLES `ava_opcao` WRITE;
/*!40000 ALTER TABLE `ava_opcao` DISABLE KEYS */;
INSERT INTO `ava_opcao` VALUES (1101569,'',0,'','',0,'2015-05-02 02:20:08',123,1,NULL),(1101570,'',0,'','',0,'2015-05-02 02:20:08',124,1,NULL),(1101571,'op mult 01',0,'','',1,'2015-05-02 02:20:08',125,1,NULL),(1101572,'op mult 02',0,'','',2,'2015-05-02 02:20:08',125,1,NULL),(1101573,'op mult 03',0,'','',3,'2015-05-02 02:20:08',125,1,NULL),(1101574,'op mult 04',0,'','',4,'2015-05-02 02:20:08',125,1,NULL),(1101575,'op caixa 01',0,'','',1,'2015-05-02 02:20:08',126,1,NULL),(1101576,'op caixa 02',0,'','',2,'2015-05-02 02:20:08',126,1,NULL),(1101577,'op caixa 03',0,'','',3,'2015-05-02 02:20:08',126,1,NULL),(1101578,'op caixa 04',0,'','',4,'2015-05-02 02:20:08',126,1,NULL),(1101579,'op_lista 01',0,'','',1,'2015-05-02 02:20:08',127,1,NULL),(1101580,'op_lista 02',0,'','',2,'2015-05-02 02:20:08',127,1,NULL),(1101581,'0',0,'','numero',1,'2015-05-02 02:20:08',128,1,NULL),(1101582,'1',0,'','numero',2,'2015-05-02 02:20:08',128,1,NULL),(1101583,'2',0,'','numero',3,'2015-05-02 02:20:08',128,1,NULL),(1101584,'3',0,'','numero',4,'2015-05-02 02:20:08',128,1,NULL),(1101585,'4',0,'','numero',5,'2015-05-02 02:20:08',128,1,NULL),(1101586,'5',0,'','numero',6,'2015-05-02 02:20:08',128,1,NULL),(1101587,'6',0,'','numero',7,'2015-05-02 02:20:08',128,1,NULL),(1101588,'7',0,'','numero',8,'2015-05-02 02:20:08',128,1,NULL),(1101589,'8',0,'','numero',9,'2015-05-02 02:20:08',128,1,NULL),(1101590,'op coluna 01',0,'','',1,'2015-05-02 02:20:08',129,1,33),(1101591,'op coluna 02',0,'','',2,'2015-05-02 02:20:08',129,1,33),(1101592,'op coluna 03',0,'','',3,'2015-05-02 02:20:08',129,1,33),(1101593,'op coluna 04',0,'','',4,'2015-05-02 02:20:08',129,1,33),(1101594,'op coluna 01',0,'','',1,'2015-05-02 02:20:08',129,1,34),(1101595,'op coluna 02',0,'','',2,'2015-05-02 02:20:08',129,1,34),(1101596,'op coluna 03',0,'','',3,'2015-05-02 02:20:08',129,1,34),(1101597,'op coluna 04',0,'','',4,'2015-05-02 02:20:08',129,1,34),(1101598,'op coluna 01',0,'','',1,'2015-05-02 02:20:08',129,1,35),(1101599,'op coluna 02',0,'','',2,'2015-05-02 02:20:08',129,1,35),(1101600,'op coluna 03',0,'','',3,'2015-05-02 02:20:08',129,1,35),(1101601,'op coluna 04',0,'','',4,'2015-05-02 02:20:08',129,1,35),(1101602,'op coluna 01',0,'','',1,'2015-05-02 02:20:08',129,1,36),(1101603,'op coluna 02',0,'','',2,'2015-05-02 02:20:08',129,1,36),(1101604,'op coluna 03',0,'','',3,'2015-05-02 02:20:08',129,1,36),(1101605,'op coluna 04',0,'','',4,'2015-05-02 02:20:08',129,1,36),(1101606,'1',0,'','estrela',1,'2015-05-02 02:20:08',130,1,NULL),(1101607,'2',0,'','estrela',2,'2015-05-02 02:20:08',130,1,NULL),(1101608,'3',0,'','estrela',3,'2015-05-02 02:20:08',130,1,NULL),(1101609,'4',0,'','estrela',4,'2015-05-02 02:20:08',130,1,NULL),(1101610,'5',0,'','estrela',5,'2015-05-02 02:20:08',130,1,NULL),(1101611,'1',0,'','rosto',1,'2015-05-02 02:20:08',131,1,NULL),(1101612,'2',0,'','rosto',2,'2015-05-02 02:20:08',131,1,NULL),(1101613,'3',0,'','rosto',3,'2015-05-02 02:20:08',131,1,NULL),(1101614,'4',0,'','rosto',4,'2015-05-02 02:20:08',131,1,NULL),(1101615,'5',0,'','rosto',5,'2015-05-02 02:20:08',131,1,NULL),(1101616,'1',0,'','curtir',1,'2015-05-02 02:20:08',132,1,NULL),(1101617,'2',0,'','curtir',2,'2015-05-02 02:20:08',132,1,NULL);
/*!40000 ALTER TABLE `ava_opcao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ava_pergunta`
--

DROP TABLE IF EXISTS `ava_pergunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_pergunta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` mediumtext COLLATE utf8_unicode_ci,
  `texto_ajuda` mediumtext COLLATE utf8_unicode_ci,
  `obrigatoria` int(11) DEFAULT NULL COMMENT '0 = obrigatorio || 1 = nao obrigatorio',
  `redireciona` int(11) DEFAULT NULL COMMENT '0 = resposta não direciona || 1 = resposta direciona',
  `status` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `pesquisa_id` int(11) NOT NULL,
  `tipo_opcao_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ava_pergunta_ava_pesquisa_idx` (`pesquisa_id`),
  KEY `fk_ava_pergunta_ava_tipo_opcao1_idx` (`tipo_opcao_id`),
  CONSTRAINT `fk_ava_pergunta_ava_pesquisa` FOREIGN KEY (`pesquisa_id`) REFERENCES `ava_pesquisa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ava_pergunta_ava_tipo_opcao1` FOREIGN KEY (`tipo_opcao_id`) REFERENCES `ava_tipo_opcao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_pergunta`
--

LOCK TABLES `ava_pergunta` WRITE;
/*!40000 ALTER TABLE `ava_pergunta` DISABLE KEYS */;
INSERT INTO `ava_pergunta` VALUES (123,'Quest 01','Ajuda 01',1,1,1,'2015-05-02 02:20:08',34,1),(124,'Quest 02','Ajuda 02',0,1,1,'2015-05-02 02:20:08',34,2),(125,'Quest 03','Quest 03',1,0,1,'2015-05-02 02:20:08',34,3),(126,'Quest 04','Ajuda 04',0,0,1,'2015-05-02 02:20:08',34,4),(127,'Quest 05','Ajuda 05',1,1,1,'2015-05-02 02:20:08',34,5),(128,'Quest 06','Ajuda 06',0,1,1,'2015-05-02 02:20:08',34,6),(129,'Quest 07','Ajuda 07',0,0,1,'2015-05-02 02:20:08',34,9),(130,'Quest 08','Ajuda 08',0,0,1,'2015-05-02 02:20:08',34,7),(131,'Quest 09','Ajuda 09',0,0,1,'2015-05-02 02:20:08',34,8),(132,'Quest 10','Ajuda 10',0,0,1,'2015-05-02 02:20:08',34,12);
/*!40000 ALTER TABLE `ava_pergunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ava_pesquisa`
--

DROP TABLE IF EXISTS `ava_pesquisa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_pesquisa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` mediumtext COLLATE utf8_unicode_ci,
  `descricao` mediumtext COLLATE utf8_unicode_ci,
  `link` varchar(240) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `proprietario_id` int(11) NOT NULL,
  `periodo_inicio` timestamp NULL DEFAULT NULL,
  `periodo_fim` timestamp NULL DEFAULT NULL,
  `qtd_pergunta_pagina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link_UNIQUE` (`link`),
  KEY `fk_ava_pesquisa_ava_proprietario1_idx` (`proprietario_id`),
  CONSTRAINT `fk_ava_pesquisa_ava_proprietario1` FOREIGN KEY (`proprietario_id`) REFERENCES `ava_proprietario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_pesquisa`
--

LOCK TABLES `ava_pesquisa` WRITE;
/*!40000 ALTER TABLE `ava_pesquisa` DISABLE KEYS */;
INSERT INTO `ava_pesquisa` VALUES (34,'Titulo 01','Descricao 01',NULL,1,'2015-05-02 02:20:08',1,'0000-00-00 00:00:00','0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `ava_pesquisa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ava_proprietario`
--

DROP TABLE IF EXISTS `ava_proprietario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_proprietario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apelido` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `celular` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `site` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_proprietario`
--

LOCK TABLES `ava_proprietario` WRITE;
/*!40000 ALTER TABLE `ava_proprietario` DISABLE KEYS */;
INSERT INTO `ava_proprietario` VALUES (1,'Teste','Test','(68)9999-0000','(68)8400-0123','abacedad@hgasl.com','adlkjasldf.com.br',1);
/*!40000 ALTER TABLE `ava_proprietario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ava_tipo_opcao`
--

DROP TABLE IF EXISTS `ava_tipo_opcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ava_tipo_opcao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_tipo_opcao`
--

LOCK TABLES `ava_tipo_opcao` WRITE;
/*!40000 ALTER TABLE `ava_tipo_opcao` DISABLE KEYS */;
INSERT INTO `ava_tipo_opcao` VALUES (1,'Texto',1),(2,'Parágrafo',1),(3,'Multipla escolha',1),(4,'Caixa de seleção',1),(5,'Escolha de uma lista',1),(6,'Escala em números',1),(7,'Escala em estrelas',1),(8,'Escala em rostos',1),(9,'Grade',1),(10,'Data',0),(11,'Horário',0),(12,'Curtir',1);
/*!40000 ALTER TABLE `ava_tipo_opcao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-01 21:23:51
