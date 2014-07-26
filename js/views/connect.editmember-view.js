App.ConnectEditmemberView = Ember.View.extend({
    didInsertElement: function () {
        //var m = this.get('controller').get('model');
        //debugger;
        //var ss = m.toString();
    },
    actions: {
        close: function () {
            return this.sendAction();
        }
    }
});