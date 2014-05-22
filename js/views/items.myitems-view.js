App.ItemsMyitemsView = Ember.View.extend({
    didInsertElement: function () {
        debugger;
        this.$("#dialog-confirm-delete").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    $(this).dialog("close");
                    controller.sendAction('delete', id);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    actions: {
        openDeleteDialog: function (params) {
            debugger;
            this.$("#dialog-confirm-delete").dialog("open");
        }
    }
});