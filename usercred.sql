-- this script should be run ONCE before deploying HIM App
-- I will create auxiliary database DEVELOPMENT_USERCRED to store APP-realated exclusive stuff without touching med2020 db (SLCV3)
-- 

USE [master]
GO
CREATE DATABASE [DEVELOPMENT_USERCRED]
GO
use DEVELOPMENT_USERCRED
GO
-- table to store App users credentials
drop table users if exists
create table users
(
	id int IDENTITY(1,1) primary key,
	username varchar(50),
	userPassword varchar(80),
	qryname varchar(50)
	)

-- table holding groups created by teachers

-- first, let's create the admin user with default password admin
INSERT INTO users (username,userPassword)
VALUES ('admin','admin');
-- now let's bring all current teachers in med2020 to this database
--insert into development_usercred.dbo.users (username,qryname) select distinct a.codernumberdesc from slcv3.dbo.i10_amcare_vr a where a.codernumber='100719'

insert into development_usercred.dbo.users (qryname, username) select distinct a.codernumberdesc, bb.UserName from i10_amcare_vr a,
(select b.usercode, b.recordid, b.UserDescription,c.username
from user_profile b,
user_authenticate c
where b.usercode='100719' 
and b.RecordID=c.RecordID) bb
where a.codernumberdesc=bb.userdescription

