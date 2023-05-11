# 🎲 Rodando o Back End

## Configuração do Projeto

Instale as dependências do projeto.

```bash
npm install
```

## Execute a aplicação em modo de desenvolvimento

```bash
# Execute a aplicação
npm run start:dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## Estrutura do Projeto

```shell
src
├───modules
│   ├───auth
│   │   ├───controller
│   │   │───strategies
│   │   └───service
│   │───owners
│   │    ├───controller
│   │    ├───dtos
│   │    ├───entities
│   │    └───service
│   │───pokemons
│   │    ├───controller
│   │    ├───dtos
│   │    ├───entities
│   │    └───service
│   └───users
│       ├───controller
│       ├───dtos
│       ├───entities
│       └───service
│───app.module.ts
└───main.ts
```
