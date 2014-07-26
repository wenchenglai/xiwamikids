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