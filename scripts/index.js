var selectedAspects = ['Order', 'Wisdom', 'Nature', 'Rage', 'Dominion', 'Corruption']
var currentDeck = new Map()

const cardMap = new Map()




window.onload = function() {

	var searchInput = $('#searchField')
	var main = $('#main')
	var cardDiv = $('#searchResults')

	
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
	


	for (let c = 0; c < cardImages.length; c++) {
		let card = new Card(cards[c], cardImages[c])
		let temp = card.createBody()
		temp.ondragstart = getDraggedCard
		cardDiv.append(temp)
		cardMap.set(card.id, card)
	}
	

	$('.aspectIcons').on('click', (e) => {
		console.log(e.target.id)
		if (e.target.src.indexOf('highlight') != -1) {
			e.target.src = e.target.src.split('-')[0].concat('-basic.png')
			selectedAspects.splice(selectedAspects.indexOf(e.target.title),1)
			$(`.${e.target.title}`).hide()
		}else {
			e.target.src = e.target.src.split('-')[0].concat('-highlight.png')
			selectedAspects.push(e.target.title)
			$(`.${e.target.title}`).show()
		}

		
		// filterSearchResults(searchInput.val(), selectedAspects)

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
	span_items.each( (item) => {
		span_items[item].closest('img').classList.remove('meets-criteria')

		for (aspect of selectedAspects) {
			if (span_items[item].title.includes(`Aspects: ${aspect}`) || span_items[item].title.includes(`,${aspect}`)) {
				displayState = 'inline'
				span_items[item].closest('img').classList.add('meets-criteria')
				break;
			}
		}
		if (span_items[item].title.toLowerCase().indexOf(searchItem) == -1) {
			displayState = 'none'
			span_items[item].closest('img').classList.remove('meets-criteria');
		}
		
		// span_items[item].closest('img').style.display = displayState
		$('.meets-criteria').show()
	})


}

function allowDrop(ev) {
	ev.preventDefault();
}



function getDraggedCard(ev) {
	console.log(ev.target.id)
	ev.dataTransfer.setData('text', ev.target.id)
}

function dropCard(ev) {
	var data = ev.dataTransfer.getData('text');
	console.log(ev)
	if (currentDeck.has(data)) {
		currentDeck.set(data,currentDeck.get(data)+1)
	}else {
		currentDeck.set(data,1)
	}


	let li = document.createElement('li')
	li.classList.add('in-deck')
	li.innerText = cardMap.get(data).name
	li.draggable = true;

	$('#decklist').append(li)

	console.log(currentDeck)
}



$('.in-deck').on('dragend',(ev) => {
	console.log(ev)
})