import React from 'react';
import classNames from 'classnames';
import './NewChatModal.css';
import Search from './Search';
import { loadChatsContent } from '../../Utils/File';
import Dialog from '../Tile/Dialog';

class NewChatModal extends React.Component {
	state = {
		chats: []
	}

	updateChats = chats => {
		this.setState({chats});
	}

	render() {
		return (
			<>
				<div className={classNames('new-chat-modal')}>
					<div onClick={this.props.hideModal} className={classNames('blackground')}/>
					<div className={classNames('content')}>
						<Search updateChats={this.updateChats}/>
						{
							this.state.chats.map((chat, i) => {
								console.log("chat m'baby: ", chat);
								return <Dialog 
									chatId={chat.id}
									index={i}
									key={i}
									classes={{}}
									showTitle={true}
								/>
							})
						}
					</div>
				</div>
			</>
		);
	}
}

export default NewChatModal;
