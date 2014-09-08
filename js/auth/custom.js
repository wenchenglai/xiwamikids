App.CustomAuthenticator = SimpleAuth.Authenticators.Base.extend({
    restore: function (properties) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(properties.accessToken)) {
                resolve(properties);
            } else {
                reject();
            }
        });
    },
    authenticate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            var bool = true;

            if (bool) {
                Ember.run(function() {
                    resolve();
                });
            } else {
                reject();
            }
        });
    },
    invalidate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.logout(function (response) {
                Ember.run(resolve);
            });
        });
    }
});