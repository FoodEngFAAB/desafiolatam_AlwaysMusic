const { Client } = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'ALWAYSMUSIC',
    password: 'JBJFourier1768@',
    port: 5432,
}

const client = new Client(config)

client.connect()

//Ingrese registro en la tabla de estudiantes.
async function input() {
    const res = await client.query(
        "insert into students (Nombre, Curso, Nivel, RUT) values ('Brian May', 'Guitarra', 7, '12.345.678-9') RETURNING *;"
    )
    console.log('Registro agregado:\n', res.rows[0])
}

//Consulta todos los registros de la tabla de estudiantes.
async function query() {
    const res = await client.query(
        "SELECT * FROM students"
    )
    console.log('Estudiante(s) consultado(s):\n', res.rows[0])
}

async function edit(level, id) {
    const res = await client.query(
        `UPDATE students SET Nivel = ${level} WHERE RUT = '${id}' RETURNING *;`
    )
    console.log('Estudiante(s) actualizado(s):\n', res.rows[0])
}

async function queryRUT(id) {
    const res = await client.query(
        `SELECT * FROM students WHERE RUT = '${id}'`
    )
    console.log(`Registro con el id ${id}`, res.rows[0])
} 

async function deleteUser(id) {
    const res = await client.query(
        `DELETE FROM students WHERE RUT = '${id}'`
    )
    console.log(`Registro de estudiante con RUT '${id}' eliminado.`)
}

input()
.then(() => query())
.then(() => edit(10, "12.345.678-9"))
.then(() => queryRUT("12.345.678-9"))
.then(() => deleteUser("12.345.678-9"))
.then( () => client.end())
