App.IndexRoute = Ember.Route.extend({
    model: function () {
        //console.log('Welcome!  Fetching your information.... ');
        //FB.api('/me', function (response) {
        //    debugger;

        //    console.log('Good to see you, ' + response.name + '.');
        //});
        //debugger;
        //var userID = "625848591";

        //FB.api('/625848591/feed', function (response) {
        //    debugger;
        //    console.log('feeds ');
        //});
        return ['red', 'yellow', 'blue'];
    }
});