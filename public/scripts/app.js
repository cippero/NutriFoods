console.log("Sanity Check: JS is working!");
let $searchItems;
let $nutrientResults;
let allSearches = [];
let searchAuto = false;


////////////////////// AJAX /////////////////////////


$(document).ready(function(){

  $searchItems = $('#searchResults');
  $nutrientResults = $('#nutrientResults');

  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    searchAuto = false;
    $.ajax({
      method:   'POST'
      ,url:     '/search/nutrients'
      ,data:    $(this).serialize()
      ,success: onSuccess
      ,error:   onError
    });
    //$('#searchInput').val('');
  });



  // $.ajax({
  //   method:   'GET'
  //   ,url:     '/search/api'
  //   ,success: handleSuccess
  //   ,error:   console.log("GET fail")
  // });

  // $.ajax({
  //   method:   'GET'
  //   ,url:     '/search/api'
  //   ,success: handleSuccess
  //   ,error:   console.log("GET fail")
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

  // $('#searchInput').change(function(e) {
  //   console.log($('#searchInput').val());
  // })

});

function ejaxPost(text) {
  if (text !== '' && searchAuto){
    $.ajax({
      method:   'POST'
      ,url:     '/search'
      ,data:    {text}
      ,success: handleSuccess
      ,error:   handleError
    });
  } else {
    allSearches = [];
    $searchItems.empty();
  }
}

function searchChange(input){
  //searchAuto = true;
  ejaxPost(input);
}

function getSearchHtml(search) {
  return `<hr>
          <p>
            <img src=${search.image} width="50"></img>
            <b>${search.name}</b
          </p>`;
}

function getAllSearchHtml(searches) {
  let htmlToAppend = [];
  for (let i = 0; i<6; i++){
    htmlToAppend.push(getSearchHtml(searches[i]));
  }
  return htmlToAppend.join('');
  //return searches.map(getSearchHtml).join("");
}

// helper function to render all searches to view
// note: we empty and re-render the collection each time our search data changes
function render() {
  // empty existing searches from view
  $searchItems.empty();

  // pass `allSearches` into the template function
  let searchHtml = getAllSearchHtml(allSearches);

  // append html to the view
  $searchItems.append(searchHtml);

};

function handleSuccess(json) {
  //console.log("POST success, json:", json);
  allSearches = json;
  render();
}

function handleError(e) {
  console.log('POST fail', e);
//   //$('#todoTarget').text('Failed to load todos, is the server working?');
}

function onSuccess(json) {
  console.log("POST success, json:", json);
}

function onError(e) {
  console.log('POST fail', e);
}

// function newTodoSuccess(json) {
//   console.log(json);
//   $('#searchForm input').val('');
//   //allTodo.push(json);
//   //render();
// }

// function newTodoError() {
//   console.log('new todo error!');
// }

// function deleteTodoSuccess(json) {
//   var todo = json;
//   console.log(json);
//   var todoId = todo._id;
//   console.log('delete todo', todoId);
//   // find the todo with the correct ID and remove it from our allTodo array
//   for(var index = 0; index < allTodo.length; index++) {
//     if(allTodo[index]._id === todoId) {
//       allTodo.splice(index, 1);
//       break;  // we found our todo - no reason to keep searching (this is why we didn't use forEach)
//     }
//   }
//   render();
// }

// function deleteTodoError() {
//   console.log('deletebook error!');
// }