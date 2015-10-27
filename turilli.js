var realTurilliSongs = [
	"legend of steel",
	"lord of the winter snow",
	"the ancient forest of elves",
	"kings of the nordic twilight",
	"rider of the astral fire",
	"the age of mystic ice",
	"prince of the starlight",
	"prophet of the last eclipse",
	"secrets of a forgotten age",
	"angels of a winter dawn",
	"the miracle of life",
	"silver moon",
	"the infinite wonders of creation",
	"warrior of ice",
	"rage of the winter",
	"forest of unicorns",
	"flames of revenge",
	"land of immortals",
	"echoes of tragedy",
	"lord of the thunder",
	"wisdom of the kings",
	"heroes of the lost valley",
	"wings of destiny",
	"the dark tower of abyss",
	"riding the winds of eternity",
	"symphony of enchanted lands",
	"dawn of victory",
	"triumph for my magic steel",
	"the village of dwarves",
	"the bloody rage of the titans",
	"the last winged unicorn",
	"the mighty ride of the firelord",
	"rain of a thousand flames",
	"queen of the dark horizons",
	"tears of a dying angel",
	"knightrider of doom",
	"power of the dragonflame",
	"the march of the swordmaster",
	"steelgods of the last apocalypse",
	"the pride of the tyrant",
	"the dark secret",
	"the magic of the wizard’s dream",
	"sacred power of raging winds",
	"shadows of death",
	"heart of the darklands",
	"old age of wonders",
	"the myth of the holy sword",
	"the mystic prophecy of the demonknight ",
	"dark reign of fire",
	"defenders of gaia",
	"dark frozen world",
	"sea of fate",
	"reign of terror",
	"the frozen tears of angels",
	"ghosts of forgotten worlds",
	"aeons of raging darkness",
	"heroes of waterfall’s kingdom"
];

var names = [
	"legend",
	"steel",
	"lord",
	"snow",
	"forest",
	"elve",
	"king",
	"twilight",
	"rider",
	"fire",
	"ice",
	"prince",
	"starlight",
	"prophet",
	"eclipse",
	"secret",
	"age",
	"angel",
	"dawn",
	"miracle",
	"life",
	"moon",
	"wonder",
	"creation",
	"warrior",
	"rage",
	"winter",
	"forest",
	"unicorn",
	"flame",
	"revenge",
	"land",
	"immortal",
	"echo",
	"tragedy",
	"lord",
	"thunder",
	"widsom",
	"hero",
	"valley",
	"wing",
	"destiny",
	"tower",
	"abyss",
	"wind",
	"eternity",
	"symphony",
	"dawn",
	"victory",
	"triumph",
	"steel",
	"village",
	"dwarf",
	"titan",
	"ride",
	"firelord",
	"rain",
	"flame",
	"queen",
	"horizon",
	"tear",
	"angel",
	"doom",
	"power",
	"march",
	"steelgod",
	"apocalypse",
	"tyrant",
	"magic",
	"dream",
	"shadow",
	"death",
	"heart",
	"darkland",
	"sword",
	"myth",
	"prophecy",
	"demonknight",
	"defender",
	"gaia",
	"world",
	"sea",
	"fate",
	"reign",
	"terror",
	"ghost",
	"aeon",
	"darkness",
	"kingdom"
];

var adjectives = [
	"winter",
	"ancient",
	"nordic",
	"astral",
	"mystic",
	"last",
	"forgotten",
	"silver",
	"infinite",
	"lost",
	"dark",
	"enchanted",
	"magic",
	"black",
	"bloody",
	"mighty",
	"dying",
	"sacred",
	"raging",
	"old",
	"holy",
	"frozen"
];

var prefixes = [
	"riding",
	"towards",
	"under",
	"through",
	"fighting",
	"gazing at" // wtf
];

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

function rnd(maxi) {
	if (maxi == undefined) {
		maxi = 10;
	}
	return Math.floor((Math.random() * maxi) + 1);
}

function generate() {
	var idx;

	// first part
	var adj1 = '';
	var prefix = '';
	// 1 chance out of 2 to have an adjective
	if (rnd() % 2 == 0) {
		idx = rnd(adjectives.length - 1);
		adj1 = adjectives[idx];
		// in this case, why not a mighty "prefix" of the enchanted song name ? 1 chance out of 5
		if (rnd() % 5 == 0) {
			idx = rnd(prefixes.length - 1);
			prefix = prefixes[idx] + " ";
		}
	}
	// name
	idx = rnd(names.length - 1);
	var name1 = names[idx];
	// ~ 1 chance out of 4 for the name to be plural (@TODO manage it better)
	if (rnd() % 4 == 0) {
		name1 += "s";
	}

	var complement = '';
	// > 1 chance out of 2 to have a complement
	if ((rnd() % 2 == 0) || (adj1 == '')) {
		// 1 chance out of 2 to have an adjective for the complement
		var adj2 = '';
		if (rnd() % 2 == 0) {
			// adjective
			do {
				idx = rnd(adjectives.length - 1);
				adj2 = adjectives[idx];
			} while (adj2 == adj1 || adj2 == name1); // pick different words
		}
		// name
		var name2 = '';
		do {
			idx = rnd(names.length - 1);
			name2 = names[idx];
		} while (name2 == name1 || name2 == adj2 || name2 == adj1); // pick different words
		// ~ 1 chance out of 3 for the name to be plural
		if (rnd() % 3 == 0) {
			name2 += "s";
		}
		// adjustments
		if (adj2 != '') {
			adj2 += " ";
		}
		// build the complement
		complement = " of the " + adj2 + name2;
	}

	// adjustments
	if (adj1 != '') {
		adj1 = "the " + adj1 + " ";
	}

	// final song name
	var songName = prefix + adj1 + name1 + complement;

	return songName;
}

document.addEventListener('DOMContentLoaded', function() {
	var button = document.getElementById("getsome");
	button.addEventListener('click', function() {
		var list = document.getElementById('results');
		list.innerHTML = '';
		for (var i=0; i<10; i++) {
			var songName = generate(),
				exists = false;
			if (realTurilliSongs.indexOf(songName) >= 0) { // not sure if it works
				alert('omg !');
				exists = true;
			}
			// compute list element
			var newSong = '<li><span class="song">' + songName.ucfirst() + '</span>';
			if (exists) {
				newSong += ' - <span class="omg">OMG this one really exists :D</span>';
			}
			newSong += "</li>\n";
			// add to list
			results.innerHTML = results.innerHTML + newSong;
		}
	});
});
