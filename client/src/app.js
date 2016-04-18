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
      controller: function(compositionsService, $location) {
        this.compositions = compositionsService.data;
      },
      controllerAs: 'compositionsCtrl'
    })
    .state('compositions.details', {
      url: '/:id',
      templateUrl: 'views/compositions/composition-details.html',
      resolve: {
        compositionService: function($http, $stateParams) {
          return $http.get('/compositions/'+$stateParams.id);
        }
      },
      controller: function(compositionService, $location) {
        console.log("yoloo");
        this.cdetails = compositionService.data;
      },
      controllerAs: 'compositionCtrl'
    })
})