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
  PRIMARY KEY (`id`),
  KEY `fk_ava_opcao_ava_pergunta1_idx` (`pergunta_id`),
  CONSTRAINT `fk_ava_opcao_ava_pergunta1` FOREIGN KEY (`pergunta_id`) REFERENCES `ava_pergunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_opcao`
--

LOCK TABLES `ava_opcao` WRITE;
/*!40000 ALTER TABLE `ava_opcao` DISABLE KEYS */;
INSERT INTO `ava_opcao` VALUES (1,'',0,'','',0,'2015-04-16 23:49:14',1),(2,'asdfas',0,'','',1,'2015-04-17 00:24:06',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_pergunta`
--

LOCK TABLES `ava_pergunta` WRITE;
/*!40000 ALTER TABLE `ava_pergunta` DISABLE KEYS */;
INSERT INTO `ava_pergunta` VALUES (1,'','',0,0,1,'2015-04-16 23:49:14',1,1),(2,'','',1,0,1,'2015-04-17 00:24:06',2,3);
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
  PRIMARY KEY (`id`),
  KEY `fk_ava_pesquisa_ava_proprietario1_idx` (`proprietario_id`),
  CONSTRAINT `fk_ava_pesquisa_ava_proprietario1` FOREIGN KEY (`proprietario_id`) REFERENCES `ava_proprietario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_pesquisa`
--

LOCK TABLES `ava_pesquisa` WRITE;
/*!40000 ALTER TABLE `ava_pesquisa` DISABLE KEYS */;
INSERT INTO `ava_pesquisa` VALUES (1,'','',NULL,1,'2015-04-16 23:49:14',1),(2,'','',NULL,1,'2015-04-17 00:24:06',1);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava_tipo_opcao`
--

LOCK TABLES `ava_tipo_opcao` WRITE;
/*!40000 ALTER TABLE `ava_tipo_opcao` DISABLE KEYS */;
INSERT INTO `ava_tipo_opcao` VALUES (1,'Texto'),(2,'Parágrafo'),(3,'Multipla escolha'),(4,'Caixa de seleção'),(5,'Escolha de uma lista'),(6,'Escala em números'),(7,'Escala em estrelas'),(8,'Escala em rostos'),(9,'Grade'),(10,'Data'),(11,'Horário'),(12,'Curtir');
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

-- Dump completed on 2015-04-23  0:39:27
