function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function createMyRectangle(rgbColor, width, height, x, y) {
    const rect = figma.createRectangle()

    const fills = clone(rect.fills)

    fills[0].color.r = rgbColor[0]/255
    fills[0].color.g = rgbColor[1]/255
    fills[0].color.b = rgbColor[2]/255
    
    rect.fills = fills

    rect.resize(width,height)
    rect.x = x
    rect.y = y
}

createMyRectangle([255,125,250], 50, 50, 0, 0 )
createMyRectangle([125,110,250], 50, 50, 0, 50 )