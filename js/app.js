// Code goes here

var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')

  $stateProvider.state('app', {
    abstract: true,
    templateUrl: 'main.html'
  })

  $stateProvider.state('app.todos', {
    abstract: true,
    url: '/todos',
    views: {
      todos: {
        template: '<ion-nav-view></ion-nav-view>'
      }
    }
  })

    $stateProvider.state('app.todos.index', {
    url: '',
    templateUrl: 'templates/statistics.html',
    controller: 'StatisticsCtrl'
  })

  $stateProvider.state('app.todos.detail', {
    url: '/:todo',
    templateUrl: 'templates/statistic.html',
    controller: 'StatisticCtrl',
    resolve: {
      todo: function($stateParams, TodosService) {
        return TodosService.getTodo($stateParams.todo)
      }
    }
  })


  $stateProvider.state('app.settings', {
    url: '/settings',
    views: {
      settings: {
        templateUrl: 'templates/settings.html'
      }
    }
  })
})

app.factory('TodosService', function() {
  var todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: false},
      {title: "Start cooking dinner", done: false}
   ]

  return {
    todos: todos,
    getTodo: function(index) {
      return todos[index]
    }
  }
})

app.controller('StatisticsCtrl', function($scope, TodosService) {
  $scope.todos = TodosService.todos
})

app.controller('StatisticCtrl', function($scope, todo) {
  $scope.todo = todo
})
