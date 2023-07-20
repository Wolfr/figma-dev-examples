
async function loadFonts() {
    await Promise.all([
        figma.loadFontAsync({
            family: "Inter",
            style: "Regular"
        }),
    ])
}


loadFonts().then(() => {


  // Put the layer name underneath a selection
  figma.currentPage.selection.forEach((node) => {

      const height = node.absoluteBoundingBox.height;
      const width = node.absoluteBoundingBox.width;
      // Relative because we might be in a frame 
      const x = node.relativeTransform[0][2]
      const y = node.relativeTransform[1][2]
      const text = figma.createText()
      text.characters = node.name

      const parent = node.parent
      const group = figma.group([text, node], parent)
      group.name = node.name + 'wrapper'
      text.y = height + y + 20
      text.x = x
      // This little trickery is because a text might be a bit longer than an icon typically
      text.resize(width + 40, 1)
      text.x = text.x - 20
      text.textAlignHorizontal = "CENTER"
      text.textAutoResize = 'HEIGHT'

  });
  
  figma.closePlugin();



});



