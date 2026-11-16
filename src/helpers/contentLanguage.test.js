/**
 * Tests for the content language helpers (lang/dir of pages in languages
 * other than the site one).
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-26
 */
import config from '@plone/volto/registry';
import {
  getContentLanguage,
  getLanguageDirection,
  getLanguageToken,
  getPageLanguage,
  getSiteLanguage,
  toHtmlLang,
} from './contentLanguage';

const API = 'http://localhost:8080/Plone';

const page = (path, language) => ({ '@id': `${API}${path}`, language });

beforeEach(() => {
  config.settings.apiPath = 'http://localhost:8080/Plone';
  config.settings.publicURL = 'http://localhost:3000';
  config.settings.isMultilingual = false;
  config.settings.defaultLanguage = 'it';
  delete config.settings.rtlLanguages;
});

describe('getLanguageDirection', () => {
  it('returns rtl for right to left languages', () => {
    ['ar', 'ur', 'fa', 'he', 'ar-SA', 'ur_PK'].forEach((lang) =>
      expect(getLanguageDirection(lang)).toBe('rtl'),
    );
  });

  it('returns ltr for the others and for missing values', () => {
    ['it', 'en', 'zh', 'zh-cn', 'pt_BR', '', undefined].forEach((lang) =>
      expect(getLanguageDirection(lang)).toBe('ltr'),
    );
  });

  it('uses config.settings.rtlLanguages when set', () => {
    config.settings.rtlLanguages = ['xx'];
    expect(getLanguageDirection('xx')).toBe('rtl');
    expect(getLanguageDirection('ar')).toBe('ltr');
  });
});

describe('toHtmlLang', () => {
  it('turns Plone codes into BCP 47', () => {
    expect(toHtmlLang('pt_BR')).toBe('pt-BR');
    expect(toHtmlLang('zh-cn')).toBe('zh-cn');
  });
});

describe('getLanguageToken', () => {
  it('reads both the vocabulary term and the plain string', () => {
    expect(getLanguageToken({ token: 'ar', title: 'العربية (ar)' })).toBe('ar');
    expect(getLanguageToken('ar')).toBe('ar');
    expect(getLanguageToken(null)).toBeUndefined();
  });
});

describe('getContentLanguage', () => {
  const content = page('/test/pagina-ar', { token: 'ar' });

  it('returns the language of the content shown at pathname', () => {
    expect(getContentLanguage(content, '/test/pagina-ar')).toBe('ar');
    expect(getContentLanguage(content, '/test/pagina-ar/')).toBe('ar');
  });

  it('ignores stale content of another path', () => {
    expect(getContentLanguage(content, '/search')).toBeNull();
    expect(getContentLanguage(content, '/test')).toBeNull();
  });

  it('works on the site root', () => {
    expect(getContentLanguage(page('', { token: 'en' }), '/')).toBe('en');
  });

  it('returns null when the content has no language', () => {
    expect(getContentLanguage(page('/a', ''), '/a')).toBeNull();
    expect(getContentLanguage(page('/a', null), '/a')).toBeNull();
  });
});

describe('getSiteLanguage', () => {
  it('uses the default language on single-language sites', () => {
    expect(getSiteLanguage('en')).toBe('it');
  });

  it('follows the UI locale on multilingual sites', () => {
    config.settings.isMultilingual = true;
    expect(getSiteLanguage('en')).toBe('en');
  });
});

describe('getPageLanguage', () => {
  const content = page('/test/pagina-ar', { token: 'ar' });

  it('uses the content language on public views', () => {
    expect(
      getPageLanguage({ content, pathname: '/test/pagina-ar', locale: 'it' }),
    ).toEqual({ lang: 'ar', dir: 'rtl' });
  });

  it('uses the site language on CMS UI routes', () => {
    expect(
      getPageLanguage({
        content,
        pathname: '/test/pagina-ar/edit',
        locale: 'it',
      }),
    ).toEqual({ lang: 'it', dir: 'ltr' });
  });

  it('uses the site language when the content is stale', () => {
    expect(
      getPageLanguage({ content, pathname: '/search', locale: 'en' }),
    ).toEqual({ lang: 'it', dir: 'ltr' });
  });
});
