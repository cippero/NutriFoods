console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];



////////////////////// AJAX /////////////////////////


$(document).ready(function(){

  $searchItems = $('#searchResults');

  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    // $.ajax({
    //   method:   'POST'
    //   ,url:     '/search'
    //   ,data:    $(this).serialize()
    //   ,success: handleSuccess
    //   ,error:   handleError

    // });
    ejaxPost();
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



//////////////////////////////// FUNCTIONS ///////////////////////////////////


function searchChange(input){
  console.log("input change:", input);
  ejaxPost();
}

function ejaxPost() {
  $.ajax({
    method:   'POST'
    ,url:     '/search'
    ,data:    $(this).serialize()
    ,success: handleSuccess
    ,error:   handleError
  });
}

function getSearchHtml(search) {
  return `<hr>
          <p>
            <img src=${search.image} width="50"></img>
            <b>${search.name}</b
          </p>`;
}

function getAllSearchHtml(searches) {
  return searches.map(getSearchHtml).join("");
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



///////////////////////////// TYPEAHEAD /////////////////////////////////
// var substringMatcher = function(strs) {
//   return function findMatches(q, cb) {
//     var matches, substringRegex;

//     // an array that will be populated with substring matches
//     matches = [];

//     // regex used to determine if a string contains the substring `q`
//     substrRegex = new RegExp(q, 'i');

//     // iterate through the pool of strings and for any string that
//     // contains the substring `q`, add it to the `matches` array
//     $.each(strs, function(i, str) {
//       if (substrRegex.test(str)) {
//         matches.push(str);
//       }
//     });

//     cb(matches);
//   };
// };

// // var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
// //   'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
// //   'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
// //   'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
// //   'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
// //   'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
// //   'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
// //   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
// //   'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
// // ];

// $('#searchDiv .typeahead').typeahead({
//   hint: true,
//   highlight: true,
//   minLength: 1
// },
// {
//   // name: 'states',
//   // source: substringMatcher(states)
//   name: 'countries',
//   source: substringMatcher(states)
//   // remote: '/countries.json'
// });
//////////////////////////////////////////////////////////////////////