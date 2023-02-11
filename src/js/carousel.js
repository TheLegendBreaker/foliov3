const doublyLinkedList = (list, index) => {
	const value = list[index],
		prefix = "carousel__img",
		displayClass = prefix + "--display",
		scrollClass = prefix + "--scroll",
		length = list.length;

	const removeClass = (cssClass) => {
		value.classList.remove(cssClass);
	};

	const addClass = (cssClass) => {
		value.classList.add(cssClass);
	};

	const removeDisplayClass = () => {
		removeClass(displayClass);
	};

	const removeScrollClass = () => {
		removeClass(scrollClass);
	};

	const addDisplayClass = () => {
		addClass(displayClass);
	};

	const addScrollClass = () => {
		addClass(scrollClass);
	};

	const previous = () => {
		previousIndex = index - 1;
		if (previousIndex < 0) {
			previousIndex = length - 1;
		}
		return doublyLinkedList(list, previousIndex);
	};

	const element = () => {
		return { 
			removeDisplayClass,
			removeScrollClass,
			addDisplayClass,
			addScrollClass,
			value,
		};
	};

	const next = () => {
		nextIndex = index + 1;
		if (nextIndex >= length) {
			nextIndex = 0;
		}
		return doublyLinkedList(list, nextIndex);
	};

	return {
		previous,
		element,
		next,
	};
};

const runCarousel = (mockupELements) => {
	let mockups = doublyLinkedList(mockupELements, mockupELements.length - 1),
		lastRequest = 0,
		lastRender = 0;

	let displayLimit = 4000;

	const run = (timeStamp) => {
		const progress = timeStamp - lastRender;
		if (progress >= displayLimit) {
			const element = mockups.element();
				mockups = mockups.previous();
			const previous = mockups.element();

			element.removeDisplayClass();
			previous.removeScrollClass();

			element.addScrollClass();
			previous.addDisplayClass();

			lastRender = timeStamp;
		}
		requestAnimationFrame(run);
	};

	run();
};

const renderCarousel = () => {
	const container = document.getElementById("carousel");
	getCarousel().then((response) => {
		container.innerHTML = response[0].content.rendered;
		const mockups = container.children;
		runCarousel(mockups);
	});
};
