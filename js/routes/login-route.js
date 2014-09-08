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

            session.authenticate('authenticator:facebook', {}).then(function () {
                // if facebook logins successfully, we'll come here and then redirect to index route
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
        },

        authenticateCustom: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:custom', {}).then(function () {
                

            }, function (error) {
                self.get('controller').set('errorMessage', 'Login Failed.');
                self.get('controller').set('showError', true);
            });        
        },

        openSingUpModal: function () {
            return this.render("signup", {
                into: 'application',
                outlet: 'modal'
            });
        }
    }
});