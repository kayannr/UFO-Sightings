// from data.js
var tableData = data;

// *********************************
//          DATA TABLE
// *********************************
// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the table body
var tbody = d3.select("tbody");

// Create a function to build table 
function populateTable(data){
    // Iterate through each object in the array and call anonymous
    // arrow function
    data.forEach((UFOsighting) => {
        var row = tbody.append("tr");
        // Iterate through each key and value in an object
        Object.entries(UFOsighting).forEach(([key, value]) => {
            // append data
            var cell = row.append("td");
            cell.text(value);
        });
    });
};  

populateTable(tableData);

// *********************************
//    MULTIPLE SEARCH CATEGORIES
// *********************************
// Select the filter button
var button = d3.select("#filter-btn");
// Create event handler
button.on("click", handleClick);

function handleClick() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElement1 = d3.select("#datetime");
    var inputElement2 = d3.select("#city");
    var inputElement3 = d3.select("#state");
    var inputElement4 = d3.select("#country");
    var inputElement5 = d3.select("#shape");
    // Store user input values into variables
    var inputDate = inputElement1.property("value").trim();
    var inputCity = inputElement2.property("value").trim();
    var inputState = inputElement3.property("value").trim();
    var inputCountry = inputElement4.property("value").trim();
    var inputShape = inputElement5.property("value").trim();
    // console.log(inputDate);
    var combinedInput = {inputDate, inputCity, inputState, inputCountry, inputShape}


    var filterAllinput = tableData.filter(data => 
        data.datetime === inputDate && data.city === inputCity 
        && data.state === inputState  && data.country === inputCountry  && data.shape === inputShape
    );
    // console.log(filterAllinput)
    var filterSomeInput = tableData.filter(data => 
        data.datetime === inputDate || data.city === inputCity 
        || data.state === inputState  || data.country === inputCountry  || data.shape === inputShape
    );
    // console.log(filterSomeInput)

    // let inputs = {filterAllinput, filterSomeInput}; 

    // Conditions
    if (filterAllinput.length !== 0){
        tbody.html("");
        if (filterAllinput.length === 0){
            tbody.append("tr").append("td").text("No results for values entered."); 
        }; 
        populateTable(filterAllinput); 
    }
    else if (filterSomeInput.length !== 0 ) { 
        tbody.html("");
        if (filterSomeInput.length === 0){
        tbody.append("tr").append("td").text("No results for values entered."); 
        }; 
        populateTable(filterSomeInput); 
    }
    else{ 
        tbody.html("");
        tbody.append("tr").append("td").text("No values entered!"); 
    }
};

// *********************************
//          RESET TABLE
// *********************************
var resetButton = d3.select("#reset-btn");
resetButton.on("click", () => {
    tbody.html("");
    populateTable(tableData)
    console.log("Table reset.")
});
