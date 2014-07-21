App.LoginRoute = Ember.Route.extend({
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
                        var user = members.content[0];
                        var data = {
                            facebookId: user.get('facebookId'),
                            familyId: user.get('family').id,
                            firstName: user.get('firstName')
                        };
                        session.get('store').persist(data);
                    } else {
                        // this facebook user is not in the system, we have to create a new one
                        FB.api('/me', function (fbUser) {
                            var newMember = self.store.createRecord('member', {
                                firstName: fbUser.first_name,
                                lastName: fbUser.last_name,
                                gender: fbUser.gender,
                                facebookId: fbUser.id,
                                isUser: true
                            });

                            //newMember.set('family', family);

                            newMember.save().then(function (member) {
                                debugger;
                                var previousTransition = self.get('controller').get('previousTransition');
                                if (previousTransition) {
                                    previousTransition.retry();
                                    return;
                                }

                                this.transitionTo('index');
                            }, function (ret) {
                                // error in saving new member
                                debugger;
                                var previousTransition = self.get('controller').get('previousTransition');
                                if (previousTransition) {
                                    previousTransition.retry();
                                    return;
                                }
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