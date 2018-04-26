console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];
let $nutrientResults;
let nutrientsInItem = {};
let searchAuto = true;


$(document).ready(function() {

  $searchItems = $('#searchResults');
  $nutrientResults = $('#nutrientResults');

//////////// return nutrient information ///////////
  $('#searchForm').on('submit', function(e) {
    console.log($('searchInput').val());
    e.preventDefault();
    $nutrientResults.empty();
    searchAuto = true;
    $.ajax({
      method:   'POST'
      ,url:     '/search/nutrients'
      ,data:    $(this).serialize()
      ,success: onSuccess
      ,error:   onError
    });
    $('#searchInput').val('');
  });


  // $("#searchFormModal").on("submit", function(e) {
  //   e.preventDefault();
  //   console.log("submit modal");
  // });

  $("#submitModalForm").on("click", function(e) {
    e.preventDefault();
    if (!$('#foodQuantity').val('')) {
      console.log("empty");
      console.log($('#foodQuantity').val());
      console.log($('#foodQuantity').text());
    }
    console.log("not empty");
    console.log($('#foodQuantity').val());
    console.log($('#foodQuantity').text());
    //$("#submitModalForm").attr("data-dismiss", "modal");
  });

  // $(document).keypress(function(e) {
  //   if(e.which === 13 && modalEnter) {
  //       console.log('You pressed enter!');
  //   }
  // });

//////////// store food in user's db ////////////
  $(document).on("click", "#saveItem", function(e) {
    $nutrientResults.empty();
    searchAuto = true;
    $.ajax({
      method:   'POST'
      ,url:     '/search/item'
      ,data:    nutrientsInItem
      ,success: nutrientPostSuccess
      ,error:   nutrientPostError
    });
  });

//////////// populate autocomplete list ///////////
  $(document).on("click", ".quickSearch", function(e) {
    searchAuto = false;
    $searchItems.empty();
    $("#foodNameHTML").text(this.dataset.name);
  });

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

///////////////////////////////////////////////////////////
////////////////////// AUTOCOMPLETE ///////////////////////
///////////////////////////////////////////////////////////


//////// autocomplete search api /////////
function ejaxPost(text) {
  if (text !== '' && searchAuto) {
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

function searchChange(input) {
  searchAuto = true;
  ejaxPost(input);
}

function handleError(e) {
  console.log('POST fail', e);
//   //$('#todoTarget').text('Failed to load todos, is the server working?');
}

function handleSuccess(json) {
  allSearches = json;
  render();
}

function render() {
  $searchItems.empty();
  let searchHtml = getAllSearchHtml(allSearches);
  $searchItems.append(searchHtml);
};

function getAllSearchHtml(searches) {
  let htmlToAppend = [];
  for (let i = 0; i<6; i++){
    htmlToAppend.push(getSearchHtml(searches[i]));
  }
  return htmlToAppend.join('');
}

function getSearchHtml(search) {
  return `<hr>
          <p class="quickSearch" data-name='${search.name}' data-toggle="modal" data-target="#foodInfo">
            <img src=${search.image} width="50"></img>
            <b>${search.name}</b
          </p>`;
}


///////////////////////////////////////////////////////////
///////////////////// NUTRIENT INFO ///////////////////////
///////////////////////////////////////////////////////////

function onError(e) {
  console.log('POST fail', e);
}

function onSuccess(json) {
  nutrientsInItem = json;
  renderNutrients();
}

function renderNutrients() {
  $nutrientResults.empty();
  let nutrientHtml = getNutrientHtml(nutrientsInItem);
  $nutrientResults.append(nutrientHtml);
};

function getNutrientHtml(item) {
  return `<h3>${item.serving_qty} ${item.serving_unit} ${item.food_name}</h3>
          <img src=${item.photo} width="250"></img>
          <ul>
            <li>Calories: ${item.calories}</li>
            <li>Protein: ${item.protein}</li>
            <li>Total Carbs: ${item.total_carbs}</li>
            <li>Sodium: ${item.sodium}</li>
            <li>Total Fat: ${item.total_fat}</li>
          </ul>
          <button id="saveItem" type="button" name="button" class="btn btn-primary">Save</button>`;
}

function nutrientPostError(e) {
  console.log('nutrient POST fail', e);
}

function nutrientPostSuccess(json) {
  console.log("nutrient POST success, json:", json);
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