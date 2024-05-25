		const hotelData = 'data/data.json'; // ruta json
        const hotelContainer = document.getElementById('hotel-container');
        const lightbox = document.getElementById('lightbox');
        const lightboxContent = document.getElementById('lightbox-content');
        const sidebar = document.getElementById('sidebar');
        let allHotels = []; 

        // ubicacion json
        fetch(hotelData)
            .then(response => response.json())
            .then(data => {
                allHotels = data;
                loadHotels(allHotels);
            })
            .catch(error => console.error('Error fetching the hotel data:', error));

        // carga containner
        function loadHotels(hotels) {
            hotelContainer.innerHTML = '';
            hotels.forEach(hotel => {
                const hotelBox = document.createElement('div');
                hotelBox.className = 'hotel-box';

                const hotelImage = document.createElement('img');
                hotelImage.src = `data/images/${hotel.image}`;
                hotelImage.alt = hotel.name;

                const hotelInfo = document.createElement('div');
                hotelInfo.className = 'hotel-info';

                const hotelName = document.createElement('h3');
                hotelName.textContent = hotel.name;

                const starRating = document.createElement('div');
                starRating.className = 'star-rating';
                starRating.innerHTML = '★'.repeat(hotel.stars);

                const iconButtons = document.createElement('div');
                iconButtons.className = 'icon-buttons';
                hotel.amenities.forEach(icon => {
                    const iconElement = document.createElement('i');
                    iconElement.className = `fa fa-${icon}`;
                    iconButtons.appendChild(iconElement);
                });

                const hotelPrice = document.createElement('div');
                hotelPrice.className = 'hotel-price';

                const priceLabel = document.createElement('span');
                priceLabel.className = 'price-label';
                priceLabel.textContent = 'Precio noche por habitación';

                const price = document.createElement('div');
                price.className = 'price';
                price.innerHTML = `ARS <b>${hotel.price}</b>`;

                const viewButton = document.createElement('a');
                viewButton.href = '#';
                viewButton.className = 'btn';
                viewButton.textContent = 'VER HOTEL';

                hotelInfo.appendChild(hotelName);
                hotelInfo.appendChild(starRating);
                hotelInfo.appendChild(iconButtons);

                hotelPrice.appendChild(priceLabel);
                hotelPrice.appendChild(price);
                hotelPrice.appendChild(viewButton);

                hotelBox.appendChild(hotelImage);
                hotelBox.appendChild(hotelInfo);
                hotelBox.appendChild(hotelPrice);

                hotelContainer.appendChild(hotelBox);
            });
        }

        // filtro estrellas
        function filterHotelsByStars() {
            const selectedStar = document.querySelector('input[name="star-filter"]:checked').value;
            let filteredHotels = allHotels;
            console.log(`Selected Star: ${selectedStar}`); // Debug message

            if (selectedStar !== 'all') {
                filteredHotels = allHotels.filter(hotel => hotel.stars == selectedStar);
            }

            console.log(`Filtered Hotels: ${filteredHotels.length}`); // Debug message
            loadHotels(filteredHotels);
        }

        document.querySelectorAll('input[name="star-filter"]').forEach(radio => {
            radio.addEventListener('change', filterHotelsByStars);
            console.log(`Event listener added for: ${radio.id}`); // Debug message
        });

        // busqueda por nombre
        function searchHotels() {
            const searchTerm = document.getElementById('hotel-search').value.toLowerCase();
            const filteredHotels = allHotels.filter(hotel => hotel.name.toLowerCase().includes(searchTerm));
            displaySearchResults(filteredHotels);
        }

        // ver resultados ligth boxx
        function displaySearchResults(hotels) {
            lightboxContent.innerHTML = '';
            if (hotels.length > 0) {
                hotels.forEach(hotel => {
                    const hotelBox = document.createElement('div');
                    hotelBox.className = 'hotel-box';

                    const hotelImage = document.createElement('img');
                    hotelImage.src = `data/images/${hotel.image}`;
                    hotelImage.alt = hotel.name;

                    const hotelInfo = document.createElement('div');
                    hotelInfo.className = 'hotel-info';

                    const hotelName = document.createElement('h3');
                    hotelName.textContent = hotel.name;

                    const starRating = document.createElement('div');
                    starRating.className = 'star-rating';
                    starRating.innerHTML = '★'.repeat(hotel.stars);

                    const iconButtons = document.createElement('div');
                    iconButtons.className = 'icon-buttons';
                    hotel.amenities.forEach(icon => {
                        const iconElement = document.createElement('i');
                        iconElement.className = `fa fa-${icon}`;
                        iconButtons.appendChild(iconElement);
                    });

                    const hotelPrice = document.createElement('div');
                    hotelPrice.className = 'hotel-price';

                    const priceLabel = document.createElement('span');
                    priceLabel.className = 'price-label';
                    priceLabel.textContent = 'Precio noche por habitación';

                    const price = document.createElement('div');
                    price.className = 'price';
                    price.innerHTML = `ARS <b>${hotel.price}</b>`;

                    const viewButton = document.createElement('a');
                    viewButton.href = '#';
                    viewButton.className = 'btn';
                    viewButton.textContent = 'VER HOTEL';

                    hotelInfo.appendChild(hotelName);
                    hotelInfo.appendChild(starRating);
                    hotelInfo.appendChild(iconButtons);

                    hotelPrice.appendChild(priceLabel);
                    hotelPrice.appendChild(price);
                    hotelPrice.appendChild(viewButton);

                    hotelBox.appendChild(hotelImage);
                    hotelBox.appendChild(hotelInfo);
                    hotelBox.appendChild(hotelPrice);

                    lightboxContent.appendChild(hotelBox);
                });
                lightbox.style.display = 'flex';
            } else {
                lightboxContent.innerHTML = '<p>No se encontraron hoteles que coincidan con su búsqueda.</p>';
                lightbox.style.display = 'flex';
            }
        }

        // cierre ligth
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // boton side
        function toggleSidebar() {
            sidebar.classList.toggle('collapsed');
        }
