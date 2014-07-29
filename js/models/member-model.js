﻿App.Member = DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    birthday: DS.attr('springdate'),
    languages: DS.attr('raw'),
    type: DS.attr('string'),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    family: DS.belongsTo('family'),
    isUser: DS.attr('boolean'),
    facebookId: DS.attr('string'),
    imageData: DS.attr('string'),
    //male: function () {
    //    return this.get('gender') == 'Male';
    //}.property('gender'),
    avartarHostUrl: function () {
        return this.store.adapterFor('application').get('host') + '/assets/img/' + this.get('avatarUrl');
    }.property('avatarUrl'),
    birthYear: function() {
        return new Date(this.get('birthday')).getFullYear();
    }.property('birthday'),
    birthMonth: function () {
        return new Date(this.get('birthday')).getMonth() + 1;
    }.property('birthday'),
    birthDayNumber: function () {
        return new Date(this.get('birthday')).getDate();
    }.property('birthday')
});