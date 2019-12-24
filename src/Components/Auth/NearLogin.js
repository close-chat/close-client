import React from 'react';
import classNames from 'classnames';
import './NearLogin.css';


class NearLogin extends React.Component {
	state = {
		signedIn: false,
		walletAccount: null
	}

	componentDidMount = async () => {
		const near = await window.nearlib.connect(Object.assign({ deps: { keyStore: new window.nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig))
		const walletAccount = new window.nearlib.WalletAccount(near);
		this.setState({
			signedIn: walletAccount.isSignedIn(), 
			walletAccount
		});
	}

	render() {
		return (
			<div className={classNames("login-prompt")}> 
				{
					this.state.signedIn ? this.props.children : 
					<div>

						<button className={classNames("signin-button")} onClick={ () => this.state.walletAccount.requestSignIn(window.nearConfig.contractName, window.nearConfig.contractName)}>Sign in with NEAR</button>
					</div>
				}
			</div>
		);
	}
}

export default NearLogin;
