console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];
let $nutrientResults;
let nutrientsInItem = {};
let searchAuto = true;
let foodToSearch = "";
let modalInput = "";
// let $listResults;
// let listItems = [];


$(document).ready(function() {

  $searchItems = $('#searchResults');
  $nutrientResults = $('#nutrientResults');
  // $listResults = $('#foodList');

//////////// return nutrient information ///////////
  $('#searchForm').on('submit', function(e) {
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
    $searchItems.empty();
    $('#searchInput').val('');
  });

//// search nutrients with specified quantity ////
  $("#submitModalForm").on("click", function(e) {
    e.preventDefault();
    if (modalInput) {
      $('#searchInput').val(modalInput + ' ' + foodToSearch);
      $('#searchForm').submit();
    $('#foodQuantity').val('');
    }
  });

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
    foodToSearch = this.dataset.name;
  });

///////////////// delete food item /////////////////
  $(document).on("click", ".deleteFood", function(e) {
    $.ajax({
      method:   'DELETE'
      ,url:     `/search/item/${this.dataset.id}`
      ,success: deleteSuccess
      ,error:   deleteError
    }).then(() => {
      $(this).parent().remove();
    })
  });

///////////////// update profile /////////////////
  $("#updateProfile").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method:   'PUT'
      ,url:     '/profile/update'
      ,data:    $(this).serialize()
      ,success: updateSuccess
      ,error:   updateError
    })
  });
});

/////////////// render food list /////////////////
  // $.ajax({
  //   method:   'GET'
  //   ,url:     '/profile/api'
  //   ,success: listSuccess
  //   ,error:   listError
  // })

$('#foodInfo').on('shown.bs.modal', function() {
  $('#foodQuantity').focus();
});

$('#foodInfo').on('hidden.bs.modal', function() {
  $('#searchInput').focus();
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
  if (input.length > 2) { ejaxPost(input); }
  if (input.length == 0) { $searchItems.empty(); }
}

function quantityChange(input) {
  return modalInput = input;
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
  if (allSearches == "empty search") { return console.log(allSearches); }
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
  console.log("nutrient POST success");
}

///////////////////////////////////////////////////////////
///////////////////// DELETE ITEM /////////////////////////
///////////////////////////////////////////////////////////

function deleteError() {
  console.log("error deleting");
}

function deleteSuccess() {
  console.log("success deleting");
}

///////////////////////////////////////////////////////////
///////////////////// UPDATE ITEM /////////////////////////
///////////////////////////////////////////////////////////

function updateError() {
  console.log("update error");
}

function updateSuccess() {
  console.log("update success");
}

///////////////////////////////////////////////////////////
///////////////// RENDER ORDERED LIST /////////////////////
///////////////////////////////////////////////////////////

// function listError() {
//   console.log('error getting list');
// }

// function listSuccess(json) {
//   listItems = json;
//   renderFoods();
// }

// function renderFoods() {
//   $listResults.empty();
//   let foodsHtml = getFoodsHtml(listItems);
//   $listResults.append(foodsHtml);
// };

// function getFoodsHtml(item) {
//   return ``;
// }

// function nutrientPostError(e) {
//   console.log('nutrient POST fail', e);
// }

// function nutrientPostSuccess(json) {
//   console.log("nutrient POST success");
// }








