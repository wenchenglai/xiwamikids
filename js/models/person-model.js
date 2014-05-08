App.RawTransform = DS.Transform.extend({
    deserialize: function (serialized) {
        return serialized;
    },
    serialize: function (deserialized) {
        return deserialized;
    }
});

App.Person = DS.Model.extend({
    facebookId: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    birthday: DS.attr('date'),
    languageArray: DS.attr('raw'),
    type: DS.attr('number'),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    family: DS.belongsTo('family'),
    createdDate: DS.attr('date'),
    male: function () {
        return this.get('gender') == 'Male';
    }.property('gender')
});