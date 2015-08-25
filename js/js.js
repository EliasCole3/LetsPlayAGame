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

  //create a world with a height of 12 and a width of 12
  var smallWorld = new constructors.World(12, 12, "world1");;
  
  //fill the world with entities
  smallWorld.fillWorld();
  
  //add a table to the webpage that represents the world 
  smallWorld.showWorld();

});

//all the constructors
var constructors = {
  
  World: function(height, width, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    
    this.createWorld = function() {
      var array2d = new Array(this.height);
      
      for(var i = 0; i < array2d.length; i++) {
        array2d[i] = new Array(this.width);
      }
      
      this.world = array2d;
    };
    
    this.showWorld = function() {
      var htmlString = "";
      htmlString += "<table>";

      this.world.forEach(function(column) {
        htmlString += "<tr>";
        column.forEach(function(obj) {
          htmlString += "<td class='world-cell'>" + obj.worldCharacter + "</td>";
        });
        htmlString += "</tr>";
      });
      
      htmlString += "</table>";
      $("#put-world-here").html(htmlString);
    };
    
    this.fillWorld = function() {
      var ranNum = 0;
      for(var i = 0; i < this.height; i++) {
        for(var j = 0; j < this.width; j++) {

          if(i > height - 3 && i < height -1 && j < width -1) {
            this.world[i][j] = new constructors.Rock("normal", "#");
          } else if(i < height - 2 && j < width - 1 && j < width && ranNum == 1) {
            this.world[i][j] = new constructors.Fish("Betta", "G");
          } else {
            this.world[i][j] = new constructors.Water("water", " ");
          }

          ranNum = helpers.getRandomInt(1, 10);
        }
      }
    };

    //initialize the world when it's created
    this.createWorld();
  },
  
  Water: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    
  },
  
  Fish: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    
    //swim method for the fish constructor
    this.swim = function() {
      
    };
    
  },

  Rock: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.rockColor = function() {
      
    };
  },
  
  Bubble: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    
    //method of bubble rising to surface
    this.bubbleFloat = function() {
      
    };
    
    //animation of the bubble popping
    this.bubblePop = function() {
      
    };
  },
  
  Kelp: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    
    //How high the kelp will grow
    this.Height = function() {
      
    };
    
    //How much the kelp with sway back and forth
    this.sway = function() {
      
    };
  },
  
}; //end of constructors

var helpers = {
  
  /**
   *  Returns a random integer between min (inclusive) and max (inclusive)
   */ 
  getRandomInt: function(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  },
  
};