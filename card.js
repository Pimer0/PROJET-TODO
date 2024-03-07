const cards = document.querySelectorAll(".card-container");

const onDragStart = (event) => {
	console.log("dragging the element");
	console.log(event.target.parentNode, event.target.parentNode.id);
	event.dataTransfer.setData("text", event.target.id);
	console.log(event.dataTransfer);
};

const onDragEnd = (event) => {
	event.target.style.visibility = "visible";
	console.log("ended the drag");
};
cards.forEach((card) => {
	card.ondragstart = onDragStart;
	card.ondragend = onDragEnd;
});
