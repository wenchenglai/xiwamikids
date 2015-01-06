App.Tip = DS.Model.extend({
    creator: DS.belongsTo('member'),
    //discussions: DS.hasMany('discussion'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    previewText: DS.attr('string'),
    previewImage: DS.attr('string'),
    url: DS.attr('string'),
    createdDate: DS.attr('date'),
    expiredDate: DS.attr('date'),
    like: DS.attr('number'),
    type: DS.attr('string'),
    viewCount: DS.attr('number'),
    isDeleted: DS.attr('boolean')
});