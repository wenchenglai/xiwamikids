App.ItemsMyitemsController = Ember.ArrayController.extend({
    sortProperties: ['price', 'name'],
    sortAscending: false,
    ageRange: function () {
        debugger;
        return this.get('fromAge') + ' to ' + this.get('toAge');
    }.property('@each.fromAge', '@each.toAge'),

    totalPrice: function () {
        var longSongs = this.filter(function (song) {
            return song.get('price') > 0;
        });
        return longSongs.get('length');
    }.property('@each.price'),

    actions: {
        loadOpen: function () {
            var data = this.store.find('item', { status: 'Open' });
            this.set('content', data);
        },
        loadClosed: function (params) {
            var data = this.store.find('item', { status: 'Closed' });
            this.set('content', data);
        },
        loadDeleted: function(params) {
            var data = this.store.find('item', {status: 'Deleted'});
            this.set('content', data);
        }
    }
});