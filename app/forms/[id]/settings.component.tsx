import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface SettingsProps {
  id: string;
}

export function Settings(prop: SettingsProps) {
  return (
    <div className="flex flex-col gap-4 bg-background rounded-lg p-6">
      <h1>Settings</h1>
      <Separator orientation="horizontal" />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="enable-feature">Make this a quiz</Label>
            <p>
              Assign point values, set answers, and automatically provide
              feedback
            </p>
          </div>
          <Switch id="enable-feature" />
        </div>
        <Separator orientation="horizontal" className="mt-8" />
        <Accordion
          defaultValue={["responses"]}
          type="multiple"
          className="  w-full"
        >
          <AccordionItem value="responses">
            <AccordionTrigger className="my-6 hover:no-underline">
              <div>
                <Label htmlFor="enable-feature">Responses</Label>
                <p>Manage how responses are collected and protected</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="enable-feature">Responses</Label>
                  <p>Manage how responses are collected and protected</p>
                </div>
                <Switch id="enable-feature" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="presentation">
            <AccordionTrigger className="my-6 hover:no-underline">
              <div>
                <Label htmlFor="enable-feature">Presentation</Label>
                <p>Manage how the form and responses are presented</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <Label htmlFor="enable-feature" className="uppercase">
                  Form presentation
                </Label>
                <div className="flex justify-between items-center">
                  <p>Show progress bar</p>
                  <Switch id="enable-feature" />
                </div>
                <div className="flex justify-between items-center">
                  <p>Shuffle question order</p>
                  <Switch id="enable-feature" />
                </div>
                <Label htmlFor="enable-feature" className="uppercase">
                  After submission
                </Label>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Confirmation message</p>
                    <Input
                      placeholder="Your response has been recorded"
                      className="w-lg"
                    />
                  </div>
                  <Button>Edit</Button>
                </div>
                <div className="flex justify-between items-center">
                  <p>Show link to submit another response</p>
                  <Switch id="enable-feature" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="enable-feature">View results summary</Label>
                    <p>
                      Share results summary with respondents. Important details
                    </p>
                  </div>
                  <Switch id="enable-feature" />
                </div>
				<Label htmlFor="enable-feature" className="uppercase">
					Restrictions
                </Label>
				<div className="flex justify-between items-center">
                  <p>Disable autosave for all respondents</p>
                  <Switch id="enable-feature" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
