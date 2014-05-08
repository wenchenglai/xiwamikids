App.ConnectMyfamilyView = Ember.View.extend({
    didInsertElement: function () {
        var controller = this.get('controller');
        this.$("#dialog-edit-form-family").dialog({
            autoOpen: false,
            height: 350,
            width: 500,
            modal: true
            //buttons: {
            //    "Edit Family": function () {
            //        var bValid = true;

            //        if (bValid) {

            //            $(this).dialog("close");
            //        }
            //    },
            //    Cancel: function () {
            //        $(this).dialog("close");
            //    }
            //},
            //close: function () {

            //}
        });

        this.$("#dialog-form").dialog({
            autoOpen: false,
            height: 450,
            width: 700,
            modal: true
            //buttons: {
            //    "Add new member": function () {
            //        controller.send('addkid', 11);
            //        $(this).dialog("close");
            //    },
            //    Cancel: function () {
            //        $(this).dialog("close");
            //    }
            //},
            //close: function () {
                
            //}
        });

        this.$("#dialog-confirm").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete all items": function () {
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
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