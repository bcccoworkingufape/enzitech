# Enzitech
## Instalação

```bash
$ yarn install
```

### Configurar o `.env`:

```bash
$ cp .env.example .env
```

### Configurar o banco de dados:

Crie o banco e os schemas da aplicação.

### Rodar a aplicação:

```bash
$ yarn start:dev
```

## Rodando a aplicação

```bash
# development
$ yarn start:dev

# production
$ yarn start:prod
```

## Rodando os Testes

### Unitário

```bash
$ yarn test
```

### E2E

```bash
$ yarn test:e2e
```

## Apple Review

No .env do projeto no campo IOS_VERSION deve se igual ao valor mandado pelo Mobile do IOS na rota `/ios/review/:version`, logo para desabilitar a revisão da versão basta apenas colocar um valor de uma versão que não foi lançada.
Ex: versão do app IOS 1.2.1, para desabilitar a revisão basta colocar no .env a versão 1.3.0


## Gerando Migrations

As migrations são geradas automaticamente a partir da modelagem em `domain/models/*`.
No entanto, algumas observações são importantes:

- O TypeORM usa o código compilado para criar a migration, logo,
  certifique-se que o mesmo, em `/dist`, está atualizado _(Pode-se fazer isso reiniciando a aplicação)_.
- Ele também olhará o estado atual do banco para criar o que estiver diferente.
  Certifique-se que todas as migrations foram executadas antes de gerar.

```bash
$ yarn typeorm migration:generate -n <nome_da_migration>
```

## Rodando as Migrations geradas

```bash
$ yarn typeorm migration:run
```

## Tipos de commits

| Commit Type | Title                    | Description                                                                                                 |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `feat`      | Features                 | A new feature                                                                                               |
| `fix`       | Bug Fixes                | A bug Fix                                                                                                   |
| `docs`      | Documentation            | Documentation only changes                                                                                  |
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| `perf`      | Performance Improvements | A code change that improves performance                                                                     |
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                           |
| `build`     | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| `ci`        | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                           |
| `revert`    | Reverts                  | Reverts a previous commit                                                                                   |
