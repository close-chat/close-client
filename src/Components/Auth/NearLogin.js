import React from 'react';
import classNames from 'classnames';
import './NearLogin.css';


class NearLogin extends React.Component {
	state = {
		signedIn: false,
		walletAccount: null,
		contract: null
	}

	componentDidMount = async () => {
		const near = await window.nearlib.connect(Object.assign({ deps: { keyStore: new window.nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig))
		const contract = await near.loadContract(window.nearConfig.contractName, {
			viewMethods: ["get_users", "get_user", "is_unique_username"],
			changeMethods: ["add_user"],
		});
		const walletAccount = new window.nearlib.WalletAccount(near);
		this.setState({
			signedIn: walletAccount.isSignedIn(), 
			contract,
			walletAccount
		});
		this.props.setContract(contract);
	}

	render() {
		const children = React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {
				contract: this.state.contract
			});
		});
		return (
			<div className={classNames("login-prompt")}> 
				{
					this.state.signedIn ? children: 
					<div>
						<button className={classNames("signin-button")} onClick={ () => this.state.walletAccount.requestSignIn(window.nearConfig.contractName, window.nearConfig.contractName)}>Sign in with NEAR</button>
					</div>
				}
			</div>
		);
	}
}

export default NearLogin;
