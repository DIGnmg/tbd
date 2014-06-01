'use strict';

var nashService = require('../api/nash-service');

module.exports = angular.module('app.home.ctrl',[])
  .controller('HomeCtrl', function($scope) {
    $scope.version = '0';
    nashService.getParkData({}, function (error, list) {
      $scope.list = list;
    });
  });
