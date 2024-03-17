
create table role(
    id int primary key,
    description varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
insert into role(id,description) values (1,'Administrador'),(2,'Gerente'),(3,'Supervisor'),(4,'Cajero'),(5,'Inventario')

    create table users(
        id int auto_increment primary key,
        first_name varchar(85),
        last_name varchar(80),
        email varchar(100),
        email_verified int default 0,
        password varchar(256) not null,
        image varchar(200),
        status int default 1,
        created_at BIGINT,
        updated_at BIGINT
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




create table type_company(
    id int auto_increment primary key,
    description varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

insert into type_company(description) values('Punto de venta'), ('Cafeteria'), ('Pizzeria');

create table company(
    id int auto_increment primary key,
    name varchar(200),
    nit varchar(100),
    id_type_company int not null,
    address varchar(200),
    logo varchar(200),
    email varchar(100),
    city varchar(100),
    footer_print varchar(500),
    header_print varchar(500),
    status int default 1,
    created_at BIGINT,
    updated_at BIGINT,
    foreign key (id_type_company) references type_company(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


create table role_user(
    id int auto_increment primary key,
    id_role int not null,
    id_user int not null,
    id_company int not null,
    foreign key (id_user) references users(id),
    foreign key (id_company) references company(id),
    foreign key (id_role) references role(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



create table category(
    id int auto_increment primary key,
    description varchar(30)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table type_item(
    id int auto_increment primary key,
    description varchar(30)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table item(
    id int auto_increment primary key,
    name varchar(150) not null,
    detail varchar(250),
    bar_code varchar(50),
    id_category int not null,
    sale_price float(10,2),
    buy_price float(10,2),
    image varchar(200),
    id_company int not null,
    status int default 1,
    amount int default 0,
    id_type_item int not null,
    foreign key (id_company) references company(id),
    foreign key (id_category) references category(id),
    foreign key (id_type_item) references type_item(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

