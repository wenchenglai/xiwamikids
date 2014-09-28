App.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
    _saveTransition: function (transition) {
        if (transition.targetName !== 'login') {
            this.controllerFor('login').set('previousTransition', transition);
        }
    },

    setupController: function (controller, post) {
        this._super(controller);
        this.generateController('login');
    },

    actions: {
        willTransition: function (transition) {
            this._saveTransition(transition);
        },

        closeModal: function () {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        openUserProfileAccountModal: function (modalName) {
            var self = this,
                id = self.get('session.store.id');

            self.store.find('member', id).then(function (member) {
                self.controllerFor(modalName).set('model', member);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

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