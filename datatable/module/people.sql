-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2024 at 11:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usermanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(100) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobno` varchar(10) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `hobbies` varchar(100) NOT NULL,
  `country` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'Inactive',
  `role` varchar(20) NOT NULL DEFAULT 'User',
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `fname`, `lname`, `email`, `mobno`, `gender`, `hobbies`, `country`, `address`, `status`, `role`, `password`) VALUES
(2, 'tyuu', 'cxgf', 'jjj@gmail.com', '2147483647', 'Male', 'Dancing,Painting', 'Germany', 'fgsdfhsfghdg', 'Active', 'User', ''),
(3, 'nupoor', 'chauhan', 'nc23@gmail.com', '2147483647', 'Female', 'Dancing,Painting', 'Cuba', 'edtfgsadgsdfg', 'Inactive', 'User', ''),
(4, 'jeel', 'patel', 'jp2304@gmail.com', '5897641236', 'Female', 'Racing,Painting,Sketching', 'Mexico', 'gdsfhsdfhsdfh', 'Active', 'User', ''),
(5, 'Amisha', 'chauhan', 'ach@gmail.com', '2147483647', 'Female', 'Sketching', 'Vietnam', 'fgdsghdsghfgjhdfgj', 'Inactive', 'User', ''),
(7, 'Parthey', 'Joshi', 'pjoshi@gmail.com', '2147483647', 'Male', 'Racing,Dancing', 'Mexico', 'dghgfjdgj', 'Active', 'User', ''),
(10, 'Mark', 'Zukerburg', 'markkyy@gmail.com', '1254639878', 'Male', 'Racing,Pottery', 'Germany', 'ghjghjdfhjbvnv ', 'Inactive', 'User', ''),
(11, 'klp', 'jki', 'iop23@hfjl.com', '2147483647', 'Male', 'Dancing,Painting', 'Germany', 'sfgsdfghsdfh', 'Active', 'User', ''),
(12, 'yuii', 'kiii', 'yk@gmail.cim', '2147483647', 'Female', 'Dancing', 'Vietnam', 'hngjgkjgb', 'Inactive', 'User', ''),
(13, 'popo', 'eer', 'poer@gmail.com', '2147483647', 'Male', 'Racing', 'Switzerland', 'egdfhggfhdgh', 'Active', 'User', ''),
(15, 'chrer', 'chrer', 'xcgvsdf@hgfjh.jhk', '2147483647', 'Female', 'Painting,Sketching', 'Germany', 'ftgrtfhdfbxcvbxcbxcvbxcvbxc', 'Inactive', 'User', ''),
(16, 'sioo', 'rtert', 'asdfa@gmail.com', '2147483647', 'Female', 'Dancing,Painting', 'Switzerland', 'rgyerthdfhdfgh', 'Active', 'User', ''),
(17, 'mrudani', 'songade', 'mrudanisongade@gmail.com', '9173837900', 'Female', 'hockey,dancing,singing', 'India', 'hjkiygbnkkgvvhj', 'Inactive', 'admin', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
