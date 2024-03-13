const fs = require ('fs');
const crypto = require ('crypto');

// Lee el archivo de configuración no encriptado
const configFile = fs.readFileSync(__dirname + '/config.json', 'utf-8');

// Genera una clave secreta para la encriptación
const secretKey = crypto.randomBytes(32); // Puedes ajustar la longitud según tus necesidades

// Define un vector de inicialización (iv)
const iv = crypto.randomBytes(16); 
// Crea un objeto de cifrado con la clave secreta
const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

// Encripta el archivo de configuración
const encryptedConfig = cipher.update(configFile, 'utf-8', 'hex') + cipher.final('hex');

// Guarda la clave secreta y el archivo encriptado
fs.writeFileSync(__dirname + '/secretKey.txt', secretKey.toString('hex'));
fs.writeFileSync(__dirname + '/config.enc', encryptedConfig);

console.log('Configuración encriptada exitosamente.');

