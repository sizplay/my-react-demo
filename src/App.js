import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import Things from './Things';
import ThingCreate from './ThingCreate';
import axios from 'axios';
import Nav from './Nav';
import Thing from './Thing';

class App extends Component {
  constructor(){
    super();
    this.state = {
      things: []
    };
    this.onCreateThing = this.onCreateThing.bind(this);
    this.onUpdateThing = this.onUpdateThing.bind(this);
    this.onDestroyThing = this.onDestroyThing.bind(this);
  }
  componentDidMount() {
    axios.get('/api/things')
      .then(result => result.data)
      .then(things => this.setState({ things }));
  }
  onUpdateThing(thing){
    axios.put(`/api/things/${thing.id}`, thing)
    .then( result => result.data)
    .then( thing => {
      const things = this.state.things.map( _thing => _thing.id === thing.id*1 ? thing : _thing);
      this.setState({ things });
      document.location.hash = '/';
    });
  }
  onCreateThing(thing) {
    axios.post('/api/things', thing)
      .then(result => result.data)
      .then( thing => this.setState( { things: [...this.state.things, thing ]})) //need to ask
      .then( ()=> document.location.hash = '/'); //redirect to /
  }
  onDestroyThing(id) {
    axios.delete(`/api/things/${id}`)
    .then( result => result.data)
    .then( () => {
      const things = this.state.things.filter( _thing => _thing.id !== id*1);
      this.setState({ things });
      document.location.hash = '/';
    });
  }
  render() {
    const { things } = this.state;
    const { onCreateThing, onUpdateThing, onDestroyThing } = this;
    return (
      <Router>
        <div>
          <Route render = { ({ location }) => <Nav path= { location.pathname } thingsCount = { things.length } />} />
          <Switch>
            <Route path='/' exact render= { ()=> <Things things={ things } />} />
            <Route path='/things/create' exact render= { () => <ThingCreate onCreateThing = { onCreateThing } />} />
            <Route path = '/things/:id' exact render = { ({ match }) => (
              <Thing
                things = { things }
                id = { match.params.id }
                update = { onUpdateThing }
                destroy = { onDestroyThing }
                />
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
