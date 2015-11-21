'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {
    $scope.htmlcontent = '<h1>hello</h1>';
    $scope.disabled = false;
    // $scope.taOptions.toolbar = [
    //     ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
    //     ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
    //     ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
    //     ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
    // ];
  });
