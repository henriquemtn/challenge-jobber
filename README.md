<!--- # "Can be a image or a gift from the project pages" -->

# Challenge Jobber✨

O Desafio Jobber é um projeto que visa a criação de uma aplicação Fullstack para o gerenciamento de tarefas, utilizando React, Django, Django REST Framework e PostgreSQL. O objetivo central é desenvolver uma aplicação CRUD (Create, Read, Update, Delete) que permita a gestão completa de tarefas.

Para facilitar o desenvolvimento e a configuração do ambiente, o projeto inclui a utilização de Docker. Esta abordagem não apenas simplifica a configuração e o gerenciamento das dependências, mas também serviu para mim como uma oportunidade de aprendizado e prática na construção de ambientes isolados e replicáveis.

## Tech Stack 🐋

<!--- # "Verify icons availability here https://github.com/tandpfun/skill-icons" -->

[![My Skills](https://skillicons.dev/icons?i=ts,nextjs,docker,postgres,react,tailwind)](https://skillicons.dev)

## Como rodar o projeto 💻

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:henriquemtn/challenge-jobber.git
   ```

2. **Configure as variáveis de Ambiente:**

- Navegue até a pasta backend/dotenv_files.
  - Crie um novo arquivo ```.env```.
  - Observe o arquivo ```.env-example``` e preencha as memsas variáveis de ambiente no arquivo ```.env``` com as seus respectivos valores. 

3. **Navegue até a pasta `backend`:**

   ```bash
   cd backend
   ```

4. **Crie um ambiente virtual e ative-o:**

   ```bash
    python -m venv venv
    venv\Scripts\activate # Se estiver no Windows
    source venv/bin/activate # Se estiver no Linux
   ```

5. **Instale as dependências do projeto:**

   ```bash
   pip install -r requirements.txt
   ```
6. **Aplique as migrações:**

   ```bash
   python manage.py migrate
   ```


7. **Volte até o diretório raiz do projeto:**

    ```bash
    cd challenge-jobber
    ```

8. **Suba os containers com o Docker Compose:**

   ```bash
   docker-compose up --build
   ```

9. **As aplicações vão estar nos seguintes URL's:**

   - **Backend:** [http://localhost:8000/api/jobs/](http://localhost:8000/api/jobs/)
   - **Frontend:** [http://localhost:3000](http://localhost:3000)



## Django REST API 🪄
Após a configuração inicial do projeto, você pode interagir com o backend através da API disponível nos seguintes endpoints:

**GET /api/jobs/**
Recupera a lista de todos os jobs. Este endpoint retorna uma coleção de objetos job, permitindo a visualização de todas as tarefas disponíveis.

**GET /api/jobs/{id}/**
Recupera os detalhes de um job específico pelo seu ID. Substitua {id} pelo identificador do job desejado para obter suas informações detalhadas.

**POST /api/jobs/**
Cria um novo job. Envie os dados necessários no corpo da solicitação para adicionar uma nova tarefa à lista. Este endpoint requer autenticação adequada e validação dos dados fornecidos.

**PUT /api/jobs/{id}/**
Atualiza um job existente. Substitua {id} pelo identificador do job que você deseja atualizar e forneça os dados atualizados no corpo da solicitação. Este endpoint permite modificar os detalhes de uma tarefa existente.

**DELETE /api/jobs/{id}/**
Deleta um job pelo seu ID. Substitua {id} pelo identificador do job que você deseja remover. Esta operação exclui permanentemente a tarefa da lista.

Certifique-se de que todas as requisições que modificam dados (POST, PUT, DELETE) sejam realizadas com as credenciais apropriadas e que os dados enviados estejam no formato correto para garantir a integridade e a segurança da aplicação.

## Testes com Pytest 🔨

Para realizar os testes no Django precisaremos **rodar o Docker e acessar o terminal** do container ```backend_jobber```, nele iremos digitar o seguinte comando:

```bash
pytest tasks/tests.py
```

Após isso os seguintes testes irão ser realizados:

- Criação do Job
- Validação de Imagem ( Tamanho Máximo 8MB)
- Valor Status ao criar Job sem definir nada.
- Valor Priority ao criar Job sem definir nada.
