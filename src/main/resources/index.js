
var fidelisApp = angular.module('newApp', []);

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

    $http.get('alerts.json').then(function(result){
    var alertList = result.data; //list of all Alerts from JSON
    var numAlerts = alertList.length; //total number of alerts

    $scope.totalAlerts = numAlerts; //pass numAlerts to scope
    for(var i=0; i<numAlerts; i++){
        $scope.alertData.push(alertList[i]); //make list of alerts in scope
    }
    var attributes = Object.keys(alertList[0]); //list of attributes
    for (var i=0; i<attributes.length; i++){
        $scope.alertAttributes.push(attributes[i]);
    }

    });

    $scope.getDetails = function(alert) {
        $scope.clickedAlert = alert;
    }

    $scope.filterBy = function(sortValue){
        var input, filter, rows, cells;
        var count =0;
        if(sortValue != undefined){
            input = sortValue.toString();
            filter = input.toUpperCase();
        }else{
            input = document.getElementById("searchInput").value;
            filter = input.toUpperCase();
        }
        rows = document.getElementsByClassName("scrolling-row");
        for(var i=0; i<rows.length; i++){
            var valid = 0;
            cells = rows[i].getElementsByTagName("td");
            for(var j=0; j<cells.length; j++){
                if(cells[j].innerHTML.toUpperCase().indexOf(filter) > -1){
                    valid = 1;
                }
            }
            if(valid == 1){
                rows[i].style.display = "";
                count = count+1;
            }else{
                rows[i].style.display = "none";
            }
        }
        $scope.totalAlerts = count;
    }

//    $scope.myFunction = function() {
//        var input, filter, rows, cells;
//        var count = 0;
//        input = document.getElementById("searchInput").value;
//        filter = input.toUpperCase();
//        rows = document.getElementsByClassName("scrolling-row");
//        for(var i=0; i<rows.length; i++){
//            var valid = 0;
//            cells = rows[i].getElementsByTagName("td");
//            for(var j=0; j<cells.length; j++){
//                if(cells[j].innerHTML.toUpperCase().indexOf(filter) > -1){
//                    valid = 1;
//                }
//            }
//            if(valid == 1){
//                rows[i].style.display = "";
//                count ++;
//            }else{
//                rows[i].style.display = "none";
//            }
//        }
//        $scope.totalAlerts = count;
//    }


//function myFunction() {
//    var input, filter, rows, cells;
//    var count = 0;
//    input = document.getElementById("searchInput").value;
//    filter = input.toUpperCase();
//    rows = document.getElementsByClassName("scrolling-row");
//    for(var i=0; i<rows.length; i++){
//        var valid = 0;
//        cells = rows[i].getElementsByTagName("td");
//        for(var j=0; j<cells.length; j++){
//            if(cells[j].innerHTML.toUpperCase().indexOf(filter) > -1){
//                valid = 1;
//            }
//        }
//        if(valid == 1){
//            rows[i].style.display = "";
//            count ++;
//        }else{
//            rows[i].style.display = "none";
//        }
//    }
//}

});


