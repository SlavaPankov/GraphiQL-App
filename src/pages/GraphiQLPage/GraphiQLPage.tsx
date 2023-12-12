import { BaseButton } from '@components/BaseButton';
import { GraphqlApp } from '@components/GraphqlApp';
import { useLocaleContext } from '@context/LocalizationContext';

function FakeHeader() {
  const { locale, setLocale } = useLocaleContext();

  return (
    <header>
      <BaseButton label={`header: ${locale}`} disabled />
      <BaseButton
        label="en"
        onClick={() => {
          setLocale('en');
        }}
      />
      <BaseButton
        label="ru"
        onClick={() => {
          setLocale('ru');
        }}
      />
    </header>
  );
}
function FakeFooter() {
  return (
    <footer>
      <BaseButton label="footer" />
    </footer>
  );
}

export function GraphiQLPage() {
  return (
    <>
      <FakeHeader />

      <GraphqlApp />

      <FakeFooter />
    </>
  );
}
