let archivo = null;
const card={
	WIDTH: 744,
	HEIGHT: 1037,
	SLOT: {
		NAME_COORD: [500,125],
		NAME_ATQ_COORD: [430,125],
		NAME_SPC_COORD: [370,125],
		NAME_VALUE: '',
		VIT_COORD: [85,100],
		VIT_VALUE: 0,
		ATQ_COORD: [215,110],
		ATQ_VALUE: 0,
		DEF_VALUE: 0,
		SPC_VALUE: 0,
		DESC_COORD: [450,865],
		DESC_VALUE: ''
	},
	CHAR_ATTR: {
		RACE: ['human', 'beast', 'robot', 'monster', 'esper'],
		RACE_SELECTED: 0,
		GENDER: ['female','male','nogender'],
		GENDER_SELECTED: 0,
		ALIGN: ['good', 'evil'],
		ALIGN_SELECTED: 0,
		POWER: ['hit', 'phisicalweapon', 'fireweapon', 'magic', 'mind'],
		POWER_SELECTED: 0
	}
};
var cardType = 0; //0 - Character, 1 - Attack, 2 - Defense, 3 - Heal, 4 - Special, 5 - Event

function loadImage(){
	const buttonLoadImg = document.getElementById('loadImg');
	
	buttonLoadImg.addEventListener('change', (event) => {
		archivo = event.target.files[0];
		if (!archivo) return;		
		
		document.getElementById('previewDiv').innerHTML="";
		newPreview();
		document.getElementById('previewMenuContainer').className="";
		document.getElementById('menu-download').className='menu-icon download';
	});
}

function newPreview(){
	
	
	var newCanvas = document.createElement('canvas');
	newCanvas.id = 'preview_0';
	newCanvas.width = card.WIDTH;
	newCanvas.height = card.HEIGHT;
	newCanvas.classList.add("preview");
	
	const img = new Image();

		var ctx = newCanvas.getContext("2d");

		img.onload = () => {
		  ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);

		  ctx.drawImage(img, 0, 0);

		  URL.revokeObjectURL(img.src);
		};

	img.src = URL.createObjectURL(archivo);
	
	var div = document.getElementById("previewDiv");
	div.appendChild(newCanvas);
	
	cardOptions();
	printPreview();
	
}

function cardOptions(){
	switch(cardType){
		case 0:
			document.getElementById('cardVit').className = '';
			document.getElementById('cardAtk').className = '';
			document.getElementById('cardDef').className = 'hidden';
			document.getElementById('carAttrContainer').className = '';
			break;
		case 1:
			document.getElementById('cardVit').className = 'hidden';
			document.getElementById('cardAtk').className = '';
			document.getElementById('cardDef').className = 'hidden';
			document.getElementById('carAttrContainer').className = 'hidden';
			break;
		case 2:
			document.getElementById('cardVit').className = 'hidden';
			document.getElementById('cardAtk').className = 'hidden';
			document.getElementById('cardDef').className = '';
			document.getElementById('carAttrContainer').className = 'hidden';
			break;
		case 3:
			document.getElementById('cardVit').className = '';
			document.getElementById('cardAtk').className = 'hidden';
			document.getElementById('cardDef').className = 'hidden';
			document.getElementById('carAttrContainer').className = 'hidden';
			break;
		case 4:
			document.getElementById('cardVit').className = 'hidden';
			document.getElementById('cardAtk').className = 'hidden';
			document.getElementById('cardDef').className = 'hidden';
			document.getElementById('carAttrContainer').className = 'hidden';
			break;
	}
}

function addPreviewLayer(count,imageName){
	return new Promise((resolve, reject) => {
		var newCanvas = document.createElement('canvas');
		newCanvas.id = 'preview_' + count;
		newCanvas.width = card.WIDTH;
		newCanvas.height = card.HEIGHT;
		newCanvas.classList.add("preview");
		
		const img = new Image();

			var ctx = newCanvas.getContext("2d");

			img.onload = () => {
				ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);
				ctx.drawImage(img, 0, 0);
				resolve();
			};

		img.src = './img/' + imageName;
		
		var div = document.getElementById("previewDiv");
		div.appendChild(newCanvas);
	});
}

async function addPreviewText(count){
		var newCanvas = document.createElement('canvas');
		newCanvas.id = 'preview_' + count;
		newCanvas.width = card.WIDTH;
		newCanvas.height = card.HEIGHT;
		newCanvas.classList.add("preview");
		
		const ctx = newCanvas.getContext('2d');
		
		ctx.font = '50px "PCCT Loud"';
		ctx.fillStyle = 'red';
		ctx.fillText('', 100, 100);
	
		var div = document.getElementById("previewDiv");
		div.appendChild(newCanvas);

	
}

function changePreviewText(canvasId, textInput, slotX, slotY,color,strokeWidth) {
	const canvas = document.getElementById(canvasId);
	
	if (!canvas) {
	console.error('No se encontró el canvas:', canvasId);
	return;
	}
	
	const ctx = canvas.getContext('2d');
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (!textInput) return;
	
	ctx.save();
	
	// Movemos el origen al punto donde queremos el texto
	ctx.translate(slotX, slotY);
	
	// Alineación horizontal centrada
	ctx.textAlign = 'center';
	
	// Rotamos 10 grados
	ctx.rotate(5.3 * Math.PI / 180);
	
	// Tamaño inicial
	let fontSize = 50;
	
	if(cardType == 0){
		// A partir del carácter 10 empezamos a reducir
		if (textInput.length > 10) {
			fontSize -= (textInput.length - 10) * 3;
		}
	}
		
	// Evitamos que llegue a ser demasiado pequeño
	fontSize = Math.max(fontSize, 25);
	
	ctx.font = fontSize + 'px "PCCT Loud"';
	ctx.lineJoin = 'round';
	
	// Reborde negro
	ctx.lineWidth = strokeWidth;
	ctx.strokeStyle = 'black';
	ctx.strokeText(textInput, 0, 0);
	
	// Color del Texto
	ctx.fillStyle = color;
	ctx.fillText(textInput, 0, 0);
	
	ctx.restore();
}

function changePreviewDescription(canvasId, textInput, slotX, slotY, color) {
	const canvas = document.getElementById(canvasId);

	if (!canvas) {
		console.error('No se encontró el canvas:', canvasId);
		return;
	}

	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (!textInput) return;

	ctx.save();

	ctx.translate(slotX, slotY);

	ctx.textAlign = 'center';

	// Rotación de la descripción
	ctx.rotate(-8 * Math.PI / 180);

	ctx.font = '30px "Laffayette Comic"';
	ctx.fillStyle = color;

	// Separar por saltos de línea
	const lines = textInput.split(/\r?\n/);

	// Separación entre líneas
	const lineHeight = 35;

	lines.forEach((line, index) => {
		const y = index * lineHeight;
		ctx.fillText(line, 0, y);
	});

	ctx.restore();
}

function changeCharAttribute(currentCanvas, imageName,type) {

	const canvas = document.getElementById(currentCanvas);

	const ctx = canvas.getContext('2d');
	const img = new Image();

	img.onload = function() {

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0);
	};

	img.src = './img/icons/' + type + '_' + imageName + '.png';
}

async function printPreview(){
	switch (cardType){
		case 0:
			await addPreviewLayer(1,'layers/lines.png')
			await addPreviewLayer(2,'layers/top_char.png');
			await addPreviewText(3);
			await addPreviewText(4);
			await addPreviewText(5);
			await addPreviewLayer(6,'layers/bottom.png');
			await addPreviewLayer(7,'layers/attributes.png');
			await addPreviewLayer(8,'icons/char_human.png');
			await addPreviewLayer(9,'icons/gender_female.png');
			await addPreviewLayer(10,'icons/align_good.png');
			await addPreviewLayer(11,'icons/power_hit.png');
			await addPreviewLayer(12,'icons/type_char.png');
			await addPreviewText(13);
			await addPreviewLayer(14,'layers/frame.png');
			break;
		case 1:
			await addPreviewLayer(1,'layers/lines.png')
			await addPreviewLayer(2,'layers/top_atk.png');
			await addPreviewText(3);
			await addPreviewText(4);
			await addPreviewText(5); //vacío
			await addPreviewLayer(6,'layers/bottom.png');
			await addPreviewText(7); //vacío
			await addPreviewText(8); //vacío
			await addPreviewText(9); //vacío
			await addPreviewText(10); //vacío
			await addPreviewText(11); //vacío
			await addPreviewLayer(12,'icons/type_attack.png');
			await addPreviewText(13);
			await addPreviewLayer(14,'layers/frame.png');
			break;
		case 2:
			await addPreviewLayer(1,'layers/lines.png')
			await addPreviewLayer(2,'layers/top_def.png');
			await addPreviewText(3);
			await addPreviewText(4);
			await addPreviewText(5); //vacío
			await addPreviewLayer(6,'layers/bottom.png');
			await addPreviewText(7); //vacío
			await addPreviewText(8); //vacío
			await addPreviewText(9); //vacío
			await addPreviewText(10); //vacío
			await addPreviewText(11); //vacío
			await addPreviewLayer(12,'icons/type_defense.png');
			await addPreviewText(13);
			await addPreviewLayer(14,'layers/frame.png');
			break;
		case 3:
			await addPreviewLayer(1,'layers/lines.png')
			await addPreviewLayer(2,'layers/top_heal.png');
			await addPreviewText(3);
			await addPreviewText(4);
			await addPreviewText(5); //vacío
			await addPreviewLayer(6,'layers/bottom.png');
			await addPreviewText(7); //vacío
			await addPreviewText(8); //vacío
			await addPreviewText(9); //vacío
			await addPreviewText(10); //vacío
			await addPreviewText(11); //vacío
			await addPreviewLayer(12,'icons/type_heal.png');
			await addPreviewText(13);
			await addPreviewLayer(14,'layers/frame.png');
			break;
		case 4:
			await addPreviewLayer(1,'layers/lines.png')
			await addPreviewLayer(2,'layers/top_spc.png');
			await addPreviewText(3);
			await addPreviewText(4); //vacio
			await addPreviewText(5); //vacío
			await addPreviewLayer(6,'layers/bottom.png');
			await addPreviewText(7); //vacío
			await addPreviewText(8); //vacío
			await addPreviewText(9); //vacío
			await addPreviewText(10); //vacío
			await addPreviewText(11); //vacío
			await addPreviewLayer(12,'icons/type_special.png');
			await addPreviewText(13);
			await addPreviewLayer(14,'layers/frame.png');
			break;
	}	
}

function printCard(){
	return new Promise((resolve, reject) => {
	const canvas = document.getElementById('card');
	const imagen = new Image();

	var ctx = canvas.getContext("2d");

	imagen.onload = () => {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  ctx.drawImage(imagen, 0, 0);

	  URL.revokeObjectURL(imagen.src);
	};

	imagen.onerror = () => {
	  URL.revokeObjectURL(imagen.src);
	  console.error('No se ha podido cargar la imagen.');
	};

	imagen.src = URL.createObjectURL(archivo);
	
	addCompleteLayers(cardType);
	resolve();
	});
}

async function addCompleteLayers(type){
	switch(type){
		case 0:
			await addNewLayer('/layers/lines.png');
			await addNewLayer('/layers/top_char.png');
			await addTextLayer('card',card.SLOT.NAME_VALUE,card.SLOT.NAME_COORD[0],card.SLOT.NAME_COORD[1],'red');
			await addTextLayer('card',card.SLOT.VIT_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white');
			await addTextLayer('card',card.SLOT.ATQ_VALUE,card.SLOT.ATQ_COORD[0],card.SLOT.ATQ_COORD[1],'white');
			await addNewLayer('/layers/bottom.png');
			await addTextDescription('card',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1]);
			await addNewLayer('/layers/attributes.png');
			await addNewLayer('/icons/char_' + card.CHAR_ATTR.RACE[card.CHAR_ATTR.RACE_SELECTED] + '.png');
			await addNewLayer('/icons/gender_' + card.CHAR_ATTR.GENDER[card.CHAR_ATTR.GENDER_SELECTED] + '.png');
			await addNewLayer('/icons/align_' + card.CHAR_ATTR.ALIGN[card.CHAR_ATTR.ALIGN_SELECTED] + '.png');
			await addNewLayer('/icons/power_' + card.CHAR_ATTR.POWER[card.CHAR_ATTR.POWER_SELECTED] + '.png');
			await addNewLayer('/icons/type_char.png');
			await addNewLayer('/layers/frame.png');
			break;
		case 1:
			await addNewLayer('/layers/lines.png');
			await addNewLayer('/layers/top_atk.png');
			await addTextLayer('card',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red');
			await addTextLayer('card',card.SLOT.ATQ_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white');
			await addNewLayer('/layers/bottom.png');
			await addTextDescription('card',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1]);
			await addNewLayer('/icons/type_attack.png');
			await addNewLayer('/layers/frame.png');
			break;
		case 2:
			await addNewLayer('/layers/lines.png');
			await addNewLayer('/layers/top_def.png');
			await addTextLayer('card',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red');
			await addTextLayer('card',card.SLOT.DEF_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white');
			await addNewLayer('/layers/bottom.png');
			await addTextDescription('card',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1]);
			await addNewLayer('/icons/type_defense.png');
			await addNewLayer('/layers/frame.png');
			break;
		case 3:
			await addNewLayer('/layers/lines.png');
			await addNewLayer('/layers/top_heal.png');
			await addTextLayer('card',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red');
			await addTextLayer('card',card.SLOT.HEAL_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white');
			await addNewLayer('/layers/bottom.png');
			await addTextDescription('card',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1]);
			await addNewLayer('/icons/type_heal.png');
			await addNewLayer('/layers/frame.png');
			break;
		case 4:
			await addNewLayer('/layers/lines.png');
			await addNewLayer('/layers/top_spc.png');
			await addTextLayer('card',card.SLOT.NAME_VALUE,card.SLOT.NAME_SPC_COORD[0],card.SLOT.NAME_SPC_COORD[1],'red');
			await addNewLayer('/layers/bottom.png');
			await addTextDescription('card',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1]);
			await addNewLayer('/icons/type_special.png');
			await addNewLayer('/layers/frame.png');
			break;
	}
	
	//addTextLayer('card',document.getElementById('txtName').value);
}

function addNewLayer(imageName) {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById('card');
        const ctx = canvas.getContext('2d');

        const img = new Image();

        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            resolve();
        };

        img.onerror = function() {
            reject(new Error('No se pudo cargar: ' + imageName));
        };

        img.src = './img/' + imageName;
    });
}

function addTextLayer(canvasId,textInput,slotX, slotY, color){
	return new Promise((resolve, reject) => {
		const canvas = document.getElementById(canvasId);
		
		const ctx = canvas.getContext('2d');
		
		ctx.save();
		// Movemos el origen al punto donde queremos el texto
		ctx.translate(slotX, slotY);
		
		// Alineación horizontal centrada
		ctx.textAlign = 'center';
		
		// Rotamos 10 grados
		ctx.rotate(5.5 * Math.PI / 180);
		
		// Tamaño inicial
		let fontSize = 50;
		
		// A partir del carácter 10 empezamos a reducir
		if (textInput.length > 10) {
			fontSize -= (textInput.length - 10) * 3;
		}
		
		// Evitamos que llegue a ser demasiado pequeño
		fontSize = Math.max(fontSize, 25);
		
		ctx.font = fontSize + 'px "PCCT Loud"';
		ctx.lineJoin = 'round';
		
		// Reborde negro
		ctx.lineWidth = 6;
		ctx.strokeStyle = 'black';
		ctx.strokeText(textInput, 0, 0);
		
		// Color del Texto
		ctx.fillStyle = color;
		ctx.fillText(textInput, 0, 0);
		
		ctx.restore();
		resolve();
	});
}

function addTextDescription(canvasId, textInput, slotX, slotY) {
	return new Promise((resolve, reject) => {
		const canvas = document.getElementById(canvasId);

		const ctx = canvas.getContext('2d');

		ctx.save();

		ctx.translate(slotX, slotY);

		ctx.textAlign = 'center';

		// Rotación de la descripción
		ctx.rotate(-8 * Math.PI / 180);

		ctx.font = '30px "Laffayette Comic"';
		ctx.fillStyle = 'black';

		// Separar por saltos de línea
		const lines = textInput.split(/\r?\n/);

		// Separación entre líneas
		const lineHeight = 35;

		lines.forEach((line, index) => {
			const y = index * lineHeight;
			ctx.fillText(line, 0, y);
		});

		ctx.restore();
		resolve();
	});
}

function addTexts(){
	const txtName = document.getElementById('txtName');
	txtName.addEventListener('input', function () {
		card.SLOT.NAME_VALUE = document.getElementById('txtName').value;
		switch(cardType){
			case 0:
				changePreviewText('preview_5',card.SLOT.NAME_VALUE,card.SLOT.NAME_COORD[0],card.SLOT.NAME_COORD[1],'red',6);
				break;
			case 1:
				changePreviewText('preview_5',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red',6);
				break;
			case 2:
				changePreviewText('preview_5',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red',6);
				break;
			case 3:
				changePreviewText('preview_5',card.SLOT.NAME_VALUE,card.SLOT.NAME_ATQ_COORD[0],card.SLOT.NAME_ATQ_COORD[1],'red',6);
				break;
			case 4:
				changePreviewText('preview_5',card.SLOT.NAME_VALUE,card.SLOT.NAME_SPC_COORD[0],card.SLOT.NAME_SPC_COORD[1],'red',6);
				break;
		}
		
	});
	txtVit.addEventListener('input', function () {
		switch(cardType){
			case 0:
				card.SLOT.VIT_VALUE = document.getElementById('txtVit').value;
				changePreviewText('preview_3',card.SLOT.VIT_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white',6);
				break;
			case 3:
				card.SLOT.HEAL_VALUE = document.getElementById('txtVit').value;
				changePreviewText('preview_3',card.SLOT.HEAL_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white',6);
				break;
		}
		
	});
	txtAtq.addEventListener('input', function () {
		card.SLOT.ATQ_VALUE = document.getElementById('txtAtq').value;
		switch(cardType){
			case 0:
				changePreviewText('preview_4',card.SLOT.ATQ_VALUE,card.SLOT.ATQ_COORD[0],card.SLOT.ATQ_COORD[1],'white',6);
				break;
			case 1:
				changePreviewText('preview_4',card.SLOT.ATQ_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white',6);
				break;
		}
	});
	txtDef.addEventListener('input', function () {
		card.SLOT.DEF_VALUE = document.getElementById('txtDef').value;
		switch(cardType){
			case 2:
				changePreviewText('preview_4',card.SLOT.DEF_VALUE,card.SLOT.VIT_COORD[0],card.SLOT.VIT_COORD[1],'white',6);
				break;
		}
	});
	
	txtDesc.addEventListener('input', function () {
		card.SLOT.DESC_VALUE = document.getElementById('txtDesc').value;
		changePreviewDescription('preview_13',card.SLOT.DESC_VALUE,card.SLOT.DESC_COORD[0],card.SLOT.DESC_COORD[1],'black',0);//canvasID,text,x,y,textColor,strokeWidth,isDescription
	});
}

function menuListeners(){
	//CHARS
	document.getElementById('menu-char').addEventListener('click', function () {
		cardType = 0;
		document.getElementById('wrapper').className='';
		document.getElementById('previewMenuContainer').className='hidden';
	});
	
	//ATK
	document.getElementById('menu-attack').addEventListener('click', function () {
		cardType = 1;
		document.getElementById('wrapper').className='';
		document.getElementById('previewMenuContainer').className='hidden';
	});
	
	//DEF
	document.getElementById('menu-defense').addEventListener('click', function () {
		cardType = 2;
		document.getElementById('wrapper').className='';
		document.getElementById('previewMenuContainer').className='hidden';
	});
	
	//HEAL
	document.getElementById('menu-heal').addEventListener('click', function () {
		cardType = 3;
		document.getElementById('wrapper').className='';
		document.getElementById('previewMenuContainer').className='hidden';
	});
	
	//SPECIAL
	document.getElementById('menu-special').addEventListener('click', function () {
		cardType = 4;
		document.getElementById('wrapper').className='';
		document.getElementById('previewMenuContainer').className='hidden';
	});
	
	//EVENT
	document.getElementById('menu-event').addEventListener('click', function () {
		cardType = 5;
	});
	
	//DOWNLOAD
	document.getElementById('menu-download').addEventListener('click', function () {
		printCard();

		setTimeout(() => {
			downloadCanvas();
		}, 1000);
	});
	
	//CHAR ATTRIBUTES
	
	//RACE
	for (let i = 0; i < card.CHAR_ATTR.RACE.length; i++) {

		const race = card.CHAR_ATTR.RACE[i];
		document.getElementById('race-' + race).addEventListener('click', function () {

			card.CHAR_ATTR.RACE_SELECTED = i;
			
			changeCharAttribute('preview_8', race, 'char');
		});
	}
	
	//GENDER
	for (let i = 0; i < card.CHAR_ATTR.GENDER.length; i++) {

		const gender = card.CHAR_ATTR.GENDER[i];
		document.getElementById('gender-' + gender).addEventListener('click', function () {

			card.CHAR_ATTR.GENDER_SELECTED = i;
			
			changeCharAttribute('preview_9', gender, 'gender');
		});
	}
	
	//ALIGN
	for (let i = 0; i < card.CHAR_ATTR.ALIGN.length; i++) {

		const align = card.CHAR_ATTR.ALIGN[i];
		document.getElementById('align-' + align).addEventListener('click', function () {

			card.CHAR_ATTR.ALIGN_SELECTED = i;
			
			changeCharAttribute('preview_10', align, 'align');
		});
	}
	
	//POWER
	for (let i = 0; i < card.CHAR_ATTR.POWER.length; i++) {

		const power = card.CHAR_ATTR.POWER[i];
		document.getElementById('power-' + power).addEventListener('click', function () {

			card.CHAR_ATTR.POWER_SELECTED = i;
			
			changeCharAttribute('preview_11', power, 'power');
		});
	}
}



function downloadCanvas() {
    const canvas = document.getElementById('card');

    try {
        const data = canvas.toDataURL('image/png');
        console.log('Canvas exportable');
        
        const enlace = document.createElement('a');
        enlace.download = 'mi-carta.png';
        enlace.href = data;
        enlace.click();

    } catch (error) {
        console.error('NO se puede exportar:', error);
    }
}

window.onload = function(){
	menuListeners();
	loadImage();
	addTexts();
}