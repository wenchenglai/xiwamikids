App.RawTransform = DS.Transform.extend({
    deserialize: function (serialized) {
        return serialized;
    },
    serialize: function (deserialized) {
        return deserialized;
    }
});

App.SpringdateTransform = DS.Transform.extend({
    deserialize: function (serialized) {
        if (serialized) {
            return moment(serialized).toDate();
        }
        return serialized;
    },

    serialize: function (deserialized) {
        if (deserialized) {
            return moment(deserialized.toISOString()).format('YYYY/MM/DD');
        }
        return deserialized;
    }
});

// 2014-12-09 Array type
// from http://stackoverflow.com/questions/12168570/how-to-represent-arrays-within-ember-data-models

App.ArrayTransform = DS.Transform.extend({
    deserialize: function (serialized) {
        return (Ember.typeOf(serialized) == "array")
            ? serialized
            : [];
    },

    serialize: function (deserialized) {
        var type = Ember.typeOf(deserialized);
        if (type == 'array') {
            return deserialized
        } else if (type == 'string') {
            return deserialized.split(',').map(function (item) {
                return jQuery.trim(item);
            });
        } else {
            return [];
        }
    }
});

//App.register("transform:array", DS.ArrayTransform);