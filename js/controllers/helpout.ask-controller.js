App.HelpoutAskController = Ember.ArrayController.extend({
    disabled: function() {
        return Ember.isEmpty(this.get('questionText'));
    }.property('questionText'),
    asked: false,
    actions: {
        ask: function () {
            var self = this,
                user = self.get('session.store').restore();

            self.store.find('member', user.id).then(function(member) {
                var newRecord = self.store.createRecord('question', {
                    user: member,
                    questionText: self.get('questionText'),
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