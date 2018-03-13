import React, { Component } from 'react';

class Thing extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setThing = this.setThing.bind(this);
    this.update = this.update.bind(this);
  }
  setThing(things, id){
    const thing = things.find( thing => thing.id === id);
      if(thing) { //if no thing then null
        this.setState({ name: thing.name });
      }
  }
  componentWillReceiveProps(nextProps){
    this.setThing(nextProps.things, nextProps.id*1);
  }
  componentDidMount() {
    this.setThing(this.props.things, this.props.id*1);
  }
  onChange(ev) {
    this.setState({ name: ev.target.value });
  }
  update(ev) {
    ev.preventDefault();
    this.props.update({id: this.props.id, name: this.state.name })
  }
  render() {
    const { onChange, update } = this;
    const { name } = this.state;
    const { destroy, id } = this.props;
    return (
      <div> 
        <form onSubmit = { update }>
          <input value = { name } onChange = { onChange }/>
          <button disabled = {name.length === 0 }>Update</button>
        </form>
        <button onClick ={ ()=> destroy(id)}>Delete</button>
      </div>
    );
  }
}

export default Thing;
