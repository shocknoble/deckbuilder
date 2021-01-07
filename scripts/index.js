var selectedAspects = ['Order', 'Wisdom', 'Nature', 'Rage', 'Dominion', 'Corruption']
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

	console.log(selectedAspects)


	
	searchInput.on('keyup', (e) => {
		var displayState = 'none'
		var searchItem = e.target.value.toLowerCase().replace(/\'/g,'');
		filterSearchResults(searchItem, selectedAspects)
		
	})
	

	const cardMap = new Map()

	for (let c = 0; c < cardImages.length; c++) {
		let card = new Card(cards[c], cardImages[c])
		let temp = card.createBody()
		cardDiv.append(temp)
	}
	



	// for (aspect of aspectToggles) {
	// 	aspect.on('click', function(event) {
	// 		console.log(event.target.title)
	// 		if (event.target.src.indexOf('highlight') != -1) {
	// 			event.target.src = event.target.src.split('-')[0].concat('-basic.png')
	// 		}else {
	// 			event.target.src = event.target.src.split('-')[0].concat('-highlight.png')
	// 		}
	// 	})
	// }

	$('.aspectIcons').on('click', (e) => {
		console.log(e.target.id)
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
	span_items.each( (item) => {
		
		for (aspect of selectedAspects) {
			if (span_items[item].title.includes(`Aspects: ${aspect}`) || span_items[item].title.includes(`,${aspect}`)) {
				displayState = 'inline'
				break;
			}
		}
		if (span_items[item].title.toLowerCase().indexOf(searchItem) == -1) {
			displayState = 'none'
		}
		
		span_items[item].closest('img').style.display = displayState
	})


}
