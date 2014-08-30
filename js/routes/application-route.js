App.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
    _saveTransition: function (transition) {
        if (transition.targetName !== 'login') {
            this.controllerFor('login').set('previousTransition', transition);
        }
    },

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

    setupController: function (controller, post) {
        this._super(controller);
        this.generateController('login');
    },

    actions: {
        willTransition: function (transition) {
            this._saveTransition(transition);
        },

        setupUser: function () {
            var query = {
                facebookId: session.get('facebookId')
            };

            self.store.find('member', query).then(function (members) {
                if (members.content.length > 0) {
                    // this facebook user already has an account in the system
                    self._createSessionUser(session, members.content[0]);
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
                                this.transitionTo('index');
                            }, function (ret) {
                                // error in saving new member
                            });

                        }, function (error) {

                        });
                    });
                }

            }, function (error) {
                self.get('controller').set('errorMessage', 'Server Error - Getting Member by Facebook ID');
                self.get('controller').set('showError', true);
                //self.get('session').invalidate();
                //self.transitionTo('login');
            });
        }
        //sessionAuthenticationSucceeded: function() {
        //    debugger;
        //},

        //sessionAuthenticationFailed: function() {
        //    debugger;
        //},

        //invalidateSession: function() {
        //    debugger;
        //    this._super();
        //},
        
        //sessionInvalidationSucceeded: function() {
        //    debugger;
        //},

        //sessionInvalidationFailed: function() {
        //    debugger;
        //},

        //authorizationFailed: function() {
        //    debugger;
        //}
    }
});