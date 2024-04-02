# AllowMe Blog - Backend
 

## Sobre

Essa é o web backend de uma aplicação de blog pessoal.
O front-end está em um repositório diferente, clique [nesse link](https://github.com/nathborges/allowme-blog-front) para acessá-lo.


## Como iniciar o projeto


1. Adicione um arquivo .env na raiz do projeto com as variáveis de ambiente. Você pode usar o .env.example como exemplo. Só duplicar o arquivo e tirar a palavra 'example', ficando assim apenas um '.env';
2. Como default, quando ambiente de dev, alguns seeders irão rodar para popular o banco de dados. Para desativar isso, no arquivo .env defina a variável ACTIVE_SEEDERS=false;

3. Caso deseje rodar atráves do docker, use o comando `docker compose up`;
4. Caso deseje rodar como desenvolvimento, verifique se as portas :5432, :3000 estão disponíveis na sua máquina.
Use os comandos:
```
Para verificar:

lsof -iTCP:5432,3000 

Para encerrar o processo que está usando essa porta, substitua com o número PID do processo:
kill -9 <PID> 
```

Atenção, esse projeto usa o node 18.19.0. Caso você não tenha o nvm (aplicação de versionamento de node) na sua máquina, seu ambiente precisa estar settado com essa versão de node.

```
nvm use .
npm i
npm run start:dev
```
5. Para verificar a documentação da api, acesse http://localhost:3000/api
Atenção, a Api key está no arquivo .env.

 Caso tenha algum erro para iniciar o projeto, crie uma issue que irei te ajudar!
 
 ## Tecnologias usadas
 
<div style="display:flex">
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/-NestJs-ea2845?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"/></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/></a> 
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/></a>
</div>

## Postgres 
## Descrição das tabelas

#### Users
Coluna | Descrição
----|----
id| Chave primária
username| Username no site do autor
full_name | Nome completo do autor
created_date | Data da criação do registro


#### Posts
Field | Description
----|-------
 id | Chave primária
 title | Título da postagem
 body | Conteúdo principal da postagem
 userId | Chave estrangeira que referencia Users

 ## Próximos passos
 - Criar um modulo especifico para o seeders (tá uma gambiarra enorme ali kkkkk), utilizando a própria lib do TYPEORM para isso.
 - Criar um endpoint que pegue todos os posts com filtros dinâmicos que podem ser agregados, diminuindo assim a quantidade de endpoints.
 - Testes unitários.
 - Melhorar os loggers, adicionando nomes de loggers específicos para cada classe e processo. Tracking é uma coisa muito importante, mas obviamente, tomando cuidado com os dados sensíveis.
 - Adicionar um endpoint de login com tokenização.
