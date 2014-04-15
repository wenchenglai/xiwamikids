App.ApplicationController = Ember.ObjectController.extend({
    actions: {
        home: function () {
            this.transitionToRoute('index');
        },
        connect: function () {
            this.transitionToRoute('connect');
        },
        logout: function () {
            FB.logout(function (response) {
                // Person is now logged out

            });
        }
    }
});