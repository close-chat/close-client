import React from 'react';
import classNames from 'classnames';
import './NewChatFloat.css';
import NewChatModal from './NewChatModal';

class NewChatFloat extends React.Component {
	state = {
		showModal: true,
	}

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		})
	}
	render() {
		return (
			<>
				<div onClick={this.toggleModal} className={classNames('new-chat-float')}>
					->
				</div>
				{this.state.showModal && <NewChatModal hideModal={this.toggleModal}/>}
			</>
		);
	}
}

export default NewChatFloat;
