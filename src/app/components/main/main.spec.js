import angular from 'angular';
import 'angular-mocks';
import {main} from './main';

describe('main component', () => {
  beforeEach(() => {
    angular
      .module('app', ['app/main.html'])
      .component('app', main);
    angular.mock.module('app');
  });

  it('should render the header, title, techs and footer', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<app>Loading...</app>')($rootScope);
    $rootScope.$digest();
    expect(element.find('books-header').length).toEqual(1);
    expect(element.find('books-title').length).toEqual(1);
    expect(element.find('books-list').length).toEqual(1);
    expect(element.find('books-footer').length).toEqual(1);
  }));
});
