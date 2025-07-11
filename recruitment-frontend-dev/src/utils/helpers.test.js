import { describe, it, expect } from 'vitest';
import { 
  validateEmail, 
  validatePassword, 
  capitalize, 
  truncateText, 
  formatDate,
  storage 
} from './helpers';

describe('helpers', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      expect(validatePassword('StrongPass123!')).toBe(true);
      expect(validatePassword('MySecure@Pass1')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('onlylowercase')).toBe(false);
      expect(validatePassword('ONLYUPPERCASE')).toBe(false);
      expect(validatePassword('NoNumbers!')).toBe(false);
      expect(validatePassword('NoSpecialChars123')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter and lowercases the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('tEST')).toBe('Test');
    });

    it('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than maxLength', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long ...');
    });

    it('returns original text if shorter than maxLength', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('uses default maxLength of 100', () => {
      const text = 'a'.repeat(150);
      const result = truncateText(text);
      expect(result).toHaveLength(103); // 100 + '...'
      expect(result.endsWith('...')).toBe(true);
    });
  });

  describe('formatDate', () => {
    it('formats date with default options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/January 15, 2024/);
    });

    it('formats date with custom options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      expect(formatted).toMatch(/Jan 15, 2024/);
    });
  });

  describe('storage', () => {
    it('stores and retrieves data', () => {
      const testData = { name: 'test', value: 123 };
      storage.set('test-key', testData);
      expect(storage.get('test-key')).toEqual(testData);
    });

    it('returns default value for non-existent keys', () => {
      expect(storage.get('non-existent', 'default')).toBe('default');
    });

    it('removes data', () => {
      storage.set('remove-test', 'data');
      storage.remove('remove-test');
      expect(storage.get('remove-test')).toBe(null);
    });
  });
});
