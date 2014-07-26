App.ConnectEditfamilyController = Ember.ObjectController.extend({
    actions: {
        close: function () {
            return this.send('closeAddMemberModal');
        },
        edit: function (params) {
            var self = this;

            var fromModel = this.get('model').content;

            if (fromModel.get('isDirty')) {
                fromModel.save().then(function(family) {
                    self.send('closeAddMemberModal');
                }, function(error) {

                });
            }
        }
    }
});