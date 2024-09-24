import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;

let problems = [
    {
        id: 0,
        title: 'Polyfill for Array.map',
        description: 'This is problem 1',
    },
    {
        id: 1,
        title: 'Polyfill for Array.Promise.all()',
        description: 'This is problem 2',
    }
];

app.get('/api/problems',(req,res) => {
    res.json(problems)
})

app.post('/api/problems',(req,res) => {
    const body = req.body;
    problems = [
        ...problems,
        body
    ]
    res.json(problems)
})

app.put('/api/problems/:id',(req,res) => {
    const body = req.body
    const id = req.params.id
    problems = problems.map((p) => {
        if(p.id == id){
            return {
                id,
                ...body
            }
        }
        return p
    })
    res.json(problems)
})

app.delete('/api/problems/:id',(req,res) => {
    const id = req.params.id
    problems = problems.filter((p) => p.id !=id)

    res.json(problems)
})
 
app.patch('/api/problems/:id',(req,res) => {
    const body = req.body;
    const id = req.params.id;
    const problem = problems.find((p) => p.id == id);
    problems = problems.map((p) => {
        if(p.id == id){
            return {
                ...problem,
                ...body
            }
        }
        return p;
    });
    res.json(problems)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});