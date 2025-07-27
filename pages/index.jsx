import Header from "../src/header/Header";
import { Game } from "../src/game-new";
import { UITextField } from "../src/uikit/ui-text-field";
import PersonSelector from "../src/uikit/fileds/ui-filed-select";

export default function HomePage() {
  return (
    <HomePageLayout header={<Header />}>
      {/*<Game />*/}
      <UITextField
        label="Label"
        required
        helperText
        placeholder="Placeholder"
        className="mx-auto max-w-xs"
        ErrorText="Error Text"
      />
      <PersonSelector />
    </HomePageLayout>
  );
}

function HomePageLayout({ header, children }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {header}
      <main className="pt-6 mx-auto w-max">{children}</main>
    </div>
  );
}
