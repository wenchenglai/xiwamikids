App.TipAddController = Ember.ObjectController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),

    actions: {
        close: function () {
            var record = this.get('model');
            if (record.get('id')) {
                if (record.get('isDirty')) {
                    record.rollback();
                }
            } else {
                record.deleteRecord();
            }

            return this.send('closeAddModal', false);
        },
        add: function (params) {
            var self = this,
                fromModel = this.get('model');

            fromModel.save().then(function (record) {
                self.send('closeAddModal', true);

            }, function (error) {
                // deal with the failure here
                debugger;
            });
        },
        preview: function (params) {
            var self = this,
                fromModel = this.get('model');


        }
    }
});