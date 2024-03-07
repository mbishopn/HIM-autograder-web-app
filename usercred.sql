USE [master]
GO
CREATE DATABASE [DEVELOPMENT_USERCRED]
GO
use DEVELOPMENT_USERCRED
GO
create table users
(
	id int IDENTITY(1,1) primary key,
	username varchar(50),
	userPassword varchar(50)
	)

insert into development_usercred.dbo.users (username) select distinct a.codernumberdesc from slcv3.dbo.i10_amcare_vr a where a.codernumber='100719'

SELECT * from users
