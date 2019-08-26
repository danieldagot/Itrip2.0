import React, { Component } from "react";
import Modal from "react-awesome-modal";
import "../../Styles/AddTrip.css";
const contries = require("../../country-by-name");

class AddTrip extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  handleChange = e => {
    this.props.handleSelect(e.target.value)
  }

  handleSelect = e => {
    this.props.handleSelect(e.target.value)
}

  changeHome = e => {
    //   console.log(e.target.id)
    this.props.changeType(e.target.id);
  };
  closePopUp = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <section>
        <Modal
          visible={this.state.visible}
          width="650"
          height="330"
          effect="fadeInUp"
          onClickAway={() => this.closePopUp()}
        >
          <div id="popup">
            <div className="addTrip">
              <input
                id="Country"
                name="Country"
                list="options"
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                placeholder="Your Country"
              ></input>
              <datalist id="options">
                {contries.map(country => (
                  <option
                    value={country.country}
                    placeholder={country.country}
                  />
                ))}
              </datalist>
              <div id="dataList">
                <p>
                  <label for="chk-demo1" onClick={this.changeHome}>
                    <input type="checkbox" id="chk-demo1" />
                    <span className="checkbox">Extreme</span>
                  </label>
                </p>
                <p>
                  <label for="chk-demo2" onClick={this.changeHome}>
                    <input type="checkbox" id="chk-demo2" />
                    <span className="checkbox">Nature</span>
                  </label>
                </p>
                <p>
                  <label for="chk-demo3" onClick={this.changeHome}>
                    <input type="checkbox" id="chk-demo3" />
                    <span className="checkbox">Beauty</span>
                  </label>
                </p>
                <p>
                  <label for="chk-demo4" onClick={this.changeHome}>
                    <input type="checkbox" id="chk-demo4" />
                    <span className="checkbox">Art</span>
                  </label>
                </p>
                <p>
                  <label for="chk-demo5" onClick={this.changeHome}>
                    <input type="checkbox" id="chk-demo5" />
                    <span className="checkbox">Night</span>
                  </label>
                </p>
                <p>
                  <label for="chk-demo5" onClick={this.changeHome}>
                    <input type="checkbox" />
                    <span className="checkbox">Food</span>
                  </label>
                </p>
              </div>

              <button onClick={this.closePopUp}>Save!</button>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default AddTrip;
