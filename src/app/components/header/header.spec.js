import angular from 'angular';
import 'angular-mocks';
import {header} from './header';

describe('header component', () => {
  beforeEach(() => {
    angular
      .module('booksHeader', ['app/header.html'])
      .component('booksHeader', header);
    angular.mock.module('booksHeader');
  });

  it('should render \'Fountain Generator\'', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<books-header></books-header>')($rootScope);
    $rootScope.$digest();
    const header = element.find('a');
    expect(header.html().trim()).toEqual('Search History');
  }));
});
