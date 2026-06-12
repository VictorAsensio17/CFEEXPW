const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function getDataFile(name) {
  return path.join(dataDir, `${name}.json`);
}

function readData(name, fallback = []) {
  const filePath = getDataFile(name);
  try {
    if (!fs.existsSync(filePath)) {
      writeData(name, fallback);
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    console.error(`Error leyendo archivo ${filePath}:`, error);
    return fallback;
  }
}

function writeData(name, data) {
  const filePath = getDataFile(name);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

function validateEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendSuccess(res, data = {}, message = 'Operación completada correctamente') {
  res.json({ status: 'success', message, data });
}

function sendError(res, message = 'Error en la solicitud', statusCode = 400) {
  res.status(statusCode).json({ status: 'error', message });
}

ensureDataDirectory();

if (!fs.existsSync(getDataFile('users'))) writeData('users', []);
if (!fs.existsSync(getDataFile('contacts'))) writeData('contacts', []);
if (!fs.existsSync(getDataFile('events'))) writeData('events', [
  {
    id: 'EVT-001',
    title: 'Taller de Inversión en Bolsa',
    description: 'Introducción práctica al análisis técnico y la gestión de carteras.',
    date: '2026-09-10T18:30:00.000Z',
    location: 'Salón de actos UEx',
    type: 'taller',
    capacity: 50,
    registered: 24,
    image: '/assets/event-01.jpg'
  },
  {
    id: 'EVT-002',
    title: 'Mesa redonda: Fintech y empleo',
    description: 'Debate sobre el impacto de la tecnología financiera en el mercado laboral.',
    date: '2026-09-24T17:00:00.000Z',
    location: 'Campus Río Vena',
    type: 'debate',
    capacity: 80,
    registered: 52,
    image: '/assets/event-02.jpg'
  },
  {
    id: 'EVT-003',
    title: 'Networking de Estudiantes',
    description: 'Encuentro para crear sinergias entre estudiantes y profesionales del sector.',
    date: '2026-10-05T19:00:00.000Z',
    location: 'Espacio Coworking',
    type: 'networking',
    capacity: 100,
    registered: 76,
    image: '/assets/event-03.jpg'
  }
]);
if (!fs.existsSync(getDataFile('resources'))) writeData('resources', [
  {
    id: 'RES-001',
    title: 'Cómo analizar un informe anual',
    category: 'mercados',
    excerpt: 'Guía para entender los puntos clave de un informe financiero corporativo.',
    author: 'Laura Martínez',
    publishedAt: '2026-05-20T10:00:00.000Z',
    views: 320,
    readTime: '7 minutos'
  },
  {
    id: 'RES-002',
    title: 'Nuevas oportunidades de inversión sostenible',
    category: 'tecnologia',
    excerpt: 'Descubre cómo la economía verde está cambiando el panorama financiero.',
    author: 'Pablo Sánchez',
    publishedAt: '2026-06-08T08:30:00.000Z',
    views: 210,
    readTime: '6 minutos'
  },
  {
    id: 'RES-003',
    title: 'Gestión de riesgos para nuevos inversores',
    category: 'educación',
    excerpt: 'Buenas prácticas para proteger tu inversión y reducir la volatilidad.',
    author: 'Ana Ruiz',
    publishedAt: '2026-07-01T12:00:00.000Z',
    views: 185,
    readTime: '5 minutos'
  }
]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/health', (req, res) => {
  sendSuccess(res, { uptime: process.uptime(), timestamp: new Date().toISOString() }, 'API operativa');
});

app.get('/api/events', (req, res) => {
  const events = readData('events', []);
  sendSuccess(res, events);
});

app.get('/api/resources', (req, res) => {
  const resources = readData('resources', []);
  sendSuccess(res, resources);
});

app.get('/api/users', (req, res) => {
  const users = readData('users', []);
  sendSuccess(res, users);
});

app.get('/api/users/:id', (req, res) => {
  const users = readData('users', []);
  const user = users.find(item => item.id === req.params.id);
  if (!user) return sendError(res, 'Usuario no encontrado', 404);
  sendSuccess(res, user);
});

app.post('/api/admission', (req, res) => {
  const { fullName, email, degree, interests, phone } = req.body;
  if (!fullName || !email || !degree) {
    return sendError(res, 'Los campos fullName, email y degree son obligatorios');
  }
  if (!validateEmail(email)) {
    return sendError(res, 'El correo electrónico no es válido');
  }

  const users = readData('users', []);
  const newUser = {
    id: createId('USR'),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    degree: degree.trim(),
    interests: interests ? interests.trim() : '',
    phone: phone ? phone.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  writeData('users', users);

  sendSuccess(res, newUser, 'Solicitud de admisión registrada con éxito');
});

app.put('/api/users/:id', (req, res) => {
  const users = readData('users', []);
  const index = users.findIndex(user => user.id === req.params.id);
  if (index === -1) return sendError(res, 'Usuario no encontrado', 404);

  const updatedUser = {
    ...users[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  users[index] = updatedUser;
  writeData('users', users);

  sendSuccess(res, updatedUser, 'Usuario actualizado correctamente');
});

app.delete('/api/users/:id', (req, res) => {
  const users = readData('users', []);
  const filtered = users.filter(user => user.id !== req.params.id);
  if (filtered.length === users.length) return sendError(res, 'Usuario no encontrado', 404);

  writeData('users', filtered);
  sendSuccess(res, null, 'Usuario eliminado correctamente');
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, subscribe } = req.body;
  if (!name || !email || !message) {
    return sendError(res, 'Los campos name, email y message son obligatorios');
  }
  if (!validateEmail(email)) {
    return sendError(res, 'El correo electrónico no es válido');
  }

  const contacts = readData('contacts', []);
  const newMessage = {
    id: createId('MSG'),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject ? subject.trim() : 'Contacto general',
    message: message.trim(),
    subscribe: subscribe === true || subscribe === 'Sí' || subscribe === 'si' || subscribe === 'yes',
    createdAt: new Date().toISOString()
  };

  contacts.push(newMessage);
  writeData('contacts', contacts);

  sendSuccess(res, newMessage, 'Mensaje de contacto recibido con éxito');
});

app.post('/api/automation/trigger', (req, res) => {
  const payload = req.body || {};
  sendSuccess(res, {
    automationId: createId('AUT'),
    receivedAt: new Date().toISOString(),
    payload
  }, 'Automatización encolada para procesamiento futuro');
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint no encontrado' });
});

app.listen(port, () => {
  console.log(`Backend iniciado en http://localhost:${port}`);
  console.log('API disponible en http://localhost:' + port + '/api');
});
