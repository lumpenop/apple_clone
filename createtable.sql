CREATE TABLE `users` (
    `id` INTEGER NOT NULL auto_increment ,
     `userid` VARCHAR(100) NOT NULL, 
     `userpw` VARCHAR(100) NOT NULL, 
     `username` VARCHAR(100) NOT NULL, 
     `userbirth` INTEGER NOT NULL, 
     `image` VARCHAR(200), 
     `mobile` VARCHAR(100) NOT NULL, 
     `register_date` DATE NOT NULL DEFAULT curdate(), 
     `email_verified` Boolean NOT NULL DEFAULT:false, 
     `key_for_verify` VARCHAR(20) NOT NULL,
     `admin` VARCHAR(100), UNIQUE 
     `userid` (`userid`), PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `items` (`id` INTEGER NOT NULL auto_increment , `item_serial_number` VARCHAR(100) NOT NULL, `item_name` VARCHAR(100) NOT NULL, `item_price` VARCHAR(100) NOT NULL, `item_image` VARCHAR(200) NOT NULL, `item_size` VARCHAR(100) NOT NULL, `item_color` VARCHAR(100) NOT NULL, `item_capacity` VARCHAR(100) NOT NULL, UNIQUE `item_serial_number` (`item_serial_number`), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `history` (`id` INTEGER NOT NULL auto_increment , `name1` VARCHAR(100) NOT NULL, `name2` VARCHAR(100) NOT NULL, `address1` VARCHAR(100) NOT NULL, `address2` VARCHAR(100) NOT 
NULL, `addressnumber` INTEGER(200), `nation` VARCHAR(100) NOT NULL, `email` VARCHAR(100) NOT NULL, `phone` INTEGER(100), `item_serial_number` VARCHAR(100) NOT NULL, `item_name` VARCHAR(100) NOT NULL, `item_price` INTEGER NOT NULL, `item_image` VARCHAR(200) NOT NULL, `item_size` INTEGER NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;



CREATE TABLE `history` (`id` INTEGER NOT NULL auto_increment , `name1` VARCHAR(100) NOT NULL, `name2` VARCHAR(100) NOT NULL, `address1` VARCHAR(100) NOT NULL, `address2` VARCHAR(100) NOT 
NULL, `addressnumber` INTEGER(200), `nation` VARCHAR(100) NOT NULL, `email` VARCHAR(100) NOT NULL, `phone` INTEGER(100), `item_serial_number` VARCHAR(100) NOT NULL, `item_name` VARCHAR(100) NOT NULL, `item_price` INTEGER NOT NULL, `item_image` VARCHAR(200) NOT NULL, `item_color` VARCHAR(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;


insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '1', '자료 구조형', 'https://www.youtube.com/embed/djX-RlrpMqA');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '2', 'for문', 'https://www.youtube.com/embed/A9rU0hhAqSQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '3', 'if문', 'https://www.youtube.com/embed/5UJ5XKi394U');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '1', '오리엔테이션', 'https://www.youtube.com/embed/n_sjInffbC8');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '2', '기능구현', 'https://www.youtube.com/embed/mOheM7xE150');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '3', '실전 강의', 'https://www.youtube.com/embed/qlZKdOUBH74');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '1', '리눅스란', 'https://www.youtube.com/embed/cbQWGE4teE0');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '2', '콜백함수란', 'https://www.youtube.com/embed/NtXmGq-ZiS4');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '3', '비동기란', 'https://www.youtube.com/embed/OizavDOrBTQ');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '1', 'C언어의 기초', 'https://www.youtube.com/embed/KX_QelwuC8I');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '2', '변수 설정', 'https://www.youtube.com/embed/WLS99zDpeBQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '3', '사용자 인터페이스란', 'https://www.youtube.com/embed/7NqYdytkVtg');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '1', '함수란', 'https://www.youtube.com/embed/XA7_bP6isv0');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '2', '객체란', 'https://www.youtube.com/embed/xrC7wx6VmTQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '3', '파이썬의 장점', 'https://www.youtube.com/embed/T-HguLt20yI');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '1', '이더리움이란', 'https://www.youtube.com/embed/cpiW5MR9F7k');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '2', '블록체인이란', 'https://www.youtube.com/embed/FhMR_SmlIyI');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '3', '탈중앙화의 장점', 'https://www.youtube.com/embed/XepTjhwY2Rc');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '4', '자료 구조형', 'https://www.youtube.com/embed/cpiW5MR9F7k');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '5', 'for문', 'https://www.youtube.com/embed/FhMR_SmlIyI');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '6', 'if문', 'https://www.youtube.com/embed/XepTjhwY2Rc');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '4', '오리엔테이션', 'https://www.youtube.com/embed/XA7_bP6isv0');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '5', '기능구현', 'https://www.youtube.com/embed/xrC7wx6VmTQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('JAVSCRIPT', '6', '실전 강의', 'https://www.youtube.com/embed/T-HguLt20yI');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '4', '리눅스란', 'https://www.youtube.com/embed/KX_QelwuC8I');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '5', '콜백함수란', 'https://www.youtube.com/embed/WLS99zDpeBQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('NODEJS', '6', '비동기란', 'https://www.youtube.com/embed/7NqYdytkVtg');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '4', 'C언어의 기초', 'https://www.youtube.com/embed/cbQWGE4teE0');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '5', '변수 설정', 'https://www.youtube.com/embed/WLS99zDpeBQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C', '6', '사용자 인터페이스란', 'https://www.youtube.com/embed/OizavDOrBTQ');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '4', '함수란', 'https://www.youtube.com/embed/n_sjInffbC8');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '5', '객체란', 'https://www.youtube.com/embed/NtXmGq-ZiS4');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('python', '6', '파이썬의 장점', 'https://www.youtube.com/embed/qlZKdOUBH74');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '4', '이더리움이란', 'https://www.youtube.com/embed/djX-RlrpMqA');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '5', '블록체인이란', 'https://www.youtube.com/embed/A9rU0hhAqSQ');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('etherium', '6', '탈중앙화의 장점', 'https://www.youtube.com/embed/5UJ5XKi394U');

insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '7', '자료 구조형', 'https://www.youtube.com/embed/XVQeBm_ilJU');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '8', 'for문', 'https://www.youtube.com/embed/2kL0FrUXFOI');
insert into skills (skill_name, iframe_number, iframe_name, skill_iframe) values ('C++', '9', 'if문', 'https://www.youtube.com/embed/tQ0yjYUFKAE');