import { ROUTES } from "../router";
import { H0, H1, H2, H3, H4 } from "../components/ui/typography";
import { AnchorButton, Button } from "../components/ui/buttons";
import { LucideRefreshCcw } from "lucide-react";
import { Card } from "../components/ui/card";
import { Input, Select } from "../components/ui/form";

export const HomePage = () => {
  return (
    <section className="container space-y-6">
      <AnchorButton href={ROUTES.AUTH_LOGIN}>LOGIN</AnchorButton>

      <Card className="mx-auto max-w-3xl p-6 space-y-6">
        <H0>H0 title</H0>
        <H1>H1 title</H1>
        <H2>H2 title</H2>
        <H3>H3 title</H3>
        <H4>H4 title</H4>
        {/* TODO */}
        {/* <Gradient>Gradient</Gradient> */}
      </Card>

      <Card className="mx-auto max-w-3xl p-6 space-y-6">
        <Input
          type="text"
          label="Input type text"
          description="Description"
          placeholder="Placeholder..."
          required
          error="Error"
        />
        <Select
          label="Select a option"
          options={[
            { label: "Label1", value: "Value1" },
            { label: "Label2", value: "Value2" },
          ]}
        />
      </Card>

      <Card className="mx-auto max-w-3xl p-6 space-y-6">
        {/* <SearchInput placeholder="Search input..." /> */}
        <div className="flex flex-wrap gap-4">
          <Button>Button</Button>
          <Button variant="outline">Button</Button>
          <Button variant="ghost">Button</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button color="danger">Button</Button>
          <Button color="danger" variant="outline">
            Button
          </Button>
          <Button color="danger" variant="ghost">
            Button
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button size="icon">
            <LucideRefreshCcw className="h-4 w-4" />
          </Button>
          <Button>
            <LucideRefreshCcw className="h-4 w-4" />
            Text with Icon
          </Button>
          <AnchorButton href="#">Anchor</AnchorButton>
          <Button className="bg-gradient-to-tl from-blue-600 to-violet-600 dark:text-white">
            Styled
          </Button>
        </div>
        <div className="flex gap-4">
          <Button className="grow">Grow</Button>
        </div>
        <div className="flex gap-4">
          <Button className="grow">
            <LucideRefreshCcw className="h-4 w-4" />
            Grow with Icon
          </Button>
        </div>
      </Card>
    </section>
  );
};
