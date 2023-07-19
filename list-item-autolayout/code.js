// This example generates a typical card item using a nested auto layout.

const icons = [
  { name: "chevron-right",
 svg: '<svg width="$size$" height="$size$" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z" fill="#333333"/></svg>' },
]

function processSVG({icon, color, size}) {
  return icon.replace(/\$size\$/g, size).replace(/\$color\$/g, color)
}

const longContent = true

// First we load some fonts
async function loadFonts() {
    await Promise.all([
        figma.loadFontAsync({
            family: "Inter",
            style: "Regular"
        }),
        figma.loadFontAsync({
            family: "Inter",
            style: "Medium"
        })
    ])
}

function setPaddingAllSides(node, value) {
  node.paddingLeft = value
  node.paddingRight = value
  node.paddingTop = value
  node.paddingBottom = value
}

loadFonts().then(() => {

    // Make sure to provide networkAccess in your manifest fill to via.placeholder.com!
    const images = [
        'http://via.placeholder.com/120x120',
    ]

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * images.length);

    const remoteImage = figma.createImageAsync(images[randomIndex]).then(async (remoteImage) => {
      // First we load the image because the source is on a remote URL

      // Create a rectangle that's the same dimensions as the image.
      const avatar = figma.createRectangle();
      const { width, height } = await remoteImage.getSizeAsync();
      avatar.resize(40, 40)
      avatar.name = 'Avatar'
      avatar.cornerRadius = 100

      // Render the image by filling the rectangle.
      avatar.fills = [
        {
          type: 'IMAGE',
          imageHash: remoteImage.hash,
          scaleMode: 'FILL',
        },
      ];

      return avatar

    }).then((avatar) => {

      // We set up type for our title
      // @idea can we use one of our generated styles here?

      const title = figma.createText()
      title.characters = 'My title'
      title.fontSize = 16
      title.fontName = { family: "Inter", style: "Medium" }


      // We set up meta items, that wrap
      // @idea can we use one of our generated type styles here?
      
      const textMetaFrame = figma.createFrame()
      textMetaFrame.layoutMode = "HORIZONTAL";
      textMetaFrame.itemSpacing = 8;
      textMetaFrame.name = 'Meta items'
      textMetaFrame.primaryAxisSizingMode = "FIXED";
      textMetaFrame.counterAxisSizingMode = "AUTO";
      textMetaFrame.layoutWrap = "WRAP"

      for (let metaCount = 0; metaCount < 8; metaCount++) {
        const strings = [
            'My string',
            'Another string',
            'Yet another string'
        ]
        const randomString = Math.floor(Math.random() * strings.length);
        const textMeta = figma.createText()
        textMeta.characters = 'Meta'
        if (longContent) {
          textMeta.characters = strings[randomString]
        }
            
        textMeta.opacity = .5
        textMetaFrame.appendChild(textMeta)
      
      }

      const textFrame = figma.createFrame();
      textFrame.name = 'Text wrapper'

      // Append our children
      textFrame.appendChild(title)
      textFrame.appendChild(textMetaFrame)

      // Set up auto layout for the text frame, containing our two text nodes
      textFrame.itemSpacing = 4;

      textFrame.layoutMode = "VERTICAL";
      textFrame.primaryAxisSizingMode = "AUTO";
      textFrame.counterAxisSizingMode = "AUTO";

      title.layoutAlign = "STRETCH"
      textMetaFrame.layoutAlign = "STRETCH"
      textFrame.layoutGrow = 1

      textFrame.clipsContent = false;
      textFrame.fills = [{type : "SOLID", color: { r: 1, g: 1, b: 1, }}];

      const chevron = figma.createNodeFromSvg(processSVG({ icon: icons[0].svg, size: 20 }))
      chevron.name = 'chevron'

      const contentFrame = figma.createFrame()

      // Append our children
      contentFrame.appendChild(avatar)
      contentFrame.appendChild(textFrame)

      contentFrame.layoutMode = "HORIZONTAL"
      contentFrame.name = 'Content frame'
      contentFrame.layoutGrow = 1
      contentFrame.counterAxisAlignItems = "MIN"
      contentFrame.itemSpacing = 12;
      contentFrame.primaryAxisSizingMode = "AUTO";
      contentFrame.fills = [{type : "SOLID", color: { r: 1, g: 1, b: 1 }}];
      contentFrame.counterAxisSizingMode = "AUTO"

      // Could also be figma.createComponent() and behavior would be similar
      const listItem = figma.createFrame()
      listItem.name = 'List item'
      listItem.resize(390, 1)

      // Append our children
      listItem.appendChild(contentFrame)
      listItem.appendChild(chevron)

      listItem.layoutMode = "HORIZONTAL"
      listItem.primaryAxisSizingMode = "FIXED";
      listItem.counterAxisAlignItems = "CENTER"
      listItem.itemSpacing = 12;

      setPaddingAllSides(listItem, 16)
      listItem.fills = [{type : "SOLID", color: { r: 1, g: 1, b: 1 }}];
      listItem.counterAxisSizingMode = "AUTO"

    })

});
