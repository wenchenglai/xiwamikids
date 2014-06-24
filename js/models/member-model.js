App.RawTransform = DS.Transform.extend({
    deserialize: function (serialized) {
        return serialized;
    },
    serialize: function (deserialized) {
        return deserialized;
    }
});

App.Member = DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    birthday: DS.attr('date'),
    //languages: DS.attr('raw'),
    type: DS.attr('string'),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    family: DS.belongsTo('family'),
    isUser: DS.attr('boolean'),
    facebookId: DS.attr('string'),
    male: function () {
        return this.get('gender') == 'Male';
    }.property('gender')
});