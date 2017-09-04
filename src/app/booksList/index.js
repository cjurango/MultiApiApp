import angular from 'angular';

import {booksList} from './booksList';

export const booksListModule = 'booksList';

angular
  .module(booksListModule, [])
  .component('booksList', booksList);
