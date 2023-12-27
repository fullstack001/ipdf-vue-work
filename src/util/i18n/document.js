export function setDocumentDirectionPerLocale(locale) {
  document.dir = locale === "ar" ? "rtl" : "ltr";
}

export function setDocumentLang(lang) {
  document.documentElement.lang = lang;
}
