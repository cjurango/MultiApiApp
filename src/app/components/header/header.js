class HeaderController {
  /** @ngInject */
  constructor($http, $log, $rootScope) {
    this.$http = $http;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.historySearch = [];
    this.checkHistory();
  }

  getHistory() {
    return this.$http({
      method: 'GET',
      url: 'http://localhost:8080/booksearch'
    });
  }

  checkHistory() {
    this.getHistory()
    .then(response => {
      this.prevHistory = response.data && response.data.length > 0;
    }, error => {
      this.$log.log(error);
    });
  }

  showHistory() {
    this.getHistory()
    .then(response => {
      this.historySearch = response.data;
      this.$rootScope.searching = true;
    }, error => {
      this.$log.log(error);
    });
  }

  getOpenlibraryBooks(query) {
    return this.$http({
      method: 'GET',
      url: 'http://openlibrary.org/search.json?q=' + query
    });
  }

  getGoogleBooks(query) {
    return this.$http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + query
    });
  }

  searchBooks() {
    let olBooks = [];
    let gBooks = [];
    if (this.query && this.query.length > 3) {
      this.getOpenlibraryBooks(this.query)
      .then(responseOl => {
        olBooks = responseOl.data.docs.map(b => {
          return b.title_suggest.toUpperCase();
        });
        this.getGoogleBooks(this.query)
        .then(responseGb => {
          gBooks = responseGb.data.items.map(b => {
            return b.volumeInfo.title.toUpperCase();
          });
          olBooks.push(gBooks);
          olBooks = this.uniqueTitles(olBooks);
          this.quickSortTitles(olBooks, 0, olBooks.length - 1);
          this.allBooks = olBooks;
          this.$log.log(olBooks);
        }, errorGr => {
          this.$log.log('GR error: ' + errorGr);
        });
      }, errorOl => {
        this.$log.log('OL error: ' + errorOl);
      });
    }
  }

  /** Get unique titles in the merged array */
  uniqueTitles(bookArr) {
    const newArr = [];
    for (let x = 0; x < bookArr.length; x++) {
      let found = false;
      for (let y = 0; y < newArr.length; y++) {
        if (bookArr[x] === newArr[y]) {
          found = true;
          break;
        }
      }
      if (!found) {
        newArr.push(bookArr[x]);
      }
    }
    return newArr;
  }

  /** Sorts the titles array in place without using built sort function. Instead uses quickSort */
  swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  partition(array, left, right) {
    const cmp = array[right - 1];
    let minEnd = left;
    let maxEnd;
    for (maxEnd = left; maxEnd < right - 1; maxEnd++) {
      if (array[maxEnd] <= cmp) {
        this.$log.log(array[maxEnd] + ' - ' + cmp + ': ', array[maxEnd] <= cmp);
        this.swap(array, maxEnd, minEnd);
        minEnd++;
      }
    }
    this.swap(array, minEnd, right - 1);
    return minEnd;
  }

  quickSortTitles(bookArr, left, right) {
    let p;
    if (left < right) {
      p = this.partition(bookArr, left, right);
      this.quickSortTitles(bookArr, left, p);
      this.quickSortTitles(bookArr, p + 1, right);
    }
  }

}

export const header = {
  template: require('./header.html'),
  controller: HeaderController
};
