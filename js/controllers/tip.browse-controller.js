App.TipBrowseController = Ember.ArrayController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('description'));
    }.property('description')
});