export const room = {
  template: require('./room.html'),
  controller($rootScope, $http, $interval) {
    this.message = '';
    this.messageList = [];
    this.messagesData = [];

    this.$onInit = function () {
      $http.get('messages.json')
        .then(response => {
          this.messagesData = response.data;

          let i = 0;
          const stop = $interval(() => {
            if (i < this.messagesData.length) {
              const message = this.messagesData[i].message;
              const date = new Date();
              message.time = date.toString();
              this.messageList.push(message);
            } else {
              $interval.cancel(stop);
            }

            i++;
          }, 5000);
        });
    };

    this.sendMessage = function () {
      const name = $rootScope.$storage.name;
      this.messageList.push({text: this.message, author: name, time: new Date().toString()});
    };
  }
};
