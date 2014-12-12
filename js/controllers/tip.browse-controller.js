App.TipBrowseController = Ember.ArrayController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('description'));
    }.property('description'),
    asked: false,
    actions: {
        ask: function () {
            var self = this,
                user = self.get('session.store').restore();

            self.store.find('member', user.id).then(function (member) {
                var newRecord = self.store.createRecord('tip', {
                    user: member,
                    questionText: self.get('description'),
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