'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('NewDocumentCtr', function ($scope, $position, $http, $log, ModalService, Upload) {
    $scope.items = ['item1', 'item2', 'item3'];
    $http.get('/api/site/category/query')
      .then(function (res) {
        $log.debug(res);
        if (res.data.status === 'OK') {
          $scope.cates = res.data.data;
        } else {
          alert('请求出错请稍候再试');
        }
      }, function (error) {
        alert('请求出错请稍候再试');
      });
    var images = [];
    var refreshImageList = function (cb) {
      $http.get('/api/site/file/query')
        .then(function (res) {
          $log.debug(res);
          if (res.data.status === 'OK') {
            images = res.data.data;
          } else {
            alert('请求出错请稍候再试');
          }
          if (cb)
          cb();
        }, function (error) {
          alert('请求出错请稍候再试');
        });
    };

    refreshImageList();
    
    $scope.upoadImage = function (cb) {
      window.modal = ModalService.showModal({
        template: '<div class="modal show" style="background: rgba(0,0,0,0.7);"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" ng-click="futurama.close()" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button> <h4 class="modal-title">插入图片</h4> </div> <div class="modal-body"> ' +
        // '<div ng-click="futurama.insertImage();">Fry lives in {{futurama.city}}</div> '+
        '<div class="button" ngf-select="futurama.upload($file)">Upload on file select</div>' +
        '<a ng-repeat="image in futurama.images" ng-click="futurama.insertImage(image);" style="cursor:pointer;display:inline-block;margin:10px;width:100px;height:100px;background-size:cover;background-image:url({{image}})">  </a>' +
        '</div> </div>',
        controller: function ($scope, close) {
          var md = this;
          this.city = "New New York";

          console.dir(this);
          this.images = images;
          this.insertImage = function (image) {
            close();
            cb(image);
          };
          this.close = function () {
            cb();
            close();
          };
          this.upload = function (file) {
            Upload.upload({
              url: '/api/site/file/upload',
              data: { file: file }
            }).then(function (resp) {
              refreshImageList(function(){
                md.images = images;
              });
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.data.url);
            }, function (resp) {
              console.log('Error status: ' + resp.status);
            }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
          };
        },
        controllerAs: "futurama"
      })


    };
    $scope.docSave = function () {
      // console.log($scope.cate);
      var cate = $scope.cate.title;
      var content = $scope.docContent;
      var title = $scope.title;
      var doc = {
        title: title,
        content: content,
        category: cate,
        tags: $scope.tags.split(' ')
      };
      $http.post('/api/site/document/new', doc)
        .then(function (res) {
          $log.debug(res);
          if (res.data.status === 'OK') {
            alert('添加成功');
            // $scope.cates = res.data.data;
          } else {
            alert('请求出错请稍候再试');
          }
        }, function (error) {
          alert('请求出错请稍候再试');
        });
    };
    // $scope.htmlcontent = '<h1>hello</h1>';
    // $scope.disabled = false;
    // $scope.taOptions.toolbar = [
    //     ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
    //     ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
    //     ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
    //     ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
    // ];
  });


// angular.module('sbAdminApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };

//   $scope.ok = function () {
//     $uibModalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });