document.addEventListener('DOMContentLoaded', function() {
    fetch('../php/lista_favoritos.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const favoritesList = document.querySelector('.favorites-list');
                data.data.forEach(oferta => {
                    const li = document.createElement('li');
                    li.classList.add('favorite-item');

                    const details = document.createElement('details');
                    const summary = document.createElement('summary');
                    const img = document.createElement('img');
                    const infoDiv = document.createElement('div');
                    const h2 = document.createElement('h2');
                    const pCargo = document.createElement('p');
                    const contentDiv = document.createElement('div');
                    const h3Funciones = document.createElement('h3');
                    const ulFunciones = document.createElement('ul');
                    const infoJobDiv = document.createElement('div');
                    const h3Lugar = document.createElement('h3');
                    const pLugar = document.createElement('p');
                    const h3Tiempo = document.createElement('h3');
                    const pTiempo = document.createElement('p');
                    const applyBtn = document.createElement('button');

                    img.src = oferta.img;
                    img.classList.add('icono');
                    infoDiv.classList.add('info');
                    h2.textContent = oferta.nombreEmpresa;
                    pCargo.textContent = oferta.cargoEmpresa;
                    contentDiv.classList.add('content');
                    h3Funciones.textContent = 'Funciones';

                    oferta.funcionEmpresa.split("\n").forEach(funcion => {
                        const liFuncion = document.createElement('li');
                        liFuncion.textContent = funcion;
                        ulFunciones.appendChild(liFuncion);
                    });

                    infoJobDiv.classList.add('info-job');
                    h3Lugar.textContent = 'Lugar';
                    pLugar.textContent = oferta.lugar;
                    h3Tiempo.textContent = 'Tiempo';
                    pTiempo.textContent = oferta.tiempo;

                    applyBtn.classList.add('apply-btn');
                    applyBtn.textContent = 'APLICAR A LA OFERTA';
                    applyBtn.addEventListener('click', function() {
                        Toastify({
                            text: "Aplicaste correctamente a la oferta",
                            duration: 3000,
                            close: true,
                            gravity: 'top',
                            position: 'center',
                            backgroundColor: '#4CAF50',
                        }).showToast();
                    });

                    summary.appendChild(img);
                    infoDiv.appendChild(h2);
                    infoDiv.appendChild(pCargo);
                    summary.appendChild(infoDiv);
                    details.appendChild(summary);

                    contentDiv.appendChild(h3Funciones);
                    contentDiv.appendChild(ulFunciones);
                    infoJobDiv.appendChild(h3Lugar);
                    infoJobDiv.appendChild(pLugar);
                    infoJobDiv.appendChild(h3Tiempo);
                    infoJobDiv.appendChild(pTiempo);
                    contentDiv.appendChild(infoJobDiv);
                    contentDiv.appendChild(applyBtn);
                    details.appendChild(contentDiv);

                    li.appendChild(details);
                    favoritesList.appendChild(li);
                });
            } else {
                Toastify({
                    text: data.error || 'Error al cargar los favoritos',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'center',
                    backgroundColor: '#f00',
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error fetching favoritos:', error);
        });
});
