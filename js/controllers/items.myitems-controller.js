App.ItemsMyitemsController = Ember.ArrayController.extend({
    sortProperties: ['price', 'name'],
    sortAscending: false,
    //ageRange: function () {
    //    debugger;
    //    return this.get('fromAge') + ' to ' + this.get('toAge');
    //}.property('@each.fromAge', '@each.toAge'),

    totalPrice: function () {
        var longSongs = this.filter(function (song) {
            return song.get('price') > 0;
        });
        return longSongs.get('length');
    }.property('@each.price'),

    actions: {
        loadOpen: function () {
            var self = this;
            var user = self.get('session.store').restore();
            self.store.find('item', { status: 'Open', seller : user.id }).then(function(records) {
                self.set('content', records);
            });
        },
        loadClosed: function (params) {
            var self = this;
            var user = self.get('session.store').restore();
            self.store.find('item', { status: 'Closed', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        },
        loadDealt: function(params) {
            var self = this;
            var user = self.get('session.store').restore();
            self.store.find('item', { status: 'Dealt', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        }
    }
});