using ImPedro.Entity.Entities;
using ImPedro.Entity.Conventions;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Entity;

public class FrameworkDbContext : DbContext
{
    public const string DefaultConnectionString =
        "Server=(localdb)\\MSSQLLocalDB;Database=Framework.Data2;Trusted_Connection=True;TrustServerCertificate=True";

    public FrameworkDbContext(DbContextOptions<FrameworkDbContext> options)
        : base(options)
    {
    }

    public DbSet<VisioMetadata> VisioMetadata => Set<VisioMetadata>();
    public DbSet<CustomValue> CustomValues => Set<CustomValue>();
    public DbSet<MailServer> MailServers => Set<MailServer>();
    public DbSet<MetaApplication> MetaApplications => Set<MetaApplication>();
    public DbSet<MetaContext> MetaContexts => Set<MetaContext>();
    public DbSet<MetaDashboard> MetaDashboards => Set<MetaDashboard>();
    public DbSet<MetaDayView> MetaDayView => Set<MetaDayView>();
    public DbSet<MetaDefineProfile> MetaDefineProfiles => Set<MetaDefineProfile>();
    public DbSet<MetaField> MetaFields => Set<MetaField>();
    public DbSet<MetaFieldAudit> MetaFieldAudits => Set<MetaFieldAudit>();
    public DbSet<MetaGraph> MetaGraphs => Set<MetaGraph>();
    public DbSet<MetaGraphSearch> MetaGraphSearches => Set<MetaGraphSearch>();
    public DbSet<MetaGroupUser> MetaGroupUsers => Set<MetaGroupUser>();
    public DbSet<MetaMenuItem> MetaMenuItems => Set<MetaMenuItem>();
    public DbSet<MetaModule> MetaModules => Set<MetaModule>();
    public DbSet<MetaParameter> MetaParameters => Set<MetaParameter>();
    public DbSet<MetaPermission> MetaPermissions => Set<MetaPermission>();
    public DbSet<MetaPermissionGranted> MetaPermissionsGranted => Set<MetaPermissionGranted>();
    public DbSet<MetaProfile> MetaProfiles => Set<MetaProfile>();
    public DbSet<MetaReport> MetaReports => Set<MetaReport>();
    public DbSet<MetaReportCategory> MetaReportCategories => Set<MetaReportCategory>();
    public DbSet<MetaReportParameter> MetaReportParameters => Set<MetaReportParameter>();
    public DbSet<MetaReportView> MetaReportViews => Set<MetaReportView>();
    public DbSet<MetaReportViewInfo> MetaReportViewInfos => Set<MetaReportViewInfo>();
    public DbSet<MetaScript> MetaScripts => Set<MetaScript>();
    public DbSet<MetaSequence> MetaSequences => Set<MetaSequence>();
    public DbSet<MetaTable> MetaTables => Set<MetaTable>();
    public DbSet<MetaTableAudit> MetaTableAudits => Set<MetaTableAudit>();
    public DbSet<MetaTypePermission> MetaTypePermissions => Set<MetaTypePermission>();
    public DbSet<MetaUser> MetaUsers => Set<MetaUser>();
    public DbSet<ResourcesScheduler> ResourcesScheduler => Set<ResourcesScheduler>();
    public DbSet<Workflow> Workflows => Set<Workflow>();
    public DbSet<WorkflowAttachment> WorkflowAttachments => Set<WorkflowAttachment>();
    public DbSet<WorkflowDefinition> WorkflowDefinitions => Set<WorkflowDefinition>();
    public DbSet<WorkflowField> WorkflowFields => Set<WorkflowField>();
    public DbSet<WorkflowHistory> WorkflowHistories => Set<WorkflowHistory>();
    public DbSet<WorkflowTask> WorkflowTasks => Set<WorkflowTask>();
    public DbSet<VwAllActiveGroup> VwAllActiveGroups => Set<VwAllActiveGroup>();
    public DbSet<VwAllActiveUser> VwAllActiveUsers => Set<VwAllActiveUser>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = Environment.GetEnvironmentVariable("FRAMEWORK_CONNECTION")
                ?? DefaultConnectionString;
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VisioMetadata>(entity =>
        {
            entity.ToTable("_VisioMetadata");
            entity.HasKey(e => e.ID).HasName("PK__VisioMetadata");
            entity.Property(e => e.ID).ValueGeneratedOnAdd();
            entity.Property(e => e.Filename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.WorkflowTable).HasMaxLength(50).IsUnicode(false);
        });

        modelBuilder.Entity<CustomValue>(entity =>
        {
            entity.ToTable("CustomValues");
            entity.HasKey(e => new { e.Tablename, e.IDRelatedTable, e.Name }).HasName("PK_CustomFieldValues");
            entity.Property(e => e.Tablename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Value).HasColumnType("sql_variant");
        });

        modelBuilder.Entity<MailServer>(entity =>
        {
            entity.ToTable("MailServer");
            entity.HasKey(e => e.Id).HasName("PK_Mail");
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Server).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Port).HasDefaultValueSql("((25))");
            entity.Property(e => e.Username).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Password).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Sender).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.IsDefault).HasDefaultValueSql("((0))");
            entity.Property(e => e.Sending).HasDefaultValueSql("((0))");
            entity.Property(e => e.Receiving).HasDefaultValueSql("((0))");
            entity.Property(e => e.tenant).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.client_id).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.client_secret).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.IsDeleted).HasColumnName("M_IsDeleted").HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaApplication>(entity =>
        {
            entity.ToTable("MetaApplication");
            entity.HasKey(e => e.IDApplication).HasName("PK_MetaApplication");
            entity.Property(e => e.IDApplication).ValueGeneratedOnAdd();
            entity.Property(e => e.CodApplication).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.Application).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Installed).HasDefaultValueSql("((1))");
            entity.Property(e => e.DBAppVersion).HasMaxLength(10).IsUnicode(false).HasDefaultValueSql("('1.00.00.00')");
            entity.Property(e => e.LicenseName).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.LicenseCode).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.ExpireDate).HasColumnType("smalldatetime");
            entity.Property(e => e.ConnectionString).HasMaxLength(512).IsUnicode(false);
        });

        modelBuilder.Entity<MetaContext>(entity =>
        {
            entity.ToTable("MetaContext");
            entity.HasKey(e => e.IDContext).HasName("PK_MetaContext");
            entity.Property(e => e.IDContext).ValueGeneratedOnAdd();
            entity.Property(e => e.ContextCaption0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ContextCaption1).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ContextDescription0).HasMaxLength(512).IsUnicode(false);
            entity.Property(e => e.ContextDescription1).HasMaxLength(512).IsUnicode(false);
            entity.Property(e => e.ContextUrl).HasMaxLength(255).IsUnicode(false).HasDefaultValueSql("('#')");
            entity.Property(e => e.ContextImageUrl).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ContextTarget).HasMaxLength(10).IsUnicode(false).HasDefaultValueSql("('_top')");
            entity.Property(e => e.Visible).HasDefaultValueSql("((1))");
            entity.Property(e => e.ItemOrder).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaDashboard>(entity =>
        {
            entity.ToTable("MetaDashboard");
            entity.HasKey(e => e.IDDashboard).HasName("PK_MetaDashboard");
            entity.Property(e => e.IDDashboard).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Filename).HasColumnType("varchar(max)").IsUnicode(false);
            entity.Property(e => e.Stream).HasColumnType("varbinary(max)");
        });

        modelBuilder.Entity<MetaDayView>(entity =>
        {
            entity.ToTable("MetaDayView");
            entity.HasKey(e => e.IDDayView).HasName("PK_MetaDayView");
            entity.Property(e => e.IDDayView).ValueGeneratedOnAdd();
            entity.Property(e => e.CodDayView).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.DayView).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Location).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.BeginDateTime).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.EndDateTime).HasColumnType("smalldatetime");
            entity.Property(e => e.Description).HasMaxLength(8000).IsUnicode(false);
            entity.Property(e => e.RememberInfo).HasColumnType("varchar(max)").IsUnicode(false);
            entity.Property(e => e.RecurrenceInfo).HasColumnType("varchar(max)").IsUnicode(false);
            entity.Property(e => e.AllDay).HasDefaultValueSql("((0))");
            entity.Property(e => e.ResourceID).HasColumnType("varchar(max)").IsUnicode(false).HasDefaultValueSql("((1))");
            entity.Property(e => e.TypeID).HasDefaultValueSql("((0))");
            entity.Property(e => e.StatusID).HasDefaultValueSql("((1))");
            entity.Property(e => e.OutlookEntryID).HasMaxLength(256).IsUnicode(false);
            entity.Property(e => e.CreatedById).HasColumnName("M_IDUser").HasDefaultValueSql("((0))");
            entity.Property(e => e.IsDeleted).HasColumnName("M_IsDeleted").HasDefaultValueSql("((0))");
            entity.Property(e => e.Timespan).HasColumnName("M_Timespan").HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.Locked).HasColumnName("M_Locked").HasDefaultValueSql("((0))");
            entity.Property(e => e.LockedBy).HasColumnName("M_LockedBy").HasDefaultValueSql("((0))");
            entity.Property(e => e.LockedAt).HasColumnName("M_LockedAt").HasColumnType("smalldatetime");
            entity.Property(e => e.Guid).HasColumnName("M_Guid").HasMaxLength(255).IsUnicode(false).HasDefaultValueSql("(newid())");
        });

        modelBuilder.Entity<MetaDefineProfile>(entity =>
        {
            entity.ToTable("MetaDefineProfile");
            entity.HasKey(e => e.IDDefineProfile).HasName("PK_MetaDefineProfile");
            entity.Property(e => e.IDDefineProfile).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<MetaField>(entity =>
        {
            entity.ToTable("MetaField");
            entity.HasKey(e => e.IDField).HasName("PK_MetaField");
            entity.Property(e => e.IDField).ValueGeneratedOnAdd();
            entity.Property(e => e.Fieldname).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.FieldType).HasDefaultValueSql("((1))");
            entity.Property(e => e.FieldSize).HasDefaultValueSql("((4))");
            entity.Property(e => e.FieldCaption0).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.FieldCaption1).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.FieldDescription0).HasColumnType("text");
            entity.Property(e => e.FieldDescription1).HasColumnType("text");
            entity.Property(e => e.PrimaryKey).HasDefaultValueSql("((0))");
            entity.Property(e => e.ReadOnly).HasDefaultValueSql("((0))");
            entity.Property(e => e.AutoIncrement).HasDefaultValueSql("((0))");
            entity.Property(e => e.Required).HasDefaultValueSql("((0))");
            entity.Property(e => e.Updatable).HasDefaultValueSql("((1))");
            entity.Property(e => e.ForeignTable).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.ForeignField).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ForeignDescription).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.RowSource).HasMaxLength(512).IsUnicode(false);
            entity.Property(e => e.ControlType).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.DefaultValue).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Format).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.ValidationRule).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.ValidationText).HasMaxLength(512).IsUnicode(false);
            entity.Property(e => e.Searchable).HasDefaultValueSql("((0))");
            entity.Property(e => e.SearchResult).HasDefaultValueSql("((0))");
            entity.Property(e => e.SearchOrder).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditSelect).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditInsert).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditUpdate).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditDelete).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaFieldAudit>(entity =>
        {
            entity.ToTable("MetaFieldAudit");
            entity.HasKey(e => new { e.IDField, e.IDUser, e.DateTime }).HasName("PK_MetaFieldAudit");
            entity.Property(e => e.DateTime).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Version).HasMaxLength(20).IsUnicode(false);
            entity.Property(e => e.OldValue).HasColumnType("text");
            entity.Property(e => e.NewValue).HasColumnType("text");
            entity.HasOne(e => e.Field).WithMany().HasForeignKey(e => e.IDField).OnDelete(DeleteBehavior.NoAction);
            entity.HasOne(e => e.RelatedField).WithMany().HasForeignKey(e => e.IDRelatedField).OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<MetaGraph>(entity =>
        {
            entity.ToTable("MetaGraph");
            entity.HasKey(e => e.IDGraph).HasName("PK_MetaGraph");
            entity.Property(e => e.IDGraph).ValueGeneratedOnAdd();
            entity.Property(e => e.CodGraph).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.GraphName).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.GraphCaption0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.GraphCaption1).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.SQLSyntax).HasColumnType("text");
            entity.Property(e => e.ShowReport).HasDefaultValueSql("((0))");
            entity.Property(e => e.Enabled).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<MetaGraphSearch>(entity =>
        {
            entity.ToTable("MetaGraphSearch");
            entity.HasKey(e => e.IDGraphSearch).HasName("PK_MetaGraphSearch");
            entity.Property(e => e.IDGraphSearch).ValueGeneratedOnAdd();
            entity.Property(e => e.FieldCaption0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Operator).HasMaxLength(50).IsUnicode(false).HasDefaultValueSql("('=')");
            entity.Property(e => e.ParameterName).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.DefaultValue).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.ItemOrder).HasDefaultValueSql("((0))");
            entity.Property(e => e.ControlType).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Pagename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.IsTitle).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaGroupUser>(entity =>
        {
            entity.ToTable("MetaGroupUsers");
            entity.HasKey(e => new { e.IDUser, e.IDGroup }).HasName("PK_MetaGroupUsers");
            entity.HasOne(e => e.User).WithMany().HasForeignKey(e => e.IDUser).OnDelete(DeleteBehavior.NoAction);
            entity.HasOne(e => e.Group).WithMany().HasForeignKey(e => e.IDGroup).OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<MetaMenuItem>(entity =>
        {
            entity.ToTable("MetaMenuItem");
            entity.HasKey(e => e.IDMenuItem).HasName("PK_MetaMenuItem");
            entity.Property(e => e.IDMenuItem).ValueGeneratedOnAdd();
            entity.Property(e => e.CodMenuItem).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.MenuItem0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.MenuItem1).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.MenuType).HasMaxLength(10).IsUnicode(false).IsFixedLength().HasDefaultValueSql("('H')");
            entity.Property(e => e.Function).HasMaxLength(1024).IsUnicode(false);
            entity.Property(e => e.ImageIcon).HasMaxLength(10).IsUnicode(false).IsFixedLength();
            entity.Property(e => e.ItemOrder).HasDefaultValueSql("((0))");
            entity.Property(e => e.Visible).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<MetaModule>(entity =>
        {
            entity.ToTable("MetaModule");
            entity.HasKey(e => e.IDModule).HasName("PK_MetaModule");
            entity.Property(e => e.IDModule).ValueGeneratedOnAdd();
            entity.Property(e => e.ModuleCaption0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ModuleCaption1).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Visible).HasDefaultValueSql("((1))");
            entity.Property(e => e.ItemOrder).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaParameter>(entity =>
        {
            entity.ToTable("MetaParameter");
            entity.HasKey(e => e.IDParameter).HasName("PK_MetaParameter");
            entity.Property(e => e.IDParameter).ValueGeneratedOnAdd();
            entity.Property(e => e.ParameterName).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.ParameterValue).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Description).HasMaxLength(255).IsUnicode(false);
        });

        modelBuilder.Entity<MetaPermission>(entity =>
        {
            entity.ToTable("MetaPermission");
            entity.HasKey(e => e.IDPermission).HasName("PK_MetaPermission");
            entity.Property(e => e.IDPermission).ValueGeneratedOnAdd();
            entity.Property(e => e.CodPermission).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.PermissionCaption0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.PermissionCaption1).HasMaxLength(120).IsUnicode(false);
        });

        modelBuilder.Entity<MetaPermissionGranted>(entity =>
        {
            entity.ToTable("MetaPermissionGranted");
            entity.HasKey(e => e.IDPermissionGranted).HasName("PK_MetaPermissionGranted");
            entity.Property(e => e.IDPermissionGranted).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<MetaProfile>(entity =>
        {
            entity.ToTable("MetaProfile");
            entity.HasKey(e => e.IDProfile).HasName("PK_MetaPermissionProfile");
            entity.Property(e => e.IDProfile).ValueGeneratedOnAdd();
            entity.Property(e => e.CodProfile).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Profile).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.IsDeleted).HasColumnName("M_IsDeleted").HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaReport>(entity =>
        {
            entity.ToTable("MetaReport");
            entity.HasKey(e => e.IDReport).HasName("PK_MetaReport");
            entity.Property(e => e.IDReport).ValueGeneratedOnAdd();
            entity.Property(e => e.ReportName).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Description).HasMaxLength(8000).IsUnicode(false);
            entity.Property(e => e.Filename).HasMaxLength(256).IsUnicode(false);
            entity.Property(e => e.Stream).HasColumnType("varbinary(max)");
            entity.Property(e => e.ExportTo).HasMaxLength(4).IsUnicode(false);
            entity.Property(e => e.ExportDate).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MetaReportCategory>(entity =>
        {
            entity.ToTable("MetaReportCategory");
            entity.HasKey(e => e.IDReportCategory).HasName("PK_ReportCategory");
            entity.Property(e => e.IDReportCategory).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.Description).HasMaxLength(512).IsUnicode(false);
        });

        modelBuilder.Entity<MetaReportParameter>(entity =>
        {
            entity.ToTable("MetaReportParameter");
            entity.HasKey(e => e.IDParameter).HasName("PK_MetaReportParameter");
            entity.Property(e => e.IDParameter).ValueGeneratedOnAdd();
            entity.Property(e => e.Description).HasMaxLength(8000).IsUnicode(false);
            entity.Property(e => e.ParameterName).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.ParameterValue).HasMaxLength(8000).IsUnicode(false);
            entity.Property(e => e.ParameterType).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.MinValue).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.MaxValue).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.DataSourceTable).HasMaxLength(50).IsUnicode(false);
        });

        modelBuilder.Entity<MetaReportView>(entity =>
        {
            entity.ToTable("MetaReportView");
            entity.HasKey(e => e.IDReportView).HasName("PK_MetaReportView");
            entity.Property(e => e.IDReportView).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.Description).HasMaxLength(512).IsUnicode(false);
            entity.Property(e => e.ConnectionString).HasMaxLength(512).IsUnicode(false);
        });

        modelBuilder.Entity<MetaReportViewInfo>(entity =>
        {
            entity.ToTable("MetaReportViewInfo");
            entity.HasKey(e => e.IDReportViewInfo).HasName("PK_MetaReportViewInfo");
            entity.Property(e => e.IDReportViewInfo).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<MetaScript>(entity =>
        {
            entity.ToTable("MetaScripts");
            entity.HasKey(e => e.IDScript).HasName("PK_MetaScripts");
            entity.Property(e => e.IDScript).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.SourceCode).HasColumnType("varchar(max)").IsUnicode(false);
            entity.Property(e => e.Enabled).HasDefaultValueSql("((1))");
            entity.Property(e => e.InterfaceFullname).HasMaxLength(1024).IsUnicode(false);
            entity.Property(e => e.HostFullname).HasMaxLength(1024).IsUnicode(false);
            entity.Property(e => e.AssemblyPath).HasMaxLength(1024).IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ModifiedAt).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MetaSequence>(entity =>
        {
            entity.ToTable("MetaSequence");
            entity.HasKey(e => e.IDSequence).HasName("PK_MetaSequence");
            entity.Property(e => e.IDSequence).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Tablename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.InitialValue).HasDefaultValueSql("((1))");
            entity.Property(e => e.CurrentValue).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<MetaTable>(entity =>
        {
            entity.ToTable("MetaTable");
            entity.HasKey(e => e.IDTable).HasName("PK_MetaTable");
            entity.Property(e => e.IDTable).ValueGeneratedOnAdd();
            entity.Property(e => e.Tablename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.TableCaption0).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.TableCaption1).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.AuditSelect).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditInsert).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditUpdate).HasDefaultValueSql("((0))");
            entity.Property(e => e.AuditDelete).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<MetaTableAudit>(entity =>
        {
            entity.ToTable("MetaTableAudit");
            entity.HasKey(e => new { e.IDUser, e.DateTime, e.IDTable }).HasName("PK_MetaTableAudit");
            entity.Property(e => e.DateTime).HasColumnType("datetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Comments).HasMaxLength(255).IsUnicode(false);
            entity.HasOne(e => e.Table).WithMany().HasForeignKey(e => e.IDTable).OnDelete(DeleteBehavior.NoAction);
            entity.HasOne(e => e.RelatedTable).WithMany().HasForeignKey(e => e.IDRelatedTable).OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<MetaTypePermission>(entity =>
        {
            entity.ToTable("MetaTypePermission");
            entity.HasKey(e => e.IDTypePermission).HasName("PK_MetaTypePermission");
            entity.Property(e => e.IDTypePermission).ValueGeneratedOnAdd();
            entity.Property(e => e.TypePermission0).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.TypePermission1).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Tablename).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.IDField).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.FieldCaption).HasMaxLength(50).IsUnicode(false);
        });

        modelBuilder.Entity<MetaUser>(entity =>
        {
            entity.ToTable("MetaUser");
            entity.HasKey(e => e.IDUser).HasName("PK_MetaUser");
            entity.Property(e => e.IDUser).ValueGeneratedOnAdd();
            entity.Property(e => e.Username).HasMaxLength(30).IsUnicode(false);
            entity.Property(e => e.Password).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.Fullname).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Address).HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.City).HasMaxLength(80).IsUnicode(false);
            entity.Property(e => e.ZipCode).HasMaxLength(8).IsUnicode(false);
            entity.Property(e => e.Phone).HasMaxLength(15).IsUnicode(false);
            entity.Property(e => e.Mobile).HasMaxLength(15).IsUnicode(false);
            entity.Property(e => e.Email).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.IsGroup).HasDefaultValueSql("((0))");
            entity.Property(e => e.IsAuditable).HasDefaultValueSql("((0))");
            entity.Property(e => e.Picture).HasColumnType("varbinary(max)");
            entity.Property(e => e.CreatedById).HasColumnName("M_IDUser").HasDefaultValueSql("((0))");
            entity.Property(e => e.IsDeleted).HasColumnName("M_IsDeleted").HasDefaultValueSql("((0))");
            entity.Property(e => e.Timespan).HasColumnName("M_Timespan").HasMaxLength(255).IsUnicode(false);
            entity.Property(e => e.Locked).HasColumnName("M_Locked").HasDefaultValueSql("((0))");
            entity.Property(e => e.LockedBy).HasColumnName("M_LockedBy").HasDefaultValueSql("((0))");
            entity.Property(e => e.LockedAt).HasColumnName("M_LockedAt").HasColumnType("smalldatetime");
            entity.Property(e => e.Guid).HasColumnName("M_Guid").HasMaxLength(255).IsUnicode(false).HasDefaultValueSql("(newid())");
        });

        modelBuilder.Entity<ResourcesScheduler>(entity =>
        {
            entity.ToTable("ResourcesScheduler");
            entity.HasKey(e => e.ResourceID).HasName("PK_CalendarResources");
            entity.Property(e => e.ResourceID).ValueGeneratedOnAdd();
            entity.Property(e => e.ResourceName).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Description).HasMaxLength(8000).IsUnicode(false);
            entity.Property(e => e.Color).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Image).HasColumnType("image");
        });

        modelBuilder.Entity<Workflow>(entity =>
        {
            entity.ToTable("Workflow");
            entity.HasKey(e => e.IDWorkflow).HasName("PK_Workflow_1");
            entity.Property(e => e.IDWorkflow).ValueGeneratedOnAdd();
            entity.Property(e => e.CreatedDate).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ModifiedDate).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.FinishedDate).HasColumnType("smalldatetime");
            entity.Property(e => e.Nextrun).HasColumnType("smalldatetime");
            entity.Property(e => e.Diagram).HasColumnType("varbinary(max)");
        });

        modelBuilder.Entity<WorkflowAttachment>(entity =>
        {
            entity.ToTable("WorkflowAttachment");
            entity.HasKey(e => e.IDAttachment).HasName("PK_WorkflowAttachment");
            entity.Property(e => e.IDAttachment).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Filename).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<WorkflowDefinition>(entity =>
        {
            entity.ToTable("WorkflowDefinition");
            entity.HasKey(e => e.IDWorkflowDefinition).HasName("PK_Workflow");
            entity.Property(e => e.IDWorkflowDefinition).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Label).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Deprecated).HasDefaultValueSql("((0))");
            entity.Property(e => e.Diagram).HasColumnType("varbinary(max)");
        });

        modelBuilder.Entity<WorkflowField>(entity =>
        {
            entity.ToTable("WorkflowField");
            entity.HasKey(e => e.IDWorkflowField).HasName("PK_WorkflowField");
            entity.Property(e => e.IDWorkflowField).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Label).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.EditorType).HasDefaultValueSql("((1))");
            entity.Property(e => e.ReadOnly).HasDefaultValueSql("((0))");
            entity.Property(e => e.Required).HasDefaultValueSql("((0))");
            entity.Property(e => e.Value).HasColumnType("varchar(max)").IsUnicode(false);
        });

        modelBuilder.Entity<WorkflowHistory>(entity =>
        {
            entity.ToTable("WorkflowHistory");
            entity.HasKey(e => e.IDWorkflowHistory).HasName("PK_WorkflowHistory");
            entity.Property(e => e.IDWorkflowHistory).ValueGeneratedOnAdd();
            entity.Property(e => e.Date).HasColumnType("smalldatetime");
            entity.Property(e => e.State1).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.State2).HasMaxLength(50).IsUnicode(false);
        });

        modelBuilder.Entity<WorkflowTask>(entity =>
        {
            entity.ToTable("WorkflowTask");
            entity.HasKey(e => e.IDWorkflowTask).HasName("PK_WorkflowTask");
            entity.Property(e => e.IDWorkflowTask).ValueGeneratedOnAdd();
            entity.Property(e => e.Task).HasColumnType("varchar(max)").IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("smalldatetime").HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Subject).HasMaxLength(120).IsUnicode(false);
            entity.Property(e => e.Comments).HasMaxLength(1024).IsUnicode(false);
            entity.Property(e => e.Finished).HasDefaultValueSql("((0))");
            entity.Property(e => e.ModifiedDate).HasColumnType("smalldatetime");
            entity.Property(e => e.ExpirationDate).HasColumnType("smalldatetime");
        });

        modelBuilder.Entity<VwAllActiveGroup>(entity =>
        {
            entity.HasNoKey();
            entity.ToView("vw_AllActiveGroups");
        });

        modelBuilder.Entity<VwAllActiveUser>(entity =>
        {
            entity.HasNoKey();
            entity.ToView("vw_AllActiveUsers");
        });

        RelationshipConvention.Apply(modelBuilder);
    }
}
