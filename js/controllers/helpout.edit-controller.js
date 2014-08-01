App.HelpoutEditController = Ember.ObjectController.extend({
    actions: {
        closeModal: function () {
            var record = this.get('model');
            if (record.get('id')) {
                if (record.get('isDirty')) {
                    record.rollback();
                }
            } else {
                record.deleteRecord();
            }

            return this.send('closeAddEditModal', false);
        },
        addOrEdit: function (params) {
            var self = this,
                fromModel = self.get('model');

            fromModel.save().then(function (record) {
                self.send('closeAddEditModal', true);
            });
        },
    }
});