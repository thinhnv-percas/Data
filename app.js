const base = location.pathname.replace(/\/$/, ''); // optional
const DATA_URL = `${location.origin}${location.pathname.replace(/\/[^/]*$/, '/') }data.json`;
// alternative: const DATA_URL = 'data.json';

async function loadAndRender() {
  try {
    const res = await fetch('data.json', {cache: 'no-cache'});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    document.getElementById('site-title').textContent = data.siteTitle || 'No title';
    if (data.updated) {
      const d = new Date(data.updated);
      document.getElementById('updated').textContent = `Cập nhật: ${d.toLocaleString()}`;
    }

    const container = document.getElementById('items');
    container.innerHTML = '';

    (data.items || []).forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';

      const h = document.createElement('h2');
      h.textContent = item.title || 'Không có tiêu đề';
      card.appendChild(h);

      const p = document.createElement('p');
      p.textContent = item.description || '';
      card.appendChild(p);

      if (item.link) {
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = 'Open';
        a.target = '_blank';
        card.appendChild(a);
      }

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('site-title').textContent = 'Lỗi khi tải dữ liệu';
    document.getElementById('items').textContent = err.message;
  }
}

loadAndRender();
