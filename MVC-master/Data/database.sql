create database QLVatLieuXayDung
go
use QLVatLieuXayDung
go
create table News(
	ID int identity(1000,1) primary key,
	Titile nvarchar(100),
	Image ntext,
	[Content] ntext
)
go
create table CommentNews(
	ID int identity(1000,1) primary key,
	Name nvarchar(100),
	Email varchar(50),
	[Content] nvarchar(500),
	Date nvarchar(50),
	News int not null constraint fk_cmt_new foreign key (News) references  News(ID)
)
go
create table Category(
	ID int identity(1000,1) primary key,
	Name nvarchar(100),
	MetaName nvarchar(50),
	IsDeleted bit default 0
)
go
create table Brand(
	ID int identity(1000,1) primary key,
	Name nvarchar(100),
	MetaName nvarchar(50),
	IsDeleted bit default 0
)
go
create table Product(
	ID int identity(1000,1) primary key,
	Name nvarchar(100),
	MetaName nvarchar(50),
	Cost int,
	Image ntext,
	Description ntext,
	Details ntext,
	HotDeal bit default 0,
	IsTopSeller bit default 0,
	IsOnTop bit default 0,
	IsNew bit default 0,
	IsStatus bit default 0,
	IsDeleted bit default 0,
	Category int not null constraint fk_category foreign key(Category) references Category(ID),
	Brand int not null constraint fk_brand foreign key(Brand) references Brand(ID),
)
go
create table ReviewProduct(
	ID int identity(1000,1) primary key,
	Name nvarchar(100),
	Email nvarchar(100),
	[Content] ntext,
	Date nvarchar(100),
	Product int not null constraint fk_rv_pr foreign key(Product) references Product(ID),
)
go
create table ImageProduct(
	ID int identity(1000,1) primary key,
	Image ntext,
	Product int not null constraint fk_img_pr foreign key(Product) references Product(ID),
)
go

create table CheckOut(
	ID int identity(1000,1) primary key,
	Date nvarchar(50),
	FirstName nvarchar(50),
	LastName nvarchar(50),
	Email nvarchar(50),
	Address nvarchar(100),
	PhoneNumber char(20),
	Note nvarchar(100)
)
go
create table [Order](
	ID int identity(1000,1) primary key,
	Product int not null constraint fk_od_pr foreign key(Product) references Product(ID),
	Quantity int,
	CheckOut int not null constraint fk_od_ck foreign key(CheckOut) references CheckOut(ID)
)
go
create table Account(
	Username nvarchar(50) primary key,
	Password nvarchar(50)
)



