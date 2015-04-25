-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 25-Abr-2015 às 11:53
-- Versão do servidor: 5.6.24
-- PHP Version: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `avaliacao`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ava_opcao`
--

CREATE TABLE IF NOT EXISTS `ava_opcao` (
  `id` int(11) NOT NULL,
  `resposta` mediumtext COLLATE utf8_unicode_ci,
  `valor` int(11) DEFAULT NULL,
  `direcao` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `controle` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `pergunta_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ava_opcao`
--

INSERT INTO `ava_opcao` (`id`, `resposta`, `valor`, `direcao`, `tipo`, `controle`, `data_cadastro`, `pergunta_id`) VALUES
(1, '', 0, '', '', 0, '2015-04-16 23:49:14', 1),
(2, 'asdfas', 0, '', '', 1, '2015-04-17 00:24:06', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ava_pergunta`
--

CREATE TABLE IF NOT EXISTS `ava_pergunta` (
  `id` int(11) NOT NULL,
  `titulo` mediumtext COLLATE utf8_unicode_ci,
  `texto_ajuda` mediumtext COLLATE utf8_unicode_ci,
  `obrigatoria` int(11) DEFAULT NULL COMMENT '0 = obrigatorio || 1 = nao obrigatorio',
  `redireciona` int(11) DEFAULT NULL COMMENT '0 = resposta não direciona || 1 = resposta direciona',
  `status` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `pesquisa_id` int(11) NOT NULL,
  `tipo_opcao_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ava_pergunta`
--

INSERT INTO `ava_pergunta` (`id`, `titulo`, `texto_ajuda`, `obrigatoria`, `redireciona`, `status`, `data_cadastro`, `pesquisa_id`, `tipo_opcao_id`) VALUES
(1, '', '', 0, 0, 1, '2015-04-16 23:49:14', 1, 1),
(2, '', '', 1, 0, 1, '2015-04-17 00:24:06', 2, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ava_pesquisa`
--

CREATE TABLE IF NOT EXISTS `ava_pesquisa` (
  `id` int(11) NOT NULL,
  `titulo` mediumtext COLLATE utf8_unicode_ci,
  `descricao` mediumtext COLLATE utf8_unicode_ci,
  `link` varchar(240) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT NULL,
  `proprietario_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ava_pesquisa`
--

INSERT INTO `ava_pesquisa` (`id`, `titulo`, `descricao`, `link`, `status`, `data_cadastro`, `proprietario_id`) VALUES
(1, '', '', NULL, 1, '2015-04-16 23:49:14', 1),
(2, '', '', NULL, 1, '2015-04-17 00:24:06', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ava_proprietario`
--

CREATE TABLE IF NOT EXISTS `ava_proprietario` (
  `id` int(11) NOT NULL,
  `cnpj` varchar(20) CHARACTER SET utf8 NOT NULL,
  `razaosocial` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `inscricaoestadual` varchar(20) CHARACTER SET utf8 NOT NULL,
  `nomefantasia` varchar(80) CHARACTER SET utf8 NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 NOT NULL,
  `cep` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `logradouro` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `bairro` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `cidade` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `telefone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `celular` varchar(15) CHARACTER SET utf8 NOT NULL,
  `sms` int(1) NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nomeresponsavel` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `datacadastro` datetime NOT NULL,
  `idestado` int(11) NOT NULL,
  `idpais` int(11) NOT NULL,
  `deletado` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ava_proprietario`
--

INSERT INTO `ava_proprietario` (`id`, `cnpj`, `razaosocial`, `inscricaoestadual`, `nomefantasia`, `logo`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `telefone`, `celular`, `sms`, `email`, `nomeresponsavel`, `datacadastro`, `idestado`, `idpais`, `deletado`) VALUES
(1, '', '', '', '', '', '', '', 0, '', '', '', '0', '0', 0, '0', '0', '0000-00-00 00:00:00', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ava_tipo_opcao`
--

CREATE TABLE IF NOT EXISTS `ava_tipo_opcao` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ava_tipo_opcao`
--

INSERT INTO `ava_tipo_opcao` (`id`, `nome`) VALUES
(1, 'Texto'),
(2, 'Parágrafo'),
(3, 'Multipla escolha'),
(4, 'Caixa de seleção'),
(5, 'Escolha de uma lista'),
(6, 'Escala em números'),
(7, 'Escala em estrelas'),
(8, 'Escala em rostos'),
(9, 'Grade'),
(10, 'Data'),
(11, 'Horário'),
(12, 'Curtir');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(11) NOT NULL,
  `nome` varchar(75) NOT NULL,
  `uf` varchar(5) DEFAULT NULL,
  `idpais` int(7) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `estado`
--

INSERT INTO `estado` (`id`, `nome`, `uf`, `idpais`) VALUES
(1, 'Acre', 'AC', 30),
(2, 'Alagoas', 'AL', 30),
(3, 'Amazonas', 'AM', 30),
(4, 'Amapá', 'AP', 30),
(5, 'Bahia', 'BA', 30),
(6, 'Ceará', 'CE', 30),
(7, 'Distrito Federal', 'DF', 30),
(8, 'Espírito Santo', 'ES', 30),
(9, 'Goiás', 'GO', 30),
(10, 'Maranhão', 'MA', 30),
(11, 'Minas Gerais', 'MG', 30),
(12, 'Mato Grosso do Sul', 'MS', 30),
(13, 'Mato Grosso', 'MT', 30),
(14, 'Pará', 'PA', 30),
(15, 'Paraíba', 'PB', 30),
(16, 'Pernambuco', 'PE', 30),
(17, 'Piauí', 'PI', 30),
(18, 'Paraná', 'PR', 30),
(19, 'Rio de Janeiro', 'RJ', 30),
(20, 'Rio Grande do Norte', 'RN', 30),
(21, 'Rondônia', 'RO', 30),
(22, 'Roraima', 'RR', 30),
(23, 'Rio Grande do Sul', 'RS', 30),
(24, 'Santa Catarina', 'SC', 30),
(25, 'Sergipe', 'SE', 30),
(26, 'São Paulo', 'SP', 30),
(27, 'Tocantins', 'TO', 30);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pais`
--

CREATE TABLE IF NOT EXISTS `pais` (
  `idpais` int(11) unsigned NOT NULL,
  `nome` varchar(60) NOT NULL DEFAULT '',
  `sigla` char(3) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `pais`
--

INSERT INTO `pais` (`idpais`, `nome`, `sigla`) VALUES
(1, 'Andorra', 'AND'),
(2, 'Emiratos Árabes Unidos', 'ARE'),
(3, 'Afeganistão', 'AFG'),
(4, 'Antigua e Barbuda', 'ATG'),
(5, 'Anguilla', 'AIA'),
(6, 'Albânia', 'ALB'),
(7, 'Arménia', 'ARM'),
(8, 'Antilhas Holandesas', 'ANT'),
(9, 'Angola', 'AGO'),
(10, 'Antárctida', 'ATA'),
(11, 'Argentina', 'ARG'),
(12, 'Samoa Americana', 'ASM'),
(13, 'Áustria', 'AUT'),
(14, 'Austrália', 'AUS'),
(15, 'Aruba', 'ABW'),
(16, 'Åland, Ilhas', 'ALA'),
(17, 'Azerbeijão', 'AZE'),
(18, 'Bósnia-Herzegovina', 'BIH'),
(19, 'Barbados', 'BRB'),
(20, 'Bangladesh', 'BGD'),
(21, 'Bélgica', 'BEL'),
(22, 'Burkina Faso', 'BFA'),
(23, 'Bulgária', 'BGR'),
(24, 'Bahrain', 'BHR'),
(25, 'Burundi', 'BDI'),
(26, 'Benin', 'BEN'),
(27, 'Bermuda', 'BMU'),
(28, 'Brunei', 'BRN'),
(29, 'Bolívia', 'BOL'),
(30, 'Brasil', 'BRA'),
(31, 'Bahamas', 'BHS'),
(32, 'Butão', 'BTN'),
(33, 'Bouvet, Ilha', 'BVT'),
(34, 'Botswana', 'BWA'),
(35, 'Bielo-Rússia', 'BLR'),
(36, 'Belize', 'BLZ'),
(37, 'Canadá', 'CAN'),
(38, 'Cocos, Ilhas', 'CCK'),
(39, 'Congo, República Democrática do (antigo Zaire)', 'COD'),
(40, 'Centro-africana, República', 'CAF'),
(41, 'Congo, República do', 'COG'),
(42, 'Suíça', 'CHE'),
(43, 'Costa do Marfim', 'CIV'),
(44, 'Cook, Ilhas', 'COK'),
(45, 'Chile', 'CHL'),
(46, 'Camarões', 'CMR'),
(47, 'China', 'CHN'),
(48, 'Colômbia', 'COL'),
(49, 'Costa Rica', 'CRI'),
(50, 'Cuba', 'CUB'),
(51, 'Cabo Verde', 'CPV'),
(52, 'Christmas, Ilha', 'CXR'),
(53, 'Chipre', 'CYP'),
(54, 'Checa, República', 'CZE'),
(55, 'Alemanha', 'DEU'),
(56, 'Djibouti', 'DJI'),
(57, 'Dinamarca', 'DNK'),
(58, 'Dominica', 'DMA'),
(59, 'Dominicana, República', 'DOM'),
(60, 'Argélia', 'DZA'),
(61, 'Equador', 'ECU'),
(62, 'Estónia', 'EST'),
(63, 'Egipto', 'EGY'),
(64, 'Saara Ocidental', 'ESH'),
(65, 'Eritreia', 'ERI'),
(66, 'Espanha', 'ESP'),
(67, 'Etiópia', 'ETH'),
(68, 'Finlândia', 'FIN'),
(69, 'Fiji', 'FJI'),
(70, 'Malvinas, Ilhas (Falkland)', 'FLK'),
(71, 'Micronésia, Estados Federados da', 'FSM'),
(72, 'Faroe, Ilhas', 'FRO'),
(73, 'França', 'FRA'),
(74, 'Gabão', 'GAB'),
(75, 'Reino Unido da Grã-Bretanha e Irlanda do Norte', 'GBR'),
(76, 'Grenada', 'GRD'),
(77, 'Geórgia', 'GEO'),
(78, 'Guiana Francesa', 'GUF'),
(79, 'Guernsey', 'GGY'),
(80, 'Gana', 'GHA'),
(81, 'Gibraltar', 'GIB'),
(82, 'Gronelândia', 'GRL'),
(83, 'Gâmbia', 'GMB'),
(84, 'Guiné-Conacri', 'GIN'),
(85, 'Guadeloupe', 'GLP'),
(86, 'Guiné Equatorial', 'GNQ'),
(87, 'Grécia', 'GRC'),
(88, 'Geórgia do Sul e Sandwich do Sul, Ilhas', 'SGS'),
(89, 'Guatemala', 'GTM'),
(90, 'Guam', 'GUM'),
(91, 'Guiné-Bissau', 'GNB'),
(92, 'Guiana', 'GUY'),
(93, 'Hong Kong', 'HKG'),
(94, 'Heard e Ilhas McDonald, Ilha', 'HMD'),
(95, 'Honduras', 'HND'),
(96, 'Croácia', 'HRV'),
(97, 'Haiti', 'HTI'),
(98, 'Hungria', 'HUN'),
(99, 'Indonésia', 'IDN'),
(100, 'Irlanda', 'IRL'),
(101, 'Israel', 'ISR'),
(102, 'Man, Ilha de', 'IMN'),
(103, 'Índia', 'IND'),
(104, 'Território Britânico do Oceano Índico', 'IOT'),
(105, 'Iraque', 'IRQ'),
(106, 'Irão', 'IRN'),
(107, 'Islândia', 'ISL'),
(108, 'Itália', 'ITA'),
(109, 'Jersey', 'JEY'),
(110, 'Jamaica', 'JAM'),
(111, 'Jordânia', 'JOR'),
(112, 'Japão', 'JPN'),
(113, 'Quénia', 'KEN'),
(114, 'Quirguistão', 'KGZ'),
(115, 'Cambodja', 'KHM'),
(116, 'Kiribati', 'KIR'),
(117, 'Comores', 'COM'),
(118, 'São Cristóvão e Névis (Saint Kitts e Nevis)', 'KNA'),
(119, 'Coreia, República Democrática da (Coreia do Norte)', 'PRK'),
(120, 'Coreia do Sul', 'KOR'),
(121, 'Kuwait', 'KWT'),
(122, 'Cayman, Ilhas', 'CYM'),
(123, 'Cazaquistão', 'KAZ'),
(124, 'Laos', 'LAO'),
(125, 'Líbano', 'LBN'),
(126, 'Santa Lúcia', 'LCA'),
(127, 'Liechtenstein', 'LIE'),
(128, 'Sri Lanka', 'LKA'),
(129, 'Libéria', 'LBR'),
(130, 'Lesoto', 'LSO'),
(131, 'Lituânia', 'LTU'),
(132, 'Luxemburgo', 'LUX'),
(133, 'Letónia', 'LVA'),
(134, 'Líbia', 'LBY'),
(135, 'Marrocos', 'MAR'),
(136, 'Mónaco', 'MCO'),
(137, 'Moldávia', 'MDA'),
(138, 'Montenegro', 'MNE'),
(139, 'Madagáscar', 'MDG'),
(140, 'Marshall, Ilhas', 'MHL'),
(141, 'Macedónia, República da', 'MKD'),
(142, 'Mali', 'MLI'),
(143, 'Myanmar (antiga Birmânia)', 'MMR'),
(144, 'Mongólia', 'MNG'),
(145, 'Macau', 'MAC'),
(146, 'Marianas Setentrionais', 'MNP'),
(147, 'Martinica', 'MTQ'),
(148, 'Mauritânia', 'MRT'),
(149, 'Montserrat', 'MSR'),
(150, 'Malta', 'MLT'),
(151, 'Maurícia', 'MUS'),
(152, 'Maldivas', 'MDV'),
(153, 'Malawi', 'MWI'),
(154, 'México', 'MEX'),
(155, 'Malásia', 'MYS'),
(156, 'Moçambique', 'MOZ'),
(157, 'Namíbia', 'NAM'),
(158, 'Nova Caledónia', 'NCL'),
(159, 'Níger', 'NER'),
(160, 'Norfolk, Ilha', 'NFK'),
(161, 'Nigéria', 'NGA'),
(162, 'Nicarágua', 'NIC'),
(163, 'Países Baixos (Holanda)', 'NLD'),
(164, 'Noruega', 'NOR'),
(165, 'Nepal', 'NPL'),
(166, 'Nauru', 'NRU'),
(167, 'Niue', 'NIU'),
(168, 'Nova Zelândia (Aotearoa)', 'NZL'),
(169, 'Oman', 'OMN'),
(170, 'Panamá', 'PAN'),
(171, 'Peru', 'PER'),
(172, 'Polinésia Francesa', 'PYF'),
(173, 'Papua-Nova Guiné', 'PNG'),
(174, 'Filipinas', 'PHL'),
(175, 'Paquistão', 'PAK'),
(176, 'Polónia', 'POL'),
(177, 'Saint Pierre et Miquelon', 'SPM'),
(178, 'Pitcairn', 'PCN'),
(179, 'Porto Rico', 'PRI'),
(180, 'Palestina', 'PSE'),
(181, 'Portugal', 'PRT'),
(182, 'Palau', 'PLW'),
(183, 'Paraguai', 'PRY'),
(184, 'Qatar', 'QAT'),
(185, 'Reunião', 'REU'),
(186, 'Roménia', 'ROU'),
(187, 'Sérvia', 'SRB'),
(188, 'Rússia', 'RUS'),
(189, 'Ruanda', 'RWA'),
(190, 'Arábia Saudita', 'SAU'),
(191, 'Salomão, Ilhas', 'SLB'),
(192, 'Seychelles', 'SYC'),
(193, 'Sudão', 'SDN'),
(194, 'Suécia', 'SWE'),
(195, 'Singapura', 'SGP'),
(196, 'Santa Helena', 'SHN'),
(197, 'Eslovénia', 'SVN'),
(198, 'Svalbard e Jan Mayen', 'SJM'),
(199, 'Eslováquia', 'SVK'),
(200, 'Serra Leoa', 'SLE'),
(201, 'San Marino', 'SMR'),
(202, 'Senegal', 'SEN'),
(203, 'Somália', 'SOM'),
(204, 'Suriname', 'SUR'),
(205, 'São Tomé e Príncipe', 'STP'),
(206, 'El Salvador', 'SLV'),
(207, 'Síria', 'SYR'),
(208, 'Suazilândia', 'SWZ'),
(209, 'Turks e Caicos', 'TCA'),
(210, 'Chade', 'TCD'),
(211, 'Terras Austrais e Antárticas Francesas (TAAF)', 'ATF'),
(212, 'Togo', 'TGO'),
(213, 'Tailândia', 'THA'),
(214, 'Tajiquistão', 'TJK'),
(215, 'Toquelau', 'TKL'),
(216, 'Timor-Leste', 'TLS'),
(217, 'Turquemenistão', 'TKM'),
(218, 'Tunísia', 'TUN'),
(219, 'Tonga', 'TON'),
(220, 'Turquia', 'TUR'),
(221, 'Trindade e Tobago', 'TTO'),
(222, 'Tuvalu', 'TUV'),
(223, 'Taiwan', 'TWN'),
(224, 'Tanzânia', 'TZA'),
(225, 'Ucrânia', 'UKR'),
(226, 'Uganda', 'UGA'),
(227, 'Menores Distantes dos Estados Unidos, Ilhas', 'UMI'),
(228, 'Estados Unidos da América', 'USA'),
(229, 'Uruguai', 'URY'),
(230, 'Usbequistão', 'UZB'),
(231, 'Vaticano', 'VAT'),
(232, 'São Vicente e Granadinas', 'VCT'),
(233, 'Venezuela', 'VEN'),
(234, 'Virgens Britânicas, Ilhas', 'VGB'),
(235, 'Virgens Americanas, Ilhas', 'VIR'),
(236, 'Vietname', 'VNM'),
(237, 'Vanuatu', 'VUT'),
(238, 'Wallis e Futuna', 'WLF'),
(239, 'Samoa (Samoa Ocidental)', 'WSM'),
(240, 'Iémen', 'YEM'),
(241, 'Mayotte', 'MYT'),
(242, 'África do Sul', 'ZAF'),
(243, 'Zâmbia', 'ZMB'),
(244, 'Zimbabwe', 'ZWE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ava_opcao`
--
ALTER TABLE `ava_opcao`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_ava_opcao_ava_pergunta1_idx` (`pergunta_id`);

--
-- Indexes for table `ava_pergunta`
--
ALTER TABLE `ava_pergunta`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_ava_pergunta_ava_pesquisa_idx` (`pesquisa_id`), ADD KEY `fk_ava_pergunta_ava_tipo_opcao1_idx` (`tipo_opcao_id`);

--
-- Indexes for table `ava_pesquisa`
--
ALTER TABLE `ava_pesquisa`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_ava_pesquisa_ava_proprietario1_idx` (`proprietario_id`);

--
-- Indexes for table `ava_proprietario`
--
ALTER TABLE `ava_proprietario`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_estado_id` (`idestado`), ADD KEY `fk_pais_id` (`idpais`);

--
-- Indexes for table `ava_tipo_opcao`
--
ALTER TABLE `ava_tipo_opcao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_estado_pais` (`idpais`);

--
-- Indexes for table `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`idpais`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ava_opcao`
--
ALTER TABLE `ava_opcao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ava_pergunta`
--
ALTER TABLE `ava_pergunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ava_pesquisa`
--
ALTER TABLE `ava_pesquisa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ava_proprietario`
--
ALTER TABLE `ava_proprietario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ava_tipo_opcao`
--
ALTER TABLE `ava_tipo_opcao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `pais`
--
ALTER TABLE `pais`
  MODIFY `idpais` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=245;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `ava_opcao`
--
ALTER TABLE `ava_opcao`
ADD CONSTRAINT `fk_ava_opcao_ava_pergunta1` FOREIGN KEY (`pergunta_id`) REFERENCES `ava_pergunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `ava_pergunta`
--
ALTER TABLE `ava_pergunta`
ADD CONSTRAINT `fk_ava_pergunta_ava_pesquisa` FOREIGN KEY (`pesquisa_id`) REFERENCES `ava_pesquisa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_ava_pergunta_ava_tipo_opcao1` FOREIGN KEY (`tipo_opcao_id`) REFERENCES `ava_tipo_opcao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `ava_pesquisa`
--
ALTER TABLE `ava_pesquisa`
ADD CONSTRAINT `fk_ava_pesquisa_ava_proprietario1` FOREIGN KEY (`proprietario_id`) REFERENCES `ava_proprietario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
