App.ItemsMyitemsView = Ember.View.extend({
    didInsertElement: function () {
        //debugger;
        var controller = this;
        this.$("#dialog-confirm-delete").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    $(this).dialog("close");
                    debugger;
                    controller.sendAction('deleteItem', id);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    actions: {
        openDeleteDialog: function (id) {
            debugger;
            $("#dialog-confirm-delete").data('id', id).dialog("open");
        }
    }
});