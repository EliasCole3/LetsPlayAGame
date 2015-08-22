/*

Ideas
---------------------------
Create a border
Fill with random rocks
Fill in Fish.swim()
Add collision detection

*/

//when the page loads
$(function() {

  //create a world with a width of 12 and a height of 12
  var smallWorld = new constructors.World(12, 12, "world1");
  // var smallWorld = new constructors.World(12, 12, "world2");
  // var smallWorld = new constructors.World(12, 12, "world3");
  
  //add a table to the webpage that represents the world 
  smallWorld.showWorld();
  
  var largeWorld = new constructors.World(15, 15, "notsoBlah");
  
  //write out to dev console
  // console.log(smallWorld);
  // console.log(largeWorld);
  
  // smallWorld.getWorld();

});

//all the constructors
var constructors = {
  
  World: function(width, height, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    
    //this should be a switch statement
    if(type === "world1") {
      this.worldFillCharacter = "#";
    }
    if(type === "world2") {
      this.worldFillCharacter = "$";
    }
    if(type === "world3") {
      this.worldFillCharacter = ":D";
    }
    
    
    this.createWorld = function() {
      var array2d = new Array(this.width);
      
      for(var i = 0; i < array2d.length; i++) {
        array2d[i] = new Array(this.height);
      }
      
      this.world = array2d;
    };
    
    this.getWorld = function() {
      console.log("World: " + this.width + " " + this.height);
    };
    
    this.showWorld = function() {
      for(var i = 0; i < this.width; i++) {
        for(var j = 0; j < this.height; j++) {
          this.world[i][j] = this.worldFillCharacter;
        }
      }
      
      var htmlString = "";
      htmlString += "<table>";
      
      this.world.forEach(function(column) {
        htmlString += "<tr>";
        column.forEach(function(cell) {
          htmlString += "<td class='world-cell'>" + cell + "</td>";
        });
        htmlString += "</tr>";
      });
      
      htmlString += "</table>";
      $("#put-world-here").html(htmlString);
    };
    
    
    this.createWorld();
  },
  
  Fish: function(type) {
    this.type = type;
    
    //swim method for the fish constructor
    this.swim = function() {
      
    };
    
  },

  Rock: function(type) {
    this.type = type;
  }
  
  
}; //end of constructors

var helpers = {
  
  /**
   *  Returns a random integer between min (inclusive) and max (inclusive)
   */ 
  getRandomInt: function(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  },
  
};