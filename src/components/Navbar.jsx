export default function Navbar({ isDarkMode, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar__brand">AlgoViz</div>
      <nav className="navbar__links">
        <a href="#home">Home</a>
        <a href="#visualizer">Visualizer</a>
        <a href="#about">About</a>
      </nav>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={onToggleTheme}
        title="Toggle dark or light mode"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
