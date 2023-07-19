// Set multiple values to the Figma clientStorage and retrieve them

let name = 'John Doe';
let password = 'johndoer212';
let sessionID = '21221132121';

// Set the values in clientStorage
Promise.all([
  figma.clientStorage.setAsync('name', name),
  figma.clientStorage.setAsync('password', password),
  figma.clientStorage.setAsync('sessionID', sessionID)
])
.then(async () => {
  // Retrieve the values from clientStorage
  const allKeys = await figma.clientStorage.keysAsync();
  console.log(allKeys);
})
.catch((error) => {
  console.error('Error:', error);
});
