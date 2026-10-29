document.addEventListener('DOMContentLoaded', function () {
	const booksEndpoint = 'https://raw.githubusercontent.com/prof-lucassilva/api-books/main/livros.json';
	const bookList = document.getElementById('book-list');
	const totalBooks = document.getElementById('total-books');
	const status = document.getElementById('status');

	fetch(booksEndpoint)
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Erro ao buscar os livros');
			}
			return response.json();
		})
		.then(function (books) {
			bookList.innerHTML = '';

			books.forEach(function (book, index) {
				const card = document.createElement('article');
				card.className = 'rounded-xl border border-slate-200 bg-white p-4 shadow transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg';
				card.style.animation = 'fadeUp 0.45s ease both';
				card.style.animationDelay = `${index * 80}ms`;

				card.innerHTML = `
          <img
            src="${book.imagem}"
            alt="Capa do livro ${book.titulo}"
            class="mb-3 h-56 w-full rounded-lg object-contain bg-slate-50"
          >
          <h3 class="text-lg font-semibold">${book.titulo}</h3>
          <p class="mt-2 text-sm text-slate-700">${book.resumo}</p>
        `;

				bookList.appendChild(card);
			});
		})
		.catch(function (error) {
			console.error(error);
			status.textContent = 'Nao foi possivel carregar os livros.';
			status.classList.remove('animate-pulse');
			bookList.innerHTML =
				'<p class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">Tente novamente mais tarde.</p>';
		});
});