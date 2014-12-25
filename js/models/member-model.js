﻿App.Member = DS.Model.extend({
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    nickName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    birthday: DS.attr('springdate'),
    languages: DS.attr('raw'),
    type: DS.attr('string'),
    gender: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    largePicture: DS.attr('string'),
    smallPicture: DS.attr('string'),
    family: DS.belongsTo('family'),
    isUser: DS.attr('boolean'),
    facebookId: DS.attr('string'),
    highSchool: DS.attr('string'),
    college: DS.attr('string'),
    fhometown: DS.attr('string'),
    flink: DS.attr('string'),
    flocale: DS.attr('string'),
    flocation: DS.attr('string'),
    ftimezone: DS.attr('number'),
    zipCode: DS.attr('string'),
    isDeleted: DS.attr('boolean'),

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
    }.property('birthday'),

    displayName: function() {
        if (this.get('nickName'))
            return this.get('nickName');
        else if (this.get('firstName'))
            return this.get('firstName');
        else
            return '';
    }
});