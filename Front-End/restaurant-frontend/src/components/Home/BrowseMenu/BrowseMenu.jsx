import './BrowseMenu.css';

const menuItems = [
  { title: 'Breakfast', desc: 'In the new era of technology we look in the future with certainty and pride for our life.', icon: '☕' },
  { title: 'Main Dishes', desc: 'In the new era of technology we look in the future with certainty and pride for our life.', icon: '🍚' },
  { title: 'Drinks', desc: 'In the new era of technology we look in the future with certainty and pride for our life.', icon: '🥤' },
  { title: 'Desserts', desc: 'In the new era of technology we look in the future with certainty and pride for our life.', icon: '🍰' },
];

const BrowseMenu = () => {
  return (
    <section className="menu-section">
      <h2>Browse Our Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item, i) => (
          <div key={i} className="menu-card">
            <div className="menu-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <a href="/OurMenu" className="menu-link">Explore Menu</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseMenu;
