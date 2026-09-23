// Mobile nav toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click', function(){
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// Blog category filter (blog listing page only)
function filterPosts(btn, cat){
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.blog-post').forEach(p => {
    const matches = cat === 'all' || p.dataset.cat === cat || !!p.querySelector('.bp-tag.' + cat);
    p.style.display = matches ? 'grid' : 'none';
  });
}

// Post table-of-contents (blog post pages only)
function slugify(text){
  return 'sec-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildToc(){
  const bodyEl = document.getElementById('post-body');
  const toc = document.getElementById('post-toc');
  if(!bodyEl || !toc) return;
  const headers = bodyEl.querySelectorAll('h2, h3');
  if(headers.length < 3){
    toc.classList.remove('has-items');
    toc.innerHTML = '';
    return;
  }
  let items = '';
  headers.forEach(h => {
    const id = slugify(h.textContent);
    h.id = id;
    const cls = h.tagName === 'H3' ? 'toc-sub' : '';
    items += `<li class="${cls}"><a href="#${id}">${h.textContent}</a></li>`;
  });
  toc.innerHTML = `<div class="post-toc-title" id="toc-title">On this page <span class="post-toc-caret open" id="toc-caret">&#9662;</span></div><ul class="post-toc-list" id="toc-list">${items}</ul>`;
  toc.classList.add('has-items');
  document.getElementById('toc-title').addEventListener('click', toggleToc);
}

function toggleToc(){
  document.getElementById('toc-list').classList.toggle('collapsed');
  document.getElementById('toc-caret').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', buildToc);
