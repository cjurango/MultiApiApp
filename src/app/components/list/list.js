class ListController {
  /** @ngInject */
  constructor($rootScope, $log) {
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.listenToListChanges();
    this.currentDate = new Date();
  }

  listenToListChanges() {
    this.$rootScope.$on('bookListChanged', (event, bookList) => {
      this.booksList = bookList;
    });
  }

}

export const list = {
  template: require('./list.html'),
  controller: ListController
};
