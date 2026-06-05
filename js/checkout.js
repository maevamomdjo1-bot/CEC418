// Checkout page — fill summary from cart, place order via API
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('customer')) return;

  const items = cart.get();
  if (!items.length) { window.location.href = 'cart.html'; return; }

  // Fill order summary
  const summaryEl = document.querySelector('.summary');
  if (summaryEl) {
    const subtotal = cart.total();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Replace static items with dynamic ones
    const existingItems = summaryEl.querySelectorAll('.summary-item:not(.total)');
    existingItems.forEach(el => el.remove());
    const h2 = summaryEl.querySelector('h2');

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'summary-item';
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${imageUtils.getProductImage(item)}" alt="${item.name}" 
               style="width:40px;height:40px;object-fit:cover;border-radius:6px;"
               onerror="this.src='${imageUtils.getFallbackImage()}'">
          <span>${item.name} ×${item.quantity}</span>
        </div>
        <span>${formatPrice(item.price * item.quantity)}</span>`;
      summaryEl.insertBefore(div, summaryEl.querySelector('button'));
    });

    // Update totals
    const totalEl = summaryEl.querySelector('.total span:last-child');
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  // Pre-fill name from profile
  try {
    const profile = await api.get('/auth/profile');
    const u = profile.user;
    const nameInput = document.querySelector('input[placeholder="Full Name"]');
    const emailInput = document.querySelector('input[placeholder="Email Address"]');
    const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
    const addressInput = document.querySelector('input[placeholder="Delivery Address"]');
    if (nameInput) nameInput.value = u.fullName || '';
    if (emailInput) emailInput.value = u.email || '';
    if (phoneInput) phoneInput.value = u.phone || '';
    if (addressInput && u.address) addressInput.value = `${u.address.street || ''}, ${u.address.city || ''}`.trim().replace(/^,\s*/, '');
  } catch {}
});

window.placeOrder = async function () {
  if (!requireAuth('customer')) return;

  const items = cart.get();
  if (!items.length) { showAlert('Cart is empty', 'error'); return; }

  const fullName = document.querySelector('input[placeholder="Full Name"]')?.value.trim();
  const address = document.querySelector('input[placeholder="Delivery Address"]')?.value.trim();
  const paymentRadio = document.querySelector('input[name="payment"]:checked');
  const paymentMethod = paymentRadio ? paymentRadio.parentElement.textContent.trim() : 'Cash on Delivery';

  if (!fullName || !address) { showAlert('Please fill billing details.', 'error'); return; }

  const [street, city = 'N/A'] = address.split(',').map(s => s.trim());

  try {
    const orderData = {
      items: items.map(i => ({ product: i._id, quantity: i.quantity })),
      shippingAddress: { fullName, street, city, state: 'N/A', zipCode: '00000', country: 'N/A' },
      paymentMethod
    };
    await api.post('/orders', orderData);
    cart.clear();
    showAlert('Order placed successfully!');
    setTimeout(() => window.location.href = 'order-summary.html', 1000);
  } catch (err) { showAlert(err.message, 'error'); }
};

window.generateInvoice = function () {
  const items = cart.get();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text('SmartShop Invoice', 20, 20);
  doc.setFontSize(12);
  doc.text('Order Details', 20, 40);

  let y = 55;
  items.forEach(item => {
    doc.text(`${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`, 20, y);
    y += 12;
  });

  const subtotal = cart.total();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  doc.text(`Subtotal: ${formatPrice(subtotal)}`, 20, y + 10);
  doc.text(`Shipping: ${formatPrice(shipping)}`, 20, y + 22);
  doc.text(`Tax: ${formatPrice(tax)}`, 20, y + 34);
  doc.setFontSize(16);
  doc.text(`Total: ${formatPrice(subtotal + shipping + tax)}`, 20, y + 50);
  doc.setFontSize(12);
  doc.text('Thank you for shopping with SmartShop!', 20, y + 70);
  doc.save('invoice.pdf');
};
