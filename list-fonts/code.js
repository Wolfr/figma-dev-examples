figma.listAvailableFontsAsync().then(fonts => {
  figma.notify('Look in your dev console.')
  console.log(fonts)
  for (const font of fonts) {
    if (font.fontName.family === 'My Font' && font.fontName.style === 'Regular') {
      figma.loadFontAsync(font.fontName)
        .then(() => {
          console.log('Font loaded successfully');
        })
        .catch(error => {
          console.error('Failed to load font:', error);
        });
    }
  }
}).then(() => {
  figma.closePlugin();
}).catch(error => {
  console.error('Failed to retrieve available fonts:', error);
});