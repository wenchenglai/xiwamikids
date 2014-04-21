App.Person = DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    email: DS.attr('string'),
    birthday: DS.attr('date'),
    languages: DS.attr(),
    type: DS.attr(),
    family: DS.belongsTo('family')
});