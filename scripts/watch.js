/* eslint-disable no-console */
const arg = require('arg');
const chalk = require('chalk');
const webpack = require('webpack');
const { setupBuild } = require('./utils/setup.js');
const { pkg } = require('./utils/pkg.js');
const { setupWebpackBuildConfig } = require('../configs/webpack.build.config.js');

function parseArguments() {
	const args = arg(
		{
			'--host': Boolean,
			'-h': '--host'
		},
		{
			argv: process.argv.slice(2),
			permissive: true
		}
	);
	return {
		analyzeBundle: args['--host'] || false
	};
}

const logBuild = (err, stats) => {
	if (err) {
		console.log(chalk.bgRed.white.bold('Webpack Runtime Error'));
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
	}

	const info = stats.toJson();

	if ( stats.hasWarnings() ) {
		chalk.bgRed.white.bold(`Webpack Compilations Warning${info.warnings.length > 0 ? 's' : ''}`);
		console.warn(info.warnings);
	}

	if (stats.hasErrors()) {
		console.log(
			chalk.bgRed.white.bold(`Webpack Compilations Error${info.errors.length > 0 ? 's' : ''}`)
		);
		console.error(info.errors);
	} else {
		console.log(
			chalk.bgBlue.white.bold( 'Compiled Successfully!' )
		);
	}


};

exports.runBuild = () => {
	const options = parseArguments();
	const buildContext = setupBuild();
	console.log('Building ', chalk.green(pkg.zapp.name));
	console.log('Using base path ', chalk.green(buildContext.basePath));
	const config = setupWebpackBuildConfig(options, buildContext);
	webpack(config, logBuild);
};
