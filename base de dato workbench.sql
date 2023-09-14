create database AP_comision21647A;
create table AP_comision21647A  (
id int  auto_increment  ,
tematica varchar(100),
descripcion varchar (250) ,
imagen varchar(250),
primary key(id) 
); 

alter table ap_comision21647a add fecha varchar(100);

select * from ap_comision21647a;
alter table ap_comision21647a drop fecha ;




