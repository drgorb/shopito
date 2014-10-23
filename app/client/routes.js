Router.map(function() {
   this.route("shoppingList", {
      path: "/shopping-list/:_id",
      template: "itemsList",
      data: function () {
         return {
            list: ShoppingList.findOne({_id: this.params._id}),
            items: ShoppingListItem.find()
         }
      },
      waitOn: function(){
         return [Meteor.subscribe("shopping-lists", this.params._id), Meteor.subscribe("list-items")];
      }
   });

   this.route('generic', {
      template: "shoppingLists",
      path: '/*',
      data: function () {
         return ShoppingList.find()
      },
      waitOn: Meteor.subscribe("shopping-lists")
   });

});