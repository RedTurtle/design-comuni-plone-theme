/**
 * Language helpers for single-language sites that host pages in other
 * languages: resolve the language of the content being viewed and its
 * writing direction, used for the lang/dir attributes.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-26
 */
import { useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { flattenToAppURL, getBaseUrl, isCmsUi } from '@plone/volto/helpers';

// Primary subtags of the languages written right to left.
// Overridable with config.settings.rtlLanguages.
export const RTL_LANGUAGES = [
  'ar',
  'arc',
  'ckb',
  'dv',
  'fa',
  'he',
  'iw',
  'ji',
  'ks',
  'ps',
  'sd',
  'syr',
  'ug',
  'ur',
  'yi',
];

// Plone codes may use "_" (pt_BR), the lang attribute wants BCP 47 ("-").
export const toHtmlLang = (lang) => (lang ? lang.replace(/_/g, '-') : lang);

export const getLanguageDirection = (lang) => {
  const primary = (lang ?? '').split(/[-_]/)[0].toLowerCase();
  const rtlLanguages = config.settings.rtlLanguages ?? RTL_LANGUAGES;
  return rtlLanguages.includes(primary) ? 'rtl' : 'ltr';
};

// plone.restapi serializes the field as {token, title}, but as a plain
// string when the value is not in the vocabulary.
export const getLanguageToken = (language) =>
  typeof language === 'string' ? language : language?.token;

const normalizePath = (path) => (path || '/').replace(/\/+$/, '') || '/';

/**
 * Language of the content shown at pathname, or null.
 * The content in the store is stale on routes that don't load content
 * (e.g. /search), so it is used only when it matches the current path.
 */
export const getContentLanguage = (content, pathname) => {
  const token = getLanguageToken(content?.language);
  if (!token || !content?.['@id'] || !pathname) return null;
  const contentPath = normalizePath(flattenToAppURL(content['@id']));
  const currentPath = normalizePath(getBaseUrl(pathname));
  return contentPath === currentPath ? toHtmlLang(token) : null;
};

// Language of the site UI: the content language changes only on
// multilingual sites, otherwise the UI stays in the default language.
export const getSiteLanguage = (locale) =>
  toHtmlLang(
    config.settings.isMultilingual
      ? locale
      : config.settings.defaultLanguage ?? locale,
  );

/**
 * lang/dir for the <html> tag: the content language on public views,
 * the site language elsewhere (CMS UI, search, sitemap...).
 */
export const getPageLanguage = ({ content, pathname, locale }) => {
  const contentLang =
    pathname && !isCmsUi(pathname)
      ? getContentLanguage(content, pathname)
      : null;
  const lang = contentLang || getSiteLanguage(locale);
  return { lang, dir: getLanguageDirection(lang) };
};

// lang/dir to mark the site chrome (header, footer...), which stays in the
// site language when the page content is in another one.
export const useSiteLanguage = () => {
  const { locale } = useIntl();
  const lang = getSiteLanguage(locale);
  return { lang, dir: getLanguageDirection(lang) };
};
