import { useState, type FormEvent } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Dumbbell, Fan, MapPin, Menu, MessageCircle, MoveUpRight, Phone, Sparkles, Waves, X } from 'lucide-react';

const PHONE = '+919915903303';
const ADDRESS = '93, Sector 82, Landran, Punjab 140307';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=93%2C%20Sector%2082%2C%20Landran%2C%20Punjab%20140307';
const MAP_EMBED = 'https://maps.google.com/maps?q=93%2C%20Sector%2082%2C%20Landran%2C%20Punjab%20140307&t=&z=15&ie=UTF8&iwloc=&output=embed';

const photos = [
  { src: '/gym-photos/img-9633.jpeg', alt: 'Wide view across Sai Power Gym with FZ Sports racks, red benches and lime columns', caption: 'The main floor', number: '01' },
  { src: '/gym-photos/img-9627.jpeg', alt: 'Gym floor with red strength machines, turf lane and mirror lighting', caption: 'Strength floor', number: '02' },
  { src: '/gym-photos/img-9632.jpeg', alt: 'Cable station, mirrors, treadmill and green turf beneath the gym lights', caption: 'Move your way', number: '03' },
  { src: '/gym-photos/img-9635.jpeg', alt: 'Functional turf lane between FZ Sports equipment and strength stations', caption: 'Turf lane', number: '04' },
  { src: '/gym-photos/img-9629.jpeg', alt: 'A Sai Power Gym member taking a mirror photo on the gym floor', caption: 'Made for real people', number: '05', member: true },
];
const reviews = [
  { name: 'Aryan C.', quote: 'At a nice location, amazing ventilation, fully air conditioned, no rush, amazing working machinery' },
  { name: 'Mandeep S.', quote: 'One of the best gym in Landran Mohali' },
  { name: 'Ayush R.', quote: 'Good environment' },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const time = String(data.get('time') ?? '');
    const normalized = phone.replace(/[\s()-]/g, '');
    if (name.length < 2) {
      setFormError('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^(?:\+?91)?[6-9]\d{9}$/.test(normalized)) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!time) {
      setFormError('Choose a preferred time so we can plan your visit.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    const message = `Hi Sai Power Gym, I'm ${name}. My phone number is ${phone}. I'm interested in visiting for a trial / membership enquiry. Preferred time: ${time}. Please share current membership pricing.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    form.reset();
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="wrap nav-inner">
          <a href="#home" className="brand" aria-label="Sai Power Gym home" data-testid="link-brand-home" onClick={closeMenu}>
            <span className="brand-mark">S</span>
            <span className="brand-name">Sai Power Gym<small>Landran · Punjab</small></span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <a href="#the-gym" onClick={closeMenu} data-testid="link-nav-the-gym">The gym</a>
            <a href="#tour" onClick={closeMenu} data-testid="link-nav-tour">Tour</a>
            <a href="#membership" onClick={closeMenu} data-testid="link-nav-membership">Membership</a>
            <a href="#reviews" onClick={closeMenu} data-testid="link-nav-reviews">Reviews</a>
            <a href="#visit" onClick={closeMenu} data-testid="link-nav-location">Location</a>
            <a className="btn btn-lime" href="#visit" onClick={closeMenu} data-testid="link-nav-visit">Come train <ArrowRight size={14} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="hero-photo" role="img" aria-label="Real view inside Sai Power Gym: lime pillars, red benches, dark strength equipment and turf" />
          <div className="wrap hero-content">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="pulse-dot" /> Landran's local strength room</div>
              <h1 className="display" id="hero-heading">Unleash your<span>power at Sai Power Gym.</span></h1>
              <p className="hero-intro">Landran’s premier air-conditioned fitness destination, with top-tier machinery, spacious workout areas, and a no-rush feel.</p>
              <div className="hero-actions">
                <a className="btn btn-lime" href="#visit" data-testid="link-hero-trial">Get free trial pass <ArrowUpRight size={15} /></a>
                <a className="btn btn-outline" href="tel:+919915903303" data-testid="link-hero-call"><Phone size={14} /> Call +91 99159 03303</a>
              </div>
              <div className="hero-meta">
                <div className="rating" data-testid="text-rating">
                  <span className="stars" aria-label="4.6 out of 5 stars">★★★★★</span>
                  <span className="rating-text"><strong>4.6</strong> / 5 · 9 reviews</span>
                </div>
                <span className="meta-sep" />
                <div className="open-meta"><strong>Open daily until 9:30 PM</strong><span>Morning + evening sessions</span></div>
              </div>
            </div>
          </div>
          <div className="hero-stamp" aria-label="Train your way, Landran">TRAIN<br />YOUR WAY<br />LANDRAN</div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="ticker-track">
          {Array.from({ length: 4 }, (_, i) => <span key={i}>Landran trains here <i>·</i> Good air, good energy <i>·</i> Your pace, your place <i>·</i></span>)}
        </div></div>

        <section className="section" id="the-gym">
          <div className="wrap">
            <div className="intro-grid">
              <div>
                <span className="eyebrow">More room. Better rhythm.</span>
                <h2 className="section-title display">A gym that<br /><span className="lime">feels like yours.</span></h2>
              </div>
              <div>
                <p>Sai Power Gym is built for the everyday work: solid equipment, air that moves, and enough breathing room to get into your session. No need to perform for anyone. Just come in and get your reps done.</p>
                <div className="stat-line">
                  <div className="stat"><b className="lime">4.6<span style={{ fontSize: 17 }}>/5</span></b><small>Local rating</small></div>
                  <div className="stat"><b>9</b><small>Member reviews</small></div>
                  <div className="stat"><b className="lime">9:30</b><small>PM close, daily</small></div>
                </div>
              </div>
            </div>
            <div className="features">
              <article className="feature"><span className="feature-num">01 / EQUIPMENT</span><div className="feature-icon"><Dumbbell size={21} /></div><h3>Built to lift</h3><p>FZ Sports racks, cable crossovers and plate-loaded leg presses for a proper strength session.</p></article>
              <article className="feature"><span className="feature-num">02 / COMFORT</span><div className="feature-icon"><Fan size={21} /></div><h3>Cool, clear air</h3><p>Fully air-conditioned with amazing ventilation, so the room stays comfortable while you work.</p></article>
              <article className="feature"><span className="feature-num">03 / SPACE</span><div className="feature-icon"><Waves size={21} /></div><h3>Space to move</h3><p>A turf strip for functional training and stretching, with a no-rush feel on the floor.</p></article>
              <article className="feature"><span className="feature-num">04 / FEEL</span><div className="feature-icon"><Sparkles size={21} /></div><h3>Bring the energy</h3><p>Graffiti, mirror LEDs and music bring the room to life without taking itself too seriously.</p></article>
            </div>
          </div>
        </section>

        <section className="section tour" id="tour">
          <div className="wrap">
            <div className="tour-head">
              <div><span className="eyebrow">Come on in</span><h2 className="section-title display">Your next set<br />starts <span className="lime">here.</span></h2></div>
              <p>No stock shots. This is the room, the kit and the people you’ll find at Sai Power Gym. Have a look around, then come see it for yourself.</p>
            </div>
            <div className="gallery" data-testid="gallery-gym">
              {photos.map((photo) => <figure className={photo.member ? 'members-photo' : ''} key={photo.src} data-testid={`gallery-photo-${photo.number}`}>
                <img src={photo.src} alt={photo.alt} loading={photo.number === '01' ? 'eager' : 'lazy'} />
                <figcaption><span>{photo.number}</span>{photo.caption}</figcaption>
              </figure>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap equipment">
            <div className="equipment-photo"><img src="/gym-photos/img-9634.jpeg" alt="Sai Power Gym plate-loaded strength machines, red benches and turf flooring" loading="lazy" /><span className="photo-tag">Real kit. Ready to work.</span></div>
            <div className="equipment-copy">
              <span className="eyebrow">The details matter</span>
              <h2 className="section-title display">Make every<br /><span className="lime">rep count.</span></h2>
              <p>Good sessions start with good basics. The floor at Sai Power Gym gives you dependable strength equipment, a little room to find your flow, and an atmosphere that makes another set feel possible.</p>
              <ul className="equipment-list">
                <li><span className="check">+</span><span><strong>FZ Sports strength gear</strong> — racks, cable crossovers and plate-loaded leg presses.</span></li>
                <li><span className="check">+</span><span><strong>Air conditioning + ventilation</strong> — keep your head in the workout.</span></li>
                <li><span className="check">+</span><span><strong>Turf for the in-between</strong> — functional work, mobility and stretching.</span></li>
                <li><span className="check">+</span><span><strong>Graffiti, mirrors, music</strong> — a lively local room with its own character.</span></li>
              </ul>
              <a className="btn btn-outline" href="#visit" data-testid="link-equipment-visit">Come check it out <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section className="section plans" id="membership">
          <div className="wrap">
            <div className="plans-head">
              <span className="eyebrow">Find your rhythm</span>
              <h2 className="section-title display">Pick your <span className="lime">pace.</span></h2>
              <p>Short commitment or long game, ask us what fits. Membership pricing can change, so message or call for the latest options.</p>
            </div>
            <div className="plans-grid">
              <article className="plan">
                <span className="plan-label">Easy start</span><h3>Monthly Pass</h3>
                <p>A month at a time. Find your routine, learn the room and build a habit that sticks.</p>
                <div className="plan-cta"><span>Enquire about current pricing</span><a href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Sai Power Gym, please share the current pricing for the Monthly Pass.')}`} target="_blank" rel="noreferrer" data-testid="link-plan-monthly">Ask us <ArrowUpRight size={13} /></a></div>
              </article>
              <article className="plan featured">
                <span className="plan-label lime">A little more runway</span><h3>Quarterly / Half-Yearly</h3>
                <p>Keep your momentum going with a longer membership. Ask about quarterly and half-yearly availability.</p>
                <div className="plan-cta"><span>Enquire about current pricing</span><a href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Sai Power Gym, please share the current quarterly and half-yearly membership pricing.')}`} target="_blank" rel="noreferrer" data-testid="link-plan-quarterly">Ask us <ArrowUpRight size={13} /></a></div>
              </article>
              <article className="plan">
                <span className="plan-label">The long game</span><h3>Annual Power Pass</h3>
                <p>Commit to a year of showing up, with a free trainer consultation included.</p>
                <div className="plan-cta"><span>Enquire about current pricing</span><a href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Sai Power Gym, please share the current Annual Power Pass pricing and details.')}`} target="_blank" rel="noreferrer" data-testid="link-plan-annual">Ask us <ArrowUpRight size={13} /></a></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="wrap reviews-layout">
            <div>
              <span className="eyebrow">Word around Landran</span>
              <h2 className="section-title display">Good things<br />from the <span className="lime">floor.</span></h2>
              <div className="review-score" data-testid="text-review-score">4.6<small> / 5</small></div>
              <div className="review-stars" aria-label="Rated 4.6 out of 5">★★★★★</div>
              <div className="review-note">Based on 9 local reviews</div>
            </div>
            <div className="review-list">
              {reviews.map((review, index) => <article className="review" key={review.name} data-testid={`review-card-${index + 1}`}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>{review.quote}</blockquote>
                <cite>— {review.name}</cite>
                <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section contact" id="visit">
          <div className="wrap contact-grid">
            <div className="contact-info">
              <span className="eyebrow">Right here in Landran</span>
              <h2 className="section-title display">Let's get<br /><span className="lime">you in.</span></h2>
              <p>Drop by for a look or tell us when you’d like to try a session. We’ll get back to you on WhatsApp with the details.</p>
              <div className="contact-cards">
                <div className="contact-row"><span className="contact-icon"><MapPin size={17} /></span><div><small>Find the gym</small><a href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="link-address">{ADDRESS}</a></div></div>
                <div className="contact-row"><span className="contact-icon"><Phone size={16} /></span><div><small>Call us</small><a href="tel:+919915903303" data-testid="link-phone">+91 99159 03303</a></div></div>
                <div className="contact-row"><span className="contact-icon"><Dumbbell size={17} /></span><div><small>Session timing</small><strong>Morning and evening sessions · Open daily until 9:30 PM</strong></div></div>
              </div>
              <div className="contact-actions">
                <a className="btn btn-lime" href="tel:+919915903303" data-testid="link-contact-call"><Phone size={14} /> Call the gym</a>
                <a className="btn btn-outline" href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Sai Power Gym, I would like to ask about a trial visit.')}`} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><MessageCircle size={14} /> WhatsApp us</a>
              </div>
              <div className="map" data-testid="map-gym">
                <iframe title="Map showing Sai Power Gym at 93, Sector 82, Landran, Punjab" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <a className="map-link" href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="link-map-directions">Get directions <MoveUpRight size={12} /></a>
              </div>
              <p className="muted" style={{ fontSize: 10, marginTop: 8 }}>Plus code: MMR8+P2</p>
            </div>
            <div className="form-panel">
              <h3>Plan a visit</h3>
              <p>Leave your details and WhatsApp opens with your enquiry ready to send.</p>
              <form onSubmit={submitEnquiry} noValidate data-testid="form-trial-enquiry">
                <div className="form-grid">
                  <div className="field"><label htmlFor="visitor-name">Your name</label><input id="visitor-name" name="name" placeholder="What should we call you?" autoComplete="name" required minLength={2} data-testid="input-name" /></div>
                  <div className="field"><label htmlFor="visitor-phone">Mobile number</label><input id="visitor-phone" name="phone" type="tel" placeholder="+91 00000 00000" autoComplete="tel" inputMode="tel" required data-testid="input-phone" /></div>
                  <div className="field"><label htmlFor="visitor-time">Preferred time</label><select id="visitor-time" name="time" defaultValue="" required data-testid="select-preferred-time"><option value="" disabled>Choose a session</option><option value="Morning">Morning</option><option value="Evening">Evening</option><option value="Either morning or evening">Either works</option></select></div>
                  <div className="form-error" role="alert" aria-live="polite" data-testid="status-form-error">{formError}</div>
                  <button type="submit" className="btn btn-lime submit-btn" data-testid="button-submit-enquiry">Open WhatsApp enquiry <ArrowRight size={15} /></button>
                  {submitted && <div role="status" className="form-help" data-testid="status-form-submitted">Your enquiry is ready in WhatsApp. Send the message to reach the gym.</div>}
                </div>
              </form>
              <div className="form-help">Your details are used only to prepare this enquiry. Nothing is sent until you tap Send in WhatsApp.</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap faq-layout">
            <div className="faq-intro"><span className="eyebrow">Good to know</span><h2 className="section-title display">Before you<br /><span className="lime">drop in.</span></h2><p>Still got a question? Call or WhatsApp and we’ll help you figure out your first visit.</p><a href="tel:+919915903303" className="btn btn-outline" data-testid="link-faq-call">Call +91 99159 03303 <ArrowUpRight size={14} /></a></div>
            <div className="faq-list" data-testid="accordion-faq">
              <details className="faq-item"><summary>Where can I find Sai Power Gym?</summary><p>We’re at 93, Sector 82, Landran, Punjab 140307. Use plus code MMR8+P2 or open directions from the location section.</p></details>
              <details className="faq-item"><summary>When is the gym open?</summary><p>Sai Power Gym is open daily until 9:30 PM, with morning and evening sessions. Call ahead to confirm a session time that works for you.</p></details>
              <details className="faq-item"><summary>Can I visit before choosing a membership?</summary><p>Absolutely. Use the visit form to tell us when you’d like to come by. It opens a WhatsApp enquiry so the gym can help arrange your visit.</p></details>
              <details className="faq-item"><summary>What membership options are available?</summary><p>Ask about the Monthly Pass, Quarterly or Half-Yearly options, and the Annual Power Pass. Annual members receive a free trainer consultation. Message us for current pricing.</p></details>
              <details className="faq-item"><summary>What equipment and facilities are there?</summary><p>The floor includes FZ Sports racks, cable crossovers, plate-loaded leg presses, air conditioning, ventilation and a turf area for functional training and stretching.</p></details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <a href="#home" className="brand" data-testid="link-footer-home"><span className="brand-mark">S</span><span className="brand-name">Sai Power Gym<small>Landran · Punjab</small></span></a>
            <div className="footer-note">Real training. Good people. Right here in Landran.<br />93, Sector 82, Landran, Punjab 140307 · MMR8+P2</div>
            <div className="footer-links"><a href="tel:+919915903303" data-testid="link-footer-phone">+91 99159 03303</a><a href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="link-footer-map">Directions <MoveUpRight size={11} /></a><a href="#visit" data-testid="link-footer-visit">Plan a visit</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Sai Power Gym</span><span>Open daily until 9:30 PM · Morning + evening sessions</span></div>
        </div>
      </footer>

      <a className="float-wa" href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Sai Power Gym, I would like to enquire about visiting.')}`} target="_blank" rel="noreferrer" aria-label="Message Sai Power Gym on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle size={23} /></a>
    </>
  );
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Switch><Route path="/" component={Home} /><Route><main className="wrap section"><h1 className="display">Page not found</h1><a href="/" className="btn btn-lime">Back to Sai Power Gym</a></main></Route></Switch></WouterRouter>;
}

export default App;
