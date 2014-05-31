App.ActivityMyRoute = Ember.Route.extend({
    model: function () {
        //return Em.Object.create({});
        return this.store.find('activity', {isDeleted: false});
    },

    actions: {
        openAddModal: function (modalName, model) {
            this.controllerFor("activity.edit").set('model', this.store.createRecord('activity', {}));
            //return Em.Object.create({});
            //this.controllerFor(modalName).set('model', model);
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        openEditModal: function (modalName, id) {
            //debugger;
            this.controllerFor("activity.edit").set('model', this.store.find('activity', id));
            //this.controllerFor(modalName).set('model', this.store.find('person', id));
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeEditModal: function () {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        deleteActivity: function (id) {
            debugger;
            var route = this;
            this.store.find('activity', id).then(function (record) {
                debugger;
                record.set('isDeleted', true);
                //record.deleteRecord();
                record.save().then(function () {
                    debugger;
                    route.transitionTo('activity.my');
                });
            });
        }
    }
});