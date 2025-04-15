document.addEventListener('DOMContentLoaded', function() {
    const galleryDiv = document.querySelector('.gallery');
    const imagePath = 'img/Ogmur/';

    // Функция для динамической загрузки изображений (на стороне клиента)
    function loadImages() {
        // Внимание: JavaScript на стороне клиента не имеет прямого доступа к файловой системе сервера.
        // Этот код предполагает, что у вас есть какой-то серверный скрипт (например, на PHP, Python, Node.js),
        // который возвращает список файлов в папке img/Ogmur в формате JSON.

        fetch('get_images.php') // Замените на URL вашего серверного скрипта
            .then(response => response.json())
            .then(data => {
                data.forEach(imageName => {
                    const img = document.createElement('img');
                    img.src = imagePath + imageName;
                    img.alt = imageName;
                    galleryDiv.appendChild(img);

                    // Добавляем обработчик клика для открытия модального окна
                    img.addEventListener('click', function() {
                        openModal(this.src, this.alt);
                    });
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки списка изображений:', error);
                galleryDiv.innerHTML = '<p>Не удалось загрузить изображения.</p>';
            });
    }

    // Загрузка изображений при загрузке страницы
    loadImages();

    // Реализация модального окна (lightbox)
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('img');
    modalContent.classList.add('modal-content');
    modalContent.id = 'image';
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';

    modal.appendChild(modalContent);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);

    function openModal(src, alt) {
        modal.style.display = 'block';
        modalContent.src = src;
        modalContent.alt = alt;
    }

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});