//Initialize the kaboom library
kaboom({ 
    width: 500, 
    height: 500,
    canvas: document.getElementById("gameCanvas"), 
    font: "comic-sans",
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

//All Scenes:
//Game scene
scene("game", () =>{
    const mc = add([
        sprite("mc"),
        pos(250, 250),
        area(),
        body(),
    
    ])
    
    add([
        sprite("slime"),
        pos(0, 0),
        area({scale: 0.3, offset: 4}),
        scale(7),
        //body(),
    ])
});

//Main page
scene("main-page", ()=>{

    addButton("Play", vec2(width()/2, height()-200), () => go("game"));
    addButton("Level Select", vec2(width()/2, height()-140), () => go("level-select"));
    addButton("Credits", vec2(width()/2, height()-80), () => go("credits"));
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

