# Brief 04: Public Service Benefit Application Form

## 1. Product Summary
- **Product Name:** CivicAid Resident Relief Portal
- **Domain:** Municipal public services, resident welfare, grant applications
- **Mode:** Create

## 2. Audience & Context
- **Users:** Citizens of diverse digital literacy, elderly residents, non-native English speakers.
- **Environment:** Low-end mobile smartphones, public library terminals, variable internet connections.
- **Mental State:** Anxious, seeking financial support, fearful of making irreversible mistakes.

## 3. Primary Task
Complete a multi-step eligibility form, understand documentation requirements, upload proof documents, and recover smoothly from validation errors without losing entered data.

## 4. Key Invariant Constraints
- Must comply with strict government accessibility standards (WCAG 2.2 AA).
- Form inputs must have persistent visual labels (never rely solely on placeholder text).
- Error messages must explain exactly what is wrong and provide explicit corrective instructions adjacent to the failing input and in an accessible summary banner.
- Progress across steps must be clearly indicated (e.g., Step 2 of 4: Household Income).

## 5. Required Interface States
- **Form In Progress:** Clear input groupings, field level helper text, and character counters for long explanations.
- **Validation Error State:** High-contrast error state with `aria-invalid="true"`, error icon, and anchor links to invalid fields.
- **Save & Resume Alert:** Confirmation that draft progress is saved locally.
- **Submission Confirmation:** Printable receipt number and estimated review timeline.

## 6. Acceptance Criteria
- [ ] No placeholder-only inputs; all `<label>` tags are properly associated with `for` attributes.
- [ ] Error messages meet 4.5:1 contrast against background surfaces.
- [ ] Form layout does not horizontally clip on 320px screens.
