create database EmployeeDB;


create table  Department(
DepartmentId int identity(1,1),
DepartmentName varchar(500)
)

select *  from Department;

insert into Department
values('Support');

create table Employee(
EmployeeId int identity(1,1),
EmployeeName varchar(500),
Department varchar(500),
DateOfJoining date,
PhotoFileName varchar(500)

)

insert into Employee values
('Sam','IT','2020-06-01','anonymous');

select * from Employee;