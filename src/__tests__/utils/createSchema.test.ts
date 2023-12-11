import { describe, expect, it } from 'vitest';
import { createSchema } from '@utils/createSchema.ts';
import { ValidationError } from 'yup';
import { translateMock } from '../mocks/translateMock';
import { mockAuthData } from '../mocks/mockAuthData';

const signupSchema = createSchema(translateMock, true);
describe('Generate Schema', () => {
  it('should validates a valid form data for sign-up', async () => {
    const isValid = await signupSchema.isValid(mockAuthData);
    expect(isValid).toBe(true);
  });

  it('should fails validation for missing required fields', async () => {
    const invalidFormData = { ...mockAuthData };
    delete invalidFormData.name;

    const isValid = await signupSchema.isValid(invalidFormData);
    expect(isValid).toBe(false);
  });

  it('should fails validation for invalid name format', async () => {
    const invalidFormData = {
      ...mockAuthData,
      name: 'john',
    };

    const isValid = await signupSchema.isValid(invalidFormData);
    expect(isValid).toBe(false);

    const errors = await signupSchema
      .validate(invalidFormData)
      .catch((err: ValidationError) => err.errors);
    expect(errors).toContain('Name capitalize');
  });

  it('should fails validation for invalid email format', async () => {
    const invalidEmailFormData = {
      ...mockAuthData,
      email: 'john',
    };

    const isValid = await signupSchema.isValid(invalidEmailFormData, {
      abortEarly: false,
    });
    expect(isValid).toBe(false);

    const errors = await signupSchema
      .validate(invalidEmailFormData)
      .catch((err: ValidationError) => err.errors);
    expect(errors).toContain('Invalid format');
  });

  it('should fails validation for mismatched password and confirmPassword', async () => {
    const invalidFormData = {
      ...mockAuthData,
      confirmPassword: 'anotherPassword',
    };

    const isValid = await signupSchema.isValid(invalidFormData);
    expect(isValid).toBe(false);

    const errors = await signupSchema
      .validate(invalidFormData)
      .catch((err: ValidationError) => err.errors);
    expect(errors).toContain('Password match');
  });
});
