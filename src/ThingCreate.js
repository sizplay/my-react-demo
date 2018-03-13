import React, { Component } from 'react';

class ThingCreate extends Component {
  constructor(){
    super();
    this.state = {
      name: ''
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    this.props.onCreateThing({ name: this.state.name });
  }
  onChange(ev) {
    this.setState({ name: ev.target.value });
  }
  render() {
    const { name } = this.state;
    const { onSave, onChange } = this;
    return(
    <form onSubmit={ onSave }>
      <input value ={ name } onChange={ onChange }/>
      <button disabled={ name.length === 0 }>Create</button>
    </form>
    );
  }
}

export default ThingCreate;
