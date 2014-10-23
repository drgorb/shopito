Template.itemsList.helpers(
   {
      itemObject: function() {
         return ShoppingListItem.findOne({_id: this.item})
      }
   }
)
Template.itemsList.events(
   {
      "click .addItem": function(evt, template) {
         var itemIndex = _(_(template.data.list.items).pluck("item")).indexOf(this._id);
         if(itemIndex >= 0) {
            var query = {};
            query["items." + itemIndex + ".quantity"] = 1;
            ShoppingList.update({_id: template.data.list._id}, {$inc: query})
         } else {
            ShoppingList.update({_id: template.data.list._id}, {$push: {items: {item: this._id, quantity: 1}}})
         }

      },
      "click .removeItem": function(evt, template) {
         var itemIndex = _(_(template.data.list.items).pluck("item")).indexOf(this._id);
         if(itemIndex >= 0) {
            var query = {};
            if(template.data.list.items[itemIndex].quantity > 1){
               query["items." + itemIndex + ".quantity"] = -1;
               ShoppingList.update({_id: template.data.list._id}, {$inc: query})
            } else {
               ShoppingList.update({_id: template.data.list._id}, {$pull: {items: {item: this._id}}})
            }
         }

      }
   }
)