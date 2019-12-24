import React from 'react';
import classNames from 'classnames';
import './Search.css';
import TdLibController from '../../Controllers/TdLibController';
import { getCyrillicInput, getLatinInput } from '../../Utils/Language';
import { SCROLL_PRECISION, USERNAME_LENGTH_MIN } from '../../Constants';
import { loadChatsContent, loadUsersContent } from '../../Utils/File';
import ChatStore from '../../Stores/ChatStore';
import UserStore from '../../Stores/UserStore';

class Search extends React.Component {
	state = {
		chats: []
	}
	
	searchText = async text => {

		this.sessionId = new Date();
		this.text = text;
		const sessionId = this.sessionId;

		let trimmedText = text.trim();
		trimmedText = trimmedText.startsWith('@') ? trimmedText.substr(1) : trimmedText;
		const latinText = getLatinInput(trimmedText);

		if (trimmedText.length >= USERNAME_LENGTH_MIN) {
				const globalPromises = [];

				const globalPromise = TdLibController.send({
						'@type': 'searchPublicChats',
						query: trimmedText
				});
				globalPromises.push(globalPromise);

				if (latinText) {
						let latinTrimmedText = latinText.trim();
						latinTrimmedText = latinTrimmedText.startsWith('@') ? latinTrimmedText.substr(1) : latinTrimmedText;
						if (latinTrimmedText.length >= USERNAME_LENGTH_MIN && latinTrimmedText !== trimmedText) {
								const globalLatinPromise = TdLibController.send({
										'@type': 'searchPublicChats',
										query: latinTrimmedText
								});
								globalPromises.push(globalLatinPromise);
						}
				}

				const globalResults = await Promise.all(globalPromises.map(x => x.catch(e => null)));
				const global = globalResults;

				if (sessionId !== this.sessionId) {
						return;
				}
				let chats = await Promise.all( global[0].chat_ids.map(chatId => {
					return ChatStore.get(chatId)
				}))
				this.props.updateChats(chats);
		} else {
				this.setState({
						global: null
				});
		}
	
};

	render() {
		return (
			<input onChange={(e) => this.searchText(e.target.value)} className={classNames("search-field")}type="text"/>
		);
	}
}

export default Search;
