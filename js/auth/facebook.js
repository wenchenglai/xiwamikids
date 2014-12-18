FB.init({
    appId: '343069969185068',
    //appId: '290368724455193', 
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.2' // use version 2.2
});

// the custom authenticator that initiates the authentication process with Facebook
App.FacebookAuthenticator = SimpleAuth.Authenticators.Base.extend({
    restore: function (properties) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(properties.accessToken)) {
                // this will be called when user has logged in and cookie is still valid
                resolve(properties);
            } else {
                reject();
            }
        });
    },
    authenticate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    // if logged in before, the cookie will have this status
                    Ember.run(function () {
                        resolve({
                            accessToken: fbResponse.authResponse.accessToken,
                            facebookId: fbResponse.authResponse.userID
                        });
                    });
                } else if (fbResponse.status === 'not_authorized') {
                    // if facebook App setup is wrong, we could come here
                    reject();
                } else {
                    // status is unknown, then we must prompt with facebook login page
                    FB.login(function (fbResponse) {
                        if (fbResponse.authResponse) {
                            Ember.run(function () {
                                resolve({
                                    accessToken: fbResponse.authResponse.accessToken,
                                    facebookId: fbResponse.authResponse.userID
                                });
                            });
                        } else {
                            reject();
                        }
                    });
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
    }
});