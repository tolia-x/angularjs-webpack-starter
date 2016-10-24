// styles
import '../styles/index.scss';

// Modules
import appConfig from './Modules/app.config';
import appComponents from './Modules/app.components';

angular.module('app', [
    appComponents,
    appConfig
]);