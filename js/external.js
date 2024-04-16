// Listen for clicks on any checkbox with the attribute 'setlist'
document.querySelectorAll('input[type="checkbox"][setlist]').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      var ingrID = this.getAttribute('cms-id');
      var inputCheckboxElement = document.querySelector(`input[checkbox="${ingrID}"]`);
      var inputIDElement = document.querySelector(`input[valueID="${ingrID}"]`);
      var textopm = document.querySelector(`input[textopm="${ingrID}"]`).value;
      var prevopm = document.querySelector(`input[prevopm="${ingrID}"]`).value;
        if (this.checked) {
                inputCheckboxElement.value = "checked";
                inputIDElement.value = ingrID;
            		  fetch(`https://hook.eu1.make.com/vle69s2s7v1ug8g7xakuautuxvjy65mu?itemName=${ingrID}&itemID=${ingrID}&textopm=${textopm}&prevopm=${prevopm}&boodschaplijst=checked`);
        } else {
            inputCheckboxElement.value = "empty";
                inputIDElement.value = ingrID;
            		  fetch(`https://hook.eu1.make.com/vle69s2s7v1ug8g7xakuautuxvjy65mu?itemName=${ingrID}&itemID=${ingrID}&boodschaplijst=empty`);
        }
    });
});

        const dataString = "{{wf {&quot;path&quot;:&quot;ids-en-hoeveelheden&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
        console.log(dataString);
        const pairs = dataString.split('+20+');
        console.log(pairs);
        let idAmountMap = {};

        pairs.forEach(pair => {
            const parts = pair.split(' x20x ');
            const id = parts[0].trim();
            console.log(id);
            const amount = parts[1].trim();
            idAmountMap[id] = amount;
        });

        const mainInput = document.getElementById('mainInput');
        function updateOtherInputs() {
            const mainValue = mainInput.value
            const otherInputs = document.querySelectorAll('input[textopm]');
            otherInputs.forEach(input => {
                if (idAmountMap[input.getAttribute('textopm')] !== undefined) {
                		const hoeveelheid = (idAmountMap[input.getAttribute('textopm')]);
               
                    input.value = `Voor gerecht {{wf {&quot;path&quot;:&quot;gerecht-naam&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }} (${hoeveelheid} maal ${mainValue}) <br>`;
                }
            });
        }
        mainInput.addEventListener('input', updateOtherInputs);
