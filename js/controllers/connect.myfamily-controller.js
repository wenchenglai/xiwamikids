App.ConnectMyfamilyController = Ember.ObjectController.extend({
    //years: function() {
    //    var currentYear = new Date().getFullYear();
    //    return this.getEnumeration(currentYear - 6, currentYear);
    //}.property(),

    //months: function() {
    //    return this.getEnumeration(1, 12);
    //}.property(),

    //days: function () {
    //    return this.getEnumeration(1, 31);
    //}.property(),

    //getEnumeration: function(start, length) {
    //    var array = [];
    //    for (var i = start; i <= length; ++i) {
    //        array.push(i);
    //    }
    //    return array;
    //},
    //firstName: "",
    //lastName: "",
    //gender:"",
    //languages: ['English', 'Chinese', 'Russian'],

    //disabled: function () {
    //    //return Ember.isEmpty(this.get('firstName'));
    //    // I have to return false all the time for now, until I figure out how to update DOM using ember automatically when computed property got changed.
    //    return false;
    //}.property('firstName'),

    //currentContact: null,
    //init: function () {
    //    this._super();
    //    var controller = this;
    //    //$(document).delegate('.modal', 'hidden', function () {
    //    //    controller.get('currentContact.transaction').rollback();
    //    //});
    //},
    //doSomething: function() {
    //    // some custom stuff

    //}.on('init'),

    //families: null,

    //actions: {
    //    editmember: function () {
    //        debugger;
    //        $("#dialog-form").dialog("open");
    //    },
    //    showmodal: function () {
    //        var newp = Em.Object.create({});
    //        this.set('currentContact', newp);
    //        $('#dialog-form').dialog("open");
    //    }
    //}
});