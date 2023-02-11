// render funcs
const parseImgSrc = (data) => {
	return data._embedded["wp:featuredmedia"][0].source_url;
};

const parseImgSlug = (data) => {
	return data._embedded["wp:featuredmedia"][0].slug;
};
const setContentHtml = (data, param) => {
	return `
			<div class="card__summary">
				<div class="card__summary-content">
					${data.excerpt.rendered}
				</div>
				<div class="card__cta-box card__cta-box--hidden">
					<a href="/clients/${data.id}" class="card__cta-btn">
						Read more.
					</a>
					<a href="/cardImg?${param}" class="card__view-cardImg-btn">
						View mock up.
					</a>
				</div>
			</div>
			`;
};

const prefix = "card__";
const setCardFigure = () => {
	const figure = document.createElement("figure");
	figure.className = prefix + "figure";
	return figure;
};
const setCardMockup = () => {
	const mockup = document.createElement("mockup");
	mockup.className = prefix + "mockup";
	return mockup;
};
const setCardImg = () => {
	const cardImg = document.createElement("img");
	cardImg.className = prefix + "figure-img";
	return cardImg;
};
const setCardArticle = () => {
	const card = document.createElement("article");
	card.className = "card";
	return card;
};
const setCardTitle = (data) => {
	const title = document.createElement("h4");
	title.className = prefix + "title";
	title.innerText = data.title.rendered;
	return title;
};
const setCard = (data) => {
	const content = setContentHtml(data),
		btn = setOpenSingleBtn(data.id),
		title = setCardTitle(data),
		figure = setCardFigure(),
		card = setCardArticle(),
		cardImg = setCardImg();

	card.innerHTML = content;
	body = card.querySelector(".card__summary");
	body.append(btn);


	figure.append(cardImg);
	card.append(figure);

	card.prepend(title);

	return card;
};

const setImgOnloadGetCard = (cardImg, card) => {
	cardImg.onload = () => {
		return card;
	};
};

const getCardImg = (card) => {
	return card.querySelector(".card__figure-img");
};

const getImgOnloadGetCard = (data) => {
	const card = setCard(data);

	const cardImg = getCardImg(card);

	setImgOnloadGetCard(cardImg, card);

	return cardImg;
};

renderFolioClientsExcerpt = async function () {
	await getThreeClients()
		.then((items) => {
			const container = document.querySelector("#folio .section__clients-body");
			removeLoadingUi(container);
			renderCards(items, container);
		})
		.catch((err) => console.log(err));
};

const renderCards = (items, container) => {
	let imgSrc = "",
		param = "";

	container
		.querySelector(".section__loading")
		.classList.add("section__loading--onload");

	for (const i in items) {
		const cardImg = getImgOnloadGetCard(items[i]),
			card = cardImg.onload();

		cardImg.onload = () => {
			container.append(card);
			addLoadedUi(card);
		};
		if (items[i]._embedded["wp:featuredmedia"]) {
			imgSrc = parseImgSrc(items[i]);
			param = parseImgSlug(items[i]);
		}
		cardImg.src = imgSrc;
	}
};

renderFolioProjectsExcerpt = async function () {
	// Add open single as modal eventlistener call back.
	await getProjects()
		.then((items) => {
			const container = document.querySelector(
				"#folio .section__projects-body"
			);
			renderCards(items, container);
		})
		.catch((err) => console.log(err));
};

// page actions

let target, lastTarget;

scrollActions = function () {
	const navLinks = document.querySelectorAll(".section__nav-link"),
		scrollPosition = window.scrollY,
		length = navLinks.length;

	if (scrollPosition > 300) {
		if (target !== length - 1) target = length - 1;
		else return;
		console.log("third section");
	} else if (scrollPosition > 200) {
		if (target !== length - 2) target = length - 2;
		else return;
		console.log("second section");
	} else if (scrollPosition > 100) {
		if (target !== length - 3) target = length - 3;
		else return;
		console.log("first section");
	}
	navLinks.forEach((link, i) => {
		if (i === target) link.classList.add("section__nav-link--selected");
		else link.classList.remove("section__nav-link--selected");
	});
	lastTarget = target;
};

//addEventListener("scroll", scrollActions);
// end page actions
const removeLoadingUi = () => {
	document.getElementById("folio").classList.remove("section--loading");
};
const addLoadedUi = (element) => {
	element.classList.add("section--loaded");
};
const addLoadInUi = (element) => {
	element.classList.add("section--loadin");
};

const onPageLoad = () => {
	const sections = [
		document.getElementById("footer").querySelector(".section"),
		document.getElementById("contact"),
		document.getElementById("folio"),
	];
	addLoadedUi(document.getElementById("hero"));

	sections.forEach((section) => {
		addLoadInUi(section);
	});
};
// invoke

docReady(() => {
	onPageLoad();
	renderFolioClientsExcerpt();
	renderFolioProjectsExcerpt();
	renderCarousel();
});

//renderFolioReviewExcerpts();
//renderXpItems();
//renderStack();

// end invoke
