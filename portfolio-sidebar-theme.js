/**
 * Copyright 2025 nickcos912
 * @license Apache-2.0, see LICENSE for full text.
 */
// portfolio-sidebar-theme.js
import { LitElement, html, css } from 'lit';
import './custom-sections.js';

class PortfolioSidebarTheme extends LitElement {
  static properties = {
    activeScreen: { type: String },
  };

  constructor() {
    super();
    this.activeScreen = 'screen-1';
  }

  static styles = css`
    :host {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    nav {
      width: 200px;
      background: #0a1931;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2em 1em;
      gap: 1.5em;
    }
    nav button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      width: 100%;
      padding: 0.8em;
      font-size: 1em;
    }
    nav button:hover {
      background: #222;
    }
    main {
      flex: 1;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
    }
    section {
      height: 100vh;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2em;
      text-align: center;
    }
    .profile-pic {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 1em;
    }
    .scroll-top-btn {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      background: #222;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  firstUpdated() {
    this._handleHashScroll();
    window.addEventListener('hashchange', () => this._handleHashScroll());
  }

  _scrollTo(id) {
    const el = this.renderRoot.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
      this.activeScreen = id;
    }
  }

  _handleHashScroll() {
    const id = location.hash.replace('#', '');
    if (id) {
      setTimeout(() => {
        this._scrollTo(id);
        this.activeScreen = id;
      }, 100);
    }
  }

  _scrollToTop() {
    const main = this.renderRoot.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '#screen-1');
    }
  }

  render() {
    return html`
      <nav>
        <button @click="${() => this._scrollTo('screen-1')}">HOME</button>
        <button @click="${() => this._scrollTo('screen-2')}">RESUME</button>
        <button @click="${() => this._scrollTo('screen-3')}">PROJECTS</button>
        <button @click="${() => this._scrollTo('screen-4')}">ABOUT</button>
        <button @click="${() => this._scrollTo('screen-5')}">CONTACT</button>
      </nav>
      <main>
        <section id="screen-1">
          <img class="profile-pic" src="/nicholas.jpg" alt="Nicholas Costanzo" />
          <h1>Nicholas Costanzo</h1>
          <p>ETI Student | The Pennsylvania State University</p>
        </section>

        <resume-section></resume-section>

        <projects-section>
          <project-item>
            <h3>IT Security Risk Tool (NLNB Project)</h3>
            <p>
              Designed and implemented an IT risk assessment tool for Nittany Lion National Bank.
              Used PHP, MySQL, and HTML/CSS to track vulnerabilities and recommend mitigation steps.
            </p>
            <ul>
              <li>Used ETL pipelines for data handling</li>
              <li>Built user interface with DDD components</li>
              <li>Applied cybersecurity frameworks (NIST)</li>
            </ul>
          </project-item>

          <project-item>
            <h3>Personal Portfolio Website</h3>
            <p>
              Built this portfolio using LitElement, DDD design tokens, and deployed via GitHub and Vercel.
              Fully responsive and scroll-snapping between screens.
            </p>
            <ul>
              <li>JavaScript modules + custom web components</li>
              <li>GitHub-integrated deployment to Vercel</li>
              <li>Dynamic scroll navigation and styling</li>
            </ul>
          </project-item>
        </projects-section>

        <about-section></about-section>

        <section id="screen-5">
          <h2>Contact</h2>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeLcAXG3_ujMc1NFBVQ7Whsh8M9CjtYpQm7Ocef7r4VEZzV1g/viewform?embedded=true"
            title="Contact Form">
            Loading…
          </iframe>
          <div style="margin-top:2rem;">
            <p><strong>Or contact me directly:</strong></p>
            <p>Email: npc5452@psu.edu</p>
            <p>Phone: 267-789-5099</p>
          </div>
        </section>
      </main>
      <button class="scroll-top-btn" @click="${this._scrollToTop}">↑</button>
    `;
  }
}

customElements.define('portfolio-sidebar-theme', PortfolioSidebarTheme);