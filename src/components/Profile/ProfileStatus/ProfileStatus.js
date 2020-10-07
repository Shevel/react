import React from 'react';
import styles from '../Profile.module.css';

export class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }
  deactivateEditMode = () => {
    this.setState({ editMode: false })
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (event) => {
    this.setState({
      status: event.currentTarget.value
    })

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode &&
          <div>
            <span className={styles.status} onClick={this.activateEditMode}>{this.props.status || 'Set status..'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} autoFocus value={this.state.status} onBlur={this.deactivateEditMode} />
          </div>
        }
      </>
    )
  }

}