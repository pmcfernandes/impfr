function conditionOff() {
  return { enabled: false, logic: "any", rules: [] };
}

function dataField(field) {
  return {
    helpText: "",
    placeholder: "",
    required: false,
    requiredCondition: conditionOff(),
    condition: conditionOff(),
    defaultValue: "",
    columns: 12,
    pattern: "",
    patternMessage: "",
    readOnly: false,
    visible: true,
    ...field,
  };
}

export const contactForm = {
  name: "Customer feedback",
  description: "Tell us about your experience.",
  visible: true,
  consent_required: false,
  fields: [
    dataField({ id: "name", type: "text", label: "Name", name: "name", required: true, placeholder: "Jane Doe" }),
    dataField({ id: "email", type: "email", label: "Email", name: "email", required: true, placeholder: "jane@example.com" }),
    dataField({ id: "message", type: "textarea", label: "Message", name: "message", required: true, placeholder: "How can we help?" }),
  ],
};

export const intakeForm = {
  name: "Project intake",
  description: "Multi-step request with conditional fields, an API-powered select and file upload.",
  visible: true,
  consent_required: true,
  consent_text: "I agree to the processing of the submitted data for evaluation purposes.",
  privacy_url: "https://example.com/privacy",
  fields: [
    {
      id: "int-steps", type: "steps", label: "Intake",
      steps: ["Request", "Details", "Attachments"], activeStep: 1, mode: "steps",
      helpText: "", condition: conditionOff(),
    },
    { id: "int-h1", type: "heading", label: "Request", parentId: "int-steps", helpText: "", condition: conditionOff() },
    dataField({
      id: "int-type", type: "select", label: "Request type", name: "request_type", parentId: "int-h1",
      required: true, helpText: "Project fields appear for projects, the issue field for support.",
      options: [
        { label: "New project", value: "project" },
        { label: "Support request", value: "support" },
        { label: "Change request", value: "change" },
      ],
    }),
    { id: "int-h2", type: "heading", label: "Details", parentId: "int-steps", helpText: "", condition: conditionOff() },
    dataField({ id: "int-title", type: "text", label: "Title", name: "title", parentId: "int-h2", required: true, placeholder: "Website refresh" }),
    dataField({
      id: "int-team", type: "select", label: "Team", name: "team", parentId: "int-h2",
      required: true, columns: 6,
      options: [
        { label: "Frontend team", value: "frontend" },
        { label: "Backend team", value: "backend" },
        { label: "Design team", value: "design" },
        { label: "Data team", value: "data" },
      ],
      apiSource: { url: "/api/teams", headers: {}, path: "", labelKey: "name", valueKey: "id" },
      helpText: "Options can be re-imported from /api/teams in the editor.",
    }),
    dataField({
      id: "int-budget", type: "number", label: "Budget (EUR)", name: "budget", parentId: "int-h2",
      columns: 6, placeholder: "10000",
      helpText: "Only for new projects.",
      condition: { enabled: true, logic: "any", rules: [{ field: "int-type", op: "eq", value: "project" }] },
    }),
    dataField({
      id: "int-issue", type: "textarea", label: "Describe the issue", name: "issue", parentId: "int-h2",
      rows: 3, placeholder: "What is not working?",
      helpText: "Required for support requests.",
      condition: { enabled: true, logic: "any", rules: [{ field: "int-type", op: "eq", value: "support" }] },
      requiredCondition: { enabled: true, logic: "any", rules: [{ field: "int-type", op: "eq", value: "support" }] },
    }),
    { id: "int-h3", type: "heading", label: "Attachments", parentId: "int-steps", helpText: "Optional files that help evaluate the request.", condition: conditionOff() },
    dataField({ id: "int-files", type: "file", label: "Briefing files", name: "briefing", parentId: "int-h3", helpText: "Stored in memory for this demo." }),
  ],
};

export const initialProjects = [
  { id: 1, name: "Website refresh", owner: "Ava", status: "In progress", budget: 12000 },
  { id: 2, name: "Mobile app", owner: "Noah", status: "Planning", budget: 18000 },
  { id: 3, name: "Analytics", owner: "Mia", status: "Complete", budget: 6400 },
];

export const projectConfig = {
  title: "Projects",
  idKey: "id",
  columns: [
    { key: "name", label: "Project" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status", type: "badge", badgeMap: { "In progress": "info", Planning: "warning", Complete: "success" } },
    { key: "budget", label: "Budget", type: "currency", currency: "EUR" },
  ],
  viewModes: ["table", "list", "cards"],
  fieldSearch: true,
  multiDelete: true,
  columnVisibility: true,
};

export const users = [
  { id: 1, name: "Ava Smith", email: "ava@example.com" },
  { id: 2, name: "Noah Brown", email: "noah@example.com" },
];

export const permissions = [
  { key: "projects.view", label: "View projects" },
  { key: "projects.edit", label: "Edit projects" },
  { key: "forms.manage", label: "Manage forms" },
];
