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
    authenticate: function (option) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            self._customLogin(option.host + '/login', {
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        email: option.email,
                        password: option.password
                    })
                }
            ).then(function (data) {
                if (data.auth === 'success') {
                    Ember.run(function () {
                        resolve({a: 'a'});
                    });
                } else {
                    reject();
                }
            });
        });
    },
    invalidate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.logout(function (response) {
                Ember.run(resolve);
            });
        });
    },
    _customLogin: function (url, options) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            options = options || {};

            options.success = function (data) {
                Ember.run(null, resolve, data);
            };

            options.error = function (jqxhr, status, something) {
                Ember.run(null, reject, arguments);
            };

            Ember.$.ajax(url, options);
        });
    }
});