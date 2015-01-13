App.FeedbackCommentComponent = Ember.Component.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('commentText'));
    }.property('commentText'),
    didInsertElement: function () {
        var controller = this;
    },
    actions: {
        add: function (fbId) {
            this.sendAction('addNewComment', fbId, this.get('commentText'));
        },
        close: function (fbId) {
            this.sendAction('closeNewComment', fbId);
        }
    }
});