///////////////////////////////////////////////////////////
////////////////////// AUTOCOMPLETE ///////////////////////
///////////////////////////////////////////////////////////

function ejaxPost(text) {
  // if (text !== '' && searchAuto) {
  if (text !== '') {
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
  // searchAuto = true;
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
          <p class="quickSearch" data-name='${search.name}' data-toggle="modal" data-target="#foodInfo">` +
            // <img src=${search.image} width="50"></img>
            `<b>${search.name}</b
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
  let nutrientToPost;

  if (item.serving_unit !== item.food_name) {
    nutrientToPost = `<h3 class="mx-auto">${item.serving_qty} ${item.serving_unit} ${item.food_name}</h3>`;
  } else {
    nutrientToPost = `<h3 class="mx-auto">${item.serving_qty} ${item.food_name}</h3>`;
  }
  
  nutrientToPost +=
`<div class="container">
  <div class="row">
    <div class="col-sm">
      <img class="float-right border rounded-left border-info" src=${item.photo} width="200"></img>
    </div>
    <div class="col-sm">
      <ul class="border rounded-right border-info">
        <li>Calories: ${item.calories}</li>
        <li>Protein: ${item.protein}</li>
        <li>Total Carbs: ${item.total_carbs}</li>
        <li>Sodium: ${item.sodium}</li>
        <li>Total Fat: ${item.total_fat}</li>
      </ul>
    </div>
  </div>
</div>`;

    // `<img src=${item.photo} width="250"></img>
    // <ul>
    //   <li>Calories: ${item.calories}</li>
    //   <li>Protein: ${item.protein}</li>
    //   <li>Total Carbs: ${item.total_carbs}</li>
    //   <li>Sodium: ${item.sodium}</li>
    //   <li>Total Fat: ${item.total_fat}</li>
    // </ul>`;

    if ($('#currentUser').hasClass('loggedIn')) {
      nutrientToPost += `<button id="saveItem" type="button" name="button" class="btn btn-primary">Save</button>`;
    }

  return nutrientToPost;
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



