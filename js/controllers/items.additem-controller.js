App.ItemsAdditemController = Ember.ObjectController.extend({
    allAges: [0, 1, 2, 3, 4, 5, 6],
    disabled: function () {
        return Ember.isEmpty(this.get('name')) || Ember.isEmpty(this.get('description'));
    }.property('name', 'description'),
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

            return this.send('closeAddItemModal', false);
        },
        add: function (params) {
            var self = this,
                fromModel = this.get('model');

            fromModel.save().then(function (record) {
                self.send('closeAddItemModal', true);

            }, function (record) {
                // deal with the failure here
                debugger;
            });
        }
    }
});