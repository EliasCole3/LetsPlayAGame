/*

Ideas
---------------------------
Create a border
Fill with random rocks
Fill in Fish.swim()
Add collision detection
Add sound to bubbles popping
Add some prototypes for inheritance
Create an api that more semantically determines the probability distributions
Multiple objects should be able to be in the same space
Abstract out moving from one cell to another

slow down movement
restrict fish movement to cardinal directions
Add alternate view layer that uses images
Refactor everything

*/


var smallWorld;

//when the page loads
$(function() {
 
  //create a world with a height of 12 and a width of 12
  smallWorld = new constructors.World(15, 20, "world1");
  
  //fill the world with entities
  smallWorld.fillWorld();
  
  //add a table to the webpage that represents the world 
  smallWorld.showWorld();
  
  $("#tick").click(function() {
    smallWorld.tick();
    smallWorld.showWorld();
    $("#frames-passed").text(smallWorld.framesPassed);
  });
  
  $("#go").click(function() {
    var speed = $("#speed").val();
    setInterval(function() {
      smallWorld.tick();
      smallWorld.showWorld();
      $("#frames-passed").text(smallWorld.framesPassed);
    }, speed);
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
    
    this.fillWorld = function() {
      var ranNum = 0;
      var _this = this;
      var fillPositionWithObject = function fillPositionWithObject(options) {
        var x = options.x;
        var y = options.y;
        
        // example default parameter
        // var width = options.width || 50;
        
        switch(options.type) {
          case "Surface":
           _this.world[y][x] = new constructors.Surface("Surface", "<img src='images/surface.jpg' width='50' height='50'>");
           break;
           
          case "Rock": 
            _this.world[y][x] = new constructors.Rock("Rock", "<img src='images/rock.jpg' width='50' height='50'>");
            break;
           
          case "Water": 
            _this.world[y][x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>"); 
            break;
            
          case "BubbleRock": 
            _this.world[y][x] = new constructors.BubbleRock("Gen", "<img src='images/bubblerock.jpg' width='50' height='50'>", x, y);
            break;
            
          case "Fish1": 
            _this.world[y][x] = new constructors.Fish("Fish", "<img src='images/fish1.jpg' width='50' height='50'>", x, y);
            break;
            
          case "Fish2": 
            _this.world[y][x] = new constructors.Fish("Fish", "<img src='images/fish2.jpg' width='50' height='50'>", x, y);
            break;
            
          case "Bubble": 
            _this.world[y][x] = new constructors.Bubble("bubble", "<img src='images/bubble.png' width='50' height='50'>", x, y);
            break;
            
          case "Shark": 
            _this.world[y][x] = new constructors.Shark("Shark", "<img src='images/shark.png' width='50' height='50'>", x, y);
            break;

          default:
            _this.world[y][x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>"); 
        }
        
      }
      
      //for each object in the world
      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          
          //console.log("x: " + x + ", y: " + y)

          // left border
          if(x === 0) {
            fillPositionWithObject({type: "Rock", x: x, y: y});
            
          // right border
          } else if(x === this.width - 1) {
            fillPositionWithObject({type: "Rock", x: x, y: y});
            
          // top border
          } else if(y === 0) {
            fillPositionWithObject({type: "Surface", x: x, y: y});
            
          // bottom border
          } else if(y === this.height - 1) {
            fillPositionWithObject({type: "Rock", x: x, y: y});
            
          // everything in the middle
          } else {
            fillPositionWithObject({type: "Water", x: x, y: y});
          }
          
        }
      }
      
      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          if(ranNum < 10 && y === this.height - 2 && this.world[y][x].type !== "Rock" ) {
            fillPositionWithObject({type: "BubbleRock", x: x, y: y});
          // if (this.world[y][x - 2] !== "BubbleRock" && count < 3 && y === this.height - 2 && this.world[y][x].type !== "Rock") {
            // console.log(this.world[y][x -2])
            // fillPositionWithObject({type: "BubbleRock", x: x, y: y});
          ranNum = helpers.getRandomInt(1, 100);
            }  

        }
      }
      

      //for each object in the world
      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          
          var obj =  _this.world[y][x];
          
          // if object is water
          if(obj.type === "Water") {
            
            //defined random chance of water turning into something else
            if(ranNum < 2) {
              fillPositionWithObject({type: "Fish1", x: x, y: y});
            } else if(ranNum >= 3 && ranNum < 5) {
              fillPositionWithObject({type: "Fish2", x: x, y: y});
            // } else if(ranNum >= 20 && ranNum < 40) {
                
            } else {
              // do nothing, object is already water
            }
            
          }
          
          if(x === 6 && y === 6) {
            fillPositionWithObject({type: "Shark", x: x, y: y});
          }

          ranNum = helpers.getRandomInt(1, 100);
        }
      }
            
    }; //end of fillWorld()
    
    
    
    
    this.showWorld = function() {
      var htmlString = "";
      htmlString += "<table>";
      
      this.world.forEach(function(row) {
        htmlString += "<tr>";
        row.forEach(function(obj) {
          htmlString += "<td class='world-cell'>" + obj.worldCharacter + "</td>";
        });
        htmlString += "</tr>";
      });
      
      htmlString += "</table>";
      $("#put-world-here").html(htmlString);
    };
    
    this.tick = function() {
    //for every movable object in the world, activate it's movement

    // var movables = ["fish", "bubble", "kelp"];
    var movables = ["Bubble", "Fish", "Gen", "Shark"];
    
    //loop through the world
    for(var i = 0; i < this.height; i++) {
      for(var j = 0; j < this.width; j++) {
        var obj = this.world[i][j];
        
        //if it comes across something that matches the movables,
        //return 0, 1, or 2, or -1 if not found
        if(movables.indexOf(obj.type) !== -1) {
          
          if(obj.status === "dead") {
            
            this.world[i][j] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", j, i);
            
          } else if(obj.type === "Gen") {
            
            //for more realistic bubbles, the second parameter should be higher
            var ranNum = helpers.getRandomInt(1, 2); 
            
            obj.spawnBubble(this.world, ranNum, j, i);
            
          } else {
            
            if(obj.type === "Shark") {
              obj.interact(this.world);
            } else {
              obj.move(this.world);
            }
            
            
          }
          
        }
        
      }
    }
    
    this.framesPassed++;
  };

    //initialize the world when it's created
    this.createWorld();
  },
  
  Bubble: function(type, worldCharacter, x, y) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = x;
    this.y = y;
    this.animationCount = 1;
    this.status = "";

    //method of bubble rising to surface
    this.bubbleFloat = function() {
      
    };
    
    //animation of the bubble popping
    this.pop = function() {
      this.worldCharacter = "<img src='images/bubblepop.jpg' width='50' height='50'>";
    };
    
    this.move = function(world) {
      
      if(this.worldCharacter === "<img src='images/bubblepop.jpg' width='50' height='50'>") {
        this.animationCount--;
      }
      
      if(this.animationCount === 0) {
        this.status = "dead";
        return;
      }
      
      //if the object isn't looking outside of the world
      if(this.y-1 >= 0) {
        var aboveType = world[this.y-1][this.x].type;
        
        //if the space above the bubble is empty
        //@todo: dear god this looks horrific
        if(aboveType === "Water") {
          var randNum = helpers.getRandomInt(1, 20);
          if(randNum === 1) {
            this.pop();
          }
          
          //remove the water above the bubble //necessary?
          delete world[this.y-1][this.x];
          
          //set the empty cell above to this bubble
          world[this.y-1][this.x] = this;
          
          //fill the old cell with a new water
          world[this.y][this.x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", this.x, this.y);
          
          //adjust the internal bubble location
          this.y--;
        } else if (aboveType === "Surface") {
          this.pop();
        } else { //something other than bubbles and water

          //randomly try the top left or top right positions
          var rand = helpers.getRandomInt(1, 2)

          if(rand === 1) { //try the left first
            if(world[this.y-1][this.x-1].type === "Water") {
              world[this.y-1][this.x-1] = this;
              world[this.y][this.x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", this.x, this.y);
              this.y--;
              this.x--;
            } else if(world[this.y-1][this.x+1].type === "Water") {
              world[this.y-1][this.x+1] = this; // e.g. world[1][15]
              world[this.y][this.x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", this.x, this.y);
              this.y--;
              this.x++;
            } else {
              //all three spots above the bubble are full, do nothing
            }
          } else { //try the right first
            if(world[this.y-1][this.x+1].type === "Water") {
              world[this.y-1][this.x+1] = this;
              world[this.y][this.x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", this.x, this.y);
              this.y--;
              this.x++;
            } else if(world[this.y-1][this.x-1].type === "Water") {
              world[this.y-1][this.x-1] = this;
              world[this.y][this.x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", this.x, this.y);
              this.y--;
              this.x--;
            } else {
              //all three spots above the bubble are full, do nothing
            }
          }
          
          
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
  
  Surface: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.status = "";

  },
  
  Fish: function(type, worldCharacter, xValue, yValue) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = xValue;
    this.y = yValue;
    // var x = this.x;
    // var y = this.y;
    this.movementCounter = 0;
    
    this.status = "";
    
    
    
    //swim method for the fish constructor
    this.swim = function() {
      
    };

    this.move = function(world) {
      
      if(this.movementCounter === 4) {
        var x = this.x;
        var y = this.y;
        
        //if the object isn't looking outside of the world
        if(y-1 >= 0) {
          var destinationX = helpers.getRandomInt(x - 1, x + 1);
          var destinationY = helpers.getRandomInt(y - 1, y + 1);
          if(destinationX === 0) destinationX = 5;
          if(destinationY === 0) destinationY = 5;
          
          
          // for dev
          // console.log("Fish")
          // console.log(world)
          // console.log("x: " + x)
          // console.log("y: " + y)
          // console.log("destinationY: " + destinationY)
          // console.log("destinationX: " + destinationX)
          // console.log("world[destinationY][destinationX].type: " + world[destinationY][destinationX].type)
          // console.log("------------------------------")
          
          // var destinationType = world[destinationX][destinationY].type;
          var destinationType = world[destinationY][destinationX].type;

          //if the destination doesn't equal the origin
          if(!(x === destinationX && y === destinationY)) {
            switch(destinationType) {
              case "Water":
              
                //abstract this out
                delete world[destinationY][destinationX];
                world[destinationY][destinationX] = this;
                world[y][x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", x, y);
                
                //adjust the internal bubble location
                this.x = destinationX;
                this.y = destinationY;
                var x = this.x;
                var y = this.y;
                
                break;
              case "Bubble":
              
                break;
              case "Fish":
              
                break;
              default:
              
            }
          }
        }
        this.movementCounter = 0;
      } else {
        this.movementCounter++;
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
    this.status = "";
    
    this.getLocationString = function() {
      return "x: " + this.x + ", y: " + this.y; 
    };
  },

  Rock: function(type, worldCharacter) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.status = "";
    this.rockColor = function() {
      
    };
  },
  
  BubbleRock: function(type, worldCharacter, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.worldCharacter = worldCharacter;
    this.status = "";
    this.animationCount = 2;
    this.spawnBubble = function(world, ranNum, x, y) {

      // for dev
      // console.log("BubbleRock")
      // console.log(world)
      // console.log(this.y-1)
      // console.log(this.x)
      // console.log(ranNum)
      // console.log("------------------------------")
      
      var aboveType = world[this.y-1][this.x].type;
      // var aboveType = world[this.x][this.y-1].type;
      if(aboveType === "Water" && ranNum === 1) {
        world[y - 1][x] = new constructors.Bubble("Bubble", "<img src='images/bubble.png' width='50' height='50'>", x, y - 1);
      }
      else{
      }
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
  
  Shark: function(type, worldCharacter, xValue, yValue) {
    this.type = type;
    this.worldCharacter = worldCharacter;
    this.x = xValue;
    this.y = yValue;
    this.movementCounter = 0;
    
    this.status = "";
    
    this.interact = function(world) {
      
      if(this.fishIsNearby()) {
        
      } else {
        this.move(world)
      }
      
      //check to see if there's a fish nearby
      //if there is
        //move to eat
        
        
        
        
      //move to eat
        //change movement speed
        //get direction towards fish
        //move towards fish
    },
    
    this.fishIsNearby = function(world) {
      var leftUp = {
        x: this.x - 2,
        y: this.y - 2
      }
      var rightUp = {
        x: this.x + 2, 
        y: this.y - 2
      }
      var leftDown = {
        x: this.x - 2, 
        y: this.y + 2
      }
      var rightDown = {
        x: this.x + 2, 
        y: this.y + 2
      }
      for(var i = leftUp.x; i <= rightUp.x; i++) {
        for(var j = leftUp.y; j <= leftDown.y; j++) {
          console.log(i + ", " + j)
        }
        
      }

      // var rightUp = world[this.x + 2][this.y + 2];
      return false;
    },

    this.move = function(world) {
      var x = this.x;
      var y = this.y;
      
      if(this.movementCounter === 4) {
        
        //if the object isn't looking outside of the world
        if(y-1 >= 0) {
          var destinationX = helpers.getRandomInt(x - 1, x + 1);
          var destinationY = helpers.getRandomInt(y - 1, y + 1);
          if(destinationX === 0) destinationX = 5;
          if(destinationY === 0) destinationY = 5;

          var destinationType = world[destinationY][destinationX].type;

          //if the destination doesn't equal the origin
          if(!(x === destinationX && y === destinationY)) {
            switch(destinationType) {
              case "Water":
              
                //abstract this out
                delete world[destinationY][destinationX];
                world[destinationY][destinationX] = this;
                world[y][x] = new constructors.Water("Water", "<img src='images/water.jpg' width='50' height='50'>", x, y);
                
                //adjust the internal bubble location
                this.x = destinationX;
                this.y = destinationY;
                var x = this.x;
                var y = this.y;
                
                break;
              case "Bubble":
              
                break;
              case "Fish":
              
                break;
              default:
              
            }
          }
        }
        this.movementCounter = 0;
      } else {
        this.movementCounter++;
      }
      
    };

     this.getLocationString = function() {
      return "x: " + this.x + ", y: " + this.y; 
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