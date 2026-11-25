import { FileDown, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Art } from "../components/Art";
import { Box, Page, T } from "../components/Stage";
import { contact } from "../data/sections";

const links = [
  { y: 231, patch: [705, 230, 282, 26], label: contact.email, href: `mailto:${contact.email}` },
  { y: 279, patch: [705, 277, 282, 27], label: contact.phone, href: contact.phoneHref },
  { y: 330, patch: [701, 324, 302, 36], label: "https://www.behance.net/ananyasingha3", href: contact.behance },
  { y: 381, patch: [701, 369, 364, 36], label: "www.linkedin.com/in/ananya-singha-b7751a3a2", href: contact.linkedin },
];

const Behance = () => <span className="ico-text" aria-hidden="true">Bē</span>;
const LinkedIn = () => <span className="ico-text" aria-hidden="true">in</span>;
const icons = [<Mail key="m" aria-hidden="true" />, <Phone key="p" aria-hidden="true" />, <Behance key="b" />, <LinkedIn key="l" />];

/** PDF page 48 — Get in Touch (+ résumé download). */
export function Contact() {
  return (
    <section id="contact" aria-label="Get in touch">
      <Page n={48} label="Get in touch" className="contact">
        {/* desktop: the original artwork with live links over the contact card, exactly as in the PDF */}
        <Box x={0} y={0} w={1152} h={580} reveal="fade" className="only-stage">
          <Art k="get-in-touch" alt="Get in Touch — orange rotary telephone with contact card" sizes="100vw" fit="fill" />
        </Box>
        {links.map((l) => (
          <Box key={l.href} x={l.patch[0]} y={l.patch[1]} w={l.patch[2]} h={l.patch[3]} reveal={false} className="only-stage contact__patch">
            <span />
          </Box>
        ))}
        {links.map((l, i) => (
          <Box key={l.label} x={695} y={l.y - 1} reveal="right" delay={0.4 + i * 0.12} className="only-stage">
            <a className="contact__link" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
              <T as="span" s={17}>{l.label.replace("https://", "")}</T>
            </a>
          </Box>
        ))}
        <Box x={880} y={455} reveal="pop" delay={0.9} className="only-stage">
          <motion.a className="resume-btn" href={contact.resume} target="_blank" rel="noopener" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <FileDown aria-hidden="true" />
            <T as="span" s={14}>DOWNLOAD RESUME</T>
          </motion.a>
        </Box>

        {/* mobile / tablet: reflowed */}
        <Box x={0} y={0} reveal="pop" className="only-flow contact__lettering">
          <Art k="get-in-touch-lettering" alt="Get in Touch" fit="contain" />
        </Box>
        <Box x={0} y={0} className="only-flow">
          <ul className="contact__card">
            {links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                  <span className="contact__ico">{icons[i]}</span>
                  <span className="contact__txt">{l.label.replace("https://", "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </Box>
        <Box x={0} y={0} reveal="pop" delay={0.2} className="only-flow contact__resume">
          <a className="resume-btn" href={contact.resume} target="_blank" rel="noopener">
            <FileDown aria-hidden="true" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </Box>
        <Box x={0} y={0} reveal="left" className="only-flow contact__phone">
          <Art k="telephone" alt="Hand lifting the receiver of an orange rotary telephone" />
        </Box>
      </Page>
      <footer className="footer">
        <p>© 2026 Ananya Singha · Graphic &amp; Communication Designer · Bengaluru</p>
        <p>
          <a href={`mailto:${contact.email}`}>Email</a> · <a href={contact.behance} target="_blank" rel="noopener">Behance</a> · <a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a> · <a href={contact.resume} target="_blank" rel="noopener">Resume (PDF)</a>
        </p>
      </footer>
    </section>
  );
}
