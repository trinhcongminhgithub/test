CREATE TABLE `accounts` (
`id` int(11) not null,
`username` varchar(50) not null,
`password` varchar(250) not null,
`email` varchar(50) not null
)engine=innodb auto_increment=1 default charset=utf8;

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) not null auto_increment,auto_increment=1;

INSERT INTO `accounts` (`username`,`password`,`email`) VALUES ('test','test','test');
