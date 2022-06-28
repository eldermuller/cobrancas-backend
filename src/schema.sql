CREATE DATABASE cobranca;

CREATE TABLE IF NOT EXISTS usuarios(
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null,
    cpf text default null,
    telefone text default null
);

CREATE TABLE IF NOT EXISTS clientes(
    id serial primary key,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    telefone text not null,
    cep text default null,
    logradouro text default null,
    complemento text default null,
    bairro text default null,
    cidade text default null,
    estado text default null,
    condicao boolean default false
);

CREATE TABLE IF NOT EXISTS cobrancas(
    id serial primary key,
    cliente text not null,
    id_cliente int not null,
    descricao text not null,
    status boolean not null,
    valor int not null,
    vencimento date not null,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);