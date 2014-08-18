App.ActivityMapView = Ember.View.extend({
    didInsertElement: function () {
        function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(-34.397, 150.644),
                zoom: 8
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
        }
        //google.maps.event.addDomListener(window, 'load', initialize);
        initialize();
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