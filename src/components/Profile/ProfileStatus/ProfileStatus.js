import React from 'react';
import styles from '../Profile.module.css';

export class ProfileStatus extends React.Component {
  state = {
    editMode: false
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }
  deactivateEditMode = () => {
    this.setState({ editMode: false })
  }

  render() {
    return (
      <>
        {!this.state.editMode &&
          <div>
            <span className={styles.status} onClick={this.activateEditMode}>{this.props.status}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input autoFocus value={this.props.status} onBlur={this.deactivateEditMode} />
          </div>
        }
      </>
    )
  }

}