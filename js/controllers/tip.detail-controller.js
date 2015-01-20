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

        addNewFeedback: function () {
            var self = this,
                user = self.get('session.user'),
                fromModel = self.get('model'),
                newObj = self.store.createRecord('feedback', {
                    creator: user,
                    parent: fromModel.get('id'),
                    parentType: 'tip',
                    createdDate: new Date(),
                    description: self.get('feedbackText'),
                    viewCount: 0,
                    likeCount: 0,
                    isDestroyed: false
                });


            newObj.save().then(function (data) {
                self.send('refresh');

            }, function (error) {
                // deal with the failure here
                debugger;
            });
        },

        addNewComment: function (fbId, commentText) {

            var self = this,
                user = self.get('session.user');

            self.store.find('feedback', fbId).then(function(feedback) {
                var newObj = self.store.createRecord('feedback', {
                    creator: user,
                    parent: fbId,
                    createdDate: new Date(),
                    description: commentText,
                    viewCount: 0,
                    likeCount: 0,
                    isDestroyed: false
                });

                newObj.save().then(function (data) {
                    var comments = feedback.get('comments');
                    comments.addObject(data);
                    self.send('refresh');
                }, function (error) {
                    // deal with the failure here
                    debugger;
                });
            });
        },

        closeNewComment: function (fbId) {
            Ember.$('*[data-id=' + fbId + ']').addClass("collapse");
        },

        openNewCommentUI: function (fbId) {
            Ember.$('*[data-id=' + fbId + ']').removeClass("collapse");
        }

    }
});