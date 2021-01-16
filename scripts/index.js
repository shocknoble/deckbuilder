var selectedAspects = ['Order', 'Wisdom', 'Nature', 'Rage', 'Dominion', 'Corruption']
var currentDeck = new Map()

const cardMap = new Map()
var newCards;

const cardImagesUrl = "https://spellweaver-dreamreactorltd.netdna-ssl.com/wp-content/themes/spellweavers/cards/images/"
const cardNameplateUrl = "https://spellweaver-dreamreactorltd.netdna-ssl.com/wp-content/themes/spellweavers/cards/images/thumbs/"
const cardJsonUrl = "https://spellweaver-dreamreactorltd.netdna-ssl.com/wp-content/themes/spellweavers/cards/cards.json"

var allTypes = [];
var allTags = [];



window.onload = function() {


	var main = $('#main')
	var cardDiv = $('#searchResults')
	var searchInput = $('#searchField')
	
	
	var orderAspect = $('#order-aspect')
	var wisdomAspect = $('#wisdom-aspect')
	var natureAspect = $('#nature-aspect')
	var rageAspect = $('#rage-aspect')
	var dominionAspect = $('#dominion-aspect')
	var corruptionAspect = $('#corruption-aspect')
	
	var aspectToggles = [
		orderAspect, wisdomAspect, natureAspect, rageAspect, dominionAspect, corruptionAspect
	]

	

	
	
	searchInput.on('keyup', (e) => {
		
		var searchItem = e.target.value.toLowerCase().replace(/\'/g,'');
		filterSearchResults(searchItem, selectedAspects)
		
	})
	


	for (let c = 0; c < cards.length; c++) {
		let card = new Card(cards[c])
		let temp = card.createBody()
		for (type of card.types) {
			if (allTypes.includes(type)) {
				continue;
			}else {
				allTypes.push(type)
			}
		}
		for (tag of card.tags) {
			if (allTags.includes(tag)) {
				continue;
			}else {
				allTags.push(tag)
			}
		}
		$(temp).dblclick(() => {
			addCardToDeck(card)
		})
		cardDiv.append(temp)
		cardMap.set(card.id, card)
	}

	

	$('.aspectIcons').on('click', (e) => {

		if (e.target.src.indexOf('highlight') != -1) {
			e.target.src = e.target.src.split('-')[0].concat('-basic.png')
			selectedAspects.splice(selectedAspects.indexOf(e.target.title),1)
		}else {
			e.target.src = e.target.src.split('-')[0].concat('-highlight.png')
			selectedAspects.push(e.target.title)
		}

		
		filterSearchResults(searchInput.val(), selectedAspects)

	})
}



function parseCardName(path) {
	let index = path.lastIndexOf('/')
	let temp = path.slice(index+1,path.length-4)
	temp = temp.replace(/%20/g,' ')
	return temp
}

function filterSearchResults(searchItem, selectedAspects) {

	var span_items = $('#searchResults > img')
	var displayState = 'none'
	span_items.each( (item) => {
		span_items[item].closest('img').classList.remove('meets-criteria')

		for (aspect of selectedAspects) {
			if ((span_items[item].title.includes(`Aspects: ${aspect}`) || span_items[item].title.includes(`,${aspect}`)) && span_items[item].title.toLowerCase().indexOf(searchItem) != -1) {
				displayState = 'inline'
				span_items[item].closest('img').classList.add('meets-criteria')
				break;
			}
		}
		// if (span_items[item].title.toLowerCase().indexOf(searchItem) == -1) {
		// 	displayState = 'none'
		// 	span_items[item].closest('img').classList.remove('meets-criteria');
		// }
		
		span_items[item].closest('img').style.display = displayState

	})
	
	$('.meets-criteria').show()


}

function addCardToDeck(card) {
	
	if (currentDeck.has(card.id)) {
		currentDeck.set(card.id,currentDeck.get(card.id)+1)
	}else {
		currentDeck.set(card.id,1)
	}
	let li = document.createElement('li')
	let img = document.createElement('img')
	img.src = cardNameplateUrl+cardMap.get(card.id).safeName+'.jpg'
	// li.draggable = false;
	// img.draggable = false;
	li.classList.add('in-deck')
	li.classList.add(cardMap.get(card.id).aspects[0])
	li.addEventListener('dblclick', (ev) => {
		li.remove()
	})
	$(li).append(img)
	$('#decklist').append(li)
	
	console.log(currentDeck)
}


// function allowDrop(ev) {
// 	ev.preventDefault();
// }



// function getDraggedCard(ev) {
// 	console.log(ev.target.id)
// 	ev.dataTransfer.setData('text', ev.target.id)
// }


// $('.in-deck').on('dragend',(ev) => {
	// 	console.log(ev)
	// })
