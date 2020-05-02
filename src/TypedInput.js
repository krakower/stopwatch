import React from "react";

export default class TypedInput extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {value: 100};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.typingCallback(event.target.value);
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Enter test time for timer:
            <input type="text"  onChange={this.handleChange} />
          </label>
        </form>
      </div>
    );
  }
}
