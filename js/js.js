/*

Ideas
---------------------------
Create a border
Fill with random rocks
Fill in Fish.swim()
Add collision detection
Add sound to bubbles popping
Add some prototypes for inheritance

*/

//when the page loads
$(function() {

  //create a world with a height of 12 and a width of 12
  var smallWorld = new constructors.World(12, 12, "world1");;
  
  //fill the world with entities
  smallWorld.fillWorld();
  
  //add a table to the webpage that represents the world 
  smallWorld.showWorld();
  
  $("#go").click(function() {
    smallWorld.tick();
    smallWorld.showWorld();
    $("#frames-passed").text(smallWorld.framesPassed);
  });
  
  

});

//all the constructors
var constructors = {
  
  World: function(height, width, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.framesPassed = 0;
    
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
          // } else if(i < height - 2 && j < width - 1 && j < width && ranNum == 1) {
            // this.world[i][j] = new constructors.Bubble("bubble", "o", j, i);
          // } else if(i < height - 2 && j < width - 1 && j < width && ranNum == 2) {
            // this.world[i][j] = new constructors.Fish("fish", "f", j, i);
          } else {
            this.world[i][j] = new constructors.Water("water", " ", j, i);
          }
          
          //hardcoded bubble for testing
          // if(i === 5 && j === 5) {
            // this.world[i][j] = new constructors.Bubble("bubble", "o", j, i);
          // }

          //hardcoded fish for testing
          if(i === 5 && j === 5) {
            this.world[i][j] = new constructors.Fish("fish", "f", j, i);
          }

          ranNum = helpers.getRandomInt(1, 30);
        }
      }
    };
    
  this.tick = function() {
    //for every movable object in the world, activate it's movement
    
    console.log(this.world);
    
    // var movables = ["fish", "bubble", "kelp"];
    var movables = ["bubble", "fish"];
    
    for(var i = 0; i < this.height; i++) {
      for(var j = 0; j < this.width; j++) {
        if(movables.indexOf(this.world[i][j].type) !== -1) {
          this.world[i][j].move(this.world);
        }
      }
    }
    
    
    this.framesPassed++;
  };

    //initialize the world when it's created
    this.createWorld();
    console.log(this.world);
  },
  
  Bubble: function(type, worldCharacter, x, y) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = x;
    this.y = y;

    //method of bubble rising to surface
    this.bubbleFloat = function() {
      
    };
    
    //animation of the bubble popping
    this.pop = function() {
      this.worldCharacter = "pop!";
    };
    
    this.move = function(world) {
      
      //if the object isn't looking outside of the world
      if(this.y-1 >= 0) {
        var aboveType = world[this.y-1][this.x].type;
        
        //if the space above the bubble is empty
        //@todo: dear god this looks horrific
        if(aboveType === "water") {
          
          //remove the water above the bubble //necessary?
          delete world[this.y-1][this.x];
          
          //set the empty cell above to this bubble
          world[this.y-1][this.x] = this;
          
          //fill the old cell with a new water
          world[this.y][this.x] = new constructors.Water("water", " ", this.x, this.y);
          
          //adjust the internal bubble location
          this.y--;
        } else if (aboveType === "bubble") {
          this.pop();
        } else {
          //something other than bubbles and water
        }
      } else if(this.y-1 === -1) {
        this.pop();
      } else {
        //this shouldn't happen
      }
      
     
    };
    
    this.getLocationString = function() {
      return "x: " + this.x + ", y: " + this.y; 
    };
  },
  
  Fish: function(type, worldCharacter, xValue, yValue) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = xValue;
    this.y = yValue;
    var x = this.x;
    var y = this.y;
    
    //swim method for the fish constructor
    this.swim = function() {
      
    };

    this.move = function(world) {
      
      //if the object isn't looking outside of the world
      if(this.y-1 >= 0) {
        
        console.log("x: " + x);
        console.log("y: " + y);
        
        for(var i = 0; i < 20; i++) {
          console.log(helpers.getRandomInt(x - 1, x + 1));
          console.log(helpers.getRandomInt(y - 1, y + 1));
        }
        
        
        var destinationX = helpers.getRandomInt(x - 1, x + 1);
        var destinationY = helpers.getRandomInt(y - 1, y + 1);
        var destinationType = world[destinationY][destinationX].type;

        //if the destination doesn't equal the origin
        if(!(x === destinationX && y === destinationY)) {
          
          switch(destinationType) {
            case "water":
            
              //abstract this out
              delete world[destinationY][destinationX];
              world[destinationY][destinationX] = this;
              world[y][x] = new constructors.Water("water", " ", x, y);
              
              //adjust the internal bubble location
              this.x = destinationX;
              this.Y = destinationY;
              
              break;
            case "bubble":
            
              break;
            case "fish":
            
              break;
            default:
            
          }
          
          
          
        }
        
      }
      
    };

     this.getLocationString = function() {
      return "x: " + this.x + ", y: " + this.y; 
    };  
        
  },
  
  Water: function(type, worldCharacter, x, y) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = x;
    this.y = y;
    
    this.getLocationString = function() {
      return "x: " + this.x + ", y: " + this.y; 
    };
  },

  Rock: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.rockColor = function() {
      
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
    
    this.move = function() {
      
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