import { NavHeaderComponent } from '../Components';

const appComponents = angular.module('app.components', [
    'ui.bootstrap',
    'ui.router'
])
    .component('navHeaderComponent', NavHeaderComponent)
    .name;

export default appComponents;