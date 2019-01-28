
var friendList = require("../data/friends");

function compareArrays (arr1, arr2){
    var arr3 = [];
    
    var sum = 0;
    for(var i =0; i < arr1.length; i++){
        
            var newNum = Math.abs(arr1[i] - arr2[i]);
            arr3.push(newNum);  
    }

    for(var k = 0; k < arr3.length;  k++){
        
        sum += arr3[k];
    }
    
    return sum;
}
function compareFriends (objList, arr1){
    var newArray = [];

    for(var obj in objList){

        //console.log(objList[obj].scores);
        //console.log(arr1);
        
        var resSum = compareArrays(objList[obj].scores, arr1);
        newArray.push(resSum);
    }
    
    return newArray;
}


module.exports = function(app){


    app.get("/api/friends", function(req,res){
        res.json(friendList);
    });



    app.post("/api/friends", function(req,res){

        var currentUser = req.body.scores;
        var resultsFinal = [];

        resultsFinal = compareFriends(friendList, currentUser);
        var min = Math.min.apply(null, resultsFinal);
        
        var thisIndex;
        for(var t = 0; t < resultsFinal.length; t++){

            if(resultsFinal[t] === min){
                
                thisIndex = t;
            }
        }
        //console.log(JSON.stringify(friendList[thisIndex].name));
        res.json(friendList[thisIndex].name);
        
    });

    
};