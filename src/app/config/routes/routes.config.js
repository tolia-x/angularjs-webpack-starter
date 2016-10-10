export function RoutesConfig ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            template: '<div class="">Hello Word</div>'
        })
        .state('test', {
            url: '/test',
            template: '<div class="">Hello test</div>'
        });
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];