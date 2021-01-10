class Card {
	constructor(data, imagePath) {
		this.imagePath = imagePath
		this.id = data.Id.toString()
		this.name = data.Name
		this.shortName = data.ShortName
		this.rarity = data.Rarity
		this.image = data.Image
		this.edition = data.Edition
		this.addOn = data.AddOn
		this.levelRequired = data.LevelRequired
		this.types = data.Types || []
		this.tags  = data.Tags || []
		this.aspects  = data.Aspects || []
		this.mana = data.Mana
		this.isPrimaryShrine = data.IsPrimaryShrine
		this.isLegendary = data.IsLegendary
		this.ai = data.AI
		this.deckSortOrder = data.DeckSortOrder
		this.type = data.Type
		this.rules = data.Rules
		this.power = data.Power
		this.toughness = data.Toughness
		this.speed = data.Speed
		this.maxInDeck = data.MaxInDeck || 4
		this.referencedCards = data.ReferencedCards || []	

		this.insertName()

	}


	createBody() {
		
		let img = document.createElement('img')
		img.src = this.imagePath
		
		img.title = `ID: ${this.id}\nName: ${this.name}\nRarity: ${this.rarity}\nAspects: ${this.aspects}\n${this.rules}`
		img.id = this.id
		img.draggable=true
		for( let a = 0; a < this.aspects.length; a++) {
			img.classList.add(this.aspects[a])
		}
		img.classList.add('meets-criteria')
		
		return img
	}

	insertName() {
		this.rules = this.rules.replace(/\~/g, this.shortName)
	}
}




// [[127,55,33,261,41,62,577,345,55,737,89],[123,346,454,4443,8867,545,545,12,565],[23,2343,444,3434,122,3,2,45664,43,36356,122,3458,7678,998],[23,2343,444,3434,122,3,2,45664,43,36356,122,3458,7678,998],{12:16,1524:22}]
// CIAAEBYBAEDRMGREFYZDKCABAABQMCYSCQNB2JYCAQAQABYMFIWAMAIBBEKCAIRHFE