import { object, ref, string } from 'yup';

export function createSignupSchema(translate: (key: string) => string) {
  return object({
    name: string()
      .required(translate('Field required'))
      .test({
        test(value, ctx) {
          if (!value) {
            return ctx.createError({ message: translate('Field required') });
          }

          if ([...value][0] !== [...value][0].toUpperCase()) {
            return ctx.createError({ message: translate('Name capitalize') });
          }

          return true;
        },
      }),
    email: string()
      .email(translate('Invalid format'))
      .required(translate('Field required')),
    password: string()
      .min(8, translate('Password length'))
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~-]).{8,}$/,
        { message: translate('Password format') }
      )
      .required(translate('Field required')),
    confirmPassword: string()
      .oneOf([ref('password')], translate('Password match'))
      .required(translate('Field required')),
  });
}
