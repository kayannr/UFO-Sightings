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

// Pass dataset into a function to populate the table 
populateTable(tableData);

// *********************************
//          DATE SEARCH
// *********************************
// Select the filter button
var button = d3.select("#filter-btn");
// Create event handler
button.on("click", handleClick);

function handleClick() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    // Store user input value into a variable 
    var inputDate = inputElement.property("value").trim();
    // console.log(inputDate);

    // let response = filteredDate;
    // Conditions
    if (inputDate.length !== 0) { 
        var filteredDate = tableData.filter((data) => data.datetime === inputDate);
        // console.log(filteredDate);
        tbody.html("");
        if (filteredDate.length === 0){
        tbody.append("tr").append("td").text("No results for date entered."); 
        }; 
        populateTable(filteredDate); 
    }
    else { 
        tbody.html("");
        tbody.append("tr").append("td").text("No date entered!"); 
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
