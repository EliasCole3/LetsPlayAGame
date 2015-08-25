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
  // var smallWorld = new constructors.World(12, 12, "world1");
  var smallWorld = new constructors.World(15, 15, "world2");
  // var smallWorld = new constructors.World(12, 12, "world3");
  
  //add a table to the webpage that represents the world 
  smallWorld.showWorld();
  
  
  //write out to dev console
  // console.log(smallWorld);
  // console.log(largeWorld);
  
  // smallWorld.getWorld();

});

//all the constructors
var constructors = {
  
  World: function(height, width, type) {
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
      var array2d = new Array(this.height);
      
      for(var i = 0; i < array2d.length; i++) {
        array2d[i] = new Array(this.width);
      }
      
      this.world = array2d;
    };
    
    this.getWorld = function() {
    };
    
    this.showWorld = function() {
      
      var ranNum = 0;
      for(var i = 0; i < this.height; i++) {
        for(var j = 0; j < this.width; j++) {

          if( i > height - 3) {
            this.world[i][j] = new constructors.Rock("normal", "#");
          }
            else if( j < width && ranNum == 1) {
              this.world[i][j] = new constructors.Fish("Betta", "G");
            }
            else {
            this.world[i][j] = new constructors.Water("water", " ");
          }

          
        }
        ranNum = Math.floor((Math.random() * 3) + 1);



      }
        
      var htmlString = "";
      htmlString += "<table>";
      
      
      
      this.world.forEach(function(column) {
        htmlString += "<tr>";
        // console.log(column);
        // console.log(typeof column);
        column.forEach(function(obj) {
          htmlString += "<td class='world-cell'>" + obj.worldCharacter + "</td>";
        });
        htmlString += "</tr>";
      });
      
      htmlString += "</table>";
      $("#put-world-here").html(htmlString);
    };
    

    
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