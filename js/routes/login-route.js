App.LoginRoute = Ember.Route.extend({
    showError: false,
    errorMessage: '',

    _setLongitudeAndLatitude: function (session, member) {
        var family = member.get('family'),
            longitude = 0.0,
            latitude = 0.0;

        if (family) {
            if (family.get('location')) {
                longitude = family.get('location')[0];
                latitude = family.get('location')[1];
            }
        } else if (member.get('location')) {
            longitude = member.get('location')[0];
            latitude = member.get('location')[1];
        }

        if (longitude === 0.0)
            longitude = geoplugin_longitude();

        if (latitude === 0.0)
            latitude = geoplugin_latitude();
        
        session.set('longitude', longitude);
        session.set('latitude', latitude);
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

    _createNewMemberFromFacebookProfile: function (self, session) {
        FB.api('/me', function (fbUser) {
            var fbImageUrl = '';

            self._getFacebookProfilePicture('large').then(function (largeProfilePicture) {
                fbImageUrl = largeProfilePicture.data.url;

                var newMember = self.store.createRecord('member', {
                    firstName: fbUser.first_name,
                    lastName: fbUser.last_name,
                    gender: fbUser.gender,
                    facebookId: fbUser.id,
                    avatarUrl: fbImageUrl,
                    largePicture: fbImageUrl,
                    //feducation: self._getFacebookEducation(fbUser.education),
                    fhometown: fbUser.hometown.name,
                    flink: fbUser.link,
                    flocale: fbUser.locale,
                    flocation: fbUser.location.name,
                    ftimezone: fbUser.timezone,
                    isUser: true,
                    isDestroyed: false
                });

                newMember.save().then(function (member) {
                    session.set('user', member);
                    self._setLongitudeAndLatitude(session, member);
                });
            });
        });
    },

    _setupUser: function (self, session) {
        self.store.find('member', session.get('facebookId')).then(function (member) {
            if (member) {
                // this facebook user already has an account in the system
                session.set('user', member);
                self._setLongitudeAndLatitude(session, member);

            } else {
                // this facebook user is not in the system, we have to create a new one
                self._createNewMemberFromFacebookProfile(self, session);
            }

        }, function (error) {
            self.get('controller').set('errorMessage', 'Server Error - Getting Member by Facebook ID');
            self.get('controller').set('showError', true);
            session.invalidate();
        });
    },

    actions: {
        authenticateWithFacebook: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:facebook', {}).then(function () {              
                self._setLongitudeAndLatitude(session, session.get('user'));
            }, function (error) {
                self.get('controller').set('errorMessage', 'Facebook Login Error:' + error);
                self.get('controller').set('showError', true);
            });
        },

        // This action is fired when user click on Login button on Login page
        authenticateCustom: function () {
            var self = this,
                session = self.get('session'),
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                host = self.store.adapterFor('application').get('host');

            session.authenticate('authenticator:custom', {email: email, password: password, host: host}).then(function () {
                self._setLongitudeAndLatitude(session, session.get('user'));
            }, function (error) {
                self.get('controller').set('errorMessage', 'Login Error:' + error);
                self.get('controller').set('showError', true);
            });        
        }
    }
});