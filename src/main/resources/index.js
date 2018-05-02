
var fidelisApp = angular.module('newApp', []);

/* set table back to original view with all alerts from JSON */
function resetFilters(){
    var rows;
    rows = document.getElementsByClassName("scrolling-row");
    for(var i=0; i<rows.length; i++){
       rows[i].style.display = "none";
    }
}

fidelisApp.controller('myController', function($scope, $http){

    $scope.alertData = [];
    $scope.totalAlerts;
    $scope.alertAttributes = [];
    $scope.clickedAlert;

    /* parse through JSON and put alerts and attributes into lists */
    $http.get('alerts.json').then(function(result){
    var alertList = result.data; //list of all Alerts from JSON
    var numAlerts = alertList.length; //total number of alerts

    $scope.totalAlerts = numAlerts; //pass numAlerts to scope

    for(var i=0; i<numAlerts; i++){
        $scope.alertData.push(alertList[i]); //make list of alerts in scope
    }
    var attributes = Object.keys(alertList[0]); //list of attributes
    for (var i=0; i<attributes.length; i++){
        $scope.alertAttributes.push(attributes[i]); //set scope
    }
    });

    /* on clicking a row of the table, set clickedAlert to be accessible in scope */
    $scope.getDetails = function(alert) {
        $scope.clickedAlert = alert;
    }

    /* filter according to which button was clicked in filter menu (sortValue) */
    $scope.filterBy = function(sortValue){
        var input, filter, rows, cells;
        var count =0;
        if(sortValue != undefined){ /* filter button clicked on side menu */
            input = sortValue.toString();
            filter = input.toUpperCase();
        }else{ /* no filter passed in - filtering by search bar */
            input = document.getElementById("searchInput").value;
            filter = input.toUpperCase();
        }
        /* check contents of each row and determine if it contains the filter */
        rows = document.getElementsByClassName("scrolling-row");
        for(var i=0; i<rows.length; i++){
            var valid = 0;
            cells = rows[i].getElementsByTagName("td");
            for(var j=0; j<cells.length; j++){
                if(cells[j].innerHTML.toUpperCase().indexOf(filter) > -1){
                    valid = 1;
                }
            }
            /* set visible if filter is present, don't display otherwise */
            if(valid == 1){
                rows[i].style.display = "";
                count = count+1;
            }else{
                rows[i].style.display = "none";
            }
        }
        $scope.totalAlerts = count;
    }

});


