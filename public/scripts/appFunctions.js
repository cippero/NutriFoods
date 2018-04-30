////////////////////// AUTOCOMPLETE ///////////////////////
function ejaxPost(text) {
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
  if (input.length > 2) { ejaxPost(input); }
  if (input.length == 0) { $searchItems.empty(); }
}

function quantityChange(input) {
  return modalInput = input;
}

function handleError(e) {
  console.log('POST fail', e);
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
  return `<div class="quickSearch" data-name=${search.name} data-toggle="modal" data-target="#foodInfo">
        <b>${search.name}</b>
      </div>`;
}

///////////////////// NUTRIENT INFO ///////////////////////
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
  let nutrientToPost = `<div class="container nutrientBox">
    <div class="row picAndInfo">
      <div class="col-sm-3">
        <img class="pic" src=${item.photo} width="150"></img>
      </div>
      <div class="col-sm-9 picInfo">
        <ul>
          <li><h2 class="mx-auto">${item.food_name}</h2></li>
          <li><span class="foodInfo">Quantity: ${item.serving_qty} | Serving Unit: ${item.serving_unit} | Serving Weight: ${item.serving_weight_grams}g</span></li>
        </ul>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 col-md-3 extraInfo">
        <ul>
          <li>Calories: ${item.calories}</li>
          <li>Protein: ${item.protein}</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3 extraInfo">
        <ul>
          <li>Total Carbs: ${item.total_carbs}</li>
          <li>Fiber: ${item.fiber}</li>
          <li>Sugar: ${item.sugars}</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3 extraInfo">
        <ul>
          <li>Total Fat: ${item.total_fat}</li>
          <li>Saturated Fat: ${item.saturated_fat}</li>
          <li>Cholesterol: ${item.cholesterol}</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3 extraInfo">
        <ul>
          <li>Sodium: ${item.sodium}</li>
          <li>Potassium: ${item.potassium}</li>
        </ul>
      </div>
    </div>
    <div class="row nutrientButtons">`;

if ($('#currentUser').hasClass('loggedIn')) {
      nutrientToPost += `<div class="col-sm-2"></div>
      <div class="col-sm-1"><button id="saveItem" type="button" name="button" class="btn btn-primary infoBtn">Save</button></div>
      <div class="col-sm-6"></div>
      <div class="col-sm-1"><button type="button" name="button" class="btn btn-danger removeItem infoBtn">Remove</button></div>
      <div class="col-sm-2"></div>
    </div>
  </div>`;
    } else {
      nutrientToPost += `<div class="col-sm-9"></div>
      <div class="col-sm-1"><button type="button" name="button" class="btn btn-danger removeItem infoBtn">Remove</button></div>
      <div class="col-sm-2"></div>
    </div>
  </div>`;
    }
  return nutrientToPost;
}

function nutrientPostError(e) {
  console.log('nutrient POST fail', e);
}
function nutrientPostSuccess(json) {
  console.log("nutrient POST success");
}

///////////////////// DELETE ITEM /////////////////////////
function deleteError() {
  console.log("error deleting");
}
function deleteSuccess() {
  console.log("success deleting");
}

///////////////////// UPDATE ITEM /////////////////////////
function updateError() {
  console.log("update error");
}
function updateSuccess() {
  console.log("update success");
}