CREATE DATABASE Webshop;

USE Webshop;

CREATE TABLE ´Order´ (
	Id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    Email VARCHAR(32), 
    ´Name´ VARCHAR(32),
    Price INT(6)
);



CREATE TABLE ProductOrder (
	OrderId INT(6) UNSIGNED,
    Price INT(6),
    ´Name´ VARCHAR(16),
    FOREIGN KEY (OrderId) REFERENCES ´Order´(id) ON DELETE CASCADE
);

select * from ´Order´;

select * from ProductOrder;

create user webshop@'localhost' identified by 'password';
GRANT ALL PRIVILEGES ON webshop.* TO 'webshop'@'localhost';
 flush privileges;

insert into ´Order´ (Email, Price) values ('test@tes.se', 100) 
insert into ProductOrder (orderId, Price, ´Name´) values (1, 50, 'test product')