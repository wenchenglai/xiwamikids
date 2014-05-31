App.ActivityMyView = Ember.View.extend({
    didInsertElement: function () {
        //debugger;
        var view = this;
        this.$("#dialog-confirm-delete").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    debugger;
                    $(this).dialog("close");
                    view.get('controller').send('deleteActivity', id);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    actions: {
        openDeleteDialog: function (id) {
            $("#dialog-confirm-delete").data('id', id).dialog("open");
        }
    }
});