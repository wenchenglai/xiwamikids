App.ActivityMapView = Ember.View.extend({
    _loadGoogleMapAPI: function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeP3_CXS8nFzbOqFUZDzqQfvbV2UJuZdU&v=3.exp&' + 'callback=initialize';
        document.body.appendChild(script);
    },
    didInsertElement: function () {
        this._loadGoogleMapAPI();

        //function initialize() {
        //    var mapOptions = {
        //        center: new google.maps.LatLng(-34.397, 150.644),
        //        zoom: 8
        //    };
        //    var map = new google.maps.Map(document.getElementById("map-canvas"),
        //        mapOptions);
        //}
        ////google.maps.event.addDomListener(window, 'load', initialize);
        //initialize();
    },
    action: {
        editmember: function (params) {
            debugger;
            this.$("#dialog-form").dialog("open");
        },
        addkid: function (params) {
            debugger;
        }
    }
});