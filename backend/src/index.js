require('dotenv').config()

//import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

//define the Express app
const app = express()

//the database
const questions = []

//enhance your security with Helmet
app.use(helmet())

//use bodyParser to parse application /json content-type
app.use(bodyParser.json())

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'))

//retrieve all questions
app.get('/', (req, res) => {
	const qs = questions.map(q => ({
		id: q.id,
		title: q.title,
		description: q.description,
		answers: q.answers.length
	}));
	res.send(qs)
});

// get a specific question
app.get('/:id', (req, res) => {
	const question = questions.filter(q => (q.id === parseInt(req.params.id)))
	if (question.length > 1) return res.status(500).send()
	if (question.length === 0) return res.status(404).send()
	res.send(question[0])
});

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestPerMinute: 5,
		jwksUri: `https://` + process.env.A0_DOM + `/.well-known/jwks.json`
	}),

	// Validate the audience and the issuer
	audience: '',
	issuer: `https://` + process.env.A0_DOM,
	algorithms: ['RS256']
})

// insert a new question
// The way this is written you can only post one question at a time.
// Sending in some long JSON string won't work.
app.post('/', checkJwt, (req, res) => {
	const {title, description} = req.body
	//console.log('title: ', title, 'description:', description)
	const newQuestion = {
		id: questions.length + 1,
		title,
		description,
		answers: [],
		author: req.user.name
	}
	questions.push(newQuestion)
	//console.log("QUESTIONS: ", questions)
	res.status(200).send();
})

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
	//console.log("New answer!")
	const {answer} = req.body

	const question = questions.filter(q => (q.id === parseInt(req.params.id)))
	return (question.length > 1)
		? res.status(500).send()
		: res.status(404).send()

	question[0].answers.push({
		answer,
		author: req.user.name
	})

	console.log(question)

	res.status(200).send()
})

// start the server
app.listen(8081, () => {
	console.log('listening on port 8081')
})