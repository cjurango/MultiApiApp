import angular from 'angular';
import 'angular-mocks';
import {title} from './title';

describe('title component', () => {
  beforeEach(() => {
    angular
      .module('booksTitle', ['app/title.html'])
      .component('booksTitle', title);
    angular.mock.module('booksTitle');
  });

  it('should render \'Allo, \'Allo!', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<books-title></books-title>')($rootScope);
    $rootScope.$digest();
    const title = element.find('h2');
    expect(title.html().trim()).toEqual('This application helps you to find the most complete set of books in the world');
  }));
});
