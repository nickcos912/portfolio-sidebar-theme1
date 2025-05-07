/**
 * Copyright 2025 nickcos912
 * @license Apache-2.0, see LICENSE for full text.
 */
// portfolio-sidebar-theme.js
import { LitElement, html, css } from 'lit';

class ResumeSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2em;
      text-align: center;
    }
    h2, h3, h4 {
      margin: 0.5em 0;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    .download-resume-btn {
      display: inline-block;
      margin-top: 1.5rem;
      background: #0f3169;
      color: white;
      text-decoration: none;
      padding: 0.5em 1em;
      border-radius: 20px;
      border: 1px solid white;
      transition: background 0.3s;
    }
    .download-resume-btn:hover {
      background: #3a7bd5;
    }
  `;
  render() {
    return html`
      <section id="screen-2">
        <h2>Resume</h2>
        <h3>Nicholas Costanzo</h3>
        <p>ETI Student | The Pennsylvania State University</p>
        <h4>Summary</h4>
        <p>
          Detail-oriented and motivated ETI student with a strong foundation in technology integration, cybersecurity awareness,
          and team-based problem solving. Committed to continuous learning and leveraging modern tools to support business innovation.
        </p>
        <h4>Skills</h4>
        <ul>
          <li>System Analysis & Integration</li>
          <li>Cybersecurity Fundamentals</li>
          <li>Strong communication & teamwork</li>
        </ul>
        <h4>Education</h4>
        <p>The Pennsylvania State University — B.S. in Enterprise Technology Integration (Pursuing)</p>
        <a href="/Nicholas_Costanzo_Resume.pdf" download class="download-resume-btn">Download Resume</a>
      </section>
    `;
  }
}
customElements.define('resume-section', ResumeSection);

class ProjectsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2em;
      text-align: center;
    }
    .project {
      margin-bottom: 2em;
    }
    ul {
      list-style: none;
      padding: 0;
    }
  `;
  render() {
    return html`
      <section id="screen-3">
        <h2>Projects</h2>
        <slot></slot>
      </section>
    `;
  }
}
customElements.define('projects-section', ProjectsSection);

class ProjectItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 2em;
      padding: 0 1em;
    }
    h3 {
      margin-bottom: 0.5em;
    }
    ul {
      list-style: none;
      padding: 0;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}
customElements.define('project-item', ProjectItem);

class AboutSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2em;
      text-align: center;
    }
    .about-text {
      max-width: 700px;
      margin: 0 auto;
      font-size: 1.2rem;
      line-height: 1.8;
      padding: 0 1rem;
    }
  `;
  render() {
    return html`
      <section id="screen-4">
        <h2>About Me</h2>
        <div class="about-text">
          I am currently pursuing a degree in Enterprise Technology Integration at Penn State. 
          I’m passionate about problem-solving and applying technology to create real-world solutions.
          I enjoy hanging with friends and learning new techniques to hone my skills in my free time.
        </div>
      </section>
    `;
  }
}
customElements.define('about-section', AboutSection);

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
      background: #444;
    }
    main {
      flex: 1;
      overflow-y: auto;
    }
    section {
      min-height: 100vh;
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
