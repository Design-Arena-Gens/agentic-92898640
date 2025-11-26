/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo, useState } from 'react';

type Tone = 'formal' | 'neutral' | 'friendly';

type RegionPreset =
  | 'Global'
  | 'Middle East'
  | 'South Asia'
  | 'Southeast Asia'
  | 'East Asia'
  | 'Europe'
  | 'Africa'
  | 'North America'
  | 'South America';

function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/?text=${encoded}`;
}

function toBullets(items: string) {
  return items
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `? ${s}`)
    .join('\n');
}

function sanitizePhone(e164OrIntl: string) {
  // Remove non-digits, allow leading +
  const trimmed = e164OrIntl.trim();
  const digits = trimmed.replace(/[^\d+]/g, '');
  // WhatsApp prefers international number without + for wa.me links
  return digits.replace(/^\+/, '');
}

export default function HomePage() {
  const [region, setRegion] = useState<RegionPreset>('Global');
  const [country, setCountry] = useState('');
  const [products, setProducts] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [offerings, setOfferings] = useState('');
  const [uniques, setUniques] = useState('');
  const [certs, setCerts] = useState('');
  const [incoterms, setIncoterms] = useState('FOB, CIF, EXW (as needed)');
  const [targetRole, setTargetRole] = useState('Procurement Manager / Import Manager');
  const [tone, setTone] = useState<Tone>('formal');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');

  const culturalNotes = useMemo(() => {
    switch (region) {
      case 'Middle East':
        return [
          'Use warm greetings; show respect and patience.',
          'Be flexible on relationship-building before hard negotiation.',
          'Avoid high-pressure tactics; emphasize trust and reliability.'
        ];
      case 'South Asia':
        return [
          'Be polite and professional; build rapport first.',
          'Price and quality balance matters; highlight consistency.',
          'Follow up gently if no reply in 24?48 hours.'
        ];
      case 'Southeast Asia':
        return [
          'Keep tone respectful and concise.',
          'Offer samples and small trial orders.',
          'Be mindful of holidays and local time zones.'
        ];
      case 'East Asia':
        return [
          'Use formal tone; avoid slang.',
          'Highlight certifications, specs, and reliability.',
          'Provide precise data sheets and packaging options.'
        ];
      case 'Europe':
        return [
          'Be concise and structured; avoid over-familiarity.',
          'Lead with certifications and compliance.',
          'Provide transparent pricing and logistics.'
        ];
      case 'Africa':
        return [
          'Be courteous; confirm availability and lead times.',
          'Offer flexible MOQs and phased shipments.',
          'Clarify payment terms clearly.'
        ];
      case 'North America':
        return [
          'Be direct with clear value propositions.',
          'Lead with certifications, lead times, and pricing.',
          'Offer quick samples and references.'
        ];
      case 'South America':
        return [
          'Warm, friendly tone works well.',
          'Offer Spanish/Portuguese documentation if available.',
          'Discuss payment terms and logistics early.'
        ];
      default:
        return [
          'Be concise, courteous, and specific.',
          'Mention certifications and logistics readiness.',
          'Provide clear next steps and your availability.'
        ];
    }
  }, [region]);

  const introMessage = useMemo(() => {
    const countryPart = country ? ` in ${country}` : '';
    const productPart = products || 'high-quality spices';
    const uniq = uniques ? `\nUnique strengths:\n${toBullets(uniques)}` : '';
    const cert = certs ? `\nCertifications:\n${toBullets(certs)}` : '';
    const off = offerings ? `\nProduct highlights:\n${toBullets(offerings)}` : '';
    const tonePrefix =
      tone === 'formal'
        ? 'Dear'
        : tone === 'friendly'
        ? 'Hello'
        : 'Hi';

    return `${tonePrefix} ${targetRole},

I hope you are well. My name is ${businessName || '?'} from ${businessName || 'our company'}, supplying ${productPart}${countryPart ? ` to buyers ${countryPart}` : ''}.

We support international buyers with consistent quality, transparent pricing, and reliable shipments. ${incoterms ? `Incoterms: ${incoterms}.` : ''}
${off}${uniq}${cert}

Could we share a brief spec sheet and discuss your current requirements? I can send samples and indicative pricing right away.

Best regards,
${businessName || '?'}
WhatsApp: ${whatsAppNumber || '?'}`;
  }, [
    products,
    uniques,
    certs,
    offerings,
    businessName,
    country,
    targetRole,
    tone,
    incoterms,
    whatsAppNumber
  ]);

  const followUpMessage = useMemo(() => {
    return `Hello ${targetRole},

Following up on my earlier message regarding ${products || 'our spices'}. I would be happy to share COAs, specifications, and samples. Do you have a preferred MOQ, packaging, and delivery timeline?

Thank you!`;
  }, [products, targetRole]);

  const stepByStep = useMemo(() => {
    const steps = [
      'Research: Identify verified buyers and confirm WhatsApp contact.',
      'Timing: Message during business hours in their time zone.',
      'Introduction: Send the crafted message with clear value and next steps.',
      'Assets: Attach spec sheet, certifications, and product photos on request.',
      'Engagement: Ask 2?3 concise questions (MOQ, packaging, delivery terms).',
      'Follow-up: If no response in 48 hours, send the follow-up message.',
      'Negotiation: Clarify incoterms, lead times, payment, and sampling.',
      'Relationship: Be responsive, transparent, and consistent in communication.'
    ];
    return steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
  }, []);

  const whatsappIntroLink = useMemo(
    () => buildWhatsAppLink(introMessage),
    [introMessage]
  );
  const whatsappFollowLink = useMemo(
    () => buildWhatsAppLink(followUpMessage),
    [followUpMessage]
  );
  const whatsappDirectNumberLink = useMemo(() => {
    const number = sanitizePhone(whatsAppNumber);
    if (!number) return '';
    return `https://wa.me/${number}?text=${encodeURIComponent(introMessage)}`;
  }, [introMessage, whatsAppNumber]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch {
      alert('Copy failed. Select and copy manually.');
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <div>
          <div className="title">Spice Buyer WhatsApp Outreach</div>
          <div className="subtitle">
            Create culturally-appropriate messages and a clear outreach plan.
          </div>
        </div>
        <a
          className="btn ghost"
          href="https://wa.me"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>

      <div className="grid">
        <div className="card stack">
          <div className="row">
            <div>
              <div className="label">Region preset</div>
              <select
                className="select"
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionPreset)}
              >
                {[
                  'Global',
                  'Middle East',
                  'South Asia',
                  'Southeast Asia',
                  'East Asia',
                  'Europe',
                  'Africa',
                  'North America',
                  'South America'
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="label">Tone</div>
              <select
                className="select"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
              >
                <option value="formal">Formal</option>
                <option value="neutral">Neutral</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Target country/region (optional)</div>
              <input
                className="input"
                placeholder="e.g., UAE, Germany"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <div className="label">Target role</div>
              <input
                className="input"
                placeholder="Procurement Manager / Import Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Your business name</div>
              <input
                className="input"
                placeholder="Your company"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <div className="label">WhatsApp number (international)</div>
              <input
                className="input"
                placeholder="+9715xxxxxxx"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="label">Products (comma-separated)</div>
            <input
              className="input"
              placeholder="Organic turmeric, black pepper, cumin"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
            />
          </div>

          <div className="row">
            <div>
              <div className="label">Product highlights (one per line)</div>
              <textarea
                className="textarea"
                placeholder={'Curcumin 5%?7%\nASTA Black Pepper 500+ g/l\nSteam sterilized; ETO-free'}
                value={offerings}
                onChange={(e) => setOfferings(e.target.value)}
              />
            </div>
            <div>
              <div className="label">Unique strengths (one per line)</div>
              <textarea
                className="textarea"
                placeholder={'Farm-direct sourcing\nFlexible MOQs\nPrivate labeling & custom packaging'}
                value={uniques}
                onChange={(e) => setUniques(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Certifications (one per line)</div>
              <textarea
                className="textarea"
                placeholder={'USDA Organic / EU Organic\nFSSC 22000 / BRCGS\nISO 22000 / HALAL / KOSHER'}
                value={certs}
                onChange={(e) => setCerts(e.target.value)}
              />
            </div>
            <div>
              <div className="label">Incoterms</div>
              <input
                className="input"
                placeholder="FOB, CIF, EXW"
                value={incoterms}
                onChange={(e) => setIncoterms(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card stack">
          <div>
            <div className="section-title">Cultural guidance</div>
            <div className="muted">
              {culturalNotes.map((n, i) => (
                <div key={i}>? {n}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-title">Introduction message</div>
            <div className="output">{introMessage}</div>
            <div className="footer">
              <button className="btn" onClick={() => copy(introMessage)}>
                Copy
              </button>
              <a className="btn secondary" href={whatsappIntroLink} target="_blank" rel="noreferrer">
                Open in WhatsApp
              </a>
              {whatsappDirectNumberLink && (
                <a className="btn ghost" href={whatsappDirectNumberLink} target="_blank" rel="noreferrer">
                  WhatsApp to number
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="section-title">Follow-up message (48 hours)</div>
            <div className="output">{followUpMessage}</div>
            <div className="footer">
              <button className="btn" onClick={() => copy(followUpMessage)}>
                Copy
              </button>
              <a className="btn secondary" href={whatsappFollowLink} target="_blank" rel="noreferrer">
                Open in WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div className="section-title">Step-by-step plan</div>
            <div className="output">{stepByStep}</div>
            <div className="footer">
              <button className="btn ghost" onClick={() => copy(stepByStep)}>
                Copy plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 18 }} />
      <div className="card muted" style={{ fontSize: 12 }}>
        Tip: Keep attachments small, respect local holidays, and confirm preferred language. Use a clear subject line if cross-posting via email.
      </div>
    </div>
  );
}

