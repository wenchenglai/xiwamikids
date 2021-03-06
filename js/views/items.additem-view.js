﻿App.ItemsAdditemView = Ember.View.extend({
    didInsertElement: function () {
        //this.get('controller').get('model').notifyPropertyChange('birthday');
        var selector,
            type,
            condition,
            status;

        type = this.get('controller').get('type');
        if (type) {
            selector = 'div[name=' + type + ']';

            if (!Em.$(selector).hasClass('active')) {
                Em.$(selector).addClass('active');
            }
        }

        condition = this.get('controller').get('condition');
        if (condition) {
            selector = 'div[name=' + condition + ']';

            if (!Em.$(selector).hasClass('active')) {
                Em.$(selector).addClass('active');
            }
        }

        status = this.get('controller').get('status');
        if (status) {
            selector = 'div[name=' + status + ']';

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