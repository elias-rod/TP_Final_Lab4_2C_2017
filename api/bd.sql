-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2017 a las 03:11:01
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL,
  `relevamientoId` int(11) NOT NULL,
  `satisfaccionGlobal` varchar(10) NOT NULL,
  `satisfaccionMShopper` varchar(10) NOT NULL,
  `satisfaccionNotas` varchar(10) NOT NULL,
  `satisfaccionFotos` varchar(10) NOT NULL,
  `recomendariaServicio` varchar(2) NOT NULL,
  `recomendariaMShopper` varchar(2) NOT NULL,
  `concuerdaPuntajePromedio` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id`, `relevamientoId`, `satisfaccionGlobal`, `satisfaccionMShopper`, `satisfaccionNotas`, `satisfaccionFotos`, `recomendariaServicio`, `recomendariaMShopper`, `concuerdaPuntajePromedio`) VALUES
(1, 1, 'medio', 'malo', 'bueno', 'bueno', 'si', 'si', 'no'),
(2, 2, 'malo', 'medio', 'malo', 'malo', 'no', 'no', 'si'),
(3, 3, 'malo', 'malo', 'malo', 'malo', 'si', 'no', 'no'),
(4, 4, 'malo', 'medio', 'medio', 'bueno', 'no', 'si', 'si'),
(5, 5, 'medio', 'bueno', 'malo', 'bueno', 'no', 'si', 'si'),
(6, 6, 'bueno', 'malo', 'bueno', 'medio', 'si', 'no', 'no'),
(7, 7, 'medio', 'malo', 'bueno', 'malo', 'no', 'no', 'no'),
(8, 8, 'malo', 'medio', 'bueno', 'bueno', 'si', 'no', 'si'),
(9, 9, 'medio', 'malo', 'bueno', 'malo', 'no', 'no', 'no'),
(10, 10, 'malo', 'bueno', 'medio', 'malo', 'si', 'si', 'si'),
(11, 11, 'medio', 'malo', 'malo', 'bueno', 'no', 'no', 'si'),
(12, 12, 'medio', 'bueno', 'malo', 'medio', 'no', 'no', 'si'),
(13, 13, 'bueno', 'medio', 'bueno', 'medio', 'si', 'no', 'no'),
(14, 14, 'medio', 'medio', 'medio', 'malo', 'si', 'si', 'si'),
(15, 15, 'malo', 'malo', 'malo', 'malo', 'no', 'no', 'no'),
(16, 16, 'bueno', 'malo', 'malo', 'medio', 'no', 'si', 'no'),
(17, 17, 'malo', 'malo', 'malo', 'bueno', 'no', 'no', 'no'),
(18, 18, 'bueno', 'bueno', 'malo', 'malo', 'si', 'si', 'no'),
(19, 19, 'bueno', 'malo', 'medio', 'bueno', 'si', 'no', 'si'),
(20, 20, 'medio', 'bueno', 'malo', 'medio', 'si', 'si', 'no'),
(21, 21, 'medio', 'bueno', 'malo', 'malo', 'si', 'no', 'no'),
(22, 22, 'malo', 'malo', 'malo', 'bueno', 'no', 'si', 'si'),
(23, 23, 'bueno', 'medio', 'bueno', 'medio', 'si', 'si', 'no'),
(24, 24, 'medio', 'bueno', 'malo', 'malo', 'no', 'no', 'no'),
(25, 25, 'medio', 'malo', 'medio', 'medio', 'si', 'si', 'si'),
(26, 26, 'malo', 'malo', 'malo', 'medio', 'si', 'no', 'si'),
(27, 27, 'malo', 'bueno', 'malo', 'medio', 'no', 'si', 'si'),
(28, 28, 'bueno', 'malo', 'bueno', 'bueno', 'no', 'no', 'no'),
(29, 29, 'malo', 'bueno', 'bueno', 'medio', 'si', 'si', 'si'),
(30, 30, 'medio', 'medio', 'malo', 'bueno', 'no', 'si', 'no'),
(31, 31, 'medio', 'malo', 'malo', 'malo', 'si', 'si', 'si'),
(32, 32, 'medio', 'malo', 'malo', 'bueno', 'no', 'si', 'si'),
(33, 33, 'malo', 'medio', 'bueno', 'medio', 'no', 'no', 'no'),
(34, 34, 'medio', 'bueno', 'bueno', 'bueno', 'si', 'si', 'si'),
(35, 35, 'medio', 'bueno', 'malo', 'bueno', 'no', 'no', 'si'),
(36, 36, 'malo', 'bueno', 'bueno', 'bueno', 'si', 'no', 'si'),
(37, 37, 'malo', 'bueno', 'malo', 'malo', 'no', 'si', 'si'),
(38, 38, 'malo', 'bueno', 'malo', 'bueno', 'si', 'si', 'no'),
(39, 39, 'medio', 'bueno', 'bueno', 'bueno', 'no', 'no', 'no'),
(40, 40, 'malo', 'malo', 'medio', 'medio', 'si', 'si', 'si'),
(41, 41, 'bueno', 'medio', 'medio', 'medio', 'no', 'no', 'no'),
(42, 42, 'bueno', 'medio', 'malo', 'medio', 'si', 'no', 'no'),
(43, 43, 'bueno', 'medio', 'bueno', 'malo', 'si', 'no', 'si'),
(44, 44, 'bueno', 'malo', 'malo', 'malo', 'si', 'si', 'si'),
(45, 45, 'medio', 'bueno', 'medio', 'bueno', 'no', 'no', 'si'),
(46, 46, 'bueno', 'medio', 'malo', 'malo', 'no', 'si', 'si'),
(47, 47, 'malo', 'medio', 'medio', 'malo', 'si', 'si', 'no'),
(48, 48, 'bueno', 'bueno', 'medio', 'malo', 'no', 'no', 'si'),
(49, 49, 'medio', 'medio', 'bueno', 'bueno', 'no', 'no', 'si'),
(50, 50, 'medio', 'bueno', 'bueno', 'bueno', 'no', 'no', 'no'),
(51, 51, 'medio', 'bueno', 'bueno', 'medio', 'no', 'no', 'no'),
(52, 52, 'malo', 'malo', 'bueno', 'bueno', 'no', 'si', 'si'),
(53, 53, 'malo', 'bueno', 'medio', 'malo', 'si', 'si', 'si'),
(54, 54, 'bueno', 'bueno', 'bueno', 'bueno', 'si', 'si', 'si'),
(55, 55, 'malo', 'malo', 'bueno', 'medio', 'si', 'no', 'si'),
(56, 56, 'medio', 'medio', 'medio', 'bueno', 'si', 'no', 'no'),
(57, 57, 'medio', 'malo', 'medio', 'malo', 'si', 'si', 'no'),
(58, 58, 'medio', 'medio', 'bueno', 'bueno', 'no', 'no', 'si'),
(59, 59, 'malo', 'medio', 'malo', 'malo', 'no', 'no', 'no'),
(60, 60, 'malo', 'medio', 'malo', 'malo', 'si', 'si', 'si'),
(61, 61, 'bueno', 'medio', 'bueno', 'medio', 'no', 'no', 'no'),
(62, 62, 'malo', 'medio', 'bueno', 'bueno', 'no', 'si', 'no'),
(63, 63, 'bueno', 'malo', 'bueno', 'bueno', 'no', 'no', 'no'),
(64, 64, 'medio', 'malo', 'medio', 'malo', 'no', 'si', 'no'),
(65, 65, 'bueno', 'malo', 'malo', 'malo', 'si', 'si', 'si'),
(66, 66, 'bueno', 'malo', 'malo', 'malo', 'no', 'no', 'si'),
(67, 67, 'medio', 'bueno', 'malo', 'bueno', 'si', 'si', 'no'),
(68, 68, 'malo', 'medio', 'malo', 'bueno', 'no', 'si', 'no'),
(69, 69, 'bueno', 'bueno', 'malo', 'malo', 'si', 'no', 'no'),
(70, 70, 'malo', 'malo', 'malo', 'malo', 'si', 'si', 'no'),
(71, 71, 'bueno', 'medio', 'malo', 'bueno', 'no', 'no', 'no'),
(72, 72, 'malo', 'malo', 'bueno', 'malo', 'si', 'no', 'si'),
(73, 73, 'bueno', 'malo', 'medio', 'medio', 'si', 'no', 'si'),
(74, 74, 'malo', 'bueno', 'malo', 'malo', 'si', 'no', 'si'),
(75, 75, 'bueno', 'bueno', 'malo', 'malo', 'no', 'si', 'si'),
(76, 76, 'malo', 'malo', 'medio', 'medio', 'si', 'no', 'no'),
(77, 77, 'medio', 'medio', 'medio', 'malo', 'si', 'si', 'si'),
(78, 78, 'malo', 'medio', 'medio', 'bueno', 'si', 'no', 'si'),
(79, 79, 'malo', 'malo', 'malo', 'malo', 'si', 'no', 'no'),
(80, 80, 'bueno', 'bueno', 'medio', 'bueno', 'si', 'no', 'no'),
(81, 81, 'malo', 'medio', 'medio', 'malo', 'no', 'si', 'no'),
(82, 82, 'bueno', 'bueno', 'medio', 'bueno', 'no', 'si', 'si'),
(83, 83, 'bueno', 'bueno', 'medio', 'malo', 'no', 'no', 'si'),
(84, 84, 'bueno', 'medio', 'medio', 'malo', 'no', 'no', 'no'),
(85, 85, 'bueno', 'malo', 'medio', 'malo', 'no', 'no', 'si'),
(86, 86, 'medio', 'bueno', 'bueno', 'bueno', 'no', 'si', 'si'),
(87, 87, 'bueno', 'medio', 'bueno', 'malo', 'no', 'no', 'si'),
(88, 88, 'malo', 'medio', 'bueno', 'bueno', 'no', 'no', 'si'),
(89, 89, 'malo', 'bueno', 'medio', 'medio', 'no', 'si', 'no'),
(90, 90, 'malo', 'malo', 'medio', 'medio', 'si', 'si', 'si'),
(91, 91, 'malo', 'bueno', 'bueno', 'malo', 'no', 'si', 'si'),
(92, 92, 'medio', 'bueno', 'malo', 'medio', 'no', 'no', 'si'),
(93, 93, 'bueno', 'malo', 'malo', 'medio', 'si', 'no', 'no'),
(94, 94, 'malo', 'bueno', 'malo', 'malo', 'si', 'si', 'no'),
(95, 95, 'bueno', 'bueno', 'malo', 'malo', 'no', 'no', 'si'),
(96, 96, 'medio', 'medio', 'medio', 'bueno', 'no', 'si', 'si'),
(97, 97, 'malo', 'bueno', 'medio', 'bueno', 'si', 'si', 'no'),
(98, 98, 'bueno', 'malo', 'bueno', 'malo', 'no', 'no', 'si'),
(99, 99, 'medio', 'medio', 'malo', 'medio', 'si', 'si', 'si'),
(100, 100, 'malo', 'malo', 'malo', 'medio', 'no', 'si', 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`id`, `nombre`, `direccion`) VALUES
(1, 'Palermo', 'Jorge Luis Borges 2454, Buenos Aires'),
(2, 'Microcentro', 'Sarmiento 858, Buenos Aires'),
(3, 'Belgrano', 'Avenida Cabildo 2629, Buenos Aires'),
(4, 'Liniers', 'Avenida Emilio Castro 500, Buenos Aires'),
(5, 'Caballito', 'Avenida Avellaneda 1850, Buenos Aires');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relevamientos`
--

CREATE TABLE `relevamientos` (
  `id` int(11) NOT NULL,
  `momentoAsignacion` varchar(50) NOT NULL,
  `momentoRealizacion` varchar(50) NOT NULL,
  `localId` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `encargadoId` int(11) NOT NULL,
  `mysteryShopperId` int(11) NOT NULL,
  `puntajePromedio` int(11) NOT NULL,
  `notas` varchar(1000) NOT NULL,
  `cantidadFotos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `relevamientos`
--

INSERT INTO `relevamientos` (`id`, `momentoAsignacion`, `momentoRealizacion`, `localId`, `estado`, `encargadoId`, `mysteryShopperId`, `puntajePromedio`, `notas`, `cantidadFotos`) VALUES
(1, '1477520435000', '1502285054000', 3, 'completo', 8, 2, 8, 'ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in', 2),
(2, '1462922677000', '1499852347000', 2, 'incompleto', 1, 5, 2, 'id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio', 2),
(4, '1471735577000', '0', 3, 'completo', 1, 2, 2, 'dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut', 1),
(5, '1468084537000', '1512130773000', 5, 'incompleto', 8, 2, 5, 'hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at', 1),
(6, '1484671881000', '1509214204000', 5, 'incompleto', 1, 6, 10, 'natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel', 1),
(7, '1481298396000', '1505322108000', 5, 'incompleto', 1, 6, 5, 'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent', 1),
(8, '1469488160000', '1511799530000', 1, 'completo', 1, 2, 8, 'lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula', 1),
(9, '1496233849000', '0', 5, 'completo', 1, 5, 7, 'fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis', 2),
(10, '1490702077000', '1501799699000', 3, 'incompleto', 8, 5, 8, 'curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae', 2),
(11, '1489310188000', '1508299583000', 3, 'completo', 8, 6, 6, 'in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum', 1),
(12, '1487934067000', '1509324525000', 4, 'incompleto', 1, 5, 10, 'nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis', 2),
(13, '1476193714000', '1506121941000', 1, 'completo', 8, 6, 1, 'nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit', 1),
(14, '1487651844000', '0', 4, 'incompleto', 1, 6, 6, 'convallis eget eleifend luctus ultricies eu nibh quisque id justo sit', 1),
(15, '1482518458000', '1505585744000', 1, 'incompleto', 8, 5, 9, 'in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio', 1),
(16, '1483944657000', '1512573488000', 4, 'incompleto', 1, 2, 2, 'luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum', 2),
(17, '1474173093000', '0', 2, 'incompleto', 1, 5, 8, 'semper interdum mauris ullamcorper purus sit amet nulla quisque arcu', 2),
(18, '1453625982000', '1500389834000', 2, 'completo', 1, 2, 10, 'turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis', 2),
(19, '1481111317000', '1497765436000', 1, 'incompleto', 1, 5, 3, 'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum', 1),
(20, '1463468214000', '1502487782000', 4, 'completo', 1, 6, 9, 'mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla', 1),
(21, '1481559231000', '1507379404000', 1, 'completo', 1, 5, 4, 'duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum', 1),
(22, '1480168608000', '0', 3, 'completo', 1, 2, 10, 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi', 1),
(23, '1487020194000', '1503411769000', 1, 'incompleto', 1, 6, 10, 'nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo', 1),
(24, '1480743527000', '0', 1, 'completo', 1, 5, 7, 'vel est donec odio justo sollicitudin ut suscipit a feugiat et', 1),
(25, '1478550020000', '1511394408000', 2, 'incompleto', 1, 6, 7, 'vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in', 2),
(26, '1490942566000', '1507235898000', 2, 'completo', 8, 5, 2, 'habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem', 2),
(27, '1479381296000', '1505902239000', 2, 'completo', 8, 5, 7, 'justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet', 1),
(28, '1465134893000', '1507150933000', 4, 'incompleto', 1, 5, 4, 'libero ut massa volutpat convallis morbi odio odio elementum eu interdum', 2),
(29, '1477744155000', '1508560785000', 4, 'incompleto', 1, 6, 9, 'rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis', 2),
(30, '1486925973000', '1511475789000', 5, 'incompleto', 1, 5, 5, 'tellus in sagittis dui vel nisl duis ac nibh fusce lacus', 2),
(31, '1458814421000', '1502205529000', 4, 'incompleto', 8, 6, 4, 'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis', 1),
(32, '1479824518000', '0', 4, 'incompleto', 8, 5, 4, 'mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula', 2),
(33, '1480693687000', '1510898342000', 4, 'incompleto', 8, 2, 1, 'quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer', 2),
(34, '1487873863000', '1501994437000', 5, 'incompleto', 1, 6, 6, 'turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis', 2),
(35, '1484329208000', '1510443811000', 3, 'incompleto', 1, 2, 2, 'platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum', 2),
(36, '1471272933000', '1500038838000', 5, 'incompleto', 1, 6, 8, 'metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis', 2),
(37, '1486847299000', '0', 1, 'completo', 1, 2, 8, 'nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget', 1),
(38, '1455130847000', '1500586396000', 2, 'incompleto', 1, 6, 3, 'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet', 2),
(39, '1491978549000', '0', 5, 'completo', 8, 2, 8, 'sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices', 1),
(40, '1479954631000', '1506953697000', 4, 'completo', 1, 5, 7, 'dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede', 1),
(41, '1465656377000', '0', 5, 'incompleto', 8, 6, 5, 'ut nulla sed accumsan felis ut at dolor quis odio', 2),
(42, '1496839780000', '1510863826000', 4, 'completo', 1, 5, 7, 'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent', 2),
(43, '1469697336000', '1506362176000', 5, 'completo', 8, 2, 2, 'nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed', 1),
(44, '1491162343000', '1506607792000', 5, 'incompleto', 1, 6, 5, 'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id', 2),
(45, '1476240619000', '1499893839000', 1, 'incompleto', 8, 6, 2, 'mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id', 2),
(46, '1475441043000', '1499177657000', 3, 'completo', 8, 5, 4, 'sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta', 1),
(47, '1468487258000', '1511976102000', 4, 'incompleto', 1, 6, 3, 'ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus', 1),
(48, '1494666781000', '1510451602000', 2, 'completo', 1, 2, 6, 'pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim', 1),
(49, '1458091869000', '1498101801000', 1, 'completo', 8, 2, 5, 'ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat', 1),
(50, '1481133920000', '0', 3, 'completo', 1, 6, 6, 'dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut', 2),
(51, '1466657831000', '1499088723000', 2, 'completo', 1, 6, 9, 'ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere', 1),
(52, '1490131652000', '1509228036000', 5, 'incompleto', 8, 5, 4, 'tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl', 2),
(53, '1479405695000', '1507123345000', 1, 'completo', 8, 5, 10, 'placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit', 1),
(54, '1480816434000', '1505154832000', 3, 'incompleto', 1, 5, 8, 'tristique in tempus sit amet sem fusce consequat nulla nisl', 1),
(55, '1481416968000', '0', 1, 'completo', 8, 5, 1, 'curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque', 1),
(56, '1489774735000', '1505023881000', 4, 'completo', 8, 5, 2, 'magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi', 2),
(57, '1486755673000', '1510022003000', 4, 'completo', 8, 6, 6, 'sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis', 1),
(58, '1481145938000', '0', 3, 'incompleto', 1, 2, 3, 'vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu', 1),
(59, '1481708880000', '1499572136000', 2, 'incompleto', 1, 5, 6, 'dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula', 2),
(60, '1476294674000', '1508310080000', 4, 'completo', 8, 2, 10, 'consequat in consequat ut nulla sed accumsan felis ut at dolor quis', 2),
(61, '1496029293000', '1504241784000', 4, 'completo', 1, 6, 7, 'sit amet nunc viverra dapibus nulla suscipit ligula in lacus', 2),
(62, '1479738597000', '1511043207000', 4, 'completo', 1, 5, 2, 'odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi', 1),
(63, '1479865319000', '1505338415000', 5, 'incompleto', 1, 6, 4, 'suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique', 2),
(64, '1472903642000', '1504625330000', 5, 'incompleto', 8, 2, 9, 'in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst', 1),
(65, '1494428613000', '0', 3, 'completo', 1, 5, 1, 'eu felis fusce posuere felis sed lacus morbi sem mauris laoreet', 1),
(66, '1480663968000', '0', 4, 'completo', 1, 2, 10, 'nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue', 1),
(67, '1454906137000', '0', 3, 'incompleto', 1, 6, 9, 'pede libero quis orci nullam molestie nibh in lectus pellentesque at', 2),
(68, '1461762261000', '0', 3, 'completo', 8, 5, 10, 'duis at velit eu est congue elementum in hac habitasse platea', 2),
(69, '1455531389000', '1500522681000', 5, 'incompleto', 8, 5, 4, 'magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt', 1),
(70, '1488013430000', '0', 3, 'incompleto', 8, 6, 2, 'massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus', 1),
(71, '1466880834000', '1510551561000', 4, 'incompleto', 8, 6, 7, 'vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer', 1),
(72, '1490321068000', '0', 2, 'incompleto', 1, 6, 1, 'semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante', 2),
(73, '1458121333000', '0', 3, 'incompleto', 1, 5, 5, 'diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra', 2),
(74, '1472722311000', '0', 5, 'completo', 1, 6, 2, 'sit amet sem fusce consequat nulla nisl nunc nisl duis', 1),
(75, '1494426976000', '1501616177000', 2, 'incompleto', 8, 5, 9, 'pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem', 1),
(76, '1456970895000', '0', 2, 'completo', 8, 2, 6, 'a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices', 2),
(77, '1484603866000', '0', 3, 'incompleto', 1, 5, 7, 'eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim', 1),
(78, '1482616484000', '1509853818000', 2, 'completo', 1, 6, 1, 'non mi integer ac neque duis bibendum morbi non quam', 1),
(79, '1460433073000', '0', 1, 'completo', 1, 2, 10, 'faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus', 2),
(80, '1469129117000', '0', 4, 'incompleto', 8, 5, 1, 'dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris', 2),
(81, '1480356265000', '1499626339000', 2, 'completo', 8, 2, 2, 'turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue', 1),
(82, '1473724324000', '0', 4, 'completo', 1, 2, 1, 'eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit', 1),
(83, '1469406460000', '0', 2, 'completo', 8, 5, 6, 'ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra', 1),
(84, '1457460282000', '0', 5, 'incompleto', 1, 2, 1, 'a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla', 1),
(85, '1460834647000', '1500837524000', 4, 'completo', 8, 2, 10, 'diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae', 2),
(86, '1493182476000', '0', 5, 'completo', 1, 6, 6, 'eget massa tempor convallis nulla neque libero convallis eget eleifend', 2),
(87, '1461839537000', '1503961612000', 2, 'incompleto', 1, 5, 6, 'eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra', 2),
(88, '1494293264000', '0', 1, 'incompleto', 8, 6, 10, 'nulla neque libero convallis eget eleifend luctus ultricies eu nibh', 1),
(89, '1471149197000', '0', 2, 'incompleto', 8, 6, 4, 'cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor', 2),
(90, '1469392059000', '0', 2, 'completo', 8, 6, 8, 'tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at', 2),
(91, '1463639447000', '1509706231000', 4, 'completo', 8, 6, 8, 'erat tortor sollicitudin mi sit amet lobortis sapien sapien non', 2),
(92, '1477032061000', '0', 5, 'completo', 8, 5, 9, 'pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque', 1),
(93, '1475932089000', '0', 5, 'incompleto', 8, 6, 4, 'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia', 2),
(94, '1469185223000', '1502278797000', 5, 'completo', 8, 6, 10, 'dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus', 2),
(95, '1467732460000', '0', 2, 'incompleto', 1, 6, 7, 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus', 1),
(96, '1489726201000', '0', 2, 'completo', 8, 2, 4, 'fermentum donec ut mauris eget massa tempor convallis nulla neque libero', 1),
(97, '1476438203000', '1507293227000', 3, 'completo', 1, 5, 2, 'justo morbi ut odio cras mi pede malesuada in imperdiet', 1),
(98, '1452750219000', '0', 4, 'incompleto', 1, 5, 8, 'turpis a pede posuere nonummy integer non velit donec diam neque vestibulum', 1),
(99, '1469575184000', '0', 3, 'incompleto', 8, 6, 2, 'integer non velit donec diam neque vestibulum eget vulputate ut ultrices', 1),
(100, '1480158885000', '0', 2, 'incompleto', 8, 5, 1, 'quam turpis adipiscing lorem vitae mattis nibh ligula nec sem', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `tipo`, `idUsuario`) VALUES
(1, 'encargado', 1),
(2, 'empleado', 2),
(3, 'cliente', 3),
(4, 'cliente', 4),
(5, 'empleado', 5),
(6, 'empleado', 6),
(7, 'cliente', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `habilitado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `rol`, `habilitado`) VALUES
(1, 'Elias', 'Rodriguez', 'elias.rod@live.com', 'a', 'encargado', '1'),
(2, 'Thomas', 'Anderson', 'theone@matrix.com', '101', 'empleado', '1'),
(3, 'Susana', 'Gimenez', 'susana.gim@telefe.com', 'a', 'cliente', '1'),
(4, 'Marcelo', 'Tinelli', 'marce@ideas.com', 'a', 'cliente', '1'),
(5, 'Bart', 'Simpson', 'bart@gmail.com', 'a', 'empleado', '1'),
(6, 'Lisa', 'Monalisa', 'lisa@gmail.com', 'a', 'empleado', '1'),
(7, 'Mark', 'Zuckerberg', 'mark@gmail.com', 'a', 'cliente', '1'),
(8, 'Mariano', 'Recalde', 'mariano@gmail.com', 'a', 'encargado', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `relevamientos`
--
ALTER TABLE `relevamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `localId` (`localId`),
  ADD KEY `encargadoId` (`encargadoId`),
  ADD KEY `mysteryShopperId` (`mysteryShopperId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=501;
--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `relevamientos`
--
ALTER TABLE `relevamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `relevamientos`
--
ALTER TABLE `relevamientos`
  ADD CONSTRAINT `relevamientos_ibfk_1` FOREIGN KEY (`localId`) REFERENCES `locales` (`id`),
  ADD CONSTRAINT `relevamientos_ibfk_2` FOREIGN KEY (`encargadoId`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `relevamientos_ibfk_3` FOREIGN KEY (`mysteryShopperId`) REFERENCES `usuarios` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
