# ImPedro.Entity

Entity Framework Core modeling of the `Framework.Data2` database (`framework.sql`). Contains plain entity classes (POCOs, no base type) and the `FrameworkDbContext`.

## Entities (37 tables)

Framework metadata: `MetaApplication`, `MetaContext`, `MetaDashboard`, `MetaDayView`, `MetaDefineProfile`, `MetaField`, `MetaFieldAudit`, `MetaGraph`, `MetaGraphSearch`, `MetaGroupUser` (`MetaGroupUsers` table), `MetaMenuItem`, `MetaModule`, `MetaParameter`, `MetaPermission`, `MetaPermissionGranted`, `MetaProfile`, `MetaReport`, `MetaReportCategory`, `MetaReportParameter`, `MetaReportView`, `MetaReportViewInfo`, `MetaScript` (`MetaScripts` table), `MetaSequence`, `MetaTable`, `MetaTableAudit`, `MetaTypePermission`, `MetaUser`, `MetaField`, `MetaContext`.

Workflow: `Workflow`, `WorkflowAttachment`, `WorkflowDefinition`, `WorkflowField`, `WorkflowHistory`, `WorkflowTask`.

Miscellaneous: `VisioMetadata` (`_VisioMetadata` table), `CustomValue` (`CustomValues` table), `MailServer`, `ResourcesScheduler`.

Views (keyless, read-only types): `VwAllActiveGroup` (`vw_AllActiveGroups`), `VwAllActiveUser` (`vw_AllActiveUsers`).

Composite keys: `CustomValue` (`Tablename`, `IDRelatedTable`, `Name`), `MetaFieldAudit` (`IDField`, `IDUser`, `DateTime`), `MetaGroupUser` (`IDUser`, `IDGroup`), `MetaTableAudit` (`IDUser`, `DateTime`, `IDTable`).

## `FrameworkDbContext`

Legacy audit columns drop the prefix in C# and keep it in the database via `HasColumnName`: `CreatedById`→`M_IDUser`, `IsDeleted`→`M_IsDeleted`, `Timespan`→`M_Timespan`, `Locked`→`M_Locked`, `LockedBy`→`M_LockedBy`, `LockedAt`→`M_LockedAt`, `Guid`→`M_Guid` (on `MetaUser`/`MetaDayView`; `IsDeleted` also on `MailServer`/`MetaProfile`). `M_IDUser` is `CreatedById` because `IDUser` is already taken.

- One `DbSet<T>` per entity/view, with table and PK names matching the script.
- `IDENTITY` → `ValueGeneratedOnAdd`; script defaults in `HasDefaultValueSql`.
- Constructor takes `DbContextOptions<FrameworkDbContext>` (DI-ready). Without options, uses `FRAMEWORK_CONNECTION` or LocalDB (`DefaultConnectionString`).
- No navigation properties: the script declares no foreign keys, so relationships are explicit joins in the services (`ImPedro.Data` / `ImPedro.Security`).
- `RelationshipConvention` adds EF relationship metadata without navigation properties: `ID<Table>` and `<Table>ID` resolve to an entity with the matching single-column primary key. It also resolves parent/related IDs and `IDGroup` (`MetaUser` rows with `IsGroup`). EF uses `DeleteBehavior.NoAction`; this does not alter the legacy database schema.
- The only dependent navigation properties are the ambiguous same-principal pairs required by EF: `MetaGroupUser.User`/`Group`, `MetaFieldAudit.Field`/`RelatedField`, and `MetaTableAudit.Table`/`RelatedTable`.
- Polymorphic references are intentionally excluded: `CustomValue.IDRelatedTable` is qualified by `Tablename`, and `VisioMetadata.WorkflowTableID` is qualified by `WorkflowTable`.

## Mapping notes

- `CustomValue.Value` (`sql_variant`) is mapped as `object`. This requires a provider with `sql_variant` support (SQL Server); provider-agnostic tests (InMemory/SQLite) must use a trimmed context or `modelBuilder.Ignore<CustomValue>()`, since those providers reject `object` properties.
- `MetaUser.Picture`, `MetaDashboard.Stream`, `Workflow.Diagram` and binary attachments use `byte[]`.
- `MetaDayView.Timespan` maps SQL `M_Timespan`, is `varchar`, and therefore `string?` (not `rowversion`).
