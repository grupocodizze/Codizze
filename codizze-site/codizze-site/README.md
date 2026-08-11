# Codizze — sitio web

Sitio estático (HTML/CSS/JS, sin frameworks ni build step). No necesita ningún
complemento, gestor de paquetes ni proceso de compilación — se sube tal cual.

## Estructura

```
codizze-site/
├── index.html      ← toda la navegación vive aquí (una sola página, rutas por JS)
├── css/style.css
├── js/main.js
└── images/          ← fotos y renders reales del proyecto
```

Es una sola página (SPA): "Inicio", "Architecture" y "Film" son secciones que
se muestran/ocultan con JavaScript, no URLs distintas. Es la forma más simple
de mantenerlo sin herramientas extra. Si más adelante quieres URLs reales por
sección (mejor para SEO — que Google indexe cada proyecto o perfil por
separado), se puede migrar a páginas HTML independientes.

## Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado, pero
   Pages gratis requiere que sea público, salvo plan de pago).
2. Sube el contenido de esta carpeta a la raíz del repo (no metas todo dentro
   de una subcarpeta "codizze-site" dentro del repo — `index.html` debe
   quedar en la raíz).
3. Ve a **Settings → Pages** del repositorio → en "Source" elige la rama
   `main` y la carpeta `/root` → Guardar.
4. En un par de minutos el sitio queda publicado en
   `https://tu-usuario.github.io/nombre-del-repo/`.
5. Dominio propio (opcional): en **Settings → Pages → Custom domain**
   agregas tu dominio y configuras un registro CNAME en tu proveedor de DNS
   apuntando a `tu-usuario.github.io`.

## Actualizar el sitio

- Cambios de texto: edita directamente `index.html`.
- Cambios de estilo/color: `css/style.css`.
- Nuevas fotos: agrégalas a `images/` y referencia la ruta donde corresponda
  en `index.html`.
- Después de cualquier cambio: commit + push. GitHub Pages republica solo,
  no hay que hacer nada más.

Cuando quieras que yo haga los cambios, mándame el material (fotos, texto,
links) y te regreso los archivos actualizados de esta misma carpeta.
