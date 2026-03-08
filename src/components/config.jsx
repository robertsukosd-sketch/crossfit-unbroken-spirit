
export const CONTACT_EMAIL = 'train@unbrokenspirit.ro';
export const PHONE_1 = '+40 748 838 767';
export const PHONE_2 = '+40 740 269 769';
export const GYM_ADDRESS = 'Splaiul Unirii 257-259, Sector 3, București';

export const QUICK_FOOTER_LINKS = [
  { label: 'home', href: '#hero' },
  { label: 'startHere', href: '#starthere' },
  { label: 'programs', href: '#programs' },
  { label: 'pricing', href: '#pricing' },
  { label: 'schedule', href: '#schedule' },
  { label: 'contact', href: '#contact' }
];

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToSectionWithDelay = (id, delay = 0) => {
  setTimeout(() => scrollToSection(id), delay);
};
