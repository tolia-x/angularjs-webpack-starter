import { RoutesConfig } from '../Config/';
import { AppRun } from '../Config/';

const appConfig = angular.module('app.config', [])
    .run(AppRun)
    .config(RoutesConfig)
    .name;

export default appConfig;