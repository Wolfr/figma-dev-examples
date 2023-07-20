async function myNotifications() {
  // By default, notifications will show after each other, with 2000ms delay?
  await figma.notify('Hey, this code is meant to teach you about the notification API')

  await figma.notify('You can use the notify API to send notifications to users.')

  // You could make it go faster with a timeout
  await figma.notify('You can', { timeout: 500})
  await figma.notify('use the ', { timeout: 500})
  await figma.notify('timeout option', { timeout: 500})
  await figma.notify('to make things', { timeout: 500})
  await figma.notify('go a bit faster', { timeout: 500})
  await figma.notify('(or slower...)', { timeout: 2500})

  await figma.notify('⚠️ You can also display an error', { error: true})
}

async function runPlugin() {
  await myNotifications();
  figma.closePlugin();
}

runPlugin();
