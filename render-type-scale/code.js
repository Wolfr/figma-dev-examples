const textElementData = [
  { characters: 'Heading 1', fontSize: 32, fontFamily: 'Inter', fontStyle: 'Bold' },
  { characters: 'Heading 2', fontSize: 24, fontFamily: 'Inter', fontStyle: 'Semi Bold' },
  { characters: 'Heading 3', fontSize: 20, fontFamily: 'Inter', fontStyle: 'Semi Bold' },
  { characters: 'Heading 4', fontSize: 16, fontFamily: 'Inter', fontStyle: 'Semi Bold' },
  { characters: 'Body 1', fontSize: 16, fontFamily: 'Inter', fontStyle: 'Regular' },
  { characters: 'Body 2', fontSize: 14, fontFamily: 'Inter', fontStyle: 'Regular' },
  { characters: 'Quote', fontSize: 14, fontFamily: 'Inter', fontStyle: 'Italic' },
];

const fontConfigs = [...new Set(textElementData.map(item => ({ family: item.fontFamily, style: item.fontStyle })))];

// We load the fonts into Figma for usage
const fontPromises = fontConfigs.map((fontConfig) =>
  figma.loadFontAsync(fontConfig).catch(error => Promise.reject(error))
);

// Now when the fonts have loaded, we push our text styles
Promise.all(fontPromises)
  .then(() => {
    let globalY = 0;

    textElementData.forEach((data) => {
      createTextElement(data);
    });

    function createTextElement({ characters, fontSize, fontFamily, fontStyle }) {
      const text = figma.createText();
      text.characters = characters;
      text.fontSize = fontSize;
      text.fontName = { family: fontFamily, style: fontStyle };
      globalY = globalY + fontSize + 12;
      text.y = globalY;
    }
  })
  .catch(error => {
    figma.notify('Error loading fonts:' + error);
    // Handle the error here or propagate it further
  }).then(() => {
    figma.closePlugin()
  });
