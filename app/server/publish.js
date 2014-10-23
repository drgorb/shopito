Meteor.publish("shopping-lists", function () {
   if (this.userId)
      return ShoppingList.find(
         {
            $or: [
               {owner: this.userId},
               {shared: true}
            ]
         }
      )
});

Meteor.publish("list-items", function () {
   return ShoppingListItem.find();
})

Meteor.methods(
   {
      seedProducts: function () {
         ShoppingListItem.remove({});
         var items = [
            {name: "Beure"}, {name: "Lait"}, {name: "Chocolat"}, {name: "Pain"}, {name: "Jambon"}
         ]
         _(items).each(function (item) {
            ShoppingListItem.insert(item);
         })
      }
   })