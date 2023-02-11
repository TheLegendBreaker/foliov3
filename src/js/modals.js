// render funcs

const setModalLoadingIndicator = (modal) => {
	const loading =
		"<div class='section__loading section__loading--modal'>Loading...</div>";
	modal.firstChild.innerHTML = loading;
};

const openArchive = async (modal, postType) => {
	setModalLoadingIndicator(modal);
	modal.classList.remove("modal--hidden");
	await getArchive(postType).then((archive) => {
		const body = document.createElement("div"),
			gallery = document.createElement("ul"),
			title = postType + " Gallery";
		className = "post-gallery";
		body.innerHTML = `<h2 class="modal__title">${title}</h2>`;
		body.className = "modal__body";
		gallery.className = className;
		archive.forEach((post) => {
			const li = document.createElement("li"),
				btn = setOpenArchiveSingleBtn(post.id);
			li.className = `${className}__entry`;
			let entry = `<h3 class="${className}__entry-title">${post.title.rendered}</h3>`;
			entry += `<figure class="${className}__entry-figure">`;
			entry += ` <img class="${className}__entry-img"src="${parseImgSrc(
				post
			)}" alt=""></figure>`;
			btn.className = "btn btn--archive-open-single";
			btn.innerHTML = `<span class="btn__label">${btn.innerText}</span>${entry}`;
			li.append(btn);

			gallery.append(li);
		});

		body.innerHTML = "";
		body.append(gallery);
		modal.firstChild.append(body);
		setCloseModalBtn(modal);
		body.classList.add("modal__body--fade-in");
	});
};

const closeModal = (modal) => {
	modal.classList.add("modal--hidden");
	setModalLoadingIndicator(modal);
};

const setCloseModalListener = (modal, btn) => {
	const close = () => {
		btn.remove();
		closeModal(modal);
	};
	addAction(btn, "click", close);
};

const setCloseModalBtn = (modal) => {
	const btn = document.createElement("button");
	btn.className = "btn btn--close-modal";
	setCloseModalListener(modal, btn);
	btn.innerHTML = "back to page";
	modal.firstChild.append(btn);
};

const setBackToArchiveBtn = (modal) => {
	const btn = document.createElement("button");
	setOpenArchiveListener(btn, modal, "clients");
	btn.innerHTML = "back to archive";
	btn.className = "btn btn--back";
	modal.firstChild.append(btn);
};

const setOpenArchiveListener = (btn, modal, postType) => {
	const open = () => {
		openArchive(modal, postType);
	};
	addAction(btn, "click", open);
};

const setOpenArchiveBtn = (postType) => {
	const modal = document.getElementById("modal");
	const btn = document.createElement("button");

	btn.className = "btn " + "btn--open-archive";
	btn.innerText = "View Archive";

	setOpenArchiveListener(btn, modal, postType);

	return btn;
};

const openArchiveSingle = (modal, id) => {
	setBackToArchiveBtn(modal);
	openSingle(modal, id);
};

const openSingle = async (modal, id) => {
	modal.classList.remove("modal--hidden");
	await getPostById(id).then((post) => {
		const body = document.createElement("div");
		body.innerHTML = `<h2 class="modal__title">${post.title.rendered}</h2>${post.content.rendered}`;
		body.className = "modal__body modal__body--single";

		modal.firstChild.innerHTML = "";
		modal.firstChild.append(body);
		setCloseModalBtn(modal);
	});
};

const setCloseSingleListener = (modal) => {
	const close = () => {
		closeModal(modal);
	};
	addAction(modal, "click", close);
};

const setOpenArchiveSingleListener = (btn, modal, postId) => {
	const open = () => {
		openArchiveSingle(modal, postId);
	};
	addAction(btn, "click", open);
};

const setOpenSingleListener = (btn, modal, postId) => {
	const open = () => {
		openSingle(modal, postId);
	};
	addAction(btn, "click", open);
};

const setBtn = (modCLass) => {
	const btn = document.createElement("button");

	btn.className = "btn " + "btn--" + modCLass;
	btn.innerText = "View more";

	return btn;
};

const setOpenArchiveSingleBtn = (postId) => {
	const modal = document.getElementById("modal");
	const btn = setBtn("open-archive-single");

	setOpenArchiveSingleListener(btn, modal, postId);

	return btn;
};

const setOpenSingleBtn = (postId) => {
	const modal = document.getElementById("modal");
	const btn = setBtn("open-single");

	setOpenSingleListener(btn, modal, postId);

	return btn;
};
