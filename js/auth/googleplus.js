// setup Google+ API
function googleApiLoaded() {
    gapi.client.setApiKey('A_Dlo1Vp4KMI8d8B9QMWgPQb');
};

// the custom authenticator that initiates the authentication process with Google+
App.GooglePlusAuthenticator = SimpleAuth.Authenticators.Base.extend({
    restore: function (properties) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(properties.access_token)) {
                resolve(properties);
            } else {
                reject();
            }
        });
    },
    authenticate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            gapi.auth.authorize({
                client_id: '973620112090-cdupacm1dvpmt5ahibvtl8hnv6u903v9.apps.googleusercontent.com',
                scope: ['https://www.googleapis.com/auth/plus.me'],
                'approvalprompt': 'force',
                immediate: false
            }, function (authResult) {
                if (authResult && !authResult.error) {
                    resolve({ access_token: authResult.access_token });
                } else {
                    reject((authResult || {}).error);
                }
            });
        });
    },
    invalidate: function () {
        return Ember.RSVP.resolve();
    }
});
