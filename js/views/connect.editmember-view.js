App.ConnectEditmemberView = Ember.View.extend({
    didInsertElement: function () {       
        //this.get('controller').get('model').notifyPropertyChange('birthday');
    },
    actions: {
        close: function () {
            return this.sendAction();
        }
    }
});