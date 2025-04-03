const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const saveBtn = document.getElementById('save');

if (emailInput && phoneInput && saveBtn) {
  saveBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const phone = phoneInput.value;

    try {
      const response = await fetch('/.netlify/functions/updateContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
    } catch (error) {
      document.getElementById('message').textContent = 'Erreur de mise à jour';
    }
  });
}

function updateContactPage(email, phone) {
  const contactEmail = document.getElementById('contact-email');
  const contactPhone = document.getElementById('contact-phone');

  if (contactEmail) contactEmail.textContent = email;
  if (contactPhone) contactPhone.textContent = phone;
}