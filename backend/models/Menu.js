var Menu = function(_id, _label, _desc){
  this.id = _id;
  this.label = _label;
  this.description = _desc;
  this.dishes = [];
  this.beverages = [];
}

module.exports = Menu;
