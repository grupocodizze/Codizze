(function(){
  var root = document.getElementById('codizze-root');
  var IMAGES = {
    HERO_MALL: 'images/marea-alta-interior.jpg',
    MAREA_EXT1: 'images/marea-alta-exterior-1.jpg',
    MAREA_EXT2: 'images/marea-alta-exterior-2.jpg',
    MAREA_ISO: 'images/marea-alta-isometrico.jpg',
    MAREA_CORTE_L: 'images/marea-alta-corte-longitudinal.jpg',
    MAREA_CORTE_T: 'images/marea-alta-corte-transversal.jpg',
    MAREA_CAD: 'images/marea-alta-fachada-autocad.jpg',
    GUSTAVO: 'images/gustavo-godinez.jpg',
    NANCY: 'images/nancy-ramirez.jpg',
    FABRIZZIO_FACE: 'images/fabrizzio-godinez.jpg',
    COMP_HERO: 'https://img.youtube.com/vi/4kD0kfB3zGk/hqdefault.jpg'
  };

  var pages = root.querySelectorAll('.page');
  var navCenterBtns = root.querySelectorAll('#cdz-nav-center button');
  var subnavArch = document.getElementById('cdz-subnav-arch');
  var subnavFilm = document.getElementById('cdz-subnav-film');
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
    root.querySelectorAll('#cdz-subnav-arch button, #cdz-subnav-film button').forEach(function(b){
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

  var isFine = window.matchMedia('(pointer: fine)').matches;
  if (isFine){
    var preview = document.getElementById('cdz-hover-preview');
    var previewImg = document.getElementById('cdz-hover-img');
    root.querySelectorAll('[data-preview]').forEach(function(row){
      row.addEventListener('mouseenter', function(){
        var key = row.getAttribute('data-preview');
        if (IMAGES[key]) previewImg.src = IMAGES[key];
        preview.classList.add('show');
      });
      row.addEventListener('mouseleave', function(){ preview.classList.remove('show'); });
      row.addEventListener('mousemove', function(e){
        preview.style.left = e.clientX + 'px';
        preview.style.top = e.clientY + 'px';
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
