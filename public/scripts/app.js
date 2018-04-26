console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];
let $nutrientResults;
let nutrientsInItem = {};
let searchAuto = true;


$(document).ready(function() {

  $searchItems = $('#searchResults');
  $nutrientResults = $('#nutrientResults');

  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    $nutrientResults.empty();
    searchAuto = false;
    $.ajax({
      method:   'POST'
      ,url:     '/search/nutrients'
      ,data:    $(this).serialize()
      ,success: onSuccess
      ,error:   onError
    });
    $('#searchInput').val('');
    allSearches = [];
    $searchItems.empty();
  });

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
          <p>
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
  //console.log("POST success, json:", json);
  nutrientsInItem = json;
  renderNutrients();
}

function renderNutrients() {
  $nutrientResults.empty();
  let nutrientHtml = getNutrientHtml(nutrientsInItem);
  $nutrientResults.append(nutrientHtml);
};

function getNutrientHtml(item) {
  // let servingUnit = '';
  // if (item.serving_unit !== 'small' || item.serving_unit !== 'medium' || item.serving_unit !== 'large') 
  //   { servingUnit = item.serving_unit }

  // let img = "https://d2xdmhkmkbyw75.cloudfront.net/540_thumb.jpg";
  // if (item.photo.highres) { img = item.photo.highres }
  // else if (item.photo.thumb) { img = item.photo.thumb }

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
// data-id=${item.ndb_no}

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