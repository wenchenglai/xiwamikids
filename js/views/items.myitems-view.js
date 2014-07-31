App.ItemsMyitemsView = Ember.View.extend({
    didInsertElement: function () {
        var self = this;
        this.$("#dialog-confirm-delete").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    $(this).dialog("close");
                    self.get('controller').send('deleteItem', id);
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