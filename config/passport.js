const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
			// Match User
			User.findOne({ name: name })
				.then(user => {
					if(!user) {
						console.log(done);
						return done(null, false, { message: 'That db name is not registered' });
					}
					
					// Match password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if(err) throw err;
						
						if(isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Password incorrect' });
						}
					});
				})
				.catch(err => console.log(err));
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
  		User.findById(id, (err, user) => {
    		done(err, user);
		});
	});

};
