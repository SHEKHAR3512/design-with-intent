# Brief 08: Multilingual & RTL Mobile Checkout Flow

## 1. Product Summary
- **Product Name:** PayGlobal Cross-Border Checkout
- **Domain:** International e-commerce payment processing & remittances
- **Mode:** Create

## 2. Audience & Context
- **Users:** Global shoppers purchasing in multiple currencies across 180 countries.
- **Languages:** English (LTR), German (long compound words e.g. *Zahlungsdienstleister*), and Arabic (RTL).
- **Environment:** Mobile web browsers (iOS Safari, Android Chrome).
- **Mental State:** Security-conscious, confirming amounts and localized payment methods.

## 3. Primary Task
Complete a 2-step mobile payment authorization, toggle between languages (EN, DE, AR), and verify that layout, input text, currency indicators, and icons mirror properly for RTL without breaking.

## 4. Key Invariant Constraints
- Must use CSS Logical Properties (`margin-inline`, `padding-inline`, `inset-inline-start`, `text-align: start`) rather than hardcoded `left`/`right`.
- Layout must accommodate 40% text expansion (common in German and Finnish translations) without button text truncation or visual wrapping overflow.
- Icons with directional meaning (back arrows, step chevrons) must mirror in RTL mode; non-directional icons (credit cards, padlock, currency symbols) must NOT mirror.

## 5. Required Interface States
- **LTR English View:** Standard left-to-right alignment with localized currency formatting.
- **RTL Arabic View:** Full right-to-left mirrored hierarchy with proper Arabic typography and mirrored navigation.
- **High-Density German View:** Layout accommodates long German labels (*Kreditkartenabrechnungsadresse*) gracefully with fluid wrapping.
- **Payment Processing & Success States:** Clear loading animation and multi-lingual success badge.

## 6. Acceptance Criteria
- [ ] Explicit support for `dir="rtl"` with logical CSS properties.
- [ ] No hardcoded `margin-left` or `text-align: left` in core component styles.
- [ ] Buttons and badges do not clip text when labels expand by 40%.
- [ ] Tested down to 320px viewport width.
