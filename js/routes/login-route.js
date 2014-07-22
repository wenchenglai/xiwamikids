App.LoginRoute = Ember.Route.extend({
    _createSessionUser: function (session, member) {
        debugger;
        var data = {
            id: member.get('id'),
            facebookId: member.get('facebookId'),
            firstName: member.get('firstName')
        };

        if (member.get('family')) {
            data.familyId = member.get('family').id;
        }

        session.get('store').persist(data);
    },
    actions: {
        // action to trigger authentication with Facebook
        authenticateWithFacebook: function () {
            var self = this;
            this.get('session').authenticate('authenticator:facebook', {}).then(function(test1, test2) {
                var session = self.get('session');
                session.set('facebookId', FB.getAuthResponse().userID);
                var query = {
                    facebookId: session.get('facebookId')
                };

                self.store.find('member', query).then(function (members) {
                    if (members.content.length > 0) {
                        debugger;
                        self._createSessionUser(session, members.content[0]);
                    } else {
                        // this facebook user is not in the system, we have to create a new one
                        FB.api('/me', function (fbUser) {
                            var fbImageUrl = '';
                            FB.api('/me/picture?type=large',
                                function (response) {
                                    if (response && !response.error) {
                                        /* handle the result */
                                        debugger;
                                        fbImageUrl = response.data.url;
                                    }
                                }
                            );

                            var newMember = self.store.createRecord('member', {
                                firstName: fbUser.first_name,
                                lastName: fbUser.last_name,
                                gender: fbUser.gender,
                                facebookId: fbUser.id,
                                avatarUrl: fbImageUrl,
                                isUser: true
                            });

                            newMember.save().then(function (member) {
                                debugger;
                                self._createSessionUser(session, member);

                                var previousTransition = self.get('controller').get('previousTransition');
                                if (previousTransition) {
                                    previousTransition.retry();
                                    return;
                                }

                                this.transitionTo('index');
                            }, function (ret) {
                                // error in saving new member
                                debugger;
                            });
                        });
                    }
                }, function (data) {
                    // error in getting a member by facebookId
                    debugger;
                });
            }, function(test1, test2) {
                debugger;
            });
        },
        // action to trigger authentication with Google+
        authenticateWithGooglePlus: function () {
            debugger;
            this.get('session').authenticate('authenticator:googleplus', {}).then(function() {
                debugger;
            }, function() {
                debugger;
            });
        }
    }
});