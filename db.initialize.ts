
import { Pool } from "pg";

const db = new Pool({
    user: process.env.DB_USER ?? "error",
    host: process.env.DB_HOST ?? "error",
    database: process.env.DB_DATABASE ?? "error",
    password: process.env.DB_PASSWORD ?? "error",
    port: Number(process.env.DB_PORT ?? "error"),
    max: Number(process.env.DB_MAX ?? "error"),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT ?? "error"),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT ?? "error"),
})

async function poblarDB() {
    const names = ['Juan', 'Pedro', 'Marcelo', 'Jorge', 'Miguel', 'Maria', 'Ana', 'Sofia', 'Luis', 'Fernando']
    const lastnames = ['Perez', 'Garcia', 'Rodriguez', 'Gonzalez', 'Hernandez', 'Lopez', 'Martinez', 'Diaz', 'Sanchez', 'Romero']
    const emails = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com']
    const addresses = ['Calle 1', 'Calle 2', 'Calle 3', 'Calle 4', 'Calle 5', 'Avenida 1', 'Avenida 2', 'Avenida 3', 'Avenida 4', 'Avenida 5']
    const data = Array.from({length: 100}, () => ({
        name: names[Math.floor(Math.random() * names.length)],
        lastname: lastnames[Math.floor(Math.random() * lastnames.length)],
        email: `${names[Math.floor(Math.random() * names.length)]}.${lastnames[Math.floor(Math.random() * lastnames.length)]}${emails[Math.floor(Math.random() * emails.length)]}`,
        address: addresses[Math.floor(Math.random() * addresses.length)]
    }))
    const sql = `INSERT INTO public.client
        (name, last_name, email, address)
        VALUES ${data.map(i => `('${i.name}', '${i.lastname}', '${i.email}', '${i.address}')`).join(', ')}`
    await db.query(sql)
}

poblarDB().then(()=> {
    console.log("base da datos poblada")
}).catch((e)=> {console.log(e)})
