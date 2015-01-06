App.Discussion = DS.Model.extend({
    creator: DS.belongsTo('member'),
    entity: DS.attr('string'),
    entityType: DS.attr('string'),
    createdDate: DS.attr('date'),
    description: DS.attr('string'),
    star: DS.attr('number'),
    like: DS.attr('number'),
    viewCount: DS.attr('number'),
    isDeleted: DS.attr('boolean')
});