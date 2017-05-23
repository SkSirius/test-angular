export const login = {
  template: require('./login.html'),
  controller($rootScope, $window) {
    this.login = 'Login World!';
    this.name = '';

    this.$onInit = function () {
      this.name = $rootScope.$storage.name;
    };

    this.enter = function () {
      // save to local storage this.name
      $rootScope.$storage.name = this.name;
      $window.location.href = '/';
    };
  }
};
