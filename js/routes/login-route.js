App.LoginRoute = Ember.Route.extend({
    showError: false,
    errorMessage: '',
    
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

            session.authenticate('authenticator:facebook', {}).then(function() {
                session.getProfile();

            }, function (error) {
                self.get('controller').set('errorMessage', 'Facebook Login Failed.');
                self.get('controller').set('showError', true);
            });
        },
        // action to trigger authentication with Google+
        authenticateWithGooglePlus: function () {

            this.get('session').authenticate('authenticator:googleplus', {}).then(function() {

            }, function() {

            });
        }
    }
});