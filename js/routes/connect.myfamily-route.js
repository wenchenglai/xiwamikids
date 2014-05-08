App.ConnectMyfamilyRoute = Ember.Route.extend({
    model: function () {

        //return Em.Object.create({});
        return this.store.find('family');
    },
    actions: {
        openAddMemberModal: function (modalName, model) {
            //this.controllerFor(modalName).set('model', model);
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        openEditMemberModal: function (modalName, id) {
            //debugger;
            this.controllerFor("connect.editmember").set('model', this.store.find('person', id));
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
        }
    }
});