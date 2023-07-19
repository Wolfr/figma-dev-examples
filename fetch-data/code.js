let data;

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


async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
    const json = await response.json();
    data = json;
    return data;
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

function renderContent() {

  // Data from JSON placeholder
  console.log(data);

  // A title
  console.log(data.title);

  // An image
  console.log(data.thumbnailUrl);

  const image = figma.createImageAsync(data.thumbnailUrl).then(async (image) => {
    // Create a rectangle that's the same dimensions as the image.
    const node = figma.createRectangle();
    const { width, height } = await image.getSizeAsync();
    node.resize(width, height);
    // Render the image by filling the rectangle.
    node.fills = [
      {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL',
      },
    ];
    return node
  }).then((node) => {

    console.log(node.height)
    const body = figma.createText()
    body.characters = 'Body'
    body.fontSize = 14
    body.fontName = { family: "Inter", style: "Regular" }
    body.y += node.height + 20
    body.resize(node.width,1)
    body.textAutoResize = 'HEIGHT'

  }).then(() => {
    figma.closePlugin();
  });


}

async function initialize() {
  await loadFonts();
  await fetchData();
  renderContent();
}

initialize();
