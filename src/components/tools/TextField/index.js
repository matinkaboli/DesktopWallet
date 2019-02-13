import React, { Fragment, Component } from 'react';

import eyeOn from 'Root/images/eye-on.svg';
import eyeOff from 'Root/images/eye-off.svg';
import uploadIcon from 'Root/images/upload.png';

import styles from './styles.less';

class TextField extends Component {
  state = {
    eyeImg: eyeOn,
    type: this.props.type,
    eye: this.props.type === 'password',
  };

  handleClick = () => {
    this.setState(state => ({
      eye: !state.eye,
      eyeImg: state.eye ? eyeOff : eyeOn,
      type: state.type === 'password' ? 'text' : 'password',
    }));
  }

  openInput = () => {
    this.inputFile.click();
  }

  inputWallet = () => {
    const { inputRef } = this.props;
    const file = this.inputFile.files[0];
    const reader = new global.FileReader();

    if (!inputRef) {
      return;
    }

    if (!file) {
      inputRef({
        error: 'No file selected!',
      });

      return;
    }

    reader.addEventListener('loadend', () => {
      inputRef({
        data: reader.result,
      });
    });

    reader.readAsText(file, 'utf8');
  }

  handleChange = () => {
    if (this.props.inputRef) {
      this.props.inputRef(this.textField.value);
    }
  }

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          {this.props.type !== 'upload'
          && (
            <input
              type={this.state.type}
              className={styles.input}
              onChange={this.handleChange}
              ref={(r) => { this.textField = r; }}
              placeholder={this.props.placeholder}
            />
          )
        }

          {this.props.type === 'password'
          && (
            <span className={styles.invisible}>
              <img
                alt="Eye"
                src={this.state.eyeImg}
                onClick={this.handleClick}
              />
            </span>
          )
        }

          {this.props.type === 'upload'
            && (
              <Fragment>
                <input
                  type="file"
                  onChange={this.inputWallet}
                  className={styles.inputWallet}
                  ref={(c) => { this.inputFile = c; }}
                />

                <div
                  role="presentation"
                  onClick={this.openInput}
                  className={styles.openInputContainer}
                >
                  <input
                    type="text"
                    onChange={this.inputWallet}
                    className={styles.openInputField}
                    placeholder={this.props.placeholder}
                  />

                  <div className={styles.openInputIconContainer}>
                    <img src={uploadIcon} alt="Upload Icon" />
                  </div>
                </div>
              </Fragment>
            )
          }
        </div>

        <p className={styles.error}>{this.props.error || ''}</p>
      </Fragment>
    );
  }
}

export default TextField;
