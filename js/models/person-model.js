App.Person = DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    birthday: DS.attr('date'),
    languages: DS.attr(),
    type: DS.attr(),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    family: DS.belongsTo('family'),
    createdDate: DS.attr('date'),
    male: function () {
        return this.get('gender') == 'Male';
    }.property('gender')
});