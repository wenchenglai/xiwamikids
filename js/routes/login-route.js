App.LoginRoute = Ember.Route.extend({
    actions: {
        // action to trigger authentication with Facebook
        authenticateWithFacebook: function () {
            debugger;
            var my = this;
            this.get('session').authenticate('authenticator:facebook', {}).then(function(test1, test2) {
                var session = my.get('session');
                session.set('facebookId', FB.getAuthResponse().userID);
                debugger;

                var query = {
                    facebookId: session.get('facebookId')
                };

                my.get('store').find('member', query).then(function (data) {
                    debugger;
                    session.set('authUser', data);
                }, function() {
                    debugger;
                });
                debugger;
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