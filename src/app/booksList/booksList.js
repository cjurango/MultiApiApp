class BooksListController {
  /** @ngInject */
  constructor($http) {
    $http
      .get('app/booksList/booksList.json')
      .then(response => {
        this.booksList = response.data;
      });
  }
}

export const booksList = {
  template: require('./booksList.html'),
  controller: BooksListController
};
