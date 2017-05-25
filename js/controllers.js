angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope, $http, $timeout, locals) {
	//下拉刷新页面
	$scope.doRefresh = function() {
		$http.get('http://127.0.0.1:8080/#/tab/dash')
			.success(function(newData) {

			})
			.finally(function() {
				// 停止广播ion-refresher
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');

				}, 1000)
			})
	}

	$http({
			method: 'GET',
			url: 'js/data.json'
		})
		.success(function(data, status, headers, config) {

			$scope.banners = data;
		})

	.error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});

	$http({
		method: 'GET',
		url: 'js/list.json'
	}).
	success(function(data, status, headers, config) {
		$scope.lists = data;
	}).
	error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});

})

.controller('listsCtrl', function($scope, $rootScope, $http, locals, $timeout) {
	$scope.$on('$ionicView.enter', function() {
		// 显示 tabs
		$rootScope.hideTabs = false;
	})
	$scope.doRefresh = function() {
		$http.get('http://127.0.0.1:8080/#/tab/lists')
			.success(function(i) {

			})
			.finally(function() {
				// 停止广播ion-refresher
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');

				}, 1000)
			})
	}
	$http({
		method: 'GET',
		url: 'js/list.json'
	}).
	success(function(data, status, headers, config) {

		$scope.class = function(type) {
				$scope.type = data.filter(function(item) {
					return item.type == type;

				})
				$scope.current = type;

			}
			// 默认先加载 
		$scope.class('fruit');
	}).
	error(function(data, status, headers, config) {

	});
})

.controller('ChatDetailCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals, $state, $timeout) {

		$scope.user = locals.getObject("user");
		//加载物品的详情
		$http({
			method: 'GET',
			url: 'js/list.json'
		}).
		success(function(res, status, headers, config) {
			res.forEach(function(item, idx) {

				item.datalist.forEach(function(it, i) {
					if(it.id == $stateParams.id) {
						$scope.goods = it;
						$scope.titles = item.title;
					}
				})
			});

			//详情加入购物车
			$scope.addcar = function() {

					$scope.glist = locals.getObject('goodlists');

					if($scope.user.username) {
						var arr = [];
						var obj = {};
						var arr2 = [];
						//判断是否有产品加入购物车
						if($scope.glist.length > 0) {

							$scope.glist.forEach(function(item, idx) {
								//同类型
								if(item.titles == $scope.titles) {
									item.goods.forEach(function(ite, inx) {
										//同产品
										if(ite.id == $scope.goods.id) {
											console.log('同类同物')
											$scope.glist[idx].goods[inx].num++;
										} else if(ite.id != $scope.goods.id && (inx == item.goods.length - 1)) {
											console.log('同类不同物')
											$scope.goods.num = 1;
											$scope.glist[idx].goods.push($scope.goods);
										}
									})
									arr.push(item);
								} else {
									//不同类
									arr.push(item);
									if(idx == $scope.glist.length - 1) {
										console.log('不同类')
										obj.titles = $scope.titles;
										$scope.goods.num = 1;
										arr2.push($scope.goods);
										obj.goods = arr2;
										arr.push(obj);
									}

								}
								//								 
							})

						} else {
							console.log('初始化')
							obj.titles = $scope.titles
							$scope.goods.num = 1;
							$scope.goods.id = $scope.goods.id + 1;
							arr2.push($scope.goods);
							obj.goods = arr2;
							arr.push(obj);
						}

						console.log(arr)
						locals.setObject('goodlists', arr);

						var myPopup = $ionicPopup.show({
							template: '添入成功，在购物车等待~~'
						});

						$timeout(function() {
							myPopup.close(); //由于某种原因3秒后关闭弹出	
						}, 1000);

					} else {
						var alertPopup = $ionicPopup.alert({
							title: '提示',
							template: '请先登录'
						});
					}
				}
				//谈生意
			$scope.tokeshop = function() {
				if($scope.user.username) {
					console.log('已登录')
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录',
						okText: '确定'
					}).then(function(res) {
						console.log(res)
					});
				}
			}

		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

	})
	//购物车
	.controller('shopcarCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {
		$scope.goodlist = locals.getObject('goodlists');
		$scope.deleted = true;

	})
	.directive('ngEdit', function() {
		return {
			link: function(scope, ele, attr) {
				scope.edit = function(deleted) {
					scope.deleted = deleted;
				}
 
				scope.change = function(num) {
					 
				}
				scope.delet=function(){
					
				}
			}
		}
	})
	.controller('shoporderCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {

	})
	.controller('shopcollectCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {

	})
	.controller('mypointCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {

	})
	.controller('footprintCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {

	})
	.controller('resginCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, locals) {
		$scope.$on('$ionicView.enter', function() {
			// 显示 tabs
			$rootScope.hideTabs = true;
		})
	})
	.controller('AccountCtrl', function($scope, $http, $rootScope, $stateParams, $ionicModal, $timeout, $location, $ionicPopup, $state, locals) {
		$scope.$on('$ionicView.enter', function() {
			// 显示 tabs
			$rootScope.hideTabs = false;
		})

		$scope.user = locals.getObject("user");

		$scope.doRefresh = function() {
			$http.get('http://127.0.0.1:8080/#/tab/account')
				.success(function(i) {

				})
				.finally(function() {
					// 停止广播ion-refresher
					$timeout(function() {
						$scope.$broadcast('scroll.refreshComplete');
						$state.go('tab.account');

					}, 2000)
				})
		}

		if($scope.user.username) {
			$scope.isLogin = true;
		} else {
			$scope.isLogin = false;
		}
		//	$scope.isLogin = false;
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		// 关闭登录窗口
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};

		// 打开登录窗口
		$scope.login = function() {
			$scope.modal.show();
		};
		//点击注册
		$scope.resgin = function() {
			$scope.modal.hide();

			$state.go('tab.resgin', {
				resg: 7
			});
		};
		
		$scope.editsome=function(){
			if($scope.isLogin){
				
			}else{
				var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请登录'
					});
			}
		}
		
		// 点击登录
		$scope.doLogin = function() {
			console.log('Doing login', $scope.loginData);
			if(/^1[34578]\d{9}$/.test($scope.loginData.username)) {
				if(/\w{6,12}/.test($scope.loginData.password)) {

					locals.setObject('user', $scope.loginData)
					$scope.user.username = $scope.loginData.username;
					//登录成功的验证
					var myPopup = $ionicPopup.show({
						template: '登陆成功',
						title: '提示'
					});
					myPopup.then(function(res) {

					});

					$timeout(function() {
						myPopup.close(); //由于某种原因3秒后关闭弹出	
						$scope.closeLogin();
						$scope.isLogin = true;
					}, 1000);

				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '密码错误'
					});
				}
			} else {
				var alertPopup = $ionicPopup.alert({
					title: '提示',
					template: '帐号错误'
				});
			}

		};

		//我的积分
		$scope.mypoint = function() {
				if($scope.isLogin) {
					console.log('已登录，打开我的积分')
					$state.go('tab.point', {
						point: 3
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录'
					});
				}
			}
			//我的足迹
		$scope.footprint = function() {
				if($scope.isLogin) {
					console.log('已登录，打开我的积分')
					$state.go('tab.footprint', {
						foot: 4
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录'
					});
				}
			}
			//我的订单
		$scope.order = function() {
				if($scope.isLogin) {
					console.log('已登录，打开我的订单')
					$state.go('tab.order', {
						order: 1
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录'
					});
				}
			}
			//我的收藏
		$scope.collect = function() {
				if($scope.isLogin) {
					console.log('已登录，打开我的订单')
					$state.go('tab.collect', {
						collect: 2
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录'
					});
				}
			}
			//我的购物车
		$scope.myShopCar = function() {
				if($scope.isLogin) {
					console.log('已登录，打开我的购物车')
					$state.go('tab.cars', {
						cars: 0
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '请先登录'
					});
				}
			}
			//设置
		$scope.reset = function() {
			$scope.isLogin = false;
			locals.clearItem();
		}

	}).directive('showTabs', function($rootScope) {
		return {
			restrict: 'A',
			link: function($scope, $el) {
				$rootScope.hideTabs = false;
			}
		};
	}).directive('hideTabs', function($rootScope) {
		return {
			restrict: 'A',
			link: function($scope, $el) {
				$rootScope.hideTabs = true;
			}
		};
	});