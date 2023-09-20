function generateRandomSignature() {
  //generate random signature to put on user profile with texts number 0-9 and letters a-z
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default generateRandomSignature;
