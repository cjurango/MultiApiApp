import angular from 'angular';

import {techsModule} from './app/techs/index';
import 'angular-ui-router';
import routesConfig from './routes';

import {main} from './app/components/main/main';
import {header} from './app/components/header/header';
import {title} from './app/components/title/title';
import {list} from './app/components/list/list';
import {footer} from './app/components/footer/footer';

import './index.scss';

angular
  .module('app', [techsModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('booksHeader', header)
  .component('booksTitle', title)
  .component('booksList', list)
  .component('booksFooter', footer);
