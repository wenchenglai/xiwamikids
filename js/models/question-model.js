App.Question = DS.Model.extend({
    user: DS.attr('string'),
    questionText: DS.attr('string'),
    createdDate: DS.attr('date'),
    answers: DS.hasMany('answer', { embedded: 'always' })
});