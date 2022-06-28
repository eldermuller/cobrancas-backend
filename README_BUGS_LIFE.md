# Desafio

## Banco de Dados
### Tabelas
    * Usuario
    * Cliente
#### Usuarios
    * Nome text required
    * email text unique required
    * senha text required - min 5 caracteres
    * CPF integer unique
    * Telefone integer
    
#### Cliente
    * Nome text required
    * Email text unique required
    * Cpf integer unique required
    * Telefone integer required
    * Cep integer viaCep
    * Logradouro text
    * Complemento text
    * Bairro varchar
    * Cidade varchar
    * Estado varchar

## Cadastro
    * nome, email, senha
    * Erros:
        * campos obrigatórios em branco;
        * email já existente
    * Após cadastro, exibir mensagem
        * mensagem some com 1 segundo ou um clique
    * Endpoint - /cadastro

## Login
    * email, senha
    * Erros:
        * campos obrigatórios em branco;
        * senha incorreta;
        * email inexistente
    * redireciona para home
    * criar o token
    * Endpoint - /login

A partir daqui, só usuários logados

## Dashboard - Home
    * components - barra lateral e cabeçalho
    * Endpoint - /home
    * Endpoint - listar totais (não vai feito nesse sprint)
        * total de pagas
        * total de vencidas
        * total de previstas
    * Endpoint - listar clientes (não vai ser feito nesse sprint)
        * lista clientes com cobranças pagas
        * lista clientes com cobranças vencidas
        * lista clientes com cobranças previstas
        * listar clientes inadimplentes
        * listar clientes em dia


## Dashboard - Cliente
    * container mockado - banco de dados
    * endpoint (GET) - /listar_clientes


## Dashboard - Cobranças
    * Inativo


## Modais - reaproveitar

### Edição - Usuário
    * auto completar o formulário (endpoint - get '/obter_usuario/:id')
    * atualizar usuário (endpoint - put '/atualizar_usuario/:id')
    * checagem de email
        * se for o email do próprio usuario, ok
    * Erros
        * email existente
        * campos obrigatórios em branco
    * após atualização, mensagem de confirmação
            * mensagem some com 1 segundo ou um clique

### Cadastro - Cliente
    * Endpoint (post) - '/cadastrar_cliente'
    * Erros
        * campos obrigatórios em branco
        * email já cadastrado
    * após cadastro, mensagem de confirmação de 1 segundo no canto da tela

### Filtro de autenticação
    * use


## Deploy

Sprint 2


Listar cliente - Leo
* endpoint - get
* dashboard
* array - localArray

detalhamento do cliente
* endpoint - get/:id
* tela nova - modal?? ou dashboard-cliente

atualização do cliente - Dimazz
* mesmo procedimento do modal de atualização do usuário - modal
* endpoint - PUT/PATCH

Nova cobrança - Franklin
* Modal
* endpoint - post - dois botões acessam

Página de cobranças
* Dashboard - terceira opção do sidebar 
* botões de deleção e edição funcionam?
* endpoint - get - listagem de cobranças
* criar tabelas de cobranças

Gabriel (Clientes)
Elder (Cobranças)

Percepções com cliente
* responsividade
* titulo projeto - Franklin
* branch com funcionamento local
    * back feature/local - Franklin
    * front feature/local - Franklin
* Yup - checar o email (checar)
* senha com maiúscula e caracteres especiais (Yup)
* checar os erros e flags de erro - Dimazz
* endpoint pra checar se o email já existe na primeira página de cadastro
    * Checar o crash no cadastro com email já existente - Gabriel
* tirar consoles.log <- TODOS
* checagem de cpf - YUP - Elder
    * 11 dígitos
    * unique
    * not null
    * possível editar cpf? Não. Uma vez cadastrado, ok.
* Campo CPF não permitir inserir caractere que não seja número

## Sprint 3

### Edição de Cobranças

#### FRONT
* transformar o modal de cadastro de cobranças para receber edição tbm
    * adicionar seletor
* Auto completar o formulário
* Obrigatórios
    * descrição
    * status
    * valor
    * vencimento
* erros mostrados abaixo do campo não preenchido ou com dado inválido
* modal pequeno no canto inferior direito de confirmação

#### BACK
* endpoint - put('/atualizar-cobranca')
* validações de dados obrigatórios
* checar validações


### Exclusão de cobranças

#### FRONT
* abrir modal de confirmação - Tem certeza que quer excluir?
* modal no canto inferior direito confirmando exclusão ou avisando que não foi possível excluir

#### BACK
* endpoint - delete('/excluir-cobranca')
* validar cobrança pra ser deletada
    * precisa estar PENDENTE
    * data de vencimento IGUAL ou POSTERIOR À DATA ATUAL
* Retornar msg para o modal peq (ver no Altafidelidade no Figma)
    * msg caso tenha sido excluído
    * msg caso não possa excluir


### Detalhar cobrança

#### FRONT
* detalhar a cobrança ao clicar NA LINHA da cobrança
* modal

#### BACK
* endpoint - get('/detalhar-cobranca/:id')
* retornar TUDO


### Busca e ordenação

#### FRONT
* Ordenação
    * botão de ordenar - toggle entre dois estados
        * iniciar vazio, e true para asc e false para desc
        * nome ou Id cob - duas req diferentes
        * função ordenando
        * só front
* Busca
    * enviar value do input
    * receber objeto e mostrar na tela
    * caso não encontre, apresentar tela específica (ver figma - altafidelidade)

#### BACK
* Busca
    * endpoint - get('/busca?query-params')
    * retorna objeto


### Ver Todos

#### FRONT
* Na página Home, nos botões 'ver todos', enviar solicitação com query params indicando a informação desejada
* Receber objeto
* Mudar página no sidebar e apresentar dados recebidos

#### BACK
* endpoint - get('/ver-todos?query-params')
* retornar objeto com o que foi pedido na params

#### Objeto
{
    pagina: 'clientes' 'cobranca',
    dados: { "objeto com tudo do banco de dados" }
}