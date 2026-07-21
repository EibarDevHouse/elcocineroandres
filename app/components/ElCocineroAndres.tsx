'use client';

import { useState, useEffect } from 'react';
import type { Review } from '@/app/lib/reviews';
import { DISHES } from '@/app/lib/dishes';
import { createReview } from '@/app/lib/actions';
import styles from './ElCocineroAndres.module.css';

type Tab = 'inicio' | 'menu' | 'reviews';

interface Combo {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const COMBOS: Combo[] = [
  {
    id: 'combo-2',
    name: '2 Tacos',
    price: 5.5,
    desc: '1 Birria + 1 Pollo Copal',
  },
  {
    id: 'combo-3',
    name: '3 Tacos',
    price: 8,
    desc: '1 Birria + 2 Pollo Copal',
  },
  {
    id: 'combo-4',
    name: '4 Tacos',
    price: 10,
    desc: '2 Birria + 2 Pollo Copal',
  },
];

interface ElCocineroAndresProps {
  initialReviews: Review[];
}

export default function ElCocineroAndres({
  initialReviews,
}: ElCocineroAndresProps) {
  const [tab, setTab] = useState<Tab>('inicio');
  const [fName, setFName] = useState('');
  const [fDish, setFDish] = useState('taco-birria');
  const [fStars, setFStars] = useState(5);
  const [fText, setFText] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const whatsappNumber = '+584125458726';

  const starStr = (v: number) => {
    const f = Math.round(v);
    return '★'.repeat(f) + '☆'.repeat(5 - f);
  };

  const price = (p: number) =>
    '$' + (p % 1 ? p.toFixed(2).replace(/0$/, '') : p);

  const wa = (name: string) => {
    const num = String(whatsappNumber).replace(/\D/g, '');
    return (
      'https://wa.me/' +
      num +
      '?text=' +
      encodeURIComponent('¡Hola Andrés! Quiero pedir: ' + name)
    );
  };

  const byDish: Record<string, number[]> = {};
  reviews.forEach((r) => {
    if (!byDish[r.dish]) byDish[r.dish] = [];
    byDish[r.dish].push(r.stars);
  });

  const rate = (id: string) => {
    const a = byDish[id];
    if (!a) return null;
    return a.reduce((x, y) => x + y, 0) / a.length;
  };

  const items = DISHES.map((d) => {
    const avg = rate(d.id);
    const n = (byDish[d.id] || []).length;
    return {
      ...d,
      priceLabel: price(d.price),
      wa: wa(d.name),
      stars: avg ? starStr(avg) : '☆☆☆☆☆',
      ratingLabel: avg
        ? avg.toFixed(1) + ' · ' + n + ' review' + (n > 1 ? 's' : '')
        : 'Sin reviews aún',
    };
  });

  const combos = COMBOS.map((c) => ({
    ...c,
    priceLabel: price(c.price),
    wa: wa(c.name + ' (' + c.desc + ')'),
  }));

  const nameOf = (id: string) =>
    (DISHES.find((d) => d.id === id) || { name: id }).name;

  const featured = ['taco-birria', 'ceviche-330', 'mini-pizzas']
    .map((id) => items.find((i) => i.id === id))
    .filter((f) => f !== undefined);

  const homeReviews = reviews
    .slice(0, 2)
    .map((r) => ({ ...r, starsStr: starStr(r.stars) }));

  const reviewsList = reviews.map((r) => ({
    ...r,
    starsStr: starStr(r.stars),
    dishName: nameOf(r.dish),
  }));

  const all = reviews.map((r) => r.stars);
  const avgAll = all.length ? all.reduce((x, y) => x + y, 0) / all.length : 0;

  const col = (t: Tab) => (tab === t ? '#233C26' : '#9a988c');

  const submitReview = async () => {
    if (!fName.trim() || !fText.trim()) {
      setFormMsg('Completa tu nombre y comentario 🙂');
      return;
    }
    if (submitting || cooldown > 0) {
      return;
    }
    setSubmitting(true);
    try {
      const result = await createReview({
        name: fName.trim(),
        dish: fDish,
        stars: fStars,
        text: fText.trim(),
      });
      if (result.ok) {
        setReviews([result.review, ...reviews]);
        setFName('');
        setFText('');
        setFStars(5);
        setFormMsg('¡Gracias por tu review!');
        setCooldown(8);
        setTimeout(() => setFormMsg(''), 3000);
      } else {
        setFormMsg(result.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>🍳</div>
        <div className={styles.headerTitle}>El Cocinero Andrés</div>
      </header>

      {tab === 'inicio' && (
        <main className={styles.main}>
          <section className={styles.heroSection}>
            <div className={styles.heroImage}>🍽️</div>
            <h1 className={styles.heroTitle}>
              Sabor que se apodera de tus sentidos
            </h1>
            <p className={styles.heroDesc}>
              En esta edición, cada platillo está diseñado para ser saludable y
              bajo en calorías — sin sacrificar ni un gramo de sabor.
            </p>
          </section>

          <section className={styles.chefSection}>
            <div className={styles.chefImage}>👨‍🍳</div>
            <div>
              <div className={styles.chefName}>Chef José "Andrés" Durán</div>
              <p className={styles.chefDesc}>
                Un apasionado por la cocina y por complacer a sus comensales. Te
                llevamos a una experiencia sensorial en cada bocado.
              </p>
            </div>
          </section>

          <section className={styles.promosSection}>
            <h2 className={styles.sectionTitle}>Promos de la semana</h2>
            <div className={styles.promosList}>
              <div className={styles.promoCard}>
                <div>
                  <div className={styles.promoTitle}>Combo 4 Tacos</div>
                  <div className={styles.promoDesc}>
                    2 Birria + 2 Pollo Copal · llévalo por menos
                  </div>
                </div>
                <div className={styles.promoPrice}>$10</div>
              </div>
              <div className={styles.promoPlaceholder}>
                <div className={styles.placeholderTitle}>Tu promo aquí</div>
                <div className={styles.placeholderDesc}>
                  Espacio para promoción especial — edítame
                </div>
              </div>
            </div>
          </section>

          <section className={styles.favoritesSection}>
            <h2 className={styles.sectionTitle}>Favoritos de la casa</h2>
            <div className={styles.favoritesList}>
              {featured.map((f) => (
                <div key={f.id} className={styles.favoriteCard}>
                  <div className={styles.favoriteImage}>📷</div>
                  <div className={styles.favoriteContent}>
                    <div className={styles.favoriteName}>{f.name}</div>
                    <div className={styles.favoritePrice}>
                      <span className={styles.favoritePriceValue}>
                        {f.priceLabel}
                      </span>
                      <span className={styles.favoriteStars}>{f.stars}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.reviewsPreviewSection}>
            <div className={styles.reviewsHeader}>
              <h2 className={styles.sectionTitle}>Lo que dicen</h2>
              <a
                onClick={() => setTab('reviews')}
                className={styles.reviewsLink}
              >
                Ver todos
              </a>
            </div>
            <div className={styles.reviewsList}>
              {homeReviews.map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <span className={styles.reviewName}>{r.name}</span>
                    <span className={styles.reviewStars}>{r.starsStr}</span>
                  </div>
                  <p className={styles.reviewText}>"{r.text}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Galería</h2>
            <div className={styles.galleryGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.galleryImage}>
                  📷
                </div>
              ))}
            </div>
          </section>

          <section className={styles.followSection}>
            <div className={styles.followTitle}>Síguenos</div>
            <div className={styles.followLinks}>
              <a href="#" className={styles.followButton}>
                Instagram
              </a>
              <a href="#" className={styles.followButton}>
                Facebook
              </a>
              <a href="#" className={styles.followButton}>
                TikTok
              </a>
            </div>
          </section>
        </main>
      )}

      {tab === 'menu' && (
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>Menú</h1>
          <div className={styles.dishesContainer}>
            {items.map((d) => (
              <article key={d.id} className={styles.dishCard}>
                <div className={styles.dishImage}>📷</div>
                <div className={styles.dishContent}>
                  <div className={styles.dishHeader}>
                    <h3 className={styles.dishName}>{d.name}</h3>
                    <span className={styles.dishPrice}>{d.priceLabel}</span>
                  </div>
                  <div className={styles.dishRating}>
                    <span className={styles.dishStars}>{d.stars}</span>
                    <span className={styles.dishRatingLabel}>
                      {d.ratingLabel}
                    </span>
                  </div>
                  <p className={styles.dishDesc}>{d.desc}</p>
                  <a
                    href={d.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Pedir por WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>

          <h2 className={styles.combosTitle}>Combos Tacos</h2>
          <div className={styles.combosList}>
            {combos.map((c) => (
              <div key={c.id} className={styles.comboCard}>
                <div>
                  <div className={styles.comboName}>{c.name}</div>
                  <div className={styles.comboDesc}>{c.desc}</div>
                </div>
                <div className={styles.comboRight}>
                  <span className={styles.comboPrice}>{c.priceLabel}</span>
                  <a
                    href={c.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.comboButton}
                  >
                    Pedir
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {tab === 'reviews' && (
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>Reviews</h1>

          <div className={styles.ratingCard}>
            <div className={styles.ratingValue}>{avgAll.toFixed(1)}</div>
            <div>
              <div className={styles.ratingStars}>{starStr(avgAll)}</div>
              <div className={styles.ratingLabel}>
                {reviews.length} reviews de nuestros comensales
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formTitle}>Deja tu review</div>
            <div className={styles.formFields}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                className={styles.formInput}
              />
              <select
                value={fDish}
                onChange={(e) => setFDish(e.target.value)}
                className={styles.formSelect}
              >
                {DISHES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <div className={styles.formStars}>
                <span className={styles.starsLabel}>Tu calificación:</span>
                <div className={styles.starsPicker}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      onClick={() => setFStars(n)}
                      className={styles.starIcon}
                    >
                      {n <= fStars ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="¿Qué te pareció? Cuéntanos…"
                value={fText}
                onChange={(e) => setFText(e.target.value)}
                rows={3}
                className={styles.formTextarea}
              />
              <div className={styles.formPhotoPlaceholder}>
                📷 Adjuntar foto (opcional) — demo
              </div>
              <button
                onClick={submitReview}
                disabled={submitting || cooldown > 0}
                className={styles.formButton}
              >
                Publicar review
              </button>
              {formMsg && <div className={styles.formMessage}>{formMsg}</div>}
            </div>
          </div>

          <div className={styles.fullReviewsList}>
            {reviewsList.map((r) => (
              <div key={r.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <span className={styles.reviewName}>{r.name}</span>
                  <span className={styles.reviewStars}>{r.starsStr}</span>
                </div>
                <div className={styles.reviewTag}>{r.dishName}</div>
                <p className={styles.reviewText}>"{r.text}"</p>
                <div className={styles.reviewDate}>{r.date}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      <nav className={styles.nav}>
        <div
          onClick={() => setTab('menu')}
          className={styles.navItem}
          style={{ color: col('menu') }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v20"></path>
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"></path>
          </svg>
          <span>Menú</span>
        </div>
        <div
          onClick={() => setTab('inicio')}
          className={styles.navItem}
          style={{ color: col('inicio') }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Inicio</span>
        </div>
        <div
          onClick={() => setTab('reviews')}
          className={styles.navItem}
          style={{ color: col('reviews') }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Reviews</span>
        </div>
      </nav>
    </div>
  );
}
