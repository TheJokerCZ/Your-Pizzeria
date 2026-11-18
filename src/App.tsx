/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink selection:bg-accent selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <MenuSection />
        <AboutSection />
      </main>

      <ContactFooter />
    </div>
  );
}
