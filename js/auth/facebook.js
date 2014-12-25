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
    _getEducation: function (key, education) {
        var ret = "",
            i = 0;

        for (i = 0; i < education.length; i++) {
            if (education[i].type === key) {
                ret = education[i].school.name;
                break;
            } else if (education[i].type === key) {
                ret = education[i].school.name;
                break;
            }
        }
        return ret;
    },
    _getFacebookProfilePicture: function (type) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.api('/me/picture?type=' + type, function (response) {
                if (response && !response.error) {
                    Ember.run(resolve(response));
                } else {
                    reject(response);
                }
            });
        });
    },
    _setupUser: function (store) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.api('/me', function (fbUser) {
                var fbImageUrl = '';

                self._getFacebookProfilePicture('large').then(function (largeProfilePicture) {
                    fbImageUrl = largeProfilePicture.data.url;

                    var newMember = store.createRecord('member', {
                        firstName: fbUser.first_name,
                        lastName: fbUser.last_name,
                        gender: fbUser.gender,
                        facebookId: fbUser.id,
                        avatarUrl: fbImageUrl,
                        largePicture: fbImageUrl,
                        highSchool: self._getEducation('High School', fbUser.education),
                        college: self._getEducation('College', fbUser.education),
                        fhometown: fbUser.hometown.name,
                        flink: fbUser.link,
                        flocale: fbUser.locale,
                        flocation: fbUser.location.name,
                        ftimezone: fbUser.timezone,
                        isUser: true,
                        isDeleted: false
                    });

                    //resolve({ user: newMember });

                    newMember.save().then(function (member) {
                        resolve(member);
                    }, function (response, test2, test3) {
                        var b = response;
                        reject("Error when saving new member to system");
                    });
                }, function (response) {
                    var a = response;
                    reject("Error when getting Facebook Picture");
                });
            });
        });
    },
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
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    // if logged in before, the cookie will have this status
                    Ember.run(function () {
                        var store = self.get('container').lookup('store:main');

                        store.find('member', fbResponse.authResponse.userID).then(function (member) {
                            resolve({
                                user: member,
                                accessToken: fbResponse.authResponse.accessToken,
                                facebookId: fbResponse.authResponse.userID
                            });
                        }, function (error) {
                            self._setupUser(store).then(function (member) {
                                resolve({
                                    user: member,
                                    accessToken: fbResponse.authResponse.accessToken,
                                    facebookId: fbResponse.authResponse.userID                                    
                                });
                            }, function(errorMessage) {
                                reject(errorMessage);
                            });
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
                                var store = self.get('container').lookup('store:main');

                                store.find('member', fbResponse.authResponse.userID).then(function (member) {
                                    resolve({
                                        user: member,
                                        accessToken: fbResponse.authResponse.accessToken,
                                        facebookId: fbResponse.authResponse.userID
                                    });
                                }, function (error) {
                                    self._setupUser(store).then(function (member) {
                                        resolve({
                                            user: member,
                                            accessToken: fbResponse.authResponse.accessToken,
                                            facebookId: fbResponse.authResponse.userID
                                        });
                                    }, function (errorMessage) {
                                        reject(errorMessage);
                                    });
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