import angular from 'angular'
import 'angular-ui-router'
angular.module('fluteCollection', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/compositions')

  $stateProvider
    .state('home', {
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
})