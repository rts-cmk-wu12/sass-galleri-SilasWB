    // Load JSON data
    fetch('imgs.json')
      .then(response => response.json())
      .then(data => {
        const imgContainer = document.querySelector('.img-container');
        const modal = createModal();

        // Create and append image elements
        data.products.forEach(product => {
          const imgElement = createImageElement(product);
          imgContainer.appendChild(imgElement);

          // Add click event to open modal
          imgElement.addEventListener('click', () => openModal(modal, product));
        });
      })

    function createImageElement(product) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-div';

      const img = document.createElement('img');
      img.src = `../imgs/${product.image}`;
      img.alt = product.name;
      img.className = 'gallery-img';

      const overlay = document.createElement('div');
      overlay.className = 'img-overlay';
      overlay.textContent = product.name;

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(overlay);

      return imgWrapper;
    }

    function createModal() {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">×</span>
          <img id="modal-img" src="" alt="">
          <h2 id="modal-title"></h2>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('.close');
      closeBtn.addEventListener('click', () => modal.style.display = 'none');

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      return modal;
    }

    function openModal(modal, product) {
      const modalImg = modal.querySelector('#modal-img');
      const modalTitle = modal.querySelector('#modal-title');

      modalImg.src = `../imgs/${product.image}`;
      modalImg.alt = product.name;
      modalTitle.textContent = product.name;

      modal.style.display = 'block';
    }
