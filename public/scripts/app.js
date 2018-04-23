console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];



////////////////////// AJAX /////////////////////////


$(document).ready(function(){

  $searchItems = $('#searchResults');

  // $.ajax({
  //   method: 'GET',
  //   url: '/api/todo',
  //   success: handleSuccess,
  //   error: handleError
  // });

  // $('#searchForm').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/todo',
  //     data: $(this).serialize(),
  //     success: newTodoSuccess,
  //     error: newTodoError
  //   });
  // });

   $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/search',
      data: $(this).serialize(),
      success: handleSuccess,
      error: handleError
    });
  });

  // $('#searchForm').on('submit', function(e) {
  //   e.preventDefault();
  //   let searchUrl = constructUrl($('#searchInput').val());
  //   $.ajax({
  //     method: 'GET',
  //     url: searchUrl,
  //     success: handleSuccess,
  //     error: handleError
  //   });
  // });

  // $todoList.on('click', '.deleteBtn', function() {
  //   console.log('clicked delete button to', '/api/todo/'+$(this).attr('data-id'));
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/api/todo/'+$(this).attr('data-id'),
  //     success: deleteTodoSuccess,
  //     error: deleteTodoError
  //   });
  // });

});



//////////////////////////////// FUNCTIONS ///////////////////////////////////


function constructUrl(query){
  return "https://api.edamam.com/api/food-database/parser?ingr=" + query + "&app_id=","&app_key=","&page=0"
}

function getTodoHtml(task) {
  return `<hr>
          <p>
            <b>${task.task}</b>
            ${task.description}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${task._id}>Delete</button>
          </p>`;
}

function getAllTodosHtml(todos) {
  return todos.map(getTodoHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
  // empty existing posts from view
  $todoList.empty();

  // pass `allTodos` into the template function
  var TodosHtml = getAllTodosHtml(allTodo);

  // append html to the view
  $todoList.append(TodosHtml);

};

function handleSuccess(json) {
  console.log("success posting");
  //console.log(json);
  // allTodo = json;
  // render();
}

function handleError(e) {
  console.log('uh oh');
  //$('#todoTarget').text('Failed to load todos, is the server working?');
}

function newTodoSuccess(json) {
  console.log(json);
  $('#searchForm input').val('');
  //allTodo.push(json);
  //render();
}

function newTodoError() {
  console.log('new todo error!');
}

function deleteTodoSuccess(json) {
  var todo = json;
  console.log(json);
  var todoId = todo._id;
  console.log('delete todo', todoId);
  // find the todo with the correct ID and remove it from our allTodo array
  for(var index = 0; index < allTodo.length; index++) {
    if(allTodo[index]._id === todoId) {
      allTodo.splice(index, 1);
      break;  // we found our todo - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteTodoError() {
  console.log('deletebook error!');
}
