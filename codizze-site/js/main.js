(function(){
  var root = document.getElementById('codizze-root');

  var pages = root.querySelectorAll('.page');
  var navCenterBtns = root.querySelectorAll('#cdz-nav-center button');
  var subnavArch = document.getElementById('cdz-subnav-arch');
  var subnavFilm = document.getElementById('cdz-subnav-film');
  var subnavRealEstate = document.getElementById('cdz-subnav-realestate');
  var navEl = document.getElementById('cdz-nav');

  function setActivePage(id){
    var current = root.querySelector('.page.active');
    var next = document.getElementById('page-' + id);
    if (!next) return;
    if (current === next) { window.scrollTo({top:0, behavior:'smooth'}); return; }
    if (current){
      current.classList.remove('active');
      setTimeout(function(){ current.style.display = 'none'; }, 380);
    }
    next.style.display = 'block';
    void next.offsetWidth;
    requestAnimationFrame(function(){ next.classList.add('active'); });
    window.scrollTo({top:0, behavior:'instant'});

    var branch = next.getAttribute('data-branch');
    navCenterBtns.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-branch') === branch && branch !== ''); });
    subnavArch.classList.toggle('hidden', branch !== 'architecture');
    subnavFilm.classList.toggle('hidden', branch !== 'film');
    subnavRealEstate.classList.toggle('hidden', branch !== 'realestate');
    root.querySelectorAll('#cdz-subnav-arch button, #cdz-subnav-film button, #cdz-subnav-realestate button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-nav') === id);
    });
    initReveal();
  }

  root.querySelectorAll('[data-nav]').forEach(function(el){
    el.addEventListener('click', function(){ setActivePage(el.getAttribute('data-nav')); });
  });

  window.addEventListener('scroll', function(){
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});

  // ---- Lead capture form (Rafael by the Sea) ----
  // Uses Formspree (https://formspree.io) as a free, no-backend way to store submissions
  // and email them to you. Sign up, create a form, and replace the placeholder
  // in the form's "action" attribute in index.html with your real endpoint.
  var leadForm = document.getElementById('cdz-lead-form');
  if (leadForm){
    leadForm.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById('cdz-lead-note');
      var submitBtn = leadForm.querySelector('button[type="submit"]');
      if (leadForm.getAttribute('action').indexOf('TU_ID_DE_FORMSPREE') !== -1){
        note.textContent = 'Falta conectar el formulario — revisa el action en index.html.';
        return;
      }
      submitBtn.disabled = true;
      note.textContent = 'Enviando…';
      fetch(leadForm.getAttribute('action'), {
        method: 'POST',
        body: new FormData(leadForm),
        headers: { 'Accept': 'application/json' }
      }).then(function(res){
        submitBtn.disabled = false;
        if (res.ok){
          note.textContent = 'Gracias — te avisaremos con novedades de Rafael by the Sea.';
          leadForm.reset();
        } else {
          note.textContent = 'Hubo un error. Intenta de nuevo o escríbenos directo.';
        }
      }).catch(function(){
        submitBtn.disabled = false;
        note.textContent = 'Hubo un error. Intenta de nuevo o escríbenos directo.';
      });
    });
  }

  var ytFacade = document.getElementById('cdz-yt-facade');
  if (ytFacade){
    ytFacade.addEventListener('click', function(){
      var vid = ytFacade.getAttribute('data-video-id');
      ytFacade.innerHTML = '<iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1" title="Reel Codizze Film" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    });
  }

  var io = null;
  function initReveal(){
    if (io) io.disconnect();
    io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ if (entry.isIntersecting) entry.target.classList.add('in-view'); });
    }, {threshold: 0.15});
    root.querySelectorAll('.page.active .gallery img').forEach(function(el){ io.observe(el); });
  }

  setActivePage('home');
})();
