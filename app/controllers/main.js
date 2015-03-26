dtfApp.factory('DataService', function() {
  return {
      fetchedData : [
        {
          "label": 'BA-Group',
          "props":{"EA":true, "IO":false, "IU":false, "OO":false, "OU":false},
          "children": [
            {
              "label": 'BA-Group Development',
              "props":{"EA":true, "IO":true, "IU":false, "OO":false, "OU":true},
              "children": [
                {
                  "label": 'North America',
                  "props":{"EA":true, "IO":true, "IU":false, "OO":false, "OU":false},
                  "children": [
                    {
                      "label": 'North America SubOrg1',
                      "props":{"EA":true, "IO":true, "IU":true, "OO":false, "OU":false}
                    },
                    {
                      "label": 'North America SubOrg2',
                      "props":{"EA":true, "IO":false, "IU":false, "OO":true, "OU":false}
                    }

                  ]
                },
                {"label":"Functions","props":{"EA":true, "IO":true, "IU":false, "OO":false, "OU":false}},
                {"label":"Europe&Latin America","props":{"EA":true, "IO":false, "IU":false, "OO":false, "OU":true}},
                {"label":"HR Human Resources","props":{"EA":true, "IO":false, "IU":false, "OO":false, "OU":true}},
                {"label":"Org Unit for Level 2 Testing","props":{"EA":false, "IO":false, "IU":false, "OO":false, "OU":false}}
              ]
            }
          ]
        }   
      ]
  };
});

dtfApp.controller('MainController', function($scope, $timeout,$location,DataService) { 
    // ********* Scope variables *********
    
    var fetchedData = DataService.fetchedData;

    $scope.prop_names=Object.keys(fetchedData[0].props);
    $scope.menus=[
        {"label":"Desktop"},
        {"label":"Intergrations","children":[{"label":"Intergration Jobs"}]},
        {"label":"Reporting"},
        {"label":"Administration"}
    ];
    $scope.selectedItem={label:"",level:"",index:""};

    $scope.my_data = fetchedData;
    $scope.lastRefreshDateTime = "";
    $scope.lastSavedDateTime = "";

    // ********* Helper functions ************
    var getCurrentDateTime=function(){
      var currDateStr = ' ';
      var currentDate = new Date(); 
      currDateStr +=currentDate.getFullYear()+ "/";
      currDateStr +=(currentDate.getMonth()+1)+ "/";
      currDateStr +=currentDate.getDate() + "  ";
      currDateStr +=currentDate.getHours() + ":"  ;
      var minutes =currentDate.getMinutes();
      if (minutes < 10) {minutes = "0"+minutes;}
      currDateStr +=minutes;
      return currDateStr;
    }

    var IO=$scope.prop_names[1];
    var IU=$scope.prop_names[2];
    var OO=$scope.prop_names[3];
    var OU=$scope.prop_names[4];
    
    var toggleSelectUnselect=function(prop){
      var label=$scope.selectedItem.label;
      var level=$scope.selectedItem.level;
      var index=$scope.selectedItem.index;

      console.log("level:"+level);
      console.log("index:"+index);

      /*
      Use eval eg. change North America, level 3, index 1
      var oldValue=$scope.my_data[0].children[0].children[index].props[prop];
      $scope.my_data[0].children[0].children[index].props[prop]=!oldValue;
      Another way is to update a data
      */

      var findOldValueStr='$scope.my_data[0]';
      for(l=1;l<=level;l++){
          if(level==1){
            findOldValueStr+='.props[prop]';
            break;
          }
          if(l==level-1){
            findOldValueStr+='.children[index].props[prop]';
            break;
          }

          if(l<level){
            findOldValueStr+='.children[0]';
          }
      }

      var oldValue=eval(findOldValueStr);
      var updateValueStr=findOldValueStr+'=!'+oldValue;
      eval(updateValueStr);
    }

    //Scope methods
    $scope.refresh=function(){
      $scope.lastRefreshDateTime="Last Refreshed: "+getCurrentDateTime();

      console.log('BEFORE----------------------------:');
      console.log('$scope.my_data');
      console.log($scope.my_data[0].props);
      
      console.log('fetchedData:');
      console.log(fetchedData[0].props); 
      
      console.log('DataService:');
      console.log(DataService.fetchedData[0].props); 

      // $scope.my_data=DataService.fetchedData;

      // console.log('AFTER----------------------------:');
      // console.log('current data:');
      // console.log($scope.my_data);
      

    }

    $scope.save=function(){
      $scope.lastSavedDateTime="Last saved: "+getCurrentDateTime();
      fetchedData=$scope.my_data;
    }

    $scope.saveAndRun=function(){
      //TODO
      $scope.lastSavedDateTime="Last saved: "+getCurrentDateTime();
      $location.path('/schedule');
    }

    $scope.close=function(){
      //TODO
      $location.path('/close');
    }

    $scope.importOrganization=function(){
      toggleSelectUnselect(IO);
    }

    $scope.importOrganizationAndUsers=function(){
      toggleSelectUnselect(IO);
      toggleSelectUnselect(IU);
    }

    $scope.obsoleteOrganization=function(){
      toggleSelectUnselect(OO);
    }

    $scope.obsoleteUsers=function(){
      toggleSelectUnselect(OU);
    }

});

