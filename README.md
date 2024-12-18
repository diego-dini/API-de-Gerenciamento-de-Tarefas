# API de Gestão de Tarefas

## Visão Geral

A API de Gestão de Tarefas oferece endpoints para gerenciar usuários, tarefas, equipes e categorias. Esta API também envia notificações por e-mail quando uma tarefa está se aproximando do prazo.

## Funcionalidades

- **Adicionar, Remover e Atualizar** usuários, tarefas, equipes e categorias.
- **Detalhes da Tarefa**: Cada tarefa inclui um prazo, um usuário responsável e uma categoria.
- **Notificações por E-mail**: Usuários registrados recebem um alerta por e-mail quando sua tarefa está se aproximando do prazo.

## Tratamento de Erros

A API responde com códigos de status HTTP padrão e mensagens de erro. Respostas comuns incluem:

- **400 Bad Request**: Formato de requisição inválido ou parâmetros ausentes.
- **401 Unauthorized**: Chave de API inválida ou ausente.
- **404 Not Found**: Recurso não encontrado.
- **500 Internal Server Error**: Um erro inesperado ocorreu.

## Desenvolvimento e Objetivos

A API está atualmente em desenvolvimento para fins de estudo e prática com a linguagem de programação TypeScript, utilizando o framework Express. O código tem como objetivo colocar em prática os seguintes conceitos:

- **Clean Code**: Práticas e princípios para escrever código limpo e sustentável.
- **Documentação de Projeto**: Documentação do projeto por meio de comentários no código para facilitar a compreensão e manutenção.
