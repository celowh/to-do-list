
// $(document).ready(() => {
//    $('#addTodo').click(() => {
//       const description = $('#newTodo').val()
//       $('#todoList').append(`<li>${description}</li>`),
//          $('#newTodo').val('').focus()
//    }
//    )
// })


$(document).ready(function () {

   //Variável que controla os IDs de cada ToDo
   var listItemId = 1;

   //Adicionar um todo novo
   $('#addTodo').on("click", function () {
      //Capturar o valor digitado no input
      var newTodo = $('#newTodo').val();

      //Verifica se o input está vazio
      if (newTodo == '') {
         alert('Please add to do item')
         return false
      }

      //Se não estiver vazio, adiciona ToDo novo
      $('#todoList').append(`
     <li id="li${listItemId}">
       <p class="todoText">${newTodo}</p>
       <button type="button" class="doneTodo" data-id="li${listItemId}"> <i class="ph ph-check"></i> </button>
       <button type="button" class="removeTodo" data-id="li${listItemId}"> <i class="ph ph-minus"></i> </button>
     </li>`
      )

      //Incrementa a variável dos IDs
      listItemId++

      //Limpar e focar no input
      $('#newTodo').val('').focus()



      //*********************ADICIONANDO O LOCALSTORAGE***************************
      //cria uma variável que vai armazenar as tasks
      var toDos = $('#todoList').html();
      //agora inicializamos o LocalStorage criando uma chave e guardando os valores capturados
      localStorage.setItem('toDos', toDos);

      
   })

   //Marcar como completado
   $(document).on('click', ".doneTodo", function() {
      //PRIMEIRO captura o click no botão doneTodo
      //SEGUNDO cria a variável e adiciona o data-id nela, retornando o li1, li2, li3...(SEM AS #) conforme a quantidade de tasks adicionadas
      //TERCEIRO concatena a # com o valor retornado de li1, li2...etc. deixando ele como #li1, #li2...etc
      //QUARTO precisamos colocar o #li1, #li2..etc, dentro de um jQuery, deixando ele DINAMICO ou seja ---> $(completeItemId) === $('#li1'), $('#li2')
      //QUINTO captura o elemento P dentro do li clicado = $(#li1 .todoText)
      var completedItemId = "#" + $(this).attr('data-id') + " .todoText";

      //aqui a gente captura tudo que fizemos logo acima, e adiciona a classe já estilizada no css
      $(completedItemId).addClass('lineThrough');

      //aqui novamente criamos a variável para capturar o toDo e manter ela como tarefa completa quando atualizar a página
      var toDos = $('#todoList').html();
      localStorage.setItem('toDos', toDos);


    

   })
//DELETAR UMA TASK (poderia ser feito apenas copiando e colando a função do marcar como completo, trocando a função para .removeTodo)
   $(document).on('click', '.removeTodo', function() {
      //aqui criamos uma variável check e utilizamos a função CONFIRM do javascript, que funciona como um alerta com botões de confirmar e cancelar
      var check = confirm('Are you sure want to delete this task?');
      //aqui definimos SE CHECK FOR VERDADEIRO, criamos a variável removeItemId e atribuímos o atributo do ID a ela, e após isso, chamaos a função de remoção
      if (check) {
         var removeItemId = '#' + $(this).attr('data-id');
         $(removeItemId).remove();
      } else {
         return false
      }
      //aqui setamos a variável novamente pra poder caputrar ela e atualizar o localStorage depois de ter o item deletado
      var toDos = $('#todoList').html();
      localStorage.setItem('toDos', toDos);
   })

   //BUSCANDO OS ITENS DO LocalStorage
   //CRIAMOS UMA VARIÁVEL PARA ARMAZENAR OS ITENS DO LOCALSTORAGE
   const toDosInLocalStorage = localStorage.getItem('toDos');
   //CRIAMOS A VERIFICAÇÃO PARA SABER SE O LOCALSTORAGE EXISTE
   if (toDosInLocalStorage) {
      //SE O LOCALSTORAGE EXISTIR, ELE CAPTURA A UL CHAMADA todoList E INSERE UM HTML ATRAVES DO .html(), OS ITENS RETORNADOS DO localStorage COM O getItem('toDos')
      $('#todoList').html(toDosInLocalStorage)
   }



})
