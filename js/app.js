// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope,$ionicPopup,$state) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

	var system = {};
	var p = navigator.platform;
	var u = navigator.userAgent;

	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	console.log(system.win)
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	if(system.win || system.mac || system.xll) { //如果是PC转   
		if(u.indexOf('Windows Phone') > -1) { //win手机端  
					$state.go('tab.dash');
		} else {
			var alertPopup = $ionicPopup.show({
						title: '提示',
						template: '请使用移动设备'
					}); 
		}
	}

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

	$ionicConfigProvider.backButton.previousTitleText(false);

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl'
			}
		},
		data: {
			isPublic: false
		}
	})

	.state('tab.lists', {
			url: '/lists',
			views: {
				'tab-lists': {
					templateUrl: 'templates/tab-lists.html',
					controller: 'listsCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.cars', {
			url: '/account/:cars',
			views: {
				'tab-account': {
					templateUrl: 'templates/shop-car.html',
					controller: 'shopcarCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.resgin', {
			url: '/account/:resg',
			views: {
				'tab-account': {
					templateUrl: 'templates/resgin.html',
					controller: 'resginCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.order', {
			url: '/account/:order',
			views: {
				'tab-account': {
					templateUrl: 'templates/shop-order.html',
					controller: 'shoporderCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.collect', {
			url: '/account/:collect',
			views: {
				'tab-account': {
					templateUrl: 'templates/shop-collect.html',
					controller: 'shopcollectCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.point', {
			url: '/account/:point',
			views: {
				'tab-account': {
					templateUrl: 'templates/my-point.html',
					controller: 'mypointCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.footprint', {
			url: '/account/:foot',
			views: {
				'tab-account': {
					templateUrl: 'templates/footprint.html',
					controller: 'footprintCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})
		.state('tab.chat-detail', {
			url: '/lists/:id',
			views: {
				'tab-lists': {
					templateUrl: 'templates/shop-detail.html',
					controller: 'ChatDetailCtrl'
				}
			},
			data: {
				isPublic: false
			}
		})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			}
		},
		data: {
			isPublic: false
		}
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});