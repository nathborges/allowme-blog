# Allow Me Blog - Backend
 

## Content


## Sobre

Essa é uma aplicação de backend web de uma aplicação de blog pessoal.
O front-end está em um repositório different, clique nesse link para acessá-lo.
 
 ## Tecnologias usadas
 
 Front-End
 -----
 <div style="display:flex">
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS-239120?style=flat-square&logo=css3&logoColor=white" alt="CSS"></a>
</div>

Back-End
----
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
 
