# SHARE GX: COMPARTILHAMENTO DE CARONAS

Este é um aplicativo React Native para compartilhamento de caronas. O aplicativo permite que os usuários adicionem o destino desejado e o nome do passageiro para que outros usuários possam ver e fazer reservas.

# INSTALAÇÃO

Para instalar o aplicativo, siga estas etapas:

1. Clone este repositório para o seu computador. git clone https://github.com/Gabrielxbc00/ShareGX.git
2. Instale as dependências do projeto usando o comando npm install ou yarn install.
3. Certifique-se de ter um ambiente de desenvolvimento configurado para executar aplicativos React Native no seu dispositivo móvel ou em um emulador.
4. Execute o aplicativo usando o comando npm start ou yarn start.

# USO

Ao abrir o aplicativo, você será direcionado para a tela de login. Insira suas credenciais de usuário para acessar a funcionalidade principal do aplicativo.

# TELA DE LOGIN

Na tela de login, insira seu nome de usuário e senha nos campos apropriados. Em seguida, clique no botão "Entrar" para acessar o aplicativo.

# TELA PRINCIPAL

Na tela principal, você verá uma lista de caronas disponíveis, com informações sobre o destino e o nome do passageiro. Você pode visualizar os detalhes de cada carona e fazer uma reserva.

Para visualizar os detalhes de uma carona, clique no item da lista correspondente.
Para fazer uma reserva em uma carona, clique no botão "Reservar" na tela de detalhes da carona.

# TELA DE CONFIRMAÇÃO

Após clicar no botão "Reservar", você será direcionado para a tela de confirmação. Nessa tela, você verá os detalhes da reserva, incluindo o nome do passageiro e o destino selecionado. Para confirmar a reserva, clique no botão "Confirmar".

# BANCO DE DADOS 

Para configurar o banco de dados e conectá-lo ao aplicativo, siga estas etapas:

Certifique-se de ter o Docker instalado em seu sistema. Caso não tenha, você pode baixá-lo em [https://www.docker.com/get-started].

Execute o seguinte comando para iniciar o contêiner do MySQL no Docker: docker run -d --name sharegx -e MYSQL_ROOT_PASSWORD=sua_senha_aqui -p 3306:3306 mysql

Certifique-se de substituir sua_senha_aqui pela senha desejada para o usuário root do MySQL.

Abra o Beekeeper Studio ou qualquer outro cliente MySQL de sua preferência.

No Beekeeper Studio, clique em "New Connection".
Preencha as seguintes informações:
Connection Name: Caronas DB
Host: 127.0.0.1
Port: 3306
Username: root
Password: sua_senha_aqui (a mesma senha que você definiu no passo anterior)
Clique em "Test Connection" para verificar se a conexão com o banco de dados está funcionando corretamente.
Clique em "Save" para salvar a conexão.
Agora, o banco de dados está configurado e pronto para ser utilizado pelo aplicativo.

# DEPENDÊNCIAS

Além do MySQL, este aplicativo requer a instalação do Docker e do Beekeeper Studio.

Docker: [https://www.docker.com/get-started]
Beekeeper Studio: [https://www.beekeeperstudio.io/]
Certifique-se de ter essas dependências instaladas em seu sistema antes de prosseguir.

# CONTRIBUIÇÃO

Se você deseja contribuir para o projeto, por favor, siga as seguintes etapas:

1. Faça um fork do repositório para o seu próprio perfil.
2. Crie uma nova branch para suas alterações usando o comando git checkout -b nova-branch.
3. Faça suas alterações e teste-as localmente.
4. Envie suas alterações para o seu repositório com o comando git push origin nova-branch.
5. Crie um pull request para a branch principal do repositório original.

# LICENÇA 

Este aplicativo é licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
