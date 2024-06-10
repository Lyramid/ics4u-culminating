//Initialize the kaboom library
kaboom({ 
    width: 500, 
    height: 500,
    canvas: document.getElementById("gameCanvas"), 
    background: [243, 255, 162],
    stretch: false,
    letterbox: false,
});

//Load Assets:
loadSprite("man", "blank-pfp.png");
loadSprite("mc", "blue-square.png");
loadSprite("slime", "blue-slime.png", {
    sliceX: 1,
    sliceY: 1,
});
loadSprite("adventurer", "grey-square.png");

//All Scenes:
//Game scenes
scene("lvl1", () =>{
    
    loadShop();
    
    wait(2, ()=> {
        destroyAll("closedDoor")
        addAdv()
        
    })




});

//Main page
scene("main-page", ()=>{

    add([
        pos(width()/2, height()/3),
        rect(width()*2/3, height()/2),
        area(),
        anchor("center"),
        //color(17,42,70),
        outline(4),
    ]);

    add([
        pos(width()/2, height()/3),
        text("Slime Frontier"),
        anchor("center"),
        //color(17,42,70),
        color(0,0,0),
    ]);

    addButton("Play", vec2(width()/2, height()-160), () => go("lvl1"));
    addButton("Level Select", vec2(width()/2, height()-100), () => go("level-select"));
    addButton("Credits", vec2(width()/2, height()-40), () => go("credits"));
});

//Credits page
scene("credits", () =>{
    add([
        pos(width()/2,height()/4),
        text("Leo Lao 2024", {
            //width:500,
            size:50,
        }),
        anchor("center"),
        outline(4),
        color(0,0,0),
    ])

    addButton("Back", vec2(width()/2, height()-100), () => go("main-page"));
});

//Level Select page
scene("level-select", () => {
    addButton("Back", vec2(width()/2, height()-100), () => go("main-page"));
});
//Inital page load
go("main-page");

//Functions:
//Adds a button with parameter of text contained, position, function that happens when clicked
function addButton(txt, p, f) {
    // add a parent background object
    const btn = add([
        rect(240, 40, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
    ])
    // add a child object that displays the text
    btn.add([
        text(txt),
        anchor("center"),
        color(0, 0, 0),
    ])
    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
        btn.color = hsl2rgb(0.6, 0.7, 0.8)
        btn.scale = vec2(1.2)
        setCursor("pointer")
    })
    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
        btn.scale = vec2(1)
        btn.color = rgb()
    })
    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f);

    return btn
}//End of make button function

//Loads the shop with the shelves, door, counter, and mc
function loadShop(){
    // the playable character
    const mc = add([
        sprite("mc"),
        pos(width()/2, height()-25),
        anchor("center"),
        area(),
        body(),
    ])
    //left shelf outer part
    add([
        rect(50,height()-200),
        pos(0,100),
        color(205, 138, 45),
        area(),
        body({isStatic: true}),
        "shelf",
    ]);
    //left shelf inner part
    add([
        rect(30,height()-220),
        pos(10,110),
        color(117, 79, 26),
        area(),
        body({isStatic: true}),
        "shelf",
    ]);
    //right shelf outer part
    add([
        rect(50,height()-200),
        anchor("topright"),
        pos(width(),100),
        color(205, 138, 45),
        area(),
        body({isStatic: true}),
        "shelf",
    ]);
    //right shelf inner part
    add([
        rect(30,height()-220),
        anchor("topright"),
        pos(width()-10,110),
        color(117, 79, 26),
        area(),
        body({isStatic: true}),
        "shelf",
    ]);
    //open door 
    add([
        rect(100, 50),
        anchor("top"),
        pos(width()/2,0),
        color(128, 211, 214),
        "openDoor",
    ]);
    //closed door
    add([
        rect(100, 50),
        anchor("top"),
        pos(width()/2,0),
        color(135, 13, 13),
        "closedDoor",
    ]);
    //door knob
    add([
        circle(6),
        color(0,0,0),
        pos(width()/2 +30, 25),
        "closedDoor",
    ]);
    //store counter or table
    add([
        rect(width()/2, 40),
        anchor("center"),
        pos(width()/2, height()-70),
        color(132, 104, 57),
        area(),
        body({ isStatic: true}),
        "table",
    ]);
}//End of loadShop function

//Loads an adventurer at the door
function addAdv(){
    add([
        sprite("adventurer"),
        pos(width()/2, 16),
        anchor("center"),
        area(),
        body({isStatic: true}),
    ]);
}//End of addAdv function
