create table divisa(
    int id auto_increment primary key,
    varchar(5) currency unique key,
    decimal(10,8) value
);