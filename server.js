const express = require('express');
const app = express();
const path = require('path');

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', (req, res, next)=> {
  Thing.findAll()
    .then(things => res.send(things))
    .catch(next);
});

app.delete('/api/things/:id', (req, res, next) => {
  Thing.destroy({
    where: {
      id: req.params.id
    }
  })
    // .then(thing => {
    //   return thing.destroy();
    // })
    .then( () => res.sendStatus(204))
    .catch(next);
});

// app.delete('/api/things/:id', (req, res, next) => {
//   Thing.findById(req.params.id)
//     .then(thing => {
//       return thing.destroy();
//     })
//     .then( () => res.sendStatus(204))
//     .catch(next);
// });

app.put('/api/things/:id', (req, res, next)=> {
  Thing.findById(req.params.id)
    .then( thing => {
      Object.assign(thing, req.body);
      return thing.save();
    })
    .then( thing => res.send(thing))
    .catch(next);
});

app.post('/api/things', (req, res, next)=> {
  Thing.create(req.body)
  .then( thing => res.send(thing))
  .catch(next);
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening port ${port}`));


const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_react_demo',{
  logging: false
});

const Thing = conn.define('thing', {
  name: Sequelize.STRING
});

conn.sync({ force: true })
  .then( ()=> Promise.all([
    Thing.create( { name: 'foo' }),
    Thing.create({name: 'bar'})
  ]));
