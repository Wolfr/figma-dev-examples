function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

// Usage: setColor(node, [r,g, b])
function setColor(node, rgbColor) {
    const fills = clone(node.fills)
    fills[0].color.r = rgbColor[0]/255
    fills[0].color.g = rgbColor[1]/255
    fills[0].color.b = rgbColor[2]/255
    node.fills = fills
}

const text = figma.createText()

figma.loadFontAsync(text.fontName).then(() => {
    text.characters = 'Username'
    text.x = 60
    text.y = 0
})

const text2 = figma.createText()
text2.characters = 'Meta • meta • meta'
text2.x = 60
text2.y = 20
text2.opacity = .5

const rect = figma.createRectangle()
rect.resize(290,1)
rect.name = "Divider"
rect.x = 50
rect.y = 50

const parent = figma.currentPage
const group = figma.group([text,rect], parent)

const circle = figma.createEllipse()
circle.resize(40, 40)
setColor(circle, [50,50,50])

group.appendChild(text2)
group.appendChild(circle)
