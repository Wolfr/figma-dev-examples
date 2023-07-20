// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 420, height: 580, title: 'Icon lib' });

function processSVG({ icon, color, size }) {

  const colorRegex = /fill="#333333"/g;
  const colorString = `fill="${color}"`;

  const sizeRegex = /width="24" height="24"/g;
  const sizeString = `width="${size}" height="${size}"`
    
  return icon.replace(colorRegex, colorString).replace(sizeRegex, sizeString);
}

let color = '#333';
let size = 20;

// Set a global X, so that when you place a new icon, they don't go on top of each other
let globalX = 0

figma.ui.onmessage = (msg) => {
    
  if (msg.type === 'changeColour') {
    color = msg.color
  }

  if (msg.type === 'changeSize') {
    size = parseInt(msg.size)
  }

  if (msg.type === 'sendIndividualIcon') {

    const icon = msg.icons[msg.index].svg;
    const name = msg.icons[msg.index].name;

    const renderedIcon = figma.createNodeFromSvg(processSVG({ icon, size, color }));
    renderedIcon.name = name;

    globalX += size
    renderedIcon.x = globalX

    figma.viewport.scrollAndZoomIntoView([renderedIcon])
    // Zoom in a bit cuz icons tend to be small
    if (size < 100) {
      figma.viewport.zoom = 3
    }

  }
};
