/**
 * Copyright 2025 nickcos912
 * @license Apache-2.0, see LICENSE for full text.
 */
// portfolio-sidebar-theme.js
import { LitElement, html, css } from 'lit';

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
      background: #222;
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
      background: #444;
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
    .download-resume-btn {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: #222;
      color: white;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5em 1em;
      border-radius: 20px;
      border: 1px solid white;
      transition: background 0.3s;
    }
    .download-resume-btn:hover {
      background: #444;
    }
    iframe {
      border: none;
      max-width: 90%;
      height: 600px;
    }
    .about-text {
      max-width: 700px;
      font-size: 1.2rem;
      line-height: 1.8;
      padding: 0 1rem;
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
        <button @click="${() => this._scrollTo('screen-4')}">ABOUT ME</button>
        <button @click="${() => this._scrollTo('screen-5')}">CONTACT</button>
      </nav>
      <main>
        <section id="screen-1">
          <img class="profile-pic" src="nicholas.jpg" alt="Nicholas Costanzo" />
          <h1>Nicholas Costanzo</h1>
          <p>ETI Student | The Pennsylvania State University</p>
        </section>

        <section id="screen-2">
          <h2>Resume</h2>
          <p>[Resume content or summary can go here.]</p>
        </section>

        <section id="screen-3">
          <h2>Projects</h2>
          <p>[List of projects or summary goes here.]</p>
        </section>

        <section id="screen-4">
          <h2>About Me</h2>
          <div class="about-text">
            I am currently pursuing a degree in Enterprise Technology Integration at Penn State. 
            I’m passionate about problem-solving and applying technology to create real-world solutions.
          </div>
        </section>

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
      ${this.activeScreen === 'screen-2' ? html`
        <a class="download-resume-btn" href="./Nicholas_Costanzo_Resume.pdf" download>Download Resume</a>
      ` : ''}
    `;
  }
}

customElements.define('portfolio-sidebar-theme', PortfolioSidebarTheme);
