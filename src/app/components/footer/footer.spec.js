import angular from 'angular';
import 'angular-mocks';
import {footer} from './footer';

describe('footer component', () => {
  beforeEach(() => {
    angular
      .module('booksFooter', ['app/footer.html'])
      .component('booksFooter', footer);
    angular.mock.module('booksFooter');
  });

  it('should render \'FountainJS team\'', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<books-footer></books-footer>')($rootScope);
    $rootScope.$digest();
    const footer = element.find('footer');
    expect(footer.html().trim()).toEqual('Build by Carlos Urango');
  }));
});
