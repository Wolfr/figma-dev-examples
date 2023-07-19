// By default, notifications will show after each other, with 2000ms delay?
figma.notify('Hey, this figlet is meant to teach you about the notification API')

figma.notify('You can use the notification API to send notifications to users.')

// You could make it go faster with a timeout
figma.notify('You can', { timeout: 500})
figma.notify('use the ', { timeout: 500})
figma.notify('timeout option', { timeout: 500})
figma.notify('to make things', { timeout: 500})
figma.notify('go a bit faster', { timeout: 500})
figma.notify('(or slower...)', { timeout: 2500})

figma.notify('⚠️ You can also display an error', { error: true})

// function myAlert() {
//     console.log('hey my action')
// }

// figma.notify('(or slower)', { button: 'text', action: myAlert })

