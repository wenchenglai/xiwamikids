App.GossipBrowseController = Ember.ArrayController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('gossipText'));
    }.property('gossipText'),
    asked: false,
    actions: {
        ask: function () {
            var self = this,
                user = self.get('session.store').restore();

            self.store.find('member', user.id).then(function (member) {
                var newRecord = self.store.createRecord('gossip', {
                    user: member,
                    questionText: self.get('gossipText'),
                    createdDate: new Date()
                });

                newRecord.save().then(function (record) {
                    self.set("asked", true);
                }, function (record) {
                    debugger;
                });
            });
        }
    }
});