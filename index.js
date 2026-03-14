import express from 'express'
import pkg from 'pg';

import cors from 'cors';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors()); // front-end портын қосу үшін

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})
//Connecting PostgreSQL
pool.connect()
	.then(() => console.log('PostgreSql connected'))
	.catch(err => console.error('ERROR', err))

//C - CREATE A TASK
app.post('/todos', async(req,res) => {
	const { task } = req.body
	if (task === undefined || task === null || task === '') {
		return res.status(400).send("Text is required")
	} 
	try {
		await pool.query("INSERT INTO todos(task) VALUES($1);", [task])
		res.send("Task Added")
	} catch(err) {
		res.status(500).send("ERROR")
	}
})
//R - READ AND GET ALL TASKS
app.get('/todos', async(req,res) => {
	try{
		const result = await pool.query("SELECT * FROM todos;")
		res.json(result.rows)
	} catch(err) {
		return res.status(404).send("Not added yet")
	}
})
//R2 - GET A TASK BY ID
app.get('/todos/:id', async(req,res) => {
	const { id } = req.params
	try {
		if (!id) {
			return res.status(404).send('Not found')
		}
		const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id])
		res.send(result.rows)
	} catch(err) {
		res.status(400).send(err.message)
	}
})
//U - CHANGE A TASK BY ID
app.put('/todos/:id', async(req,res) => {
	const { id } = req.params
	const { task, done } = req.body
	try {
		const result = await pool.query("UPDATE todos SET task = $1, done = $2, update_at = NOW() WHERE id = $3",[task,done,id])
		if (result.rowCount === 0) {
			return res.status(404).send("Not found")
		}
		else if (result.rowCount > 0){	
			return res.status(200).send("Ok")
		}
		res.send('Has changed')
	} catch(err) {
		res.status(400).send(err.message)
	}

})
//D - DELETE A TASK BY ID
app.delete('/todos/:id', async(req,res) => {
	const { id } = req.params
	try {
		if (!id) {
			return res.status(404).send('Not found')
		}
		const result = await pool.query("DELETE FROM todos WHERE id = $1", [id])
		if(result.rowCount === 0) return res.status(404).send("Task not Found")
		res.send("deleted")
	} catch(err) {
		res.status(400).send(err.message)
	}
})

app.listen(3000, () => {
	console.log("Server is running at 3000")
})