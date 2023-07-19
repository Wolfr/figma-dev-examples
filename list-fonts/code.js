figma.listAvailableFontsAsync().then(fonts => {
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
}).catch(error => {
  console.error('Failed to retrieve available fonts:', error);
});
