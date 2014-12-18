App.QuestionAskController = Ember.ObjectController.extend({
    disabled: function() {
        return Ember.isEmpty(this.get('title'));
    }.property('title'),
    asked: false,
    actions: {
        ask: function () {
            var self = this,
                userPromise = self.get('session.userAccount');

            userPromise.then(function (user) {
                self.store.find('member', user.id).then(function (member) {
                    var newRecord = self.store.createRecord('question', {
                        creator: member,
                        title: self.get('title'),
                        description: self.get('description'),
                        createdDate: new Date(),
                        status: 'Open',
                        isSolved: false
                    });

                    newRecord.save().then(function (record) {
                        self.set("asked", true);
                    }, function (error) {
                        debugger;
                    });
                });
            });
        }
    }
});