const bcrypt = require('bcrypt');

class User {
	constructor (userModel) {
		this._userModel = userModel;
	}

	get model () {
		return this._userModel;
	}

	createUser ({ userName, mobileNumber, email, password, role, isEmailVerified, isMobileVerified }) {
		return new Promise((resolve, reject) => {
			const saltRounds = 10;
			bcrypt.hash(password, saltRounds)
			.then(hash => {
   			 	return Promise.resolve(hash); 
			})
			.then(hashedPassword => {
				const newUser = new this.model({ userName, mobileNumber, email, password: hashedPassword, role, isEmailVerified: false, isMobileVerified: false });
				return Promise.resolve(newUser);
			})
			.then(newUser => {
				if (newUser) resolve (newUser.save());
				reject(null);	
			})
		});
	}

	findAllUser () {
		return new Promise((resolve, reject) => {
			const users = this.model.find({});
			resolve (users);
		});
	}

	findUserById (_id) {
		return new Promise((resolve, reject) => {
			const user = this.model.findOne({ _id });
			if (user) resolve (user);
			reject(null);
		});
	}
}

module.exports = User;
