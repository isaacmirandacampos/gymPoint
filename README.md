<p align="center">
  <img src="https://github.com/isaacmirandacampos/gympoint/blob/master/.github/gympoint.png" width="250" >
</p>
<h2 align="center" >Desafio de conclusão de curso da Rocketseat</h2>

para baixar o repositório execute o comando a seguir:
<strong> git clone https://github.com/isaacmirandacampos/gympoint.git </strong> <br/>

### Backend


configure um arquivo <strong>.env</strong> dentro da pasta gympoint/backend seguindo os mesmos campos do arquivo <strong>.env.example</strong> dentro da pasta gympoint/backend <br/>
<strong>Embora o mongodb seja uma dependência do backend, ele não está sendo utilizado por enquanto no frotend ou mobile.</strong>
<br />

Execute o comando <strong>yarn sequelize db:migrate</strong>

após configurar, execute o comando: <strong>yarn dev</strong> <br/>

execute também o comando: <strong> yarn queue </strong><br/>

### Web

dentro da pasta gympoint/web, execute o comando <strong>yarn</strong> e quando finalizar, execute o <strong>yarn start</strong><br />

### Mobile

<strong>O aplicativo foi testado somente em dispositivo ios</strong>

Dentro da pasta gympoint/mobile, execute o comando <strong>yarn </strong> e logo após o <strong>yarn start</strong>, em seguida você pode executar o <strong>npx react-native run-ios</strong> <br />
  

