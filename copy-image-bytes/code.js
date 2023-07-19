// Select an image to test this
async function copyBytes(node) {
    let didFindImage = false
    for (const paint of node.fills) {
        if (paint.type === 'IMAGE') {
            didFindImage = true
            const image = figma.getImageByHash(paint.imageHash)
            const bytes = await image.getBytesAsync()
            console.log(bytes)
        }
    }
    if(!didFindImage) {
        figma.notify("No image fill found on selected layer")
    }
}

if( figma.currentPage.selection.length == 0 ) {
    figma.notify("Please select an item first before running the command")
}

if( figma.currentPage.selection.length > 1 ) {
    figma.notify("One item at a time, please")
}

// Select an image
copyBytes(figma.currentPage.selection[0])