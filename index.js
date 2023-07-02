fetch('db.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateMovieMenu(data.films);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function updateMovieMenu(films) {
  const filmsList = document.getElementById('films');
  filmsList.innerHTML = '';

  films.forEach(film => {
    const listItem = document.createElement('li');
    listItem.textContent = film.title;
    listItem.addEventListener('click', () => updateSelectedFilm(film, listItem));
    filmsList.appendChild(listItem);
  });
}

function updateSelectedFilm(film, listItem) {
  const { poster, title, runtime, showtime, capacity, tickets_sold, description } = film;
  const availableTickets = capacity - tickets_sold;

  document.getElementById('poster').src = poster;
  document.getElementById('title').textContent = title;
  document.querySelector('.movie-runtime').textContent = `Runtime: ${runtime} minutes`;
  document.querySelector('.movie-showtime').textContent = `Showtime: ${showtime}`;
  document.querySelector('.movie-available-tickets').textContent = `Available Tickets: ${availableTickets}`;
  document.querySelector('.movie-description').textContent = description;

  document.querySelectorAll('.film').forEach(film => film.classList.remove('selected'));
  listItem.classList.add('selected');

  const buyTicketButton = document.getElementById('buy-ticket');
  const availableTicketsElement = document.querySelector('.movie-available-tickets');

  buyTicketButton.onclick = () => {
    if (availableTickets <= 0) {
      alert('No tickets available.');
      return;
    }

    const ticketsToPurchase = parseInt(prompt(`How many tickets would you like to purchase? (Available: ${availableTickets})`));

    if (isNaN(ticketsToPurchase) || ticketsToPurchase <= 0 || ticketsToPurchase > availableTickets) {
      alert('Invalid ticket quantity.');
      return;
    }

    film.tickets_sold += ticketsToPurchase;
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets - ticketsToPurchase}`;

    alert(`Successfully purchased ${ticketsToPurchase} ticket(s) for ${film.title}`);
  };
}
