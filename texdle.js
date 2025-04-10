window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};

const latexCode = '\\mathbb{R}';

document.addEventListener("keydown", (e) => {
    let key = String(e.key);
    if (key === "Enter") {
        submitans();
    }
});

window.onload = () => {
  buildInputBoxes();
};


/*
 * A hint is an arraw of size ans.length of 0, 1 or 2
 *
 * green - means that the char is correct in the correct position
 * yellow - means that the char is correct in the wrong position
 * gray - means that the char is wrong
 *
 */
function makeHint(ans) {

	let hint = [];	
	let correctAnswer = latexCode.toLowerCase();

	for (let i = 0; i < ans.length; ++i) {

		hint[i] = 'gray';

		if (correctAnswer.includes(ans[i].toLowerCase()))
			hint[i] = '#eab308';

		if (i < correctAnswer.length && ans[i].toLowerCase() == correctAnswer[i])
			hint[i] = 'green';
		
	}
	return hint;
}


function buildWordBox(letters, colors) {

    if (letters.length !== colors.length) {
        throw new Error("Arrays must be of the same length.");
    }

    	// Create the container div
    	const container = document.createElement("div");
    	container.style.display = "flex";
    	container.style.gap = "5px";
	container.style.marginBottom = "10px";

    // Create each letter box
    for (let i = 0; i < letters.length; i++) {
        const box = document.createElement("div");
        box.textContent = letters[i];
        box.style.backgroundColor = colors[i];
        box.style.color = "white";
        box.style.fontWeight = "bold";
        box.style.width = "40px";
        box.style.height = "40px";
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "center";
        box.style.borderRadius = "5px";
        container.appendChild(box);
    }

    return container;
}

function submitans() {

	let gameBoard = document.getElementById("game-board"); 
	let ans = document.getElementById('ans').value;
	document.getElementById('ans').value = "";

	if (!ans.length)
		return;

	const wordBox = buildWordBox(ans, makeHint(ans));
	gameBoard.appendChild(wordBox);

}

