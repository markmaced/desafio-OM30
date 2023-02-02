

<p align="center">
<img src="logo.png" alt="Logo OM30" width="200" />
</p>

# Desafio - Vaga - Pessoa desenvolvedora back-end PHP - Laravel

Olá, bem-vindo ao desafio **OM30** para a vaga Pessoa Desenvolvedora back-end PHP!

Mais importante do que dizer quem somos, é dizer no que acreditamos. A **OM30** é uma empresa que acredita na inovação como a melhor forma de trazer qualidade de vida às pessoas.

Pensando nisso, nosso teste para essa oportunidade, elaboramos um pequeno projeto desafio para conhecermos um pouco de sua experiência ;)


## Objetivo

Desenvolver um cadastro de pacientes, do qual possamos testar toda sua capacidade de criação de arquitetura, qualidade do código, validações e usabilidade.

## Diferenciais técnicos para a vaga:
- Experiência em desenvolvimento integrações entre sistemas;
- Conhecimento na realização de testes automatizados;
- Conhecimento em desenvolvimento de API's RESTful;
- Conhecinhemto em Vue.js

## Requisitos

Sua aplicação deve:

- Obrigatoriamente para o desenvolvimento do back-end utilizar o framework Laravel.
- Desenvolver uma listagem de pacientes com busca, do qual deve-se permitir a adição, edição, visualização e exclusão de cada um dos pacientes.
- Cada paciente deve ter um endereço cadastrado em uma tabela à parte.
- Utilizar para banco de dados PostgreSQL e Redis (Cache e Queue).
- Utilizar migration, factory, faker e seeder.
- Cadastro de novos pacientes, contendo os campos, respectivas validações:
  - Foto do Paciente;
  - Nome Completo do Paciente*;
  - Nome Completo da Mãe*;
  - Data de Nascimento*;
  - CPF* (com validação);
  - CNS*(cartão nacional de saúde, com validação);
  - Endereço completo, (CEP, Endereço, Número, Complemento, Bairro, Cidade e Estado)*;
 - Criar um endpoint para consulta de CEP que implemente a API do ViaCEP e faça cache (Redis) dos dados para futuras consultas.
 - Criar um endpoint que faça importação de dados (pacientes) via arquivo .csv e seja processada em queue.
 - Utilizar docker e docker-compose para execução do projeto (queremos avaliar seu conhecimento, seja criativo e não use o Laravel Sail).


## Material de apoio: 

   - Endereço: Utilizar a API do ViaCEP - https://viacep.com.br/;
   - Algoritmo para validação do CNS (https://integracao.esusab.ufsc.br/ledi/documentacao/regras/algoritmo_CNS.html);

## Diferenciais:
  - Utilizar algum padrão para commits;
  - Possuir cobertura de testes unitários de 80% do código (*PHP Unit*);
  - Integrar a aplicação ao *Laravel Horizon* para o monitoramento das *queues*;
  - Utilizar o *supervisord* para o gerenciamento dos serviços necessários para o desenvolvimento e a execução do projeto;
  - Utilizar elasticsearch para busca otimizada de pacientes;
  - Paginar a listagem de pacientes;

## O que avaliamos?
- Lógica;
- Qualidade do código;
- Criatividade;
- Estrutura no github;

Fique a vontade para incluir algum diferencial em seu desafio!

### Informações sobre a vaga

#### Tipo de Contrato: COOPERADO

#### Benefícios:
  - Assistência médica;
  - Assistência odontológica;
  - Vale Refeição;
  - Participação nos Lucros ou Resultados;

## Entrega

A entrega deve ser feita em um repositório público no GitHub, que deve conter:

- O código do projeto versionado no github em repositório público.
- O projeto deve ser entregue de forma "containerizada", com banco de dados (postgres, redis, e php), lembrando das configurações necessárias para execução dos testes.
- O projeto deve ter em sua pasta root, uma collection do insomnia nomeada (endpoints.json) contendo endpoints necessários para os testes e a avaliação do desafio.
- Um arquivo *README* que descreva o que foi feito e as etapas para rodar o projeto, executar os testes e gerar o code coverage.
- Enviar o link do repositório para o seguinte e-mail: desenvolvimento@om30.com.br, rh@om30.com.br
- No assunto, indicar "Desafio OM30 - PHP Laravel - [Seu nome]". 
- Não esqueça de identificar o seu nome completo no corpo do e-mail também.


*Importante:* Não se preocupe se não conseguir entregar todos os requisitos: dê o seu melhor! :muscle:

Boa sorte ! =)
