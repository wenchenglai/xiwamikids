App.QuestionAskRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('question');
    }
});