class HeaderController {
  /** @ngInject */
  constructor($http, $log, $rootScope) {
    this.$http = $http;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.checkHistory();
  }

  getHistory() {
    return this.$http({
      method: 'GET',
      url: 'http://192.168.0.6:8080/booksearch'
    }).then(response => {
      this.historySearch = response;
      this.$log.log('historySearch: ' + this.historySearch);
    }, error => {
      this.$log.log(error);
    });
  }

  checkHistory() {
    this.prevHistory = true;
  }

  getFirstBooksSet() {
    return this.$http({
      method: 'GET',
      url: 'app/booksList/techs.json'
    });
  }

  getSecondBooksSet() {
    return this.$http({
      method: 'GET',
      url: 'app/booksList/techs.json'
    });
  }

  searchBooks() {
    let firstsBooks = [];
    let secondsBooks = [];
    this.getFirstBooksSet()
    .then(response1 => {
      firstsBooks = response1.data;
      this.$log.log('1: ' + firstsBooks);
      this.getSecondBooksSet()
      .then(response2 => {
        secondsBooks = response2.data;
        this.$log.log('2: ' + secondsBooks);
        firstsBooks.push(secondsBooks);
        this.allBooks = firstsBooks;
        this.$rootScope.searching = true;
      }, error2 => {
        this.$log.log(error2);
      });
    }, error1 => {
      this.$log.log(error1);
    });
  }

}

export const header = {
  template: require('./header.html'),
  controller: HeaderController
};
