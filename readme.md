# API Base com Clean Architecture

Uma API REST robusta construída com princípios de Clean Architecture, TypeScript e práticas modernas de desenvolvimento.

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture, promovendo uma separação clara entre domínios e responsabilidades:

### Principais Camadas

- **Entidades**: Core da aplicação contendo regras de negócio (ex: User)
- **Use Cases**: Implementa os casos de uso orquestrando entidades e serviços (ex: LoginUserUseCase)
- **Controladores**: Gerencia requisições HTTP (ex: UserController)
- **Serviços**: Implementações externas como hash, tokens etc (ex: BcryptService)
- **Repositórios**: Abstrai persistência de dados (ex: UserRepositoryPrisma)

Com base no código fonte, vou explicar como o projeto implementa os princípios SOLID e Clean Architecture:

### Princípios SOLID

1. **Single Responsibility (SRP)**

   - Cada classe deve ter uma única responsabilidade ou razão para mudar. Isso significa que uma classe deve ser responsável por apenas uma parte da funcionalidade fornecida pelo software, facilitando a manutenção e evolução do código.
   - Exemplos:
     - `User` - Entidade de domínio
     - `UserController` - Controlador HTTP
     - `BcryptService` - Serviço de criptografia
     - `JwtTokenService` - Serviço de tokens

2. **Open/Closed (OCP)**

   - As classes devem estar abertas para extensão, mas fechadas para modificação. Isso significa que o comportamento de uma classe pode ser estendido sem alterar seu código fonte, geralmente através de interfaces e herança.
   - Exemplos:
     - `ITokenService`
     - `ICryptoService`
     - `IHttpServer`

3. **Liskov Substitution (LSP)**

   - Objetos de uma classe base devem poder ser substituídos por objetos de uma classe derivada sem afetar a funcionalidade do programa. Isso garante que a substituição de uma classe por outra não introduza erros.
   - Exemplos:
     - `FastifyHttpServer`
     - `ExpressHttpServer`

4. **Interface Segregation (ISP)**

   - Muitas interfaces específicas são melhores do que uma interface geral. Isso significa que os clientes não devem ser forçados a depender de interfaces que não utilizam, promovendo interfaces mais coesas e específicas.
   - Exemplos:
     - `IUseCase`
     - `IUserRepository`

5. **Dependency Inversion (DIP)**

   - Módulos de alto nível não devem depender de módulos de baixo nível, mas ambos devem depender de abstrações. Isso promove a inversão de dependências, onde detalhes dependem de abstrações e não o contrário.
   - Exemplos:
     - `UserController` depende de `IUseCase`
     - `LoginUserUseCase` depende de `IUserRepository`, `ICryptoService` e `ITokenService`

### Clean Architecture

1. **Camadas Independentes**

   - Entidades: `User`, `Email`
   - Use Cases: `LoginUserUseCase`
   - Controladores: `UserController`
   - Infraestrutura: `UserRepositoryPrisma`

2. **Dependência para o Centro**

   - Entidades não dependem de nada externo
   - Use Cases dependem apenas de entidades
   - Controladores dependem de Use Cases
   - Adaptadores externos (Prisma, Express) na camada mais externa

3. **Inversão de Dependência**

   - Interfaces definem contratos
   - Implementações concretas dependem de abstrações

## 🚀 Instalação

### Pré-requisitos

- Node.js 21.5.0
- Docker e Docker Compose

### Passos

## 🐳 Ambiente Docker

O projeto utiliza containers Docker para:

- PostgreSQL (porta 5432)
- Redis (porta 6379)

## 🛠️ Adicionando Novos Recursos

### Novo Serviço

1. Crie a interface em `src/services/novoServico/INovoServico.ts`
2. Implemente o serviço em `src/services/novoServico/NovoServico.ts`

### Nova Rota

1. Crie o controlador em `src/controllers/NovoController.ts`
2. Registre a rota em `src/routes/novasRotas.ts`

## 💡 Qualidade de Código

- **Husky + ESLint + Prettier + Jest**
  - O projeto utiliza hooks do Git para garantir qualidade:
  - Pre-commit: Executa ESLint e Prettier
  - Commit-msg: Valida mensagem com Commitizen
  - Pre-push: Executa testes Jest

### Benefícios:

- Código padronizado e limpo
- Commits semânticos e organizados
- Testes garantem funcionamento
- Integração contínua facilitada

## 📝 Licença

Este projeto está sob a licença MIT.

Desenvolvido por Daniel Melo Alencar
