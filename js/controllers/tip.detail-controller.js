App.TipDetailController = Ember.ObjectController.extend({
    actions: {
        like: function () {
            var self = this,
                fromModel = self.get('model'),
                like = fromModel.get('like');

            fromModel.set('like', like + 1);
            fromModel.save();
        },

        back: function () {
            this.transitionTo('tip.browse');
        },

        postReview: function () {
            var self = this,
                user = self.get('session.user'),
                fromModel = self.get('model'),
                newObj = self.store.createRecord('discussion', {
                    creator: user,
                    entity: fromModel.get('id'),
                    entityType: 'tip',
                    createdDate: new Date(),
                    description: self.get('discussion'),
                    isDeleted: false
                });


            newObj.save().then(function (data) {
                self.send('refresh');

            }, function (error) {
                // deal with the failure here
                debugger;
            });
        }
    }
});