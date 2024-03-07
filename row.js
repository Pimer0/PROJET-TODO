const rows = document.querySelectorAll(".row");

const colors = ["green", "aquamarine", "yellow", "orange", "orangered", "red"];

const onDragOver = (event) => {
	event.preventDefault();
};

const onDrop = (event) => {
	event.preventDefault();
	console.log(event, event.dataTransfer, event.dataTransfer.getData("text"));
	const draggedCardId = event.dataTransfer.getData("text");
	const draggedCard = document.getElementById(draggedCardId);
	console.log(draggedCardId);
	event.target.appendChild(draggedCard);
	console.log("dropped the element");
};

rows.forEach((row, index) => {
	const label = row.querySelector(".label");
	label.style.backgroundColor = colors[index];
	row.ondragover = onDragOver;
	// row.ondrop = onDrop;
	row.setAttribute("ondrop", "onDrop(event)");
});
