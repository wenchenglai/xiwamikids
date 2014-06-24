App.ConnectMyfamilyRoute = Ember.Route.extend({
    model: function () {
        //return Em.Object.create({});
        return this.store.find('family', '53a78f832e853854ec59d93f');
    },
    afterModel: function (model) {
        //debugger;
    },
    actions: {
        openAddMemberModal: function (modalName, id) {
            this.controllerFor(modalName).set('familyId', id);
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        openEditMemberModal: function (modalName, id) {
            //debugger;
            this.controllerFor("connect.editmember").set('model', this.store.find('member', id));
            //this.controllerFor(modalName).set('model', this.store.find('person', id));
            //this.generateController('connect.addmember');
            //debugger;
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
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
            this.controllerFor("connect.editfamily").set('model', this.store.find('family', id));
            //this.controllerFor(modalName).set('model', this.store.find('person', id));
            //this.generateController('connect.addmember');
            //debugger;
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeAddMemberModal: function () {
            //debugger;
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