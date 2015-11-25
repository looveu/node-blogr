'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'textAngular',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngFileUpload',
    'angularModalService'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$provide',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$provide) {
    
    
    $provide.decorator('taOptions', ['taRegisterTool','$delegate', function(taRegisterTool, taOptions){
           taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
                ['html', 'insertLink']
            ];
            
            // var modal = function(){
            //   ModalService.showModal({
            //     templateUrl: "views/imageModal.html",
            //     // controller: "YesNoController"
            //   }).then(function(modal) {
            //     // The modal object has the element built, if this is a bootstrap modal
            //     // you can call 'modal' to show it, if it's a custom modal just show or hide
            //     // it as you need to.
            //     modal.element.modal();
            //     modal.close.then(function(result) {
            //       var message = result ? "You said Yes" : "You said No";
            //     });
            //   });
            // };
            taRegisterTool('customInsertImage', {
                    iconclass: "fa fa-picture-o",
                    action: function (deferred, restoreSelection) {
                      // modal();
                      // console.log('aaa',restoreSelection,deferred);
                      var that = this;
                      var sel = window.rangy.getSelection();
                      // that.$editor().wrapSelection('insertImage','http://d.36krcnd.com/nil_class/7247cec1-160c-4f7b-8d3e-7b9f54d5157c/1069878454875121268.jpg!feature');
                      this.$editor().$parent.upoadImage(function(image){
                        // restoreSelection();
                        // console.log(restoreSelection);
                        // console.log(image);
                        // var imageLink = "<img src='" + image + "'>";
                        
                        sel.collapseToEnd();
                        
                        if(image){
                          that.$editor().wrapSelection('insertImage',image, true);
                        }
                        deferred.resolve();
                        
                      });
                      // this.$editor().launch('insertImage', deferred.resolve, this.$editor().wrapSelection);
                    }});
            taOptions.toolbar[3].push('customInsertImage');
            // console.log(taOptions);
            return taOptions; // whatever you return will be the taOptions
        }]);
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
                
                // $ocLazyLoad.load(
                // {
                //   name:'textAngular',
                //   files:[
                //     'bower_components/textAngular/dist/textAngular.css',
                //     'bower_components/textAngular/dist/textAngular-rangy.min.js',
                //     'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                //     'bower_components/textAngular/dist/textAngular.js',
                //     ]
                // })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js'
              // 'scripts/directives/notifications/notifications.js',
              // 'scripts/directives/chat/chat.js',
              // 'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      ////////////
      
      .state('dashboard.documentNew',{
        url:'/document/new',
        controller: 'NewDocumentCtr',
        templateUrl:'views/pages/newDocument.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/newDocument.js'
              ]
            })
          }
        }
      })
      .state('dashboard.documentEdit',{
        url:'/document/edit/:doc_id',
        controller: 'EditDocumentCtr',
        templateUrl:'views/pages/editDocument.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/editDocument.js'
              ]
            })
          }
        }
      })
      .state('dashboard.categoryNew',{
        url:'/category/new',
        controller: 'NewCategoryCtr',
        templateUrl:'views/pages/newCategory.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/newCategory.js'
              ]
            })
          }
        }
      })
      .state('dashboard.categoryQuery',{
        url:'/category/query',
        controller: 'QueryCategoryCtr',
        templateUrl:'views/pages/queryCategory.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/queryCategory.js'
              ]
            })
          }
        }
      })
      // QueryDocumentCtr
      .state('dashboard.documentQuery',{
        url:'/document/query',
        controller: 'QueryDocumentCtr',
        templateUrl:'views/pages/queryDocument.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/queryDocument.js'
              ]
            })
          }
        }
      })
      
      ////
  //     .state('dashboard.form',{
  //       templateUrl:'views/form.html',
  //       url:'/form'
  //   })
  //     .state('dashboard.blank',{
  //       templateUrl:'views/pages/blank.html',
  //       url:'/blank'
  //   })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
      })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
  //     .state('dashboard.table',{
  //       templateUrl:'views/table.html',
  //       url:'/table'
  //   })
  //     .state('dashboard.panels-wells',{
  //         templateUrl:'views/ui-elements/panels-wells.html',
  //         url:'/panels-wells'
  //     })
  //     .state('dashboard.buttons',{
  //       templateUrl:'views/ui-elements/buttons.html',
  //       url:'/buttons'
  //   })
  //     .state('dashboard.notifications',{
  //       templateUrl:'views/ui-elements/notifications.html',
  //       url:'/notifications'
  //   })
  //     .state('dashboard.typography',{
  //      templateUrl:'views/ui-elements/typography.html',
  //      url:'/typography'
  //  })
  //     .state('dashboard.icons',{
  //      templateUrl:'views/ui-elements/icons.html',
  //      url:'/icons'
  //  })
  //     .state('dashboard.grid',{
  //      templateUrl:'views/ui-elements/grid.html',
  //      url:'/grid'
  //  })
  }]);

    
