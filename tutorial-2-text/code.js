function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

async function loadFonts() {
    await Promise.all([
        figma.loadFontAsync({
            family: "Inter",
            style: "Regular"
        }),
        figma.loadFontAsync({
            family: "Inter",
            style: "Bold"
        }),
        figma.loadFontAsync({
            family: "Inter",
            style: "Medium"
        })
    ])
}

// Usage: setColor(node, [65,111,181])
function setColor(node, rgbColor) {
    const fills = clone(node.fills)
    fills[0].color.r = rgbColor[0]/255
    fills[0].color.g = rgbColor[1]/255
    fills[0].color.b = rgbColor[2]/255
    node.fills = fills
}

loadFonts().then(() => {

    const text = figma.createText()
    text.characters = 'Heading 1'
    text.fontSize = 32
    text.fontName = { family: "Inter", style: "Bold" } 

    const text2 = figma.createText()
    text2.characters = 'Heading'
    text2.fontSize = 24
    text2.fontName = { family: "Inter", style: "Medium" } 
    text2.y += 42

    const body = figma.createText()
    body.characters = 'Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    body.fontSize = 14
    body.fontName = { family: "Inter", style: "Regular" } 
    body.y += 76
    body.resize(400,1)
    body.textAutoResize = 'HEIGHT'

    const link = figma.createText()
    link.characters = 'My link'
    link.fontSize = 14
    link.fontName = { family: "Inter", style: "Regular" } 
    link.y += 220
    link.textDecoration = "UNDERLINE"
    setColor(link, [65,111,181])

    figma.closePlugin();
});

