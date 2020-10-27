import React, { ChangeEvent } from 'react';
import styles from '../Profile.module.css';

type PropsType = {
  status: string
  updateStatus: (newStatus: string) => void
}
type StateType = {
  editMode: boolean
  status: string
}

export class ProfileStatus extends React.Component<PropsType, StateType> {

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

  onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: event.currentTarget.value
    })

  }
  componentDidUpdate(prevProps: PropsType) {
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
            <span className={styles.status}
              onClick={this.activateEditMode}>{this.props.status || 'Set status..'}</span>
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