const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const Project = require('./models/project')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Project {
            _id: ID!
            title: String!
            description: String!
            budget: Float!
            date: String!
        }

        input ProjectInput {
            title: String!
            description: String!
            budget: Float!
            date: String!
        }

        type RootQuery {
            projects: [Project!]!
        }

        type RootMutation {
            createProject(projectInput: ProjectInput): Project
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        projects: ()=>{
            return Project.find()
                    .then(projects => {
                        return projects.map(project => {
                            return {...project._doc, _id: project.id};
                        })
                    })
        },

        createProject: (args)=>{
            const project = new Project({
                title: args.projectInput.title,
                description: args.projectInput.description,
                budget: +args.projectInput.budget,
                date: new Date (args.projectInput.date)
            })
            return project.save().then(
                result => {
                    return {...result._doc, _id: result.id}
                }
            ).catch(
                err=>{
                    console.log(err)
                    throw err
                }
            )
        }
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://Mukhammadjon:${process.env.MONGO_PASSWORD}@restartcluster0.9oliw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`)
.then(
    app.listen(3000)
)
.catch(err => {console.log(err)})

