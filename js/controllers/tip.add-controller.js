App.TipAddController = Ember.ObjectController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),

    _getPreviewFromServer: function (url, options) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            options = options || {};

            options.success = function (data) {
                Ember.run(null, resolve, data);
            };

            options.error = function (jqxhr, status, something) {
                Ember.run(null, reject, arguments);
            };

            Ember.$.ajax(url, options);
        });
    },

    actions: {
        close: function () {
            var record = this.get('model');
            if (record.get('id')) {
                if (record.get('isDirty')) {
                    record.rollback();
                }
            } else {
                record.deleteRecord();
            }

            return this.send('closeAddModal', false);
        },
        add: function (params) {
            var self = this,
                fromModel = this.get('model'),
                url = fromModel.get('url').toLowerCase();

            if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
                fromModel.set('url', "http://" + url);
            }

            fromModel.save().then(function (record) {
                self.send('closeAddModal', true);

            }, function (error) {
                // deal with the failure here
                debugger;
            });
        },
        preview: function (params) {
            var self = this,
                host = self.store.adapterFor('application').get('host'),
                url = self.get('url');

            self._getPreviewFromServer(host + '/tips/findURL?url=' + url, {
                type: "GET",
                contentType: "application/json"
            }).then(function (data) {
                if (data) {
                    self.set('previewText', data.text);
                }
            });
        }
    }
});