App.SignupRoute = Ember.Route.extend({
    showError: false,
    errorMessage: '',

    //model: function() {
    //    return this.store.createRecord('member');
    //},

    actions: {
        error: function (error, transition) {
            debugger;
        },

        signup: function () {
            var self = this,
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                password2 = controller.get('password2');

            if (password === password2 && password != null) {
                var newMember = self.store.createRecord('member', {
                    email: email,
                    password: password
                });

                newMember.save().then(function() {
                    //
                    self.transitionTo("index");
                });
            } else {
                self.get('controller').set('errorMessage', "Passwords don't match.");
                self.get('controller').set('showError', true);
            }
        },
    }
});