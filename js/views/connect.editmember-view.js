App.ConnectEditmemberView = Ember.View.extend({
    didInsertElement: function () {       
        //this.get('controller').get('model').notifyPropertyChange('birthday');
        var gender = this.get('controller').get('gender');
        if (gender) {
            var selector = 'div[name=selectionFemale]';
            if (gender === "male") {
                selector = 'div[name=selectionMale]';
            }

            if (!Em.$(selector).hasClass('active')) {
                Em.$(selector).addClass('active');
            }
        }
    },
    actions: {
        close: function () {
            return this.sendAction();
        }
    }
});