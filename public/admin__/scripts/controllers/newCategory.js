'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('NewCategoryCtr', function ($scope, $position, $http, $log) {
    $scope.addCate = function () {      
      var newCate = {
        title: $scope.title,
        level: 1
      };
      if($scope.cate){
        newCate.level = 2;
        newCate.belong = $scope.cate.title;
      }
      $http.post('/api/site/category/new', newCate).then(function (res) {
        if(res.data.status === 'OK'){
          alert('保存成功');
        }else{
          alert('请求出错请稍候再试');
        }
      }, function (error) {
        alert('请求出错请稍候再试');
      });
    };
    $http.get('/api/site/category/query?level=1')
      .then(function (res) {
        // $log.debug(res);
        if (res.data.status === 'OK') {
          $scope.cates = res.data.data;
        } else {
          alert('请求出错请稍候再试');
        }
      }, function (error) {
        alert('请求出错请稍候再试');
      });

    // $scope.htmlcontent = '<h1>hello</h1>';
    // $scope.disabled = false;
    // $scope.taOptions.toolbar = [
    //     ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
    //     ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
    //     ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
    //     ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
    // ];
  });
