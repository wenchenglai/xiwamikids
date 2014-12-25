App.Like = DS.Model.extend({
    creator: DS.belongsTo('member'),
    likeObject: DS.attr('string'),
    type: DS.attr('string')
});