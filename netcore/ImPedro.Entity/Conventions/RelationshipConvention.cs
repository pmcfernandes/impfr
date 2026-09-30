using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ImPedro.Entity.Conventions;

internal static class RelationshipConvention
{
    private static readonly HashSet<(Type Entity, string Property)> Excluded =
    [
        (typeof(CustomValue), nameof(CustomValue.IDRelatedTable)),
        (typeof(VisioMetadata), nameof(VisioMetadata.WorkflowTableID)),
    ];

    private static readonly IReadOnlyDictionary<string, string> Aliases = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        ["Group"] = "User", // Groups are represented by MetaUser rows with IsGroup = true.
    };

    // EF needs distinct dependent navigations when two FK properties point to the same principal type.
    private static readonly HashSet<(Type Entity, string Property)> ExplicitNavigations =
    [
        (typeof(MetaGroupUser), nameof(MetaGroupUser.IDUser)),
        (typeof(MetaGroupUser), nameof(MetaGroupUser.IDGroup)),
        (typeof(MetaFieldAudit), nameof(MetaFieldAudit.IDField)),
        (typeof(MetaFieldAudit), nameof(MetaFieldAudit.IDRelatedField)),
        (typeof(MetaTableAudit), nameof(MetaTableAudit.IDTable)),
        (typeof(MetaTableAudit), nameof(MetaTableAudit.IDRelatedTable)),
    ];

    public static void Apply(ModelBuilder modelBuilder)
    {
        var entityTypes = modelBuilder.Model.GetEntityTypes()
            .Where(entity => entity.ClrType is not null && entity.FindPrimaryKey() is { Properties.Count: 1 })
            .ToArray();
        var principals = entityTypes
            .Select(entity => (Entity: entity, Key: entity.FindPrimaryKey()!.Properties[0]))
            .Where(candidate => Normalize(candidate.Key.Name).Length > 0)
            .GroupBy(candidate => Normalize(candidate.Key.Name), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.ToArray(), StringComparer.OrdinalIgnoreCase);

        foreach (var dependent in entityTypes)
        {
            var dependentKey = dependent.FindPrimaryKey()!;
            foreach (var property in dependent.GetProperties().ToArray())
            {
                if (!LooksLikeRelationshipKey(property.Name) || Excluded.Contains((dependent.ClrType, property.Name))) continue;
                // A single-column primary key names the entity itself, not a relationship.
                if (dependentKey.Properties.Count == 1 && dependentKey.Properties[0] == property) continue;

                var targetName = TargetName(property.Name);
                if (!principals.TryGetValue(targetName, out var candidates) || candidates.Length != 1) continue;
                var principal = candidates[0];
                if (!TypesMatch(property.ClrType, principal.Key.ClrType)) continue;

                if (ExplicitNavigations.Contains((dependent.ClrType, property.Name))) continue;
                modelBuilder.Entity(dependent.ClrType)
                    .HasOne(principal.Entity.ClrType, navigationName: null)
                    .WithMany()
                    .HasForeignKey(property.Name)
                    // The legacy SQL schema has no FK constraints. NoAction avoids introducing cascade paths in EF.
                    .OnDelete(DeleteBehavior.NoAction);
            }
        }
    }

    private static bool LooksLikeRelationshipKey(string name)
        => name.StartsWith("ID", StringComparison.Ordinal) || name.EndsWith("ID", StringComparison.Ordinal);

    private static string TargetName(string propertyName)
    {
        var normalized = Normalize(propertyName);
        if (normalized.StartsWith("Related", StringComparison.OrdinalIgnoreCase)) normalized = normalized["Related".Length..];
        if (normalized.EndsWith("Parent", StringComparison.OrdinalIgnoreCase)) normalized = normalized[..^"Parent".Length];
        return Aliases.TryGetValue(normalized, out var alias) ? alias : normalized;
    }

    private static string Normalize(string name)
    {
        if (name.StartsWith("ID", StringComparison.Ordinal)) return name[2..];
        return name.EndsWith("ID", StringComparison.Ordinal) ? name[..^2] : string.Empty;
    }

    private static bool TypesMatch(Type dependent, Type principal)
        => (Nullable.GetUnderlyingType(dependent) ?? dependent) == (Nullable.GetUnderlyingType(principal) ?? principal);
}
