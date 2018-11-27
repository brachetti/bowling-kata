const {
	calculateScore
} = require('./src')
const loadJsonFile = require('load-json-file')
const argv = require('yargs')
	.option('game', {
		alias: 'g',
		description: 'load a game file'
	})
	.demandOption('game')
	.help()
	.example('node $0', '--game=example.json')
	.argv

console.log('CALCULATING SCORE FOR BOWLING GAME')

loadJsonFile(argv.game).then(game => {
	console.log(game);
	if (game && game.players) {
		console.log(`Score for game with ${game.players.length} players`);
	} else {
		throw new Error('Did not find a game or any players')
	}

	game.players.forEach(player =>
		console.log(`Score ${player.name}: ${calculateScore(player.frames)}`)
	)
})
