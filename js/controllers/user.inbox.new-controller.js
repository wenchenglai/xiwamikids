App.InboxNewController = Ember.ObjectController.extend({
    actions: {
        save: function (params) {
            var self = this,
                fromModel = self.get('model');

            fromModel.set('fromStatus', 'sent');
            fromModel.set('toStatus', 'unread');
            fromModel.set('isDestroyed', false);
            fromModel.set('createdDate', new Date());

            fromModel.save().then(function (record) {
                self.transitionTo('inbox.browse');

            }, function (error) {
                // deal with the failure here
                debugger;
            });
        }
    }
});