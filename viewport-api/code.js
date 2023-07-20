let centerX = figma.viewport.center.x
console.log("center X is " + centerX)
let centerY = figma.viewport.center.y
console.log("center Y is " + centerY)

let x = figma.viewport.bounds.x
console.log("x bounds is " + x)
let y = figma.viewport.bounds.y
console.log("y bounds is " + y)
let viewportWidth = figma.viewport.bounds.width
console.log("viewportWidth is " + viewportWidth)
let viewportHeight = figma.viewport.bounds.height
console.log("viewportHeight is " + viewportHeight)

figma.closePlugin()