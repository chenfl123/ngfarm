angular.module('starter.services', [])

		.factory('ModalService', ['$ionicModal', '$rootScope', '$q', '$injector', '$controller',
    function ($ionicModal, $rootScope, $q, $injector, $controller) {
    	
      return {
        show: show
      };

      function show(templateUrl, controller, parameters) {
        var deferred = $q.defer(),
          ctrlInstance,
          modalScope = $rootScope.$new(),
          thisScopeId = modalScope.$id;

        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: modalScope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          modalScope.modal = modal;

          modalScope.openModal = function () {
            modalScope.modal = show();
          };

          modalScope.closeModal = function (result) {
            deferred.resolve(result);
            modalScope.modal.hide();
          };

          modalScope.$on('modal.hidden', function (thisModal) {
            if (thisModal.currentScope) {
              var modalScopeId = thisModal.currentScope.$id;
              if (thisScopeId === modalScopeId) {
                deferred.resolve(null);
                _cleanup(thisModal.currentScope);
              }
            }
          });

          //Invoke the controller
          var locals = {'$scope': modalScope, 'parameters': parameters};
          var ctrlEval = _evalController(controller);
          ctrlInstance = $controller(controller, locals);
          if (ctrlEval.isControllerAs) {
            ctrlInstance.openModal = modalScope.openModal;
            ctrlInstance.closeModal = modalScope.closeModal;
          }

          modalScope.modal.show();
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }

      function _cleanup(scope) {
        scope.$destroy();
        if (scope.modal) {
          scope.modal.remove();
        }
      }

      function _evalController(ctrlName) {
        var result = {
          isControllerAs: false,
          controllerName: '',
          propName: ''
        };
        var fragments = (ctrlName || '').trim().split(/\s+/);
        result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
        if (result.isControllerAs) {
          result.controllerName = fragments[0];
          result.propName = fragments[2];
        }
        else {
          result.controllerName = ctrlName;
        }

        return result;
      }
    }])
		.factory('locals',['$window',function($window){
      return{
        //存储单个属性
        set :function(key,value){
          $window.localStorage[key]=value;
        },
        //读取单个属性
        get:function(key,defaultValue){
          return  $window.localStorage[key] || defaultValue;
        },
        //存储对象，以JSON格式存储
        setObject:function(key,value){
          $window.localStorage[key]=JSON.stringify(value);
        },
        //读取对象
        getObject: function (key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }, 
        removeItem: function(key){
      		return $window.localStorage.removeItem(key);
    	}, 
        clearItem: function(){
      		return $window.localStorage.clear();
    	}

      }
  }]);


/*	
		$rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
        var isPublic = angular.isObject(toState.data) && toState.data.isPublic === true;    //判断当前state的data属性"isPublic" === true
//      var token = Passport.getToken();    //这里的getToken()是我自己写的取得当前token的方法，可以换成你自己的方法
        if (isPublic) {     //如果该state是匿名访问路由 || token存在 
               console.log(toState);
        }
        else {    //表示该state访问需要权限
          ModalService.show('templates/login.html', 'ChatDetailCtrl', {'login': true})    //调用ModalService.show()方法，显示登录modal框，这里还要指定Controller为LoginController，你也可以替换为自己的Controller
            .then(function (data) {
              if (data.login) {    //login 是我自定义的参数，后面会讲到
                $rootScope.$broadcast('login', 'true');        //向下广播 login事件，这样就可以在其他controller中接收到该事件，从而进行相应的操作
              }
              else {
                if(data.state){    //state也是我自定义的参数
                  $state.go(data.state);
                }else{
                  $state.go(fromState.name);
                }
              }
            });
        }
      });*/