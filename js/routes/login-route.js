App.LoginRoute = Ember.Route.extend({
    showError: false,
    errorMessage: '',
    
    _createSessionUser: function (session, member) {
        var data = {
            id: member.get('id'),
            facebookId: member.get('facebookId'),
            firstName: member.get('firstName')
        },
        family = member.get('family');

        if (family) {
            data.familyId = family.id;
            data.longitude = family.get('location')[0];
            data.latitude = family.get('location')[1];
        } else {
            data.latitude = geoplugin_latitude();
            data.longitude = geoplugin_longitude();
        }

        session.get('store').persist(data);
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

    _setupUser: function (self, session) {
        var query = {
            facebookId: session.get('facebookId')
        };

        self.store.find('member', query).then(function (members) {
            if (members.content.length > 0) {
                // this facebook user already has an account in the system
                self._createSessionUser(session, members.content[0]);
                self._getFacebookProfilePicture('large');
            } else {
                // this facebook user is not in the system, we have to create a new one
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
                            isUser: true
                        });

                        newMember.save().then(function (member) {
                            self._createSessionUser(session, member);

                            var previousTransition = self.get('controller').get('previousTransition');
                            if (previousTransition) {
                                previousTransition.retry();
                                return;
                            }
                            //this.transitionTo('index');
                        }, function (error) {
                            // error in saving new member
                        });

                    }, function (error) {

                    });
                });
            }

        }, function (error) {
            self.get('controller').set('errorMessage', 'Server Error - Getting Member by Facebook ID');
            self.get('controller').set('showError', true);
            session.invalidate();
            //self.transitionTo('login');
        });
    },

    _getFacebookProfile: function(session) {
        // We always get the small profile picture no matter what
        self._getFacebookProfilePicture('small').then(function (smallProfilePicture) {
            this.set('facebookImage', smallProfilePicture.data.url);
        });
    },

    actions: {
        error: function(error, transition) {
            debugger;
        },

        willTransition: function (transition) {
            var a = transition;
        },

    // action to trigger authentication with Facebook
        authenticateWithFacebook: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:facebook', {}).then(function () {
                // if facebook logins successfully, we'll come here and then redirect to index route
                self._setupUser(self, session);
            }, function (error) {
                self.get('controller').set('errorMessage', 'Facebook Login Failed.');
                self.get('controller').set('showError', true);
            });
        },
        // action to trigger authentication with Google+
        authenticateWithGooglePlus: function () {
            this.get('session').authenticate('authenticator:googleplus', {}).then(function(ddd) {
                debugger;
            }, function() {

            });
        },

        authenticateCustom: function () {
            var self = this,
                session = self.get('session'),
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                host = self.store.adapterFor('application').get('host');

            session.authenticate('authenticator:custom', {
                email: email, password: password, host: host}).then(function () {
                

            }, function (error) {
                self.get('controller').set('errorMessage', 'Login Failed.');
                self.get('controller').set('showError', true);
            });        
        }
    }
});