// this creates the class for the 2 walls that I use to hide the planes once they move
let wall = class {

//this constructs the factors for the boxs
    constructor(name, height, width, depth){
        this.name = name;
        this.height = height;
        this.width = width;
        this.depth = depth;
    }
    // this builds the xyz factors that can be editied for each of the individual walls
    build(x, y, z,){


// this creates the box variable
    var box = BABYLON.MeshBuilder.CreateBox("box", {height: 400, width: 0.5, depth: 200}, scene);

// I used multiple color variables so that i could have the walls match the backround no matter the lighting
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
myMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.99);
myMaterial.specularColor = new BABYLON.Color3(0.5, 0.8, 0.99);
myMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.8, 0.99);
myMaterial.ambientColor = new BABYLON.Color3(0.5, 0.8, 0.99);
myMaterial.maxSimultaneousLights = 0;

   box.material = myMaterial;
// creates the xyz position variables
    box.position.y = y;
    box.position.x = x;
    box.position.z = z;
    }

};

// creates the new walls
let leftwall = new wall('leftwall', 5, 2, 3);
let rightwall = new wall('rightwall',5, 2, 3);

console.log(wall);




var canvas = document.getElementById("renderCanvas");



var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}
// creates the names for the variables later
let animation1
let animation2
let animation3

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
   
    var scene = new BABYLON.Scene(engine);
// changes the backround color
scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.99);
// builds the walls
leftwall.build(-52.5, -2.5, 1);
rightwall.build(47.5, -2.5, 1);



// creates the variable for the rotatable camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, -25, new BABYLON.Vector3(0, 0, 0), scene);
// sets the position of the rotatabel camera
    camera.setPosition(new BABYLON.Vector3(0.5, 3, -25));
// attaches the camera to the canvas
    camera.attachControl(canvas, true);
  // creates the light that will only affect the model of my character
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(10, 5, -1), scene);
    
// sets the lights beginning intensity
    light.intensity = 1;
    

// adds the function for keyboard variables to the sketch, along with setting the events for the specific keys of w and s
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                switch (kbInfo.event.key) {
                    case "w":
                    case "W":
                        light.intensity -= 0.1;
                    break
                    case "s":
                    case "s":
                        light.intensity += 0.1;

                }
            break;
        }
    });






// had to use gld for my blender model since obj woudnt load the textures
placeGlb('./', 'character_model.glb', scene);
// importing an obj model from a site called modelers resource that has models from different games
var plate = placeObject('./', 'plate.obj',
new BABYLON.Vector3(-2.5, -2.5, 1), scene, 1,
new BABYLON.Vector3(0, 3.14, 0));

//places the imported object
placeObject('plate');






// the var mats create the material for the planes which are the different phases of the drawing of my character
var mat1 = new BABYLON.StandardMaterial("");
    mat1.diffuseTexture = new BABYLON.Texture("IMG-5810.jpg");

    var f1 = new BABYLON.Vector4(0,0, 1, 1);
// creates the planes that I use
    var plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {frontUVs: f1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, size: 15, width: 15, height: 15});
    plane1.material = mat1;

// moves the planes to their positions
    plane1.position.y = 2;
    plane1.position.x = -1;
    plane1.position.z = -5.2;


var mat2 = new BABYLON.StandardMaterial("");
    mat2.diffuseTexture = new BABYLON.Texture("IMG-5812.jpg");

    var f2 = new BABYLON.Vector4(0,0, 1, 1);  

    var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", {frontUVs: f2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, size: 15, width: 15, height: 15});
    plane2.material = mat2;


    plane2.position.y = 2;
    plane2.position.x = -1;
    plane2.position.z = -5.1;

var mat3 = new BABYLON.StandardMaterial("");
    mat3.diffuseTexture = new BABYLON.Texture("IMG-5814.jpg");

    var f3 = new BABYLON.Vector4(0,0, 1, 1);

    var plane3 = BABYLON.MeshBuilder.CreatePlane("plane3", {frontUVs: f3, sideOrientation: BABYLON.Mesh.DOUBLESIDE, size: 15, width: 15, height: 15});
    plane3.material = mat3;


    plane3.position.y = 2;
    plane3.position.x = -1;
    plane3.position.z = -5;




// variables for the positions of each of the planes once the animation plays
    var move_plane1 = {obj: plane1, prop: 'position', val: new BABYLON.Vector3(-60, 2, -5.2), dims: ['x', 'y', 'z']};
    var move_plane2 = {obj: plane2, prop: 'position', val: new BABYLON.Vector3(60, 2, -5.1), dims: ['x', 'y', 'z']};
    var move_plane3 = {obj: plane3, prop: 'position', val: new BABYLON.Vector3(-60, 2, -5), dims: ['x', 'y', 'z']};






// creates the variables for the type of animation being played
     var  animation1 = [];
    animation1.push(move_plane1);

    var  animation2 = [];
    animation2.push(move_plane2);

    var  animation3 = [];
    animation3.push(move_plane3);

// number of clicks become part of an array of each of the animations, the clicks each activate one of the animations down the array
    let clicks = 0;
let animations = [animation1, animation2, animation3];
var anim = document.getElementById('renderCanvas').addEventListener('click',
function(){
            animate(animations[clicks], scene, 2);
clicks++; 

        });





    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
// function sent to me from profesor to load in the model as a glb file
function placeGlb(folder, file,  scene){
    let load = BABYLON.SceneLoader.ImportMesh(
        null,
         folder,
        file,
        scene,
        function (meshes) {
           for (const mesh of meshes) {
         
            if(wrap_color){
                var mat = new BABYLON.StandardMaterial("material", scene);
                mat.diffuseColor = wrap_color;
                mesh.material = mat;
            }
       
           }


    });

}