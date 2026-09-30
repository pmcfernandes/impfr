import { useState } from "react";
import {
  Accordion,
  AlertBox,
  Badge,
  Button,
  ConfirmDialog,
  Dialog,
  Drawer,
  PanelContainer,
  SubHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
  Tabs,
  Wizard,
} from "@app-shell/react";
import { users } from "../data.js";
import ResultJson from "./ResultJson.jsx";

const galleryTabs = [
  { value: "overview", label: "Overview" },
  { value: "details", label: "Details" },
  { value: "settings", label: "Settings" },
];

const wizardSteps = [
  { id: "plan", title: "Plan", description: "Define the scope", content: <p className="text-sm text-gray-600 dark:text-gray-300">Step 1 of 3: describe what the demo wizard should explain.</p> },
  { id: "build", title: "Build", description: "Compose the UI", content: <p className="text-sm text-gray-600 dark:text-gray-300">Step 2 of 3: combine package components into a page.</p> },
  { id: "ship", title: "Ship", description: "Publish the demo", content: <p className="text-sm text-gray-600 dark:text-gray-300">Step 3 of 3: build the demo and share the result.</p> },
];

export default function Components() {
  const [galleryTab, setGalleryTab] = useState("overview");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [wizardResult, setWizardResult] = useState(null);

  return (
    <section className="space-y-6">
      <SubHeader
        title="Components"
        description="Interface primitives from @app-shell/react, rendered live."
        actions={<Button onClick={() => setDialogOpen(true)}>Open dialog</Button>}
      />

      <PanelContainer title="AlertBox" description="Contextual messages in four variants.">
        <div className="space-y-3">
          <AlertBox variant="info" title="Heads up" description="The demo data resets when localStorage is cleared." />
          <AlertBox variant="success" title="Saved" description="Your changes were stored locally." />
          <AlertBox variant="warning" title="Careful" description="Bulk deletion cannot be undone in this demo." />
          <AlertBox variant="danger" title="Failed" description="The mock API returned an error status." />
        </div>
      </PanelContainer>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelContainer title="Accordion" description="Collapsible sections, multiple open allowed.">
          <Accordion
            defaultOpenItems={["a1"]}
            multiple
            items={[
              { id: "a1", title: "What is this demo?", content: "An integration showcase for the four React packages in this repository." },
              { id: "a2", title: "Where does data live?", content: "Projects live in React state; tasks live behind the /api/* mock with localStorage persistence." },
              { id: "a3", title: "Disabled section", content: "This content cannot be opened.", disabled: true },
            ]}
          />
        </PanelContainer>

        <PanelContainer title="Tabs" description="Controlled tab navigation.">
          <Tabs tabs={galleryTabs} value={galleryTab} onValueChange={setGalleryTab} label="Gallery tabs" />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {galleryTab === "overview" && "Overview content selected through the Tabs component."}
            {galleryTab === "details" && "Details content selected through the Tabs component."}
            {galleryTab === "settings" && "Settings content selected through the Tabs component."}
          </p>
        </PanelContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelContainer title="Buttons" description="The three button variants.">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </PanelContainer>

        <PanelContainer title="Badges" description="Status labels in five variants.">
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </PanelContainer>
      </div>

      <PanelContainer title="Overlays" description="Dialog, Drawer and ConfirmDialog with controlled open state.">
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>Open dialog</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete…</Button>
        </div>
        <ResultJson title="Confirm result" data={confirmResult} />
      </PanelContainer>

      <PanelContainer title="Wizard" description="Multi-step flow with previous/next and completion callback.">
        <Wizard
          locale="en"
          steps={wizardSteps}
          onComplete={() => setWizardResult({ completedAt: new Date().toISOString() })}
        />
        <ResultJson title="Wizard output" data={wizardResult} />
      </PanelContainer>

      <PanelContainer title="Table primitives" description="Composable table elements used across the shell.">
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </PanelContainer>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Example dialog"
        description="Composed with title, description, content and footer actions."
        actions={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Close</Button>
            <Button onClick={() => setDialogOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Dialog content closes with Escape, the backdrop click or the footer actions.
        </p>
      </Dialog>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Example drawer"
        description="Slides in from the right edge."
        actions={<Button variant="secondary" onClick={() => setDrawerOpen(false)}>Close</Button>}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Drawer content scrolls independently while the backdrop stays fixed.
        </p>
      </Drawer>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          setConfirmOpen(open);
          if (!open && confirmResult === null) setConfirmResult("cancelled");
        }}
        onConfirm={() => {
          setConfirmResult({ confirmedAt: new Date().toISOString() });
          setConfirmOpen(false);
        }}
        title="Delete item?"
        description="This demo action only records the confirmation."
        confirmLabel="Delete"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">The item would be removed permanently.</p>
      </ConfirmDialog>
    </section>
  );
}
