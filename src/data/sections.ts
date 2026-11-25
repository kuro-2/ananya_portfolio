export type NavSection = { id: string; label: string; num?: string; color: string };

/** Section order mirrors the PDF exactly. */
export const sections: NavSection[] = [
  { id: "home", label: "Cover", color: "#eaab2a" },
  { id: "about", label: "About Me", color: "#f6e6cf" },
  { id: "contents", label: "Table of Contents", color: "#1e8084" },
  { id: "typography", label: "Typography", num: "01", color: "#eb6213" },
  { id: "logofolio", label: "Logo Design", num: "02", color: "#ecae2c" },
  { id: "social-media", label: "Social Media", num: "03", color: "#1e8084" },
  { id: "posters", label: "Posters", num: "04", color: "#d24028" },
  { id: "print-media", label: "Print Media", num: "05", color: "#e86420" },
  { id: "packaging", label: "Packaging Design", num: "06", color: "#208084" },
  { id: "contact", label: "Get in Touch", color: "#eb6213" },
];

export const contact = {
  // The PDF's contact page reads "ananyasigha909@gmail.com" (missing "n"); the resume
  // supplied with the brief confirms the working address below.
  email: "ananyasingha909@gmail.com",
  phone: "+91 7086442931",
  phoneHref: "tel:+917086442931",
  behance: "https://www.behance.net/ananyasingha3",
  linkedin: "https://www.linkedin.com/in/ananya-singha-b7751a3a2",
  resume: "/Ananya-Singha-Resume.pdf",
};
