import angular from 'angular'
import 'angular-ui-router'
angular.module('fluteCollection', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/compositions')

  $stateProvider
    .state('compositions', {
      url: '/compositions',
      templateUrl: 'views/compositions/compositions-list.html',
      resolve: {
        compositionsService: function($http) {
          return $http.get('/compositions');
        }
      },
      controller: function(compositionsService, $location, $scope) {
        this.compositions = compositionsService.data;
        // let detailsShow = false;
        
        this.isActive = function(id) {
          let pathRegexp = /compositions\/(\w+)/;
          let match = pathRegexp.exec($location.path());
          if (match === null || match.length === 0){
            $scope.detailsShow = false;
            return false;
          } 
          let selectedComposition = match[1];
          if(id == selectedComposition){
            // detailsShow = true;
            return id === selectedComposition;  
          }
          
        }

        $scope.detailsShow = false;
        
        this.isDetails = function(){
          return $scope.detailsShow;
        }
        
        this.toggleWidth = function(id){
          $scope.rotateId = id;
          if($scope.detailsShow) $scope.detailsShow = false;
          else $scope.detailsShow = true;
        }

        $(function() {
          $('#sidebar').affix({
            offset: {
              top: 201,
              bottom: 53
            }
          }).on("affixed.bs.affix", function() {
            $(this).css("left", $(".main_container").css('marginLeft'));
          }).on("affix-top.bs.affix", function() {
            $(this).css("left", 0);
          }).on("affix-bottom.bs.affix", function() {
            $(this).css("left", 0);
          }).on("affixed-bottom.bs.affix", function() {
            $(this).css("left", 0);
          });

        });
      },
      controllerAs: 'compositionsCtrl'
    })
    .state('compositions.details', {
      url: '/:id',
      templateUrl: 'views/compositions/composition-details.html',
      resolve: {
        compositionService: function($http, $stateParams) {
          return $http.get('/compositions/' + $stateParams.id);
        }
      },
      controller: function(compositionService, $location, $scope,$sce) {
        this.compositionDetails = compositionService.data;
        if(this.compositionDetails){
          $scope.$parent.detailsShow = true;
          $scope.$parent.rotateId = this.compositionDetails._id;
        }
        
        this.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }
      },
      controllerAs: 'compositionCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/static_pages/about.html',
      controller: function() {

      },
      controllerAs: 'aboutCtrl'
    })
})