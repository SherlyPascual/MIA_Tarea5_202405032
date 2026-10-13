const express = require('express');
const app = express();
const PORT = 3000;

// Permite que la API entienda el formato JSON en las peticiones
app.use(express.json());

// Datos ficticios guardados en memoria
let tareas = [
    { id: 1, titulo: 'Configurar instancia de AWS EC2', completada: true },
    { id: 2, titulo: 'Clonar el código de la API', completada: false }
];

// Ruta base para verificar que la API funciona
app.get('/', (req, res) => {
    res.json({ mensaje: "¡Bienvenido a mi API en AWS!" });
});

// Endpoint GET: Devuelve todas las tareas
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

// Endpoint POST: Permite agregar una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        completada: false
    };

    if (!req.body.titulo) {
        return res.status(400).json({ error: "El título de la tarea es obligatorio" });
    }

    tareas.push(nuevaTarea);
    res.status(201).json({ mensaje: "Tarea creada con éxito", tarea: nuevaTarea });
});

// Inicia el servidor escuchando en todas las interfaces de red (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API corriendo exitosamente en el puerto ${PORT}`);
});
