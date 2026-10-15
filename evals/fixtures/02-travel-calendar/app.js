// AlpinePass Expeditions - Interactive Booking Engine
document.addEventListener('DOMContentLoaded', () => {
  const daysGrid = document.getElementById('days-grid');
  const checkinDisplay = document.getElementById('checkin-display');
  const checkoutDisplay = document.getElementById('checkout-display');
  const nightsCount = document.getElementById('nights-count');
  const baseRateLabel = document.getElementById('base-rate-label');
  const baseRateAmount = document.getElementById('base-rate-amount');
  const taxAmount = document.getElementById('tax-amount');
  const totalAmount = document.getElementById('total-amount');
  const bookNowBtn = document.getElementById('book-now-btn');

  let checkinDate = null;
  let checkoutDate = null;

  // October 2026: Oct 1 is Thursday (index 3 if Mon is 0)
  const daysInMonth = 31;
  const startDayOffset = 3; // Monday = 0, Tue = 1, Wed = 2, Thu = 3

  // Mock Capacity Data
  // Low: 9, 10, 16, 23 (1-3 beds)
  // Sold Out: 17, 24
  const lowDates = [9, 10, 16, 23];
  const soldOutDates = [17, 24];

  function getDayMeta(day) {
    const isWeekend = (startDayOffset + day - 1) % 7 >= 4; // Fri/Sat/Sun
    const price = isWeekend ? 165 : 135;

    if (soldOutDates.includes(day)) {
      return { status: 'sold-out', beds: 0, price, label: 'Sold Out' };
    }
    if (lowDates.includes(day)) {
      const beds = (day % 3) + 1;
      return { status: 'status-low', beds, price, label: `${beds} beds left` };
    }
    const beds = 8 + (day % 6);
    return { status: 'status-available', beds, price, label: `${beds} beds` };
  }

  function renderCalendar() {
    daysGrid.innerHTML = '';

    // Empty lead cells
    for (let i = 0; i < startDayOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'day-tile empty-pad';
      emptyCell.setAttribute('aria-hidden', 'true');
      daysGrid.appendChild(emptyCell);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const meta = getDayMeta(day);
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `day-tile ${meta.status}`;
      tile.dataset.day = day;
      tile.dataset.price = meta.price;

      if (meta.status === 'sold-out') {
        tile.disabled = true;
        tile.setAttribute('aria-disabled', 'true');
        tile.setAttribute('aria-label', `October ${day}, 2026: Sold out, $${meta.price} per night`);
      } else {
        tile.setAttribute('aria-label', `October ${day}, 2026: $${meta.price} per night, ${meta.label}`);
      }

      tile.innerHTML = `
        <div class="day-header">
          <span class="day-number">${day}</span>
          <span class="day-price">$${meta.price}</span>
        </div>
        <span class="day-status" aria-hidden="true">${meta.label}</span>
      `;

      tile.addEventListener('click', () => handleDayClick(day, meta));
      daysGrid.appendChild(tile);
    }
  }

  function handleDayClick(day, meta) {
    if (meta.status === 'sold-out') return;

    if (!checkinDate || (checkinDate && checkoutDate)) {
      // Starting new selection
      checkinDate = day;
      checkoutDate = null;
    } else if (checkinDate && !checkoutDate) {
      if (day > checkinDate) {
        // Valid checkout
        // Check if any sold-out dates exist in range
        let hasSoldOutInRange = false;
        for (let d = checkinDate; d <= day; d++) {
          if (soldOutDates.includes(d)) {
            hasSoldOutInRange = true;
            break;
          }
        }

        if (hasSoldOutInRange) {
          alert('Selected stay spans a sold-out date. Please pick another date range.');
          return;
        }

        checkoutDate = day;
      } else {
        // Clicked date is earlier or same as check-in, reset check-in to this date
        checkinDate = day;
        checkoutDate = null;
      }
    }

    updateUI();
  }

  function updateUI() {
    // Update active highlight classes on tiles
    const allTiles = daysGrid.querySelectorAll('.day-tile:not(.empty-pad)');
    allTiles.forEach(tile => {
      const day = parseInt(tile.dataset.day, 10);
      tile.classList.remove('selected-start', 'selected-end', 'in-stay-range');
      tile.removeAttribute('aria-selected');

      if (checkinDate && day === checkinDate) {
        tile.classList.add('selected-start');
        tile.setAttribute('aria-selected', 'true');
      }
      if (checkoutDate && day === checkoutDate) {
        tile.classList.add('selected-end');
        tile.setAttribute('aria-selected', 'true');
      }
      if (checkinDate && checkoutDate && day > checkinDate && day < checkoutDate) {
        tile.classList.add('in-stay-range');
      }
    });

    // Update summary pane
    if (checkinDate) {
      checkinDisplay.textContent = `Oct ${checkinDate}, 2026`;
    } else {
      checkinDisplay.textContent = 'Select a date';
    }

    if (checkoutDate) {
      checkoutDisplay.textContent = `Oct ${checkoutDate}, 2026`;
    } else {
      checkoutDisplay.textContent = 'Select check-out';
    }

    if (checkinDate && checkoutDate) {
      const nights = checkoutDate - checkinDate;
      nightsCount.textContent = nights;

      let subtotal = 0;
      for (let d = checkinDate; d < checkoutDate; d++) {
        subtotal += getDayMeta(d).price;
      }

      const rescueLevy = Math.round(subtotal * 0.08); // 8% alpine rescue levy
      const total = subtotal + rescueLevy;

      baseRateLabel.textContent = `Refuge Lodging (${nights} ${nights === 1 ? 'night' : 'nights'})`;
      baseRateAmount.textContent = `$${subtotal}`;
      taxAmount.textContent = `$${rescueLevy}`;
      totalAmount.textContent = `$${total}`;

      bookNowBtn.disabled = false;
      bookNowBtn.textContent = `Reserve Stay ($${total})`;
    } else {
      nightsCount.textContent = '0';
      baseRateLabel.textContent = 'Refuge Lodging (0 nights)';
      baseRateAmount.textContent = '$0';
      taxAmount.textContent = '$0';
      totalAmount.textContent = '$0';

      bookNowBtn.disabled = true;
      bookNowBtn.textContent = checkinDate ? 'Select Check-out Date' : 'Select Dates to Reserve';
    }
  }

  bookNowBtn.addEventListener('click', () => {
    if (checkinDate && checkoutDate) {
      alert(`Booking initiated for Oct ${checkinDate} – Oct ${checkoutDate}, 2026 (${totalAmount.textContent}). Proceeding to secure guest manifest...`);
    }
  });

  renderCalendar();
  updateUI();
});
