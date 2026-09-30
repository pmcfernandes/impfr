import { useState } from "react";
import { Card } from "@app-shell/react";
import { GroupsPermissions } from "@auth/react";
import { permissions, users } from "../data.js";

export default function Access() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Administrators",
      description: "Full access",
      permissions: permissions.map(({ key }) => key),
      users: [users[0]],
    },
  ]);

  function toGroup(id, payload) {
    return {
      id,
      name: payload.name,
      description: payload.description,
      permissions: payload.permissions,
      users: users.filter(({ id: userId }) => payload.userIds.includes(userId)),
    };
  }

  return (
    <section className="space-y-6">
      <Card className="p-5">
        <h1 className="text-xl font-semibold">Groups and permissions</h1>
        <p className="mt-1 text-sm text-gray-500">`@auth/react` manages authentication state and access-control UI.</p>
      </Card>
      <GroupsPermissions
        groups={groups}
        locale="en"
        onCreate={(payload) => setGroups((current) => [...current, toGroup(Date.now(), payload)])}
        onUpdate={(id, payload) => setGroups((current) => current.map((group) => (group.id === id ? toGroup(id, payload) : group)))}
        permissions={permissions}
        users={users}
      />
    </section>
  );
}
