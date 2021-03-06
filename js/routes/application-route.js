﻿App.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
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
        error: function (error, transition) {
            this.controllerFor('error').set('error', error);
            this.controllerFor('error').set('transition', transition);
            this.transitionTo('error');
        },

        willTransition: function (transition) {
            this._saveTransition(transition);
        },

        closeModal: function () {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        openUserModal: function (modalName) {
            var self = this,
                id = self.get('session.user.id'),
                facebookId = self.get('session.user.facebookId');

            if (id || facebookId) {
                if (id) {
                    self.store.find('member', id).then(function(member) {
                        self.controllerFor(modalName).set('model', member);
                        return self.render(modalName, {
                            into: 'application',
                            outlet: 'modal'
                        });
                    });
                } else {
                    self.store.find('member', facebookId).then(function (member) {
                        self.controllerFor(modalName).set('model', member);
                        return self.render(modalName, {
                            into: 'application',
                            outlet: 'modal'
                        });

                    }, function (error) {
                        self.get('controller').set('errorMessage', 'Server Error - Getting Member by Facebook ID');
                        self.get('controller').set('showError', true);
                        session.invalidate();
                        //self.transitionTo('login');
                    });
                }

            } else {
                this.controllerFor('error').set('errorMessage', 'Missing ID');
                //this.controllerFor(modalName).set('model', this.store.find('person', id));
                //this.generateController('connect.addmember');
                //debugger;
                return this.render('error', {
                    into: 'application',
                    outlet: 'modal'
                });
            }
        },

        //sessionAuthenticationSucceeded: function(test1, test2) {
        //    //var previousTransition = this.controllerFor('login').get('previousTransition');
        //    //if (previousTransition) {
        //    //    previousTransition.retry();
        //    //    return;
        //    //}

        //    //this.transitionTo("error");
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