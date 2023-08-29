function relogio() {
  function criaHoraDosSegundos(segundos) {
    const data = new Date(segundos * 1000); // javascript lida com milésimos de segundo
    return data.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    });
  }



  const relogio = document.querySelector('.relogio');
  let segundos = 0; // essa variável está mantendo um estado do relógio
  let timer;

  function iniciaRelogio() {
    timer = setInterval(function() {
      segundos++;
      relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000);
  }

  document.addEventListener('click', function(e) {
    const el = e.target; // pega o elemento que foi clicado
    console.log('estou clicando em -> ', el);

    if (el.classList.contains('zerar')) {
      clearInterval(timer);
      relogio.innerHTML = '00:00:00';
      relogio.classList.remove('pausado');
      segundos = 0;
    }

    if (el.classList.contains('iniciar')) {
      relogio.classList.remove('pausado');
      clearInterval(timer);
      iniciaRelogio();
    }

    if (el.classList.contains('pausar')) {
      clearInterval(timer);
      relogio.classList.add('pausado'); // adiciona a classe pausado com a vermelha no texto 
    }
  });
}
relogio();
