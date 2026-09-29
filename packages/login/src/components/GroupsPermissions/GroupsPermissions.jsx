import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";

export function GroupsPermissions({
  groups = [],
  users = [],
  permissions = [],
  initialSelectedGroupId = null,
  selectedGroupId,
  onSelectedGroupChange,
  onCreate,
  onUpdate,
  isSaving = false,
  errors = {},
  locale = "pt",
  accentColor = "#155DFC",
  className = "",
}) {
  const t = createTranslator(locale);
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState(initialSelectedGroupId);
  const activeId = selectedGroupId === undefined ? uncontrolledSelectedId : selectedGroupId;
  const selectedGroup = groups.find((group) => String(group.id) === String(activeId)) ?? null;

  function selectGroup(id) {
    if (selectedGroupId === undefined) setUncontrolledSelectedId(id);
    onSelectedGroupChange?.(id);
  }

  return (
    <section className={`w-full ${className}`}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{t("groupsPermissionsTitle")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("groupsPermissionsDescription")}</p>
      </header>
      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-3 self-start">
          <button
            className={`w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeId === null || activeId === undefined
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
            }`}
            onClick={() => selectGroup(null)}
            style={activeId === null || activeId === undefined ? { borderColor: accentColor } : undefined}
            type="button"
          >
            <p className="font-medium text-blue-600 dark:text-blue-400">{t("newGroup")}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("newGroupDescription")}</p>
          </button>
          <div className="space-y-3">
            {groups.length === 0 ? (
              <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">{t("noGroups")}</p>
            ) : (
              groups.map((group) => {
                const isSelected = String(group.id) === String(activeId);
                const userCount = group.users?.length ?? 0;
                const permissionCount = group.permissions?.length ?? 0;

                return (
                  <button
                    className={`w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/30"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                    }`}
                    key={group.id}
                    onClick={() => selectGroup(group.id)}
                    style={isSelected ? { borderColor: accentColor } : undefined}
                    type="button"
                  >
                    <p className="font-semibold text-gray-900 dark:text-gray-50">{group.name}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {userCount} {t("usersLabel")} · {permissionCount} {t("permissionsLabel")}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </aside>
        <GroupEditorForm
          key={selectedGroup?.id ?? "new"}
          accentColor={accentColor}
          errors={errors}
          group={selectedGroup}
          isSaving={isSaving}
          onCreate={onCreate}
          onUpdate={onUpdate}
          permissions={permissions}
          t={t}
          users={users}
        />
      </div>
    </section>
  );
}

function GroupEditorForm({ group, permissions, users, onCreate, onUpdate, isSaving, errors, t, accentColor }) {
  const [name, setName] = useState(group?.name ?? "");
  const [description, setDescription] = useState(group?.description ?? "");
  const [selectedPermissions, setSelectedPermissions] = useState(group?.permissions ?? []);
  const [selectedUserIds, setSelectedUserIds] = useState(group?.users?.map((user) => user.id) ?? []);

  function toggle(list, value) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { name, description, permissions: selectedPermissions, userIds: selectedUserIds };

    if (group) {
      await onUpdate?.(group.id, payload);
      return;
    }

    await onCreate?.(payload);
    setName("");
    setDescription("");
    setSelectedPermissions([]);
    setSelectedUserIds([]);
  }

  return (
    <Card className="max-w-none">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {group ? t("editGroupTitle") : t("createGroupTitle")}
        </h2>
        <div className="space-y-4">
          <div>
            <Input
              label={t("groupName")}
              name="group-name"
              onChange={(event) => setName(event.target.value)}
              placeholder={t("groupNamePlaceholder")}
              required
              type="text"
              value={name}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
          </div>
          <div>
            <Input
              label={t("groupDescriptionOptional")}
              name="group-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t("groupDescriptionPlaceholder")}
              type="text"
              value={description}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
          </div>
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("permissionsLabel")}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {permissions.map((permission) => (
              <CheckboxRow
                checked={selectedPermissions.includes(permission.key)}
                key={permission.key}
                label={permission.label}
                onChange={() => setSelectedPermissions((items) => toggle(items, permission.key))}
                value={permission.key}
                accentColor={accentColor}
              />
            ))}
          </div>
          {errors.permissions && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.permissions}</p>}
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("usersLabel")}</legend>
          <div className="mt-3 max-h-48 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3 dark:border-gray-800">
            {users.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("noUsers")}</p>
            ) : (
              users.map((user) => (
                <UserCheckboxRow
                  checked={selectedUserIds.includes(user.id)}
                  key={user.id}
                  user={user}
                  onChange={() => setSelectedUserIds((items) => toggle(items, user.id))}
                  value={user.id}
                  accentColor={accentColor}
                />
              ))
            )}
          </div>
          {errors.userIds && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.userIds}</p>}
        </fieldset>
        <Button className="w-full sm:w-auto" disabled={isSaving} type="submit">
          {isSaving ? t("savingGroup") : group ? t("saveGroup") : t("createGroup")}
        </Button>
      </form>
    </Card>
  );
}

function CheckboxRow({ checked, label, onChange, value, accentColor }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900">
      <input
        checked={checked}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
        onChange={onChange}
        style={{ accentColor }}
        type="checkbox"
        value={value}
      />
      <span>{label}</span>
    </label>
  );
}

function UserCheckboxRow({ checked, user, onChange, value, accentColor }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md p-1 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900">
      <input
        checked={checked}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
        onChange={onChange}
        style={{ accentColor }}
        type="checkbox"
        value={value}
      />
      <span>
        <span className="block font-medium">{user.name}</span>
        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
      </span>
    </label>
  );
}
