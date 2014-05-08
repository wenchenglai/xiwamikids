App.FamilyCmpComponent = Ember.Component.extend({
    actions: {
        OpenEditFamilyModal: function (id) {
            $("#dialog-edit-form-family").dialog("open");
        },
        //OpenEditMemberModal: function (id) {
        //    //$("#dialog-form").dialog("open");
        //},
        DeleteMember: function (id) {
            debugger;
            $("#dialog-confirm").dialog("open");
        },
        edit: function (modalName, model) {
            //this.controllerFor(modalName).set('model', model);
            //this.generateController('connect.addmember');
            //debugger;
            this.sendAction('edit', modalName, model);
            //return this.render(modalName, {
            //    into: 'application',
            //    outlet: 'modal'
            //});
        },
    }
});