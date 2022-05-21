export class MainContent {
	constructor(options) {
		this.main = document.querySelector(options.main);
		this.cols = document.querySelectorAll(options.cols);
		this.leftColumn = document.querySelector(options.leftColumn);
		this.middleColumn = document.querySelector(options.middleColumn);
		this.rightColumn = document.querySelector(options.rightColumn);
		this.columnHideClass = options.columnHideClass;
	}


	leftMiddle(content) {
		this.rightColumn.classList.add(this.columnHideClass);
		this.middleColumn.style.flexGrow = '2';
		this.middleColumn.append(content);
	}

	standart() {
		this.cols.forEach(item => {
			item.classList.remove(this.columnHideClass);
		});
		this.middleColumn.style.flexGrow = '1';
	}

	left(content) {
		this.leftColumn.append(content);
	}

}
