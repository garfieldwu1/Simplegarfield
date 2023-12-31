const chalk = require('chalk');
module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#00ffff").bold('[ Error ] » ') + chalk.hex("#00ffff")(data));
			break;
		case "error":
			console.log(chalk.bold.hex("#00ffff").bold('[ Error ] »') + chalk.hex("#00ffff")(data));
     break;
		default:			        
                        console.log(chalk.bold.hex("#00ffff").bold(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#f2901f").bold('[ Garfield ]') + chalk.hex("#63584b")(data));
			break;
		case "error":
			console.log(chalk.bold.hex("#f2901f").bold('[ Garfield ]') + chalk.hex("#63584b")(data));
			break;
		default:
			console.log(chalk.bold.hex("#f2901f").bold(`[ Garfield ]`) + chalk.hex("#63584b")(data));
			break;
	}
}