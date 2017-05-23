import angular from 'angular';
import 'angular-ui-router';
import 'ngStorage';

import {room} from './app/room';
import {login} from './app/login';
import {messageData} from './services/messageData';

import routesConfig from './routes';

import './index.css';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngStorage'])
  .config(routesConfig)
  .component('room', room)
  .component('login', login)
  .factory('MessageData', messageData)
  .run(($rootScope, $state, $localStorage, $location) => {
    $rootScope.$state = $state;
    $rootScope.$storage = $localStorage;

    $rootScope.routeChange = $rootScope.$on('$locationChangeStart', () => {
      if (!$localStorage.name) {
        $location.path('/login');
      }
    });

    $rootScope.$on('$destroy', () => {
      $rootScope.routeChange = '';
    });
  });
