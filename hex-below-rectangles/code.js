// Make sure *everyhing* is a top level frame/rect before running this.

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    const red = componentToHex(Math.round(r * 255)).toUpperCase();
    const green = componentToHex(Math.round(g * 255)).toUpperCase();
    const blue = componentToHex(Math.round(b * 255)).toUpperCase();
    return "#" + red + green + blue;
}
 
for (const node of figma.currentPage.selection) {
    
    const r = node.fills[0].color.r;
    const g = node.fills[0].color.g;
    const b = node.fills[0].color.b;
    const hex = rgbToHex(r, g, b);

    const height = node.absoluteBoundingBox.height;
    const width = node.absoluteBoundingBox.width;
    const x = node.absoluteBoundingBox.x;
    const y = node.absoluteBoundingBox.y;

    let text = figma.createText()
    text.x = x;
    text.y = y + height + 5;

    figma.loadFontAsync(text.fontName).then(() => {
        text.characters = hex
    })

    
}