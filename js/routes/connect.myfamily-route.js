App.ConnectMyfamilyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        //debugger;
        var user = this.get('session.store').restore();
        if (user.familyId) {
            return this.store.find('family', user.familyId);
        } else {
            return null;
        }
        
        //return this.store.find('family', '53a78f832e853854ec59d93f');
    },
    afterModel: function (model) {
        //debugger;
    },
    setupController: function (controller, model) {
        controller.set('content', model);
    },
    actions: {
        openAddMemberModal: function (modalName, id) {
            var self = this;
            this.store.find('family', id).then(function (family) {
                var empty = self.store.createRecord('member', { family: family });
                self.controllerFor(modalName).set('model', empty);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        openEditMemberModal: function (modalName, id) {
            var self = this;
            this.store.find('member', id).then(function(member) {
                self.controllerFor(modalName).set('model', member);
                //this.controllerFor(modalName).set('model', this.store.find('person', id));
                //this.generateController('connect.addmember');
                //debugger;
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        openAddFamilyModal: function (modalName, model) {
            //this.controllerFor(modalName).set('model', model);
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        openEditFamilyModal: function (modalName, id) {
            this.controllerFor(modalName).set('model', this.store.find('family', id));
            //this.controllerFor(modalName).set('model', this.store.find('person', id));
            //this.generateController('connect.addmember');
            //debugger;
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeAddMemberModal: function () {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        deleteMember: function(id) {
            this.store.find('member', id).then(function (record) {
                //p.destroyRecord(); // => DELETE to /posts/2
                record.deleteRecord();
                record.save();
            });
            
        },

        deleteFamily: function (id) {
            debugger;
            this.store.find('family', id).then(function (record) {
                //record.destroyRecord(); // => DELETE to /posts/2
                record.deleteRecord();
                record.save();
            });

        }
    }
});