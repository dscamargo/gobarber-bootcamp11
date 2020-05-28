<div align="center" style="margin: 20px;">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
![GitHub last commit](https://img.shields.io/github/last-commit/dscamargo/gobarber-bootcamp11?color=blue&style=flat-square)
<!-- [![Codacy Badge](https://app.codacy.com/project/badge/Grade/30e0ef7a3c2146498723e53c9fcaeda7)](https://www.codacy.com/manual/jvictorfarias/GoBarber_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jvictorfarias/GoBarber&amp;utm_campaign=Badge_Grade) -->
![GitHub top language](https://img.shields.io/github/languages/top/dscamargo/gobarber-bootcamp11?style=flat-square)


<p align="center" >
  <a href="#fire-o-projeto"> :fire: O Projeto</a> |
  <a href="#rocket-tecnologias-usadas"> :rocket: Tecnologias Usadas</a> |
  <a href="#hammer-deploy"> :hammer: Deploy (Em Breve) </a> |
  <a href="#zap-executando-o-projeto"> :zap: Executando o Projeto </a> 
</p>

</div>

### Rodando no Postman
[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://app.getpostman.com/run-collection/e7a628aca2ae18361226)

## :fire: O projeto

Aplicação para agendar e gerenciar serviços de beleza, onde prestadores de serviços podem se cadastrar,
e usuários poderão marcar agendamentos com estes provedores.

### :rocket: Tecnologias Usadas

O projeto foi feito com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [ReactJS](https://pt-br.reactjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Native](https://reactnative.dev/)
- [Styled Components](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/)

## :hammer: Deploy
- Em Breve

## :zap: Executando o Projeto
#### Clonando o projeto
```sh
$ git clone https://github.com/dscamargo/gobarber-bootcamp11.git gobarber
$ cd gobarber
```
#### Iniciando a API
```sh
#Entre na pasta da api
cd backend

# Para rodar o servidor de desenvolvimento, com o docker e o docker-compose instalado na sua máquina, rode o comando:
docker-compose up -d
```
<!-- #### Iniciando o Frontend
```sh
$ cd web
$ yarn && yarn start
```
#### Iniciando o Mobile(Android)
```sh
$ cd mobile
$ yarn && yarn android && yarn start
``` -->

#### Iniciando o frontend
```sh
cd web

# Em seguida, instale as dependências e inicie o servidor de desevolvimento com o comando:
yarn && yarn start
```

#### Iniciando o mobile
```sh
cd appgobarber

# Em seguida, instale as dependências e inicie o servidor de desevolvimento de acordo com o seu emulador:

## Para rodar no emulador Android:
yarn && yarn android

## Para rodar no emulador iOS:
yarn && yarn ios
```

## 🤔 Como contribuir

Se quiser contribuir para esse repositório aqui, seja corrigindo algum problema, adicionando comentários ou melhorando a documentação, você pode seguir esse tutorial abaixo:

- Faça [um fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo) desse repositório;
- Entre no seu perfil no GitHub e faça um clone do repositório que você fez um *fork*;
- Crie uma *branch* com a sua alteração: `git checkout -b minha-alteracao`;
- Faça as alterações necessárias no código ou na documentação;
- Faça *commit* das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça *push* para a sua *branch*: `git push origin minha-alteracao`;
- Agora é só abrir a sua *pull request* no repositório que você fez o *fork*;

Depois que o *merge* da sua *pull request* for feito, você pode deletar a sua *branch*.

### :memo: Licença

Este projeto é desenvolvido sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.