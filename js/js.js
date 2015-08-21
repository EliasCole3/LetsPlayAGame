/*

Ideas
---------------------------
Create a border
Fill with random rocks
Fill in Fish.swim()
Add collision detection

*/

$(function() {

  var smallWorld = new constructors.World(12, 12);
  
  // smallWorld.getWorld();
  
  // console.log(smallWorld.world[0][5]);

});



var constructors = {
  
  World: function(width, height) {
      this.width = width;
      this.height = height;
      this.createWorld();
  },
  
  Fish: function(type) {
    this.type = type;
  },

  Rock: function(type) {
    this.type = type;
  },

};

(function() {
  
  constructors.World.prototype.getWorld = function() {
    console.log("World: " + this.width + " " + this.height);
  };

  constructors.World.prototype.createWorld = function() {
    var array2d = new Array(this.width);
    
    for(var i = 0; i < array2d.length; i++) {
      array2d[i] = new Array(this.height);
    }
    
    this.world = array2d;
  };
  
  constructors.Fish.prototype.swim = function() {
    //??
  };
  
})();

var helpers = {
  
  /**
   *  Returns a random integer between min (inclusive) and max (inclusive)
   */ 
  getRandomInt: function(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  },
  
};