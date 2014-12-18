App.Question = DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    createdDate: DS.attr('date'),
    isSolved: DS.attr('boolean'),
    status: DS.attr('string'),
    like: DS.attr('number'),
    answers: DS.hasMany('answer', { embedded: 'always' })
});