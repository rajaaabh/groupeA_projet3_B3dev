import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { createSubscription } from '../services/api'
import './Payment.css'

/* ─── SVG Brand Logos ─── */

const VisaSVG = ({ size = 'md' }) => (
  <svg viewBox="0 0 78 24" xmlns="http://www.w3.org/2000/svg" className={`brand-svg brand-svg--${size}`}>
    <path d="M32.6 1.4L21.2 22.6H13.7L8.1 6.5C7.8 5.5 7.5 5.1 6.7 4.7 5.4 4 3.2 3.4 1.2 3L1.4 1.4H13.6c1.6 0 3 1.1 3.4 2.8l3.1 16.4L27.8 1.4h4.8zm19 14.2c0-6.6-9.1-7-9.1-9.9 0-.9.9-1.8 2.8-2.1 1-.1 3.5-.2 6.5 1.1L53 .9C51 .3 48.4 0 45.2 0c-5.2 0-8.9 2.8-8.9 6.8-.1 2.9 2.6 4.6 4.6 5.5 2 1 2.7 1.6 2.7 2.5 0 1.4-1.6 2-3.1 2-2.6 0-4.1-.7-5.3-1.3l-.9 4.3c1.2.6 3.4 1.1 5.7 1.1 5.5 0 9.1-2.7 9.1-7m13.6 6.9h4.4L66 1.4h-4.1c-.9 0-1.7.6-2 1.4L53 22.6h4.8l1-2.6h5.9l.5 2.5zm-5.1-6.3l2.4-6.6 1.4 6.6h-3.8zm-19.4-15l-3.8 21.3h-4.6l3.8-21.3h4.6z" fill="#1434CB"/>
  </svg>
)

const MastercardSVG = ({ size = 'md' }) => (
  <svg viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg" className={`brand-svg brand-svg--${size}`}>
    <circle cx="15" cy="15" r="15" fill="#EB001B"/>
    <circle cx="33" cy="15" r="15" fill="#F79E1B"/>
    <path d="M24 4.8A15 15 0 0 1 30 15a15 15 0 0 1-6 10.2A15 15 0 0 1 18 15 15 15 0 0 1 24 4.8z" fill="#FF5F00"/>
  </svg>
)

const AmexSVG = ({ size = 'md' }) => (
  <svg viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg" className={`brand-svg brand-svg--${size}`}>
    <rect width="60" height="24" rx="3" fill="#2E77BC"/>
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="'Helvetica Neue',Arial,sans-serif" fontWeight="700"
          fontSize="7.5" fill="#FFFFFF" letterSpacing="0.8">AMERICAN EXPRESS</text>
  </svg>
)

const OperatorLogo = ({ src, alt }) => (
  <div className="op-logo-wrap">
    <img src={src} alt={alt} className="op-logo" />
  </div>
)

const MTNLogo         = () => <OperatorLogo src="/mtn-logo.svg"          alt="MTN Mobile Money" />
const OrangeMoneyLogo = () => <OperatorLogo src="/orange-money-logo.svg" alt="Orange Money" />
const WaveLogo        = () => <OperatorLogo src="/wave-logo.png"         alt="Wave" />
const MoovLogo        = () => <OperatorLogo src="/moov-logo.jpg"         alt="Moov Africa" />

const ChipSVG = () => (
  <svg viewBox="0 0 50 38" xmlns="http://www.w3.org/2000/svg" className="pay-chip-svg">
    <rect width="50" height="38" rx="6" fill="#D4AF37"/>
    <rect x="1" y="1" width="48" height="36" rx="5" fill="#E8C94A" opacity="0.6"/>
    <line x1="25" y1="0" x2="25" y2="38" stroke="#B8952A" strokeWidth="1.5"/>
    <line x1="0" y1="19" x2="50" y2="19" stroke="#B8952A" strokeWidth="1.5"/>
    <line x1="16" y1="0" x2="16" y2="10" stroke="#B8952A" strokeWidth="1.5"/>
    <line x1="34" y1="0" x2="34" y2="10" stroke="#B8952A" strokeWidth="1.5"/>
    <line x1="16" y1="28" x2="16" y2="38" stroke="#B8952A" strokeWidth="1.5"/>
    <line x1="34" y1="28" x2="34" y2="38" stroke="#B8952A" strokeWidth="1.5"/>
    <rect x="16" y="10" width="18" height="18" rx="3" fill="#C49B20"/>
    <rect x="20" y="14" width="10" height="10" rx="2" fill="#D4AF37"/>
  </svg>
)

const NfcSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"
       strokeLinecap="round" className="pay-nfc-svg">
    <path d="M1 8a15 15 0 0 1 0 8"/>
    <path d="M5 10.5a9 9 0 0 0 0 3"/>
    <path d="M9 12a3 3 0 0 0 0 .1"/>
  </svg>
)

const LockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const ShieldSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

/* ─── Processing Screen ─── */
function ProcessingScreen() {
  return (
    <div className="pay-page">
      <Navbar />
      <div className="pay-overlay-screen">
        <div className="pay-spinner"></div>
        <h2 className="pay-overlay-title">Traitement en cours…</h2>
        <p className="pay-overlay-sub">Veuillez ne pas fermer cette page.</p>
      </div>
    </div>
  )
}

/* ─── Success Screen ─── */
function SuccessScreen({ navigate, plan }) {
  const [ref] = useState(() => `GYM-${Math.random().toString(36).toUpperCase().substring(2, 11)}`)
  const now = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="pay-page">
      <Navbar />
      <div className="pay-overlay-screen">
        <div className="pay-success-checkmark">
          <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#FF5500" strokeWidth="2" className="pay-check-circle"/>
            <polyline points="14,27 22,35 38,18" fill="none" stroke="#FF5500" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round" className="pay-check-tick"/>
          </svg>
        </div>
        <h2 className="pay-overlay-title">Paiement confirmé !</h2>
        <p className="pay-overlay-sub">
          Votre abonnement <strong style={{ color: '#FF5500' }}>{plan.name}</strong> est maintenant actif.
        </p>
        <div className="pay-receipt">
          <div className="pay-receipt-row">
            <span>Montant</span><strong>{plan.price} FCFA</strong>
          </div>
          <div className="pay-receipt-row">
            <span>Plan</span><strong>{plan.name} · {plan.duration}</strong>
          </div>
          <div className="pay-receipt-row">
            <span>Date</span><strong>{now}</strong>
          </div>
          <div className="pay-receipt-row">
            <span>Référence</span><strong className="pay-receipt-ref">{ref}</strong>
          </div>
        </div>
        <button className="pay-btn pay-btn--success" onClick={() => navigate('/dashboard')}>
          Accéder à mon espace →
        </button>
      </div>
    </div>
  )
}

/* ─── Card visual subcomponent ─── */
function CardVisual({ cardNumber, cardName, expiry, cvv, isFlipped, focused, cardType }) {
  const displayNumber = cardNumber || '•••• •••• •••• ••••'
  const displayName = cardName ? cardName.toUpperCase() : 'VOTRE NOM'
  const displayExpiry = expiry || 'MM/AA'

  const BrandFront = cardType === 'visa' ? VisaSVG : cardType === 'mastercard' ? MastercardSVG : cardType === 'amex' ? AmexSVG : null

  return (
    <div className={`pay-card-scene ${isFlipped ? 'flipped' : ''}`}>
      <div className="pay-card-inner">

        {/* ── Front ── */}
        <div className={`pay-card-face pay-card-face--front card-type--${cardType || 'default'}`}>
          <div className="pay-card-sheen" />
          <div className="pay-card-top">
            <ChipSVG />
            <NfcSVG />
          </div>
          <div className={`pay-card-number-row ${focused === 'number' ? 'highlighted' : ''}`}>
            {displayNumber}
          </div>
          <div className="pay-card-bottom">
            <div className="pay-card-info-group">
              <div className="pay-card-info-label">Titulaire</div>
              <div className={`pay-card-info-value ${focused === 'name' ? 'highlighted' : ''}`}>{displayName}</div>
            </div>
            <div className="pay-card-info-group">
              <div className="pay-card-info-label">Expire</div>
              <div className={`pay-card-info-value ${focused === 'expiry' ? 'highlighted' : ''}`}>{displayExpiry}</div>
            </div>
            {BrandFront && (
              <div className="pay-card-brand-front">
                <BrandFront size="sm" />
              </div>
            )}
          </div>
        </div>

        {/* ── Back ── */}
        <div className={`pay-card-face pay-card-face--back card-type--${cardType || 'default'}`}>
          <div className="pay-card-sheen" />
          <div className="pay-card-magstripe" />
          <div className="pay-card-sigrow">
            <div className="pay-card-sigstrip">
              <span className="pay-card-siglines">
                {[...Array(8)].map((_, i) => (
                  <span key={i} style={{ background: `hsl(${i * 25},50%,${40 + i * 5}%)` }} />
                ))}
              </span>
              <div className={`pay-cvv-box ${focused === 'cvv' ? 'highlighted' : ''}`}>
                {cvv || '•••'}
              </div>
            </div>
          </div>
          {BrandFront && (
            <div className="pay-card-brand-back">
              <BrandFront size="sm" />
            </div>
          )}
          <div className="pay-card-disclaimer">
            Ce service est autorisé par la banque émettrice de votre carte.
          </div>
        </div>

      </div>
    </div>
  )
}

/* ─── Main Component ─── */
function Payment() {
  const navigate = useNavigate()
  const location = useLocation()

  const plan = location.state?.plan || {
    id: null,
    name: 'TRIMESTRIEL',
    price: '24.99',
    duration: '90 jours',
  }

  const [activeTab, setActiveTab] = useState('card')
  const [step, setStep] = useState('form')
  const [submitting, setSubmitting] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const [focused, setFocused] = useState('')
  const [cardType, setCardType] = useState('')

  const [operator, setOperator] = useState('')
  const [phone, setPhone] = useState('')

  const operators = [
    { id: 'mtn',    label: 'MTN Mobile Money', Logo: MTNLogo },
    { id: 'orange', label: 'Orange Money',      Logo: OrangeMoneyLogo },
    { id: 'wave',   label: 'Wave',              Logo: WaveLogo },
    { id: 'moov',   label: 'Moov Money',        Logo: MoovLogo },
  ]

  const detectCardType = (v) => {
    const d = v.replace(/\s/g, '')
    if (/^4/.test(d)) return 'visa'
    if (/^5[1-5]|^2[2-7]/.test(d)) return 'mastercard'
    if (/^3[47]/.test(d)) return 'amex'
    return ''
  }

  const formatCardNumber = (raw) => {
    const digits = raw.replace(/\D/g, '')
    const type = detectCardType(digits)
    if (type === 'amex') {
      const d = digits.substring(0, 15)
      if (d.length <= 4) return d
      if (d.length <= 10) return d.slice(0, 4) + ' ' + d.slice(4)
      return d.slice(0, 4) + ' ' + d.slice(4, 10) + ' ' + d.slice(10)
    }
    const d = digits.substring(0, 16)
    return d.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (raw) => {
    const d = raw.replace(/\D/g, '').substring(0, 4)
    if (d.length >= 3) return d.slice(0, 2) + '/' + d.slice(2)
    return d
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
    setCardType(detectCardType(formatted))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStep('processing')
    try {
      if (plan.id) await createSubscription({ type_id: plan.id })
    } catch { /* fictive — on passe quand même */ }
    setTimeout(() => setStep('success'), 3000)
  }

  if (step === 'processing') return <ProcessingScreen />
  if (step === 'success') return <SuccessScreen navigate={navigate} plan={plan} />

  return (
    <div className="pay-page page-enter">
      <Navbar />

      <div className="pay-container">
        <button className="pay-back" onClick={() => navigate('/abonnements')}>
          ← Retour aux abonnements
        </button>

        <div className="pay-layout">

          {/* ── Colonne gauche ── */}
          <div className="pay-col pay-col--left">

            {/* Résumé commande */}
            <div className="pay-summary-card">
              <div className="pay-summary-tag">Récapitulatif</div>
              <div className="pay-summary-plan">{plan.name}</div>
              <div className="pay-summary-duration">{plan.duration}</div>
              <hr className="pay-summary-sep" />
              <div className="pay-summary-total">
                <span>Total</span>
                <span className="pay-summary-price">{plan.price} FCFA</span>
              </div>
            </div>

            {/* Carte 3D */}
            <CardVisual
              cardNumber={cardNumber}
              cardName={cardName}
              expiry={expiry}
              cvv={cvv}
              isFlipped={isFlipped}
              focused={focused}
              cardType={cardType}
            />

            {/* Logos acceptés */}
            <div className="pay-accepted">
              <span>Cartes acceptées</span>
              <div className="pay-accepted-logos">
                <VisaSVG size="sm" />
                <MastercardSVG size="sm" />
                <AmexSVG size="sm" />
              </div>
            </div>

          </div>

          {/* ── Colonne droite ── */}
          <div className="pay-col pay-col--right">

            <div className="pay-form-header">
              <LockSVG />
              <span>Paiement sécurisé</span>
            </div>

            {/* Onglets */}
            <div className="pay-tabs">
              <button
                className={`pay-tab ${activeTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveTab('card')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Carte bancaire
              </button>
              <button
                className={`pay-tab ${activeTab === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveTab('mobile')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="5" y="2" width="14" height="20" rx="2"/>
                  <circle cx="12" cy="17" r="1" fill="currentColor"/>
                </svg>
                Paiement mobile
              </button>
            </div>

            {/* ── Formulaire Carte ── */}
            {activeTab === 'card' && (
              <form className="pay-form" onSubmit={handleSubmit} noValidate>

                <div className="pay-field">
                  <label htmlFor="cardNumber">Numéro de carte</label>
                  <div className="pay-input-wrap">
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onFocus={() => { setFocused('number'); setIsFlipped(false) }}
                      onBlur={() => setFocused('')}
                      maxLength={cardType === 'amex' ? 17 : 19}
                      autoComplete="cc-number"
                      required
                    />
                    <div className="pay-input-brand">
                      {cardType === 'visa' && <VisaSVG size="xs" />}
                      {cardType === 'mastercard' && <MastercardSVG size="xs" />}
                      {cardType === 'amex' && <AmexSVG size="xs" />}
                    </div>
                  </div>
                </div>

                <div className="pay-field">
                  <label htmlFor="cardName">Nom du titulaire</label>
                  <input
                    id="cardName"
                    type="text"
                    placeholder="Jean Dupont"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    onFocus={() => { setFocused('name'); setIsFlipped(false) }}
                    onBlur={() => setFocused('')}
                    autoComplete="cc-name"
                    required
                  />
                </div>

                <div className="pay-row">
                  <div className="pay-field">
                    <label htmlFor="expiry">Date d'expiration</label>
                    <input
                      id="expiry"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      onFocus={() => { setFocused('expiry'); setIsFlipped(false) }}
                      onBlur={() => setFocused('')}
                      maxLength={5}
                      autoComplete="cc-exp"
                      required
                    />
                  </div>
                  <div className="pay-field">
                    <label htmlFor="cvv">
                      CVV
                      <span className="pay-cvv-hint" title="3 chiffres au dos de votre carte">?</span>
                    </label>
                    <input
                      id="cvv"
                      type="password"
                      inputMode="numeric"
                      placeholder="•••"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, '').substring(0, cardType === 'amex' ? 4 : 3))}
                      onFocus={() => { setFocused('cvv'); setIsFlipped(true) }}
                      onBlur={() => { setFocused(''); setIsFlipped(false) }}
                      maxLength={4}
                      autoComplete="cc-csc"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="pay-btn" disabled={submitting}>
                  <LockSVG />
                  Payer {plan.price} FCFA maintenant
                </button>

                <div className="pay-secure-badges">
                  <span><ShieldSVG /> SSL 256 bits</span>
                  <span>·</span>
                  <span>3D Secure</span>
                  <span>·</span>
                  <span>PCI DSS</span>
                </div>

              </form>
            )}

            {/* ── Formulaire Mobile ── */}
            {activeTab === 'mobile' && (
              <form className="pay-form" onSubmit={handleSubmit} noValidate>

                <div className="pay-field">
                  <label>Choisissez votre opérateur</label>
                  <div className="pay-operators">
                    {operators.map(op => (
                      <button
                        key={op.id}
                        type="button"
                        className={`pay-operator-btn ${operator === op.id ? 'selected' : ''}`}
                        onClick={() => setOperator(op.id)}
                      >
                        <op.Logo />
                        <span>{op.label}</span>
                        {operator === op.id && (
                          <span className="pay-operator-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pay-field">
                  <label htmlFor="phone">Numéro de téléphone</label>
                  <div className="pay-phone-wrap">
                    <span className="pay-phone-prefix">
                      <img
                        src="https://flagcdn.com/w20/ci.png"
                        alt="CI"
                        style={{ width: 16, borderRadius: 2, verticalAlign: 'middle' }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      +225
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="07 00 00 00 00"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                      required
                    />
                  </div>
                </div>

                <div className="pay-mobile-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" style={{ width: 16, flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>
                    Vous recevrez une notification push sur votre téléphone pour confirmer
                    le paiement de <strong>{plan.price} FCFA</strong>. Gardez votre téléphone à portée.
                  </span>
                </div>

                <button type="submit" className="pay-btn" disabled={!operator || submitting}>
                  Envoyer la demande — {plan.price} FCFA
                </button>

                <div className="pay-secure-badges">
                  <span><ShieldSVG /> Paiement sécurisé</span>
                  {operator && (
                    <>
                      <span>·</span>
                      <span>{operators.find(o => o.id === operator)?.label}</span>
                    </>
                  )}
                </div>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
