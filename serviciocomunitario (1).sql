-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2023 a las 07:01:08
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `serviciocomunitario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `ID_Act` int(11) NOT NULL,
  `PAR_EST` int(11) DEFAULT NULL,
  `DUR_PAR_EST` int(11) DEFAULT NULL,
  `NUM_MOV_REP` int(11) DEFAULT NULL,
  `TIP_POST` varchar(15) DEFAULT NULL,
  `FUER_CAR` int(11) DEFAULT NULL,
  `CARG_BRUS` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agarre`
--

CREATE TABLE `agarre` (
  `ID_AGA` int(11) NOT NULL,
  `TIP_AGARR` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `idEvaluacion` int(11) NOT NULL,
  `ID_TRA_EVA` varchar(10) NOT NULL,
  `Fech_EVA` date NOT NULL,
  `Act_ref` int(11) NOT NULL,
  `man_ref` int(11) NOT NULL,
  `aga_ref` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manipulacion_carga`
--

CREATE TABLE `manipulacion_carga` (
  `ID_Man_car` int(11) NOT NULL,
  `Man_car_act` tinyint(1) DEFAULT NULL,
  `car_man` int(11) DEFAULT NULL,
  `dur_lev` int(11) DEFAULT NULL,
  `Tiem_recup` int(2) NOT NULL,
  `TIP_AGAR` varchar(45) DEFAULT NULL,
  `NUM_LEV_MIN` int(11) DEFAULT NULL,
  `ORI_LEV_V` int(2) DEFAULT NULL,
  `ORI_LEV_H` int(2) NOT NULL,
  `ORI_LEV_A` int(2) NOT NULL,
  `DES_LEV_V` int(2) DEFAULT NULL,
  `DES_LEV_H` int(2) NOT NULL,
  `DES_LEV_A` int(2) NOT NULL,
  `Est_trabajador` varchar(12) NOT NULL,
  `flex_espal` tinyint(1) NOT NULL,
  `Tim_des_car` int(5) NOT NULL,
  `Sos_car_seg` tinyint(1) NOT NULL,
  `Car_tiem_ac` tinyint(1) NOT NULL,
  `ESP_DIS_LEV` tinyint(1) NOT NULL,
  `herra_lev_ayu` varchar(15) NOT NULL,
  `Car_in` tinyint(1) NOT NULL,
  `Lev_personas` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto_trabajo`
--

CREATE TABLE `puesto_trabajo` (
  `id_Puesto` varchar(5) NOT NULL,
  `Campus` varchar(45) NOT NULL,
  `Descrip` varchar(45) NOT NULL,
  `Area_Dep` varchar(45) NOT NULL,
  `Dur_Jornada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `idTrabajadores` varchar(10) NOT NULL,
  `Nom_Tra` varchar(45) NOT NULL,
  `Ape_Tra` varchar(45) NOT NULL,
  `Género` varchar(45) NOT NULL,
  `Fech_Nac` date NOT NULL,
  `Fech_Ini_Pue_act` date NOT NULL,
  `Jornada` varchar(20) NOT NULL,
  `Foto1` tinyblob DEFAULT NULL,
  `Foto2` tinyblob DEFAULT NULL,
  `Foto3` tinyblob DEFAULT NULL,
  `ID_PUE_REF` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`ID_Act`);

--
-- Indices de la tabla `agarre`
--
ALTER TABLE `agarre`
  ADD PRIMARY KEY (`ID_AGA`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`idEvaluacion`),
  ADD KEY `ID_TRA_EVA_idx` (`ID_TRA_EVA`),
  ADD KEY `FK_ACT` (`Act_ref`),
  ADD KEY `FK_MAN` (`man_ref`),
  ADD KEY `FK_AGA` (`aga_ref`);

--
-- Indices de la tabla `manipulacion_carga`
--
ALTER TABLE `manipulacion_carga`
  ADD PRIMARY KEY (`ID_Man_car`);

--
-- Indices de la tabla `puesto_trabajo`
--
ALTER TABLE `puesto_trabajo`
  ADD PRIMARY KEY (`id_Puesto`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`idTrabajadores`),
  ADD KEY `ID_PUE_REF_idx` (`ID_PUE_REF`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `ID_Act` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `agarre`
--
ALTER TABLE `agarre`
  MODIFY `ID_AGA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `idEvaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `manipulacion_carga`
--
ALTER TABLE `manipulacion_carga`
  MODIFY `ID_Man_car` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `Act_ref` FOREIGN KEY (`Act_ref`) REFERENCES `actividad` (`ID_Act`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ID_TRA_EVA` FOREIGN KEY (`ID_TRA_EVA`) REFERENCES `trabajadores` (`idTrabajadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `aga_ref` FOREIGN KEY (`aga_ref`) REFERENCES `agarre` (`ID_AGA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `man_ref` FOREIGN KEY (`man_ref`) REFERENCES `manipulacion_carga` (`ID_Man_car`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD CONSTRAINT `ID_PUE_REF` FOREIGN KEY (`ID_PUE_REF`) REFERENCES `puesto_trabajo` (`id_Puesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
