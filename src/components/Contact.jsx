import React from 'react';
import { motion } from 'framer-motion';


const Contact = ({ showToast }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name') || '';
    const phone = fd.get('phone') || '';
    const email = fd.get('email') || '';
    const interest = fd.get('interest') || '';
    const msg = fd.get('message') || '';

    let text = 'New Enquiry from Gautam Automobile Website\n\n';
    text += 'Name: ' + name + '\n';
    text += 'Phone: ' + phone + '\n';
    if (email) text += 'Email: ' + email + '\n';
    if (interest) text += 'Interest: ' + interest + '\n';
    if (msg) text += 'Message: ' + msg + '\n';
    text += '\n--- Sent from Gautam Automobile Website';

    const waUrl = 'https://wa.me/919354719192?text=' + encodeURIComponent(text);

    showToast(`Opening WhatsApp... Thank you ${name}!`);
    e.target.reset();
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative t-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">Get In Touch</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-3 sm:mb-4">Visit Our <span className="italic text-red-500">Showroom</span></h2>
          <p className="t2 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">Come see our collection in person or reach out to us.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
              {/* Showroom Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:map-pin" width="20" className="text-red-600 dark:text-red-400"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Showroom Address</h4>
                  <p className="t2 font-light text-xs sm:text-sm">Gautam Automobile, Jind, Rohtak Road, Near HDB Bank</p>
                  <a 
                    href="https://maps.app.goo.gl/HH77DYgKcZJjGkon7" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-red-500 hover:text-red-600 font-medium mt-1.5 transition-colors group"
                  >
                    <span>Get Directions on Google Maps</span>
                    <iconify-icon icon="lucide:arrow-up-right" width="14" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></iconify-icon>
                  </a>
                </div>
              </div>
              
              {/* Phone Number 1 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:phone" width="20" className="text-red-600 dark:text-red-400"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Phone Number 1</h4>
                  <a href="tel:+919354719192" className="t2 hover:text-red-500 font-light text-xs sm:text-sm transition-colors">+91 93547 19192</a>
                </div>
              </div>
              
              {/* Phone Number 2 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:phone" width="20" className="text-red-600 dark:text-red-400"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Phone Number 2</h4>
                  <a href="tel:+918510053232" className="t2 hover:text-red-500 font-light text-xs sm:text-sm transition-colors">+91 85100 53232</a>
                </div>
              </div>
              
              {/* Email Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:mail" width="20" className="text-red-600 dark:text-red-400"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Email Address</h4>
                  <a href="mailto:automobilegautam@gmail.com" className="t2 hover:text-red-500 font-light text-xs sm:text-sm transition-colors">automobilegautam@gmail.com</a>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:clock" width="20" className="text-red-600 dark:text-red-400"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Working Hours</h4>
                  <p className="t2 font-light text-xs sm:text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="t2 font-light text-xs sm:text-sm">Sunday: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 sm:mb-4">Follow Us</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Instagram Card */}
                <a href="https://www.instagram.com/gautam_automobile_jind?igsh=MWtpeDM2eGZ5Y3V1Zg==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-5 py-3 rounded-xl t-card hover:border-pink-500/50 transition-all group flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                    <iconify-icon icon="lucide:instagram" width="20" className="text-white"></iconify-icon>
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-pink-500 transition-colors">@gautam_automobile_jind</div>
                    <div className="text-[10px] t3 font-light">Follow us on Instagram</div>
                  </div>
                </a>
                
                {/* Facebook Card */}
                <a href="https://www.facebook.com/share/18e2Zsvaza/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-5 py-3 rounded-xl t-card hover:border-blue-500/50 transition-all group flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center">
                    <iconify-icon icon="lucide:facebook" width="20" className="text-white"></iconify-icon>
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-blue-500 transition-colors">Gautam Automobile</div>
                    <div className="text-[10px] t3 font-light">Follow us on Facebook</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-6 sm:p-8 rounded-2xl t-card">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-2">Send Us a Message</h3>
            <p className="t3 text-xs sm:text-sm font-light mb-5 sm:mb-6">Fill out the form and we'll get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div><label className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium block mb-2">Full Name *</label><input type="text" name="name" required placeholder="Your name" className="w-full t-input rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm" /></div>
                <div><label className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium block mb-2">Phone *</label><input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className="w-full t-input rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm" /></div>
              </div>
              <div><label className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium block mb-2">Email</label><input type="email" name="email" placeholder="your@email.com" className="w-full t-input rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm" /></div>
              <div>
                <label className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium block mb-2">Interested In</label>
                <select name="interest" className="w-full t-input rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">
                  <option value="">Select an option</option>
                  <option value="buying">Buying a Car</option>
                  <option value="selling">Selling a Car</option>
                  <option value="exchange">Car Exchange</option>
                  <option value="finance">Loan / Finance</option>
                  <option value="other">Other Enquiry</option>
                </select>
              </div>
              <div><label className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium block mb-2">Message</label><textarea name="message" rows="4" placeholder="Tell us what you're looking for..." className="w-full t-input rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm resize-none"></textarea></div>
              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold py-3 sm:py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                <iconify-icon icon="lucide:send" width="16"></iconify-icon> Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;