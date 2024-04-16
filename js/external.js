<script>
document.addEventListener('DOMContentLoaded', () => {

	function updateIngredientLists() {
    var ingredients = document.querySelectorAll('[ingraddid]');
    var ingridlist = [];
    var ingrfull = [];
    ingredients.forEach(function(ingredient) {
        var ingrid = ingredient.getAttribute('ingraddid');
        var ingrInputVal = ingredient.querySelector('[ingraddvalue]');
        var ingrvalue = ingrInputVal ? ingrInputVal.value : '';
        ingridlist.push(ingrid);
        ingrfull.push(ingrid + ' x20x ' + ingrvalue);
    });
    document.getElementById('ingridlist').value = ingridlist.join(', ');
    document.getElementById('ingrfull').value = ingrfull.join(' +20+ ');
}

    let currentPage = 2;
    const baseUrl = "https://laura---benjamin.webflow.io/gerecht-toevoegen";

    function appendIngredients(page) {
        fetch(`${baseUrl}?bd14d2d6_page=${page}`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const ingredients = doc.querySelectorAll('[ingredientInList]');
                if (ingredients.length > 0) {
                    const container = document.getElementById('appendedingredients');
                    ingredients.forEach(ingredient => {
                        container.appendChild(ingredient.cloneNode(true));
                    });
                    appendIngredients(page + 1);
                } else {
                    console.log('No more ingredients found.');
                }
            })
            .catch(error => {
                console.error('Error fetching page: ' + page, error);
            });
    }

    appendIngredients(currentPage);
      
  const ingrlist = document.getElementById('ingrlist');
var inputField = document.getElementById(`Ingredient`);
var inputValue = inputField.value;

const suggestionDiv = document.getElementById('suggestionDiv');

suggestionDiv.addEventListener('click', function(event) {
  let targetElement = event.target;

  while (targetElement && targetElement !== this) {
    if (targetElement.classList.contains('suggestion')) {
    suggestionDiv.innerHTML = '';
      handleSuggestionClick(targetElement);
      return;
    }
    targetElement = targetElement.parentNode;
  }
});

function handleSuggestionClick(clickedElement) {
  const itemSuggestedValue = clickedElement.getAttribute('itemSuggested');
  const itemSuggestedIDValue = clickedElement.getAttribute('itemSuggestedID');
 	var ingrlist = document.getElementById('ingrlist');
        var div = document.createElement('div');
        div.className = 'horflexallways centerver';
        div.setAttribute('ingraddid', itemSuggestedIDValue);

        var title = document.createElement('div');
        title.className = 'titleingredient';
        title.textContent = itemSuggestedValue;
        div.appendChild(title);
        
         var passIDs = document.createElement('input');
        passIDs.className = 'invisible-div';
        passIDs.name = 'cmsidlist';
        passIDs.value = itemSuggestedIDValue;
        div.appendChild(passIDs);

        var input = document.createElement('input');
        input.className = 'inputfield w-input';
        input.maxLength = 256;
        input.type = 'text';
        input.setAttribute('ingraddvalue', '');
        input.addEventListener('input', function() {
            updateIngredientLists();
        });
        div.appendChild(input);

        var deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', function() {
            div.parentNode.removeChild(div);
            updateIngredientLists();
        });
        div.appendChild(deleteBtn);

        ingrlist.appendChild(div);
        updateIngredientLists();
        inputField.value = '';
}

var inputField = document.getElementById(`Ingredient`);
var inputValue = inputField.value;
document.getElementById('Ingredient').addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const ingredients = document.querySelectorAll('[ingredientInList]');
        const suggestionDiv = document.getElementById('suggestionDiv');
        suggestionDiv.innerHTML = '';
        if (inputValue !== '') {
        ingredients.forEach(ingredient => {
            const ingredientValue = ingredient.getAttribute('ingredientInList').toLowerCase();
            const ingredientID = ingredient.getAttribute('ingredientID');
            if (ingredientValue.includes(inputValue)) {
                const suggestionElement = document.createElement('div');
                suggestionElement.textContent = ingredientValue;
                suggestionElement.classList.add('suggestion');
                suggestionDiv.appendChild(suggestionElement);
            		suggestionElement.setAttribute('itemSuggested', ingredientValue);
                suggestionElement.setAttribute('itemSuggestedID', ingredientID);
            }
        });
        }
        const inputFieldRect = inputField.getBoundingClientRect();
        const desiredTopPosition = window.innerHeight / 3;
        const scrollYOffset = inputFieldRect.top - desiredTopPosition + window.scrollY + (inputFieldRect.height / 2); // Calculate how much to scroll, including the current scroll position

        window.scrollTo({
            top: scrollYOffset,
            behavior: 'smooth'
        });
    });

const newIngrBtn = document.getElementById(`newIngr`);
const popupNewIngr = document.getElementById(`popupNewIngr`);
const inputNewIngr = document.getElementById(`itemName`);
newIngrBtn.addEventListener('click', function(event) {
	popupNewIngr.style.height = "65vh";
  inputNewIngr.value = inputField.value;
});

document.getElementById('itemListAdd').addEventListener('submit', function(event) {
	event.preventDefault();
  document.getElementById('popupNewIngr').style.height = '0vh';
  document.getElementById('Ingredient').value = '';
	let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let formattedDate = `${day}-${month < 10 ? '0' + month : month}-${year}`;
    
    var inputField = document.getElementById(`itemName`);
    var typeFood = document.getElementById(`typefood`).value;
    var inputValue = inputField.value;

		fetch(`https://hook.eu1.make.com/s4427certagfa0uttplkkeo31rfws8yj?date=${encodeURIComponent(formattedDate)}&ingredient=${encodeURIComponent(inputValue)}&bijgerecht=ja&boodschaplijst=empty&typefood=${encodeURIComponent(typeFood)}`)
    .then(response => response.text())
    .then(text => {
        var ingrlist = document.getElementById('ingrlist');
        var ingredientfetchedID = text;
        var div = document.createElement('div');
        div.className = 'horflexallways centerver';
        div.setAttribute('ingraddid', ingredientfetchedID);
        var title = document.createElement('div');
        title.className = 'titleingredient';
        title.textContent = inputValue;
        div.appendChild(title);
        
        var passIDs = document.createElement('input');
        passIDs.className = 'invisible-div';
        passIDs.name = 'cmsidlist';
        passIDs.value = ingredientfetchedID;
        div.appendChild(passIDs);

        var input = document.createElement('input');
        input.className = 'inputfield w-input';
        input.maxLength = 256;
        input.type = 'text';
        input.setAttribute('ingraddvalue', '');
        div.appendChild(input);

        var deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', function() {
            div.parentNode.removeChild(div);
            updateIngredientLists();
        });
        div.appendChild(deleteBtn);

        ingrlist.appendChild(div);
        updateIngredientLists();
    })
    .catch(error => console.error('Fetch error:', error));
})

});
</script>

