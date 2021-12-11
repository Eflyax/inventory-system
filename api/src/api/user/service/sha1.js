const
	﻿sha1 = (input, unique = false) => {
		const
			crypto = require('crypto'),
			shasum = crypto.createHash('sha1'),
			salt = unique
				? Number(new Date())
				: '!(!8`9!&{&&>';

		if (!input) {
			input = '';
		}

		shasum.update(salt + input);

		return shasum.digest('hex');
	};

module.exports = sha1;
