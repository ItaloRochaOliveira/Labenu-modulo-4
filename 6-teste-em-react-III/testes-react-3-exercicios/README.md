# Testes em React III - Exercício

## Enunciado

É o mesmo app de pokedex do exercício anterior. A única diferença é que houve um refatoramento do Pokecard para facilitar a criação dos testes.

### Exercício 1

Analise as props e os estados do Pokecard. Descubra qual é a estrutura de seus dados e crie mocks para renderizar o componente, tanto para as props, quanto para a resposta do axios. <br>
Dica para lidar com a resposta do axios:
- faça uma requisição na pokeapi de um pokemon qualquer (por exemplo o bulbasaur) e copie todo o objeto json retornado e salve ele como um mock em um arquivo separado na pasta tests (por exemplo pokemonMock.js)
- importe-o quando precisar utilizá-lo nos arquivos de teste

Isso vai agilizar muito seu desenvolvimento de testes quando precisar lidar com mocks complexos como o desse exercício (e na vida real).

### Exercício 2

Agora crie testes para garantir a renderização dos elementos do Pokecard (não precisa testar interação). Lembre-se de mockar o axios!<br>

### Exercício 3

Finalize criando o teste de interação com user: ao clicar no card, é disparada a função que habilita o modal.
