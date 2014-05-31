App.ActivityMyController = Ember.ArrayController.extend({
    sortProperties: ['date', 'title'],
    sortAscending: false,

    actions: {
        loadUpcoming: function () {
            var data = this.store.find('activity');
            this.set('content', data);
        },
        loadPast: function (params) {
            var data = this.store.find('activity');
            this.set('content', data);
        },
        loadDeleted: function (params) {
            var data = this.store.find('activity', {isDeleted: true});
            this.set('content', data);
        }
    }
});