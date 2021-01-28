-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 28 Jan 2021 pada 06.14
-- Versi server: 10.5.8-MariaDB
-- Versi PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `posvue`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_category`
--

CREATE TABLE `t_category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isReady` int(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `t_category`
--

INSERT INTO `t_category` (`id`, `name`, `isReady`, `created_at`, `updated_at`) VALUES
(1, 'Drink', 1, '2021-01-26 08:42:51', NULL),
(2, 'Food', 1, '2021-01-26 08:42:51', NULL),
(3, 'Suneki', 1, '2021-01-26 08:43:06', '2021-01-28 01:08:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_menu`
--

CREATE TABLE `t_menu` (
  `id` int(10) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) NOT NULL,
  `price` int(6) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isReady` int(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `t_menu`
--

INSERT INTO `t_menu` (`id`, `name`, `category_id`, `price`, `image`, `isReady`, `created_at`, `updated_at`) VALUES
(1, 'Espresso', 1, 10000, '1611805747569.png', 1, '2021-01-28 10:49:07', NULL),
(2, 'Coffee Latte', 1, 15000, '1611805878924.png', 1, '2021-01-28 10:51:18', NULL),
(3, 'Cappucino', 1, 5000, '1611806586470.png', 1, '2021-01-28 11:03:06', NULL),
(4, 'Red Velvet Latte', 1, 33000, '1611806835997.png', 1, '2021-01-28 11:07:16', NULL),
(5, 'Choco Rhum', 2, 28000, '1611806853640.png', 1, '2021-01-28 11:07:33', '2021-01-28 11:16:55'),
(6, 'Black Forest', 2, 30000, '1611806883603.png', 1, '2021-01-28 11:08:03', NULL),
(7, 'Chicken Katsu  Dabu-dabu', 2, 30000, '1611806916441.png', 1, '2021-01-28 11:08:36', NULL),
(8, 'Salmon Truffle Teriyaki', 2, 60000, '1611806940978.png', 1, '2021-01-28 11:09:01', NULL),
(9, 'Wiener Schnitzel', 2, 69000, '1611806964459.png', 1, '2021-01-28 11:09:24', NULL),
(10, 'Real Good Milk', 1, 39900, '1611810297041.jpeg', 1, '2021-01-28 11:38:52', '2021-01-28 12:04:57'),
(14, 'Data SIap Delete', 1, 3500, '1611810609585.jpeg', 0, '2021-01-28 12:10:09', '2021-01-28 12:23:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_order`
--

CREATE TABLE `t_order` (
  `id` int(10) NOT NULL,
  `inv` int(10) NOT NULL,
  `cashier` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_id` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `t_order`
--

INSERT INTO `t_order` (`id`, `inv`, `cashier`, `menu_id`, `amount`, `price`, `created_at`, `updated_at`) VALUES
(5, 102031, 'Alif Maulana A 2', 1, 2, 10000, '2021-01-28 12:44:54', NULL),
(6, 102031, 'Alif Maulana A 2', 2, 4, 15000, '2021-01-28 12:44:54', NULL),
(7, 102020, 'Last Week Order', 2, 4, 15000, '2021-01-12 12:44:54', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access` int(1) NOT NULL COMMENT '0 = Admin, 1 = Cashier',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `access`, `password`) VALUES
(1, 'Alif Maulana (Admin)', 'alifmaulana26@gmail.com', 0, '$2b$10$K2q4yLRCJh9LLO/8NKrbfuc1h.ydkhGAmjiq4M5fyJErtwKXr7vsy'),
(2, 'Alif Maulana (Cashier)', 'alifmaulana27@gmail.com', 1, '$2b$10$sT.f1vAW56cTB5Wy/W1.dev/gVXRDdeJFyw7Ce3330KBoQ7V5pu0G');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `t_category`
--
ALTER TABLE `t_category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `t_menu`
--
ALTER TABLE `t_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID_to_tCategoryID` (`category_id`);

--
-- Indeks untuk tabel `t_order`
--
ALTER TABLE `t_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menuID_to_tMenuID` (`menu_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `t_category`
--
ALTER TABLE `t_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `t_menu`
--
ALTER TABLE `t_menu`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `t_order`
--
ALTER TABLE `t_order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `t_menu`
--
ALTER TABLE `t_menu`
  ADD CONSTRAINT `categoryID_to_tCategoryID` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`id`);

--
-- Ketidakleluasaan untuk tabel `t_order`
--
ALTER TABLE `t_order`
  ADD CONSTRAINT `menuID_to_tMenuID` FOREIGN KEY (`menu_id`) REFERENCES `t_menu` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
