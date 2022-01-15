# Sensedia API Mocks UI
Essa projeto tem como premissa prover uma interface gráfica Web para o projeto api-mocks.

Com essa interface é possível criar, gerenciar e deletar mocks e seus cenários.

### Requisitos mínimos
* Node 12.8.0
* Docker (caso queira rodar a aplicação em um container)

### Variáveis de Ambiente
* **MOCKS_BACKEND_URL**: Endereço do back-end da aplicação api-mocks. Opcional. Por padrão http://localhost:8090
* **MOCKS_DEFAULT_TIMEOUT**: Timeout default em milisegundos para as requisições realizadas pela UI. Opcional. Por padrão 20000.
* **MOCKS_FRONTEND_PORT**: Porta do webserver de arquivos estáticos da UI. Opcional. Por padrão 8000.

### Building and Running
Para buildar o projeto utilizamos os seguintes comandos na raiz:
* ``npm install``
* ``npm install -g gulp``

Para buildar e rodar a aplicação utilizamos o comando:
``gulp run``

Podemos ainda buildar a aplicação e executar o web server separadamente com:
* ``gulp build``
* ``gulp webserver``

### Docker
Sintam-se livres para utilizar a imagem de meu repositório: 
``docker pull gabrieln/apimocksui:latest``

Se quiserem utilizar uma imagem do zero, existe um arquivo Dockerfile incluso nesse projeto que faz o build da imagem do Docker. Para criar uma imagem local basta utilizar o comando: 
``docker build -t seu_usuario/apimocksui:latest .``

Para publicar essa imagem é necessário criar uma conta no Docker Hub e associar essa conta em seu Docker local. Logo em seguida utilizar o comando:
``docker push seu_usuario/apimocksui:latest``

Para criar um novo container a partir dessa imagem basta utilizar o comando:
``docker run -d -p 8000:8000 --name api_mocks_ui -e "MOCKS_BACKEND_URL=http://localhost:8090" -e "MOCKS_DEFAULT_TIMEOUT=20000" -e "MOCKS_FRONTEND_PORT=8000" seu_usuario/apimocksui:latest``

Ou simplesmente:
``docker run -d -p 8000:8000 --name api_mocks_ui seu_usuario/apimocksui:latest``

### Known Issues
* Atualmente é possível criar APIs com basePath duplicados. Isso será tratado nas próximas versões.
* Não é feita a validação no botão de Salvar Mock se alguma informação mandatório (como existir ao menos uma operação). Com isso o botão está sempre habilitado.

### Next Features
* Capacidade de inativar / reativar Operações de Mocks
* Criação e controle de perfils de acesso aos Mocks + Tela de login