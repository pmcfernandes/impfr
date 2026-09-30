USE [Framework.Data2]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetDate]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_GetDate]
(
	-- Add the parameters for the function here
	@Date SMALLDATETIME
)
RETURNS DATETIME
AS
BEGIN
	
	RETURN (SELECT CAST(FLOOR(CAST(@Date AS FLOAT)) AS datetime))
	
END


GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetDateExtended]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetDateExtended]
(
	-- Add the parameters for the function here
	@Date AS SMALLDATETIME
)
RETURNS VARCHAR(50)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @mm AS VARCHAR(20)
	DECLARE @d INT
	DECLARE @m INT
	DECLARE @y INT

	SET @d = DAY(@Date)	
	SET @m = MONTH(@Date)
	SET @y = YEAR(@Date)

	IF @m = 1
	BEGIN
		SET @mm = 'Janeiro'
	END

	IF @m = 2
	BEGIN
		SET @mm = 'Fevereiro'
	END

	IF @m = 3
	BEGIN
		SET @mm = 'Março'
	END

	IF @m = 4
	BEGIN
		SET @mm = 'Abril'
	END

	IF @m = 5
	BEGIN
		SET @mm = 'Maio'
	END

	IF @m = 6
	BEGIN
		SET @mm = 'Junho'
	END

	IF @m = 7
	BEGIN
		SET @mm = 'Julho'
	END

	IF @m = 8
	BEGIN
		SET @mm = 'Agosto'
	END

	IF @m = 9
	BEGIN
		SET @mm = 'Setembro'
	END

	IF @m = 10
	BEGIN
		SET @mm = 'Outubro'
	END

	IF @m = 11
	BEGIN
		SET @mm = 'Novembro'
	END

	IF @m = 12
	BEGIN
		SET @mm = 'Dezembro'
	END

	DECLARE @result VARCHAR(50)
	SET @result = CAST(@d AS VARCHAR(2)) + ' de ' + @mm + ' de ' + CAST(@y AS VARCHAR(4))

	-- Return the result of the function
	RETURN @result
END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetDeletePermission]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetDeletePermission]
(
	-- Add the parameters for the function here
	@IDUser INT,
	@Tablename VARCHAR(50) = 'MetaTable'
)
RETURNS BIT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IsPermitted BIT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IsPermitted = CAST((CASE WHEN COUNT(mpg.IDPermissionGranted) = 0 THEN 0 ELSE 1 END) AS BIT)
	FROM MetaPermissionGranted	mpg
		INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
		INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
	WHERE mpg.IDUser = @IDUser
		AND mp.CodPermission = 'DELETE'
		AND mtp.Tablename = @Tablename

	-- Return the result of the function
	RETURN @IsPermitted

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetFieldType]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetFieldType]
(
	-- Add the parameters for the function here
	@FieldType VARCHAR(15)
)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @result INT

	-- Add the T-SQL statements to compute the return value here
	SET @result = (SELECT 
		(CASE @FieldType 
		 WHEN 'int' THEN 0
		 WHEN 'int' THEN 0
		 WHEN 'varchar' THEN 1
		 WHEN 'nvarchar' THEN 1
		 WHEN 'text' THEN 1
		 WHEN 'ntext' THEN 1
		 WHEN 'char' THEN 1
		 WHEN 'nchar' THEN 1
		 WHEN 'smalldatetime' THEN 2
		 WHEN 'datetime' THEN 2
		 WHEN 'datetime2' THEN 2
		 WHEN 'bit' THEN 3
		 WHEN 'decimal' THEN 4
		 ELSE 0
		 END) AS FieldType
		)
 
	-- Return the result of the function
	RETURN @result
END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetIdGroupByName]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetIdGroupByName]
(
	-- Add the parameters for the function here
	@Name VARCHAR(50)
)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IDUser INT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IDUser = IDUser 
	FROM MetaUser 
	WHERE Username = @Name AND IsGroup = 1

	-- Return the result of the function
	RETURN @IDUser

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetIdUserByToken]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetIdUserByToken]
(
	-- Add the parameters for the function here
	@Token VARCHAR(50)
)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IDUser INT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IDUser = IDUser
	FROM MetaUser
	WHERE M_Guid = @Token AND M_IsDeleted = 0

	-- Return the result of the function
	RETURN @IDUser

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetInsertPermission]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetInsertPermission]
(
	-- Add the parameters for the function here
	@IDUser INT,
	@Tablename VARCHAR(50) = 'MetaTable'
)
RETURNS BIT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IsPermitted BIT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IsPermitted = CAST((CASE WHEN COUNT(mpg.IDPermissionGranted) = 0 THEN 0 ELSE 1 END) AS BIT)
	FROM MetaPermissionGranted	mpg
		INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
		INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
	WHERE mpg.IDUser = @IDUser
		AND mp.CodPermission = 'INSERT'
		AND mtp.Tablename = @Tablename

	-- Return the result of the function
	RETURN @IsPermitted

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetLastSequenceID]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetLastSequenceID]
(
	-- Add the parameters for the function here
	@Name VARCHAR(50)
)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Value INT

	-- Add the T-SQL statements to compute the return value here
	SELECT 
		@Value = (CASE WHEN ISNULL(ms.CurrentValue, 0) = 0 THEN ISNULL(ms.InitialValue, 0) ELSE ISNULL(ms.CurrentValue, 0) END)
	FROM MetaSequence ms
	WHERE ms.[Name] = @Name

	-- Return the result of the function
	RETURN @Value

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetParameterValue]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetParameterValue]
(
	-- Add the parameters for the function here
	@Name VARCHAR(100)
)
RETURNS VARCHAR(MAX)
AS
BEGIN
	DECLARE @ParameterValue VARCHAR(MAX)

	SELECT @ParameterValue = ParameterValue 
	FROM MetaParameter 
	WHERE ParameterName = @Name

	RETURN @ParameterValue
END

GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetSelectPermission]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetSelectPermission]
(
	-- Add the parameters for the function here
	@IDUser INT,
	@Tablename VARCHAR(50) = 'MetaTable'
)
RETURNS BIT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IsPermitted BIT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IsPermitted = CAST((CASE WHEN COUNT(mpg.IDPermissionGranted) = 0 THEN 0 ELSE 1 END) AS BIT)
	FROM MetaPermissionGranted	mpg
		INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
		INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
	WHERE mpg.IDUser = @IDUser
		AND mp.CodPermission = 'SELECT'
		AND mtp.Tablename = @Tablename

	-- Return the result of the function
	RETURN @IsPermitted

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetUpdatePermission]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetUpdatePermission]
(
	-- Add the parameters for the function here
	@IDUser INT,
	@Tablename VARCHAR(50) = 'MetaTable'
)
RETURNS BIT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @IsPermitted BIT

	-- Add the T-SQL statements to compute the return value here
	SELECT @IsPermitted = CAST((CASE WHEN COUNT(mpg.IDPermissionGranted) = 0 THEN 0 ELSE 1 END) AS BIT)
	FROM MetaPermissionGranted	mpg
		INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
		INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
	WHERE mpg.IDUser = @IDUser
		AND mp.CodPermission = 'UPDATE'
		AND mtp.Tablename = @Tablename

	-- Return the result of the function
	RETURN @IsPermitted

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_Split]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_Split]
(
	@RowData NVARCHAR(2000),
	@SplitOn NVARCHAR(5) = ','
)  
RETURNS @RtnValue table 
(
	Id INT IDENTITY(1,1),
	Data NVARCHAR(100)
) 
AS  
BEGIN 
	DECLARE @Cnt INT
	SET @Cnt = 1

	WHILE (CHARINDEX(@SplitOn, @RowData) > 0)
	BEGIN
		INSERT INTO @RtnValue (data)
		SELECT 
			Data = LTRIM(RTRIM(SUBSTRING(@RowData, 1 ,CHARINDEX(@SplitOn, @RowData) - 1)))

		SET @RowData = SUBSTRING(@RowData, CHARINDEX(@SplitOn, @RowData) + 1,LEN(@RowData))
		SET @Cnt = @Cnt + 1
	END
	
	INSERT INTO @RtnValue (data)
	SELECT Data = LTRIM(RTRIM(@RowData))

	RETURN
END


GO
/****** Object:  UserDefinedFunction [dbo].[fn_ToMD5]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_ToMD5]
(
	-- Add the parameters for the function here
	@str VARCHAR(MAX)
)
RETURNS VARCHAR(MAX)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @result VARCHAR(MAX)

	-- Add the T-SQL statements to compute the return value here
	SET @result = CONVERT(VARCHAR(32), HashBytes('MD5', @str), 2)

	-- Return the result of the function
	RETURN @result

END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_UserInProfile]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[fn_UserInProfile]
(
	-- Add the parameters for the function here
	@IDUser INT,
	@CodProfile VARCHAR(50)
)
RETURNS BIT
AS
BEGIN
	DECLARE @IsInProfile BIT

	-- Declare the return variable here
	SELECT @IsInProfile = CAST((CASE WHEN COUNT(mpg.IDPermissionGranted) = 0 THEN 0 ELSE 1 END) AS BIT)
	FROM MetaPermissionGranted mpg
	WHERE mpg.IDProfile IN (SELECT IDProfile FROM MetaProfile WHERE CodProfile = @CodProfile)
		AND mpg.IDUser = @IDUser 
		
	RETURN @IsInProfile

END
GO
/****** Object:  Table [dbo].[_VisioMetadata]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_VisioMetadata](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Filename] [varchar](50) NOT NULL,
	[PageID] [int] NOT NULL,
	[ShapeID] [int] NOT NULL,
	[WorkflowID] [int] NULL,
	[WorkflowTable] [varchar](50) NULL,
	[WorkflowTableID] [int] NULL,
 CONSTRAINT [PK__VisioMetadata] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomValues]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomValues](
	[Tablename] [varchar](50) NOT NULL,
	[IDRelatedTable] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Value] [sql_variant] NOT NULL,
 CONSTRAINT [PK_CustomFieldValues] PRIMARY KEY CLUSTERED 
(
	[Tablename] ASC,
	[IDRelatedTable] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MailServer]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MailServer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Server] [varchar](50) NULL,
	[Port] [int] NOT NULL,
	[Username] [varchar](120) NULL,
	[Password] [varchar](120) NULL,
	[Sender] [varchar](120) NULL,
	[IsDefault] [bit] NOT NULL,
	[Sending] [bit] NOT NULL,
	[Receiving] [bit] NOT NULL,
	[tenant] [varchar](120) NULL,
	[client_id] [varchar](120) NULL,
	[client_secret] [varchar](120) NULL,
	[M_IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Mail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaApplication]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaApplication](
	[IDApplication] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[CodApplication] [varchar](30) NOT NULL,
	[Application] [varchar](120) NOT NULL,
	[Installed] [bit] NOT NULL,
	[DBAppVersion] [varchar](10) NOT NULL,
	[LicenseName] [varchar](120) NULL,
	[LicenseCode] [varchar](255) NULL,
	[ExpireDate] [smalldatetime] NULL,
	[ConnectionString] [varchar](512) NULL,
 CONSTRAINT [PK_MetaApplication] PRIMARY KEY CLUSTERED 
(
	[IDApplication] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaContext]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaContext](
	[IDContext] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[IDModule] [int] NOT NULL,
	[ContextCaption0] [varchar](120) NOT NULL,
	[ContextCaption1] [varchar](120) NULL,
	[ContextDescription0] [varchar](512) NULL,
	[ContextDescription1] [varchar](512) NULL,
	[ContextImage] [int] NULL,
	[ContextUrl] [varchar](255) NOT NULL,
	[ContextImageUrl] [varchar](120) NULL,
	[ContextTarget] [varchar](10) NOT NULL,
	[Visible] [bit] NOT NULL,
	[ItemOrder] [int] NOT NULL,
 CONSTRAINT [PK_MetaContext] PRIMARY KEY CLUSTERED 
(
	[IDContext] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaDashboard]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaDashboard](
	[IDDashboard] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](120) NOT NULL,
	[Filename] [varchar](max) NULL,
	[Stream] [varbinary](max) NOT NULL,
	[IDApplication] [int] NULL,
	[gui] [uniqueidentifier] NULL,
 CONSTRAINT [PK_MetaDashboard] PRIMARY KEY CLUSTERED 
(
	[IDDashboard] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaDayView]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaDayView](
	[IDDayView] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[CodDayView] [varchar](50) NULL,
	[DayView] [varchar](120) NOT NULL,
	[Location] [varchar](255) NULL,
	[BeginDateTime] [smalldatetime] NOT NULL,
	[EndDateTime] [smalldatetime] NOT NULL,
	[Description] [varchar](8000) NULL,
	[RememberInfo] [varchar](max) NULL,
	[RecurrenceInfo] [varchar](max) NULL,
	[AllDay] [bit] NOT NULL,
	[ResourceID] [varchar](max) NULL,
	[LabelID] [int] NULL,
	[TypeID] [int] NULL,
	[StatusID] [int] NULL,
	[IDUser] [int] NULL,
	[OutlookEntryID] [varchar](256) NULL,
	[PercentageComplete] [int] NULL,
	[M_IDUser] [int] NULL,
	[M_IsDeleted] [bit] NOT NULL,
	[M_Timespan] [varchar](255) NULL,
	[M_Locked] [bit] NULL,
	[M_LockedBy] [int] NULL,
	[M_LockedAt] [smalldatetime] NULL,
	[M_Guid] [varchar](255) NULL,
 CONSTRAINT [PK_MetaDayView] PRIMARY KEY CLUSTERED 
(
	[IDDayView] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaDefineProfile]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaDefineProfile](
	[IDDefineProfile] [int] IDENTITY(1,1) NOT NULL,
	[IDProfile] [int] NOT NULL,
	[IDTypePermission] [int] NOT NULL,
	[IDRelatedTable] [int] NOT NULL,
 CONSTRAINT [PK_MetaDefineProfile] PRIMARY KEY CLUSTERED 
(
	[IDDefineProfile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaField]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaField](
	[IDField] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[IDTable] [int] NOT NULL,
	[Fieldname] [varchar](120) NOT NULL,
	[FieldType] [int] NOT NULL,
	[FieldSize] [int] NOT NULL,
	[FieldCaption0] [varchar](255) NOT NULL,
	[FieldCaption1] [varchar](255) NULL,
	[FieldDescription0] [text] NULL,
	[FieldDescription1] [text] NULL,
	[PrimaryKey] [bit] NOT NULL,
	[ReadOnly] [bit] NOT NULL,
	[AutoIncrement] [bit] NOT NULL,
	[Required] [bit] NOT NULL,
	[Updatable] [bit] NULL,
	[ForeignTable] [varchar](50) NULL,
	[ForeignField] [varchar](120) NULL,
	[ForeignDescription] [varchar](120) NULL,
	[RowSource] [varchar](512) NULL,
	[ControlType] [varchar](50) NULL,
	[DefaultValue] [varchar](120) NULL,
	[Format] [varchar](255) NULL,
	[ValidationRule] [varchar](255) NULL,
	[ValidationText] [varchar](512) NULL,
	[Searchable] [bit] NOT NULL,
	[SearchResult] [bit] NOT NULL,
	[SearchOrder] [int] NOT NULL,
	[AuditSelect] [bit] NOT NULL,
	[AuditInsert] [bit] NOT NULL,
	[AuditUpdate] [bit] NOT NULL,
	[AuditDelete] [bit] NOT NULL,
 CONSTRAINT [PK_MetaField] PRIMARY KEY CLUSTERED 
(
	[IDField] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaFieldAudit]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaFieldAudit](
	[IDUser] [int] NOT NULL,
	[DateTime] [datetime] NOT NULL,
	[Version] [varchar](20) NULL,
	[IDTable] [int] NOT NULL,
	[IDField] [int] NOT NULL,
	[IDRelatedField] [int] NOT NULL,
	[OldValue] [text] NULL,
	[NewValue] [text] NULL,
 CONSTRAINT [PK_MetaFieldAudit] PRIMARY KEY CLUSTERED 
(
	[IDField] ASC,
	[IDUser] ASC,
	[DateTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaGraph]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaGraph](
	[IDGraph] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[CodGraph] [varchar](50) NULL,
	[GraphName] [varchar](120) NOT NULL,
	[IDContext] [int] NULL,
	[IDGraphParent] [int] NULL,
	[GraphCaption0] [varchar](120) NOT NULL,
	[GraphCaption1] [varchar](120) NULL,
	[SQLSyntax] [text] NOT NULL,
	[GraphType] [int] NULL,
	[ShowReport] [bit] NOT NULL,
	[Enabled] [bit] NOT NULL,
	[IDApplication] [int] NULL,
 CONSTRAINT [PK_MetaGraph] PRIMARY KEY CLUSTERED 
(
	[IDGraph] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaGraphSearch]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaGraphSearch](
	[IDGraphSearch] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[IDGraph] [int] NOT NULL,
	[FieldCaption0] [varchar](120) NOT NULL,
	[Operator] [varchar](50) NOT NULL,
	[ParameterName] [varchar](50) NOT NULL,
	[DefaultValue] [varchar](50) NULL,
	[ItemOrder] [int] NOT NULL,
	[ControlType] [varchar](50) NULL,
	[IDTable] [int] NULL,
	[Pagename] [varchar](50) NULL,
	[IsTitle] [bit] NOT NULL,
 CONSTRAINT [PK_MetaGraphSearch] PRIMARY KEY CLUSTERED 
(
	[IDGraphSearch] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaGroupUsers]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaGroupUsers](
	[IDUser] [int] NOT NULL,
	[IDGroup] [int] NOT NULL,
 CONSTRAINT [PK_MetaGroupUsers] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC,
	[IDGroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaMenuItem]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaMenuItem](
	[IDMenuItem] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[CodMenuItem] [varchar](30) NULL,
	[MenuItem0] [varchar](120) NOT NULL,
	[MenuItem1] [varchar](120) NULL,
	[IDMenuItemParent] [int] NULL,
	[MenuType] [char](10) NOT NULL,
	[Function] [varchar](1024) NULL,
	[ImageIcon] [char](10) NULL,
	[ItemOrder] [int] NOT NULL,
	[Visible] [bit] NOT NULL,
 CONSTRAINT [PK_MetaMenuItem] PRIMARY KEY CLUSTERED 
(
	[IDMenuItem] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaModule]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaModule](
	[IDModule] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[IDModuleParent] [int] NULL,
	[ModuleCaption0] [varchar](120) NOT NULL,
	[ModuleCaption1] [varchar](120) NULL,
	[Visible] [bit] NOT NULL,
	[ItemOrder] [int] NOT NULL,
	[IDApplication] [int] NULL,
 CONSTRAINT [PK_MetaModule] PRIMARY KEY CLUSTERED 
(
	[IDModule] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaParameter]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaParameter](
	[IDParameter] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[ParameterName] [varchar](50) NOT NULL,
	[ParameterValue] [varchar](120) NULL,
	[Description] [varchar](255) NULL,
	[IDApplication] [int] NULL,
 CONSTRAINT [PK_MetaParameter] PRIMARY KEY CLUSTERED 
(
	[IDParameter] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaPermission]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaPermission](
	[IDPermission] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[CodPermission] [varchar](30) NOT NULL,
	[PermissionCaption0] [varchar](120) NOT NULL,
	[PermissionCaption1] [varchar](120) NULL,
 CONSTRAINT [PK_MetaPermission] PRIMARY KEY CLUSTERED 
(
	[IDPermission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaPermissionGranted]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaPermissionGranted](
	[IDPermissionGranted] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[IDTypePermission] [int] NOT NULL,
	[IDRelatedTable] [int] NOT NULL,
	[IDPermission] [int] NOT NULL,
	[IDUser] [int] NOT NULL,
	[IDProfile] [int] NULL,
 CONSTRAINT [PK_MetaPermissionGranted] PRIMARY KEY CLUSTERED 
(
	[IDPermissionGranted] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaProfile]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaProfile](
	[IDProfile] [int] IDENTITY(1,1) NOT NULL,
	[CodProfile] [varchar](50) NOT NULL,
	[Profile] [varchar](120) NOT NULL,
	[M_IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_MetaPermissionProfile] PRIMARY KEY CLUSTERED 
(
	[IDProfile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaReport]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaReport](
	[IDReport] [int] IDENTITY(1,1) NOT NULL,
	[ReportName] [varchar](120) NOT NULL,
	[Description] [varchar](8000) NULL,
	[Filename] [varchar](256) NULL,
	[Stream] [varbinary](max) NULL,
	[ExportTo] [varchar](4) NULL,
	[ExportDate] [smalldatetime] NOT NULL,
	[IDReportView] [int] NULL,
	[IDReportCategory] [int] NULL,
	[IDApplication] [int] NULL,
 CONSTRAINT [PK_MetaReport] PRIMARY KEY CLUSTERED 
(
	[IDReport] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaReportCategory]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaReportCategory](
	[IDReportCategory] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[Description] [varchar](512) NULL,
 CONSTRAINT [PK_ReportCategory] PRIMARY KEY CLUSTERED 
(
	[IDReportCategory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaReportParameter]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaReportParameter](
	[IDParameter] [int] IDENTITY(1,1) NOT NULL,
	[IDReport] [int] NOT NULL,
	[Description] [varchar](8000) NULL,
	[ParameterName] [varchar](120) NOT NULL,
	[ParameterValue] [varchar](8000) NULL,
	[ParameterType] [varchar](50) NULL,
	[MinValue] [varchar](50) NULL,
	[MaxValue] [varchar](50) NULL,
	[DataSourceTable] [varchar](50) NULL,
 CONSTRAINT [PK_MetaReportParameter] PRIMARY KEY CLUSTERED 
(
	[IDParameter] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaReportView]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaReportView](
	[IDReportView] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[Description] [varchar](512) NULL,
	[ConnectionString] [varchar](512) NOT NULL,
 CONSTRAINT [PK_MetaReportView] PRIMARY KEY CLUSTERED 
(
	[IDReportView] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaReportViewInfo]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaReportViewInfo](
	[IDReportViewInfo] [int] IDENTITY(1,1) NOT NULL,
	[IDReportView] [int] NOT NULL,
	[IDTable] [int] NOT NULL,
	[IDField] [int] NOT NULL,
 CONSTRAINT [PK_MetaReportViewInfo] PRIMARY KEY CLUSTERED 
(
	[IDReportViewInfo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaScripts]    Script Date: 30/09/2026 14:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaScripts](
	[IDScript] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[SourceCode] [varchar](max) NOT NULL,
	[Enabled] [bit] NOT NULL,
	[InterfaceFullname] [varchar](1024) NOT NULL,
	[HostFullname] [varchar](1024) NOT NULL,
	[AssemblyPath] [varchar](1024) NULL,
	[Author] [int] NOT NULL,
	[CreatedAt] [smalldatetime] NOT NULL,
	[ModifiedAt] [smalldatetime] NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_MetaScripts] PRIMARY KEY CLUSTERED 
(
	[IDScript] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaSequence]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaSequence](
	[IDSequence] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Tablename] [varchar](50) NULL,
	[InitialValue] [int] NOT NULL,
	[CurrentValue] [int] NOT NULL,
 CONSTRAINT [PK_MetaSequence] PRIMARY KEY CLUSTERED 
(
	[IDSequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaTable]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaTable](
	[IDTable] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[Tablename] [varchar](50) NOT NULL,
	[TableCaption0] [varchar](255) NOT NULL,
	[TableCaption1] [varchar](255) NULL,
	[AuditSelect] [bit] NOT NULL,
	[AuditInsert] [bit] NOT NULL,
	[AuditUpdate] [bit] NOT NULL,
	[AuditDelete] [bit] NOT NULL,
	[IDApplication] [int] NULL,
 CONSTRAINT [PK_MetaTable] PRIMARY KEY CLUSTERED 
(
	[IDTable] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaTableAudit]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaTableAudit](
	[IDUser] [int] NOT NULL,
	[DateTime] [datetime] NOT NULL,
	[IDTable] [int] NOT NULL,
	[IDRelatedTable] [int] NULL,
	[IDPermission] [int] NULL,
	[Comments] [varchar](255) NULL,
 CONSTRAINT [PK_MetaTableAudit] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC,
	[DateTime] ASC,
	[IDTable] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaTypePermission]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaTypePermission](
	[IDTypePermission] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[TypePermission0] [varchar](120) NOT NULL,
	[TypePermission1] [varchar](120) NULL,
	[Tablename] [varchar](50) NOT NULL,
	[IDField] [varchar](50) NOT NULL,
	[FieldCaption] [varchar](50) NOT NULL,
	[TypePermissionImage] [int] NULL,
 CONSTRAINT [PK_MetaTypePermission] PRIMARY KEY CLUSTERED 
(
	[IDTypePermission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MetaUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaUser](
	[IDUser] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[Username] [varchar](30) NOT NULL,
	[Password] [varchar](255) NULL,
	[Fullname] [varchar](120) NULL,
	[Address] [varchar](255) NULL,
	[City] [varchar](80) NULL,
	[ZipCode] [varchar](8) NULL,
	[Phone] [varchar](15) NULL,
	[Mobile] [varchar](15) NULL,
	[Email] [varchar](120) NOT NULL,
	[IsGroup] [bit] NOT NULL,
	[IsAuditable] [bit] NOT NULL,
	[Picture] [varbinary](max) NULL,
	[IDApplication] [int] NULL,
	[M_IDUser] [int] NULL,
	[M_IsDeleted] [bit] NOT NULL,
	[M_Timespan] [varchar](255) NULL,
	[M_Locked] [bit] NULL,
	[M_LockedBy] [int] NULL,
	[M_LockedAt] [smalldatetime] NULL,
	[M_Guid] [varchar](255) NULL,
 CONSTRAINT [PK_MetaUser] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourcesScheduler]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourcesScheduler](
	[ResourceID] [int] IDENTITY(1,1) NOT NULL,
	[ResourceName] [varchar](120) NOT NULL,
	[Description] [varchar](8000) NULL,
	[Color] [varchar](50) NOT NULL,
	[Image] [image] NULL,
 CONSTRAINT [PK_CalendarResources] PRIMARY KEY CLUSTERED 
(
	[ResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Workflow]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workflow](
	[IDWorkflow] [int] IDENTITY(1,1) NOT NULL,
	[IDWorkflowDefinition] [int] NOT NULL,
	[CreatedDate] [smalldatetime] NOT NULL,
	[ModifiedDate] [smalldatetime] NOT NULL,
	[FinishedDate] [smalldatetime] NULL,
	[Nextrun] [smalldatetime] NULL,
	[Diagram] [varbinary](max) NOT NULL,
 CONSTRAINT [PK_Workflow_1] PRIMARY KEY CLUSTERED 
(
	[IDWorkflow] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowAttachment]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowAttachment](
	[IDAttachment] [int] IDENTITY(1,1) NOT NULL,
	[IDWorkflow] [int] NOT NULL,
	[Name] [varchar](120) NOT NULL,
	[Filename] [varchar](120) NOT NULL,
	[CreatedDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_WorkflowAttachment] PRIMARY KEY CLUSTERED 
(
	[IDAttachment] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowDefinition]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowDefinition](
	[IDWorkflowDefinition] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Label] [varchar](120) NULL,
	[Deprecated] [bit] NOT NULL,
	[Diagram] [varbinary](max) NULL,
 CONSTRAINT [PK_Workflow] PRIMARY KEY CLUSTERED 
(
	[IDWorkflowDefinition] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowField]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowField](
	[IDWorkflowField] [int] IDENTITY(1,1) NOT NULL,
	[IDWorkflowTask] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Label] [varchar](120) NOT NULL,
	[EditorType] [int] NOT NULL,
	[ReadOnly] [bit] NOT NULL,
	[Required] [bit] NOT NULL,
	[Value] [varchar](max) NULL,
 CONSTRAINT [PK_WorkflowField] PRIMARY KEY CLUSTERED 
(
	[IDWorkflowField] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowHistory]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowHistory](
	[IDWorkflowHistory] [int] IDENTITY(1,1) NOT NULL,
	[IDWorkflowTask] [int] NOT NULL,
	[Date] [smalldatetime] NULL,
	[IDUser] [int] NULL,
	[State1] [varchar](50) NULL,
	[State2] [varchar](50) NULL,
 CONSTRAINT [PK_WorkflowHistory] PRIMARY KEY CLUSTERED 
(
	[IDWorkflowHistory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowTask]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowTask](
	[IDWorkflowTask] [int] IDENTITY(1,1) NOT NULL,
	[IDWorkflow] [int] NOT NULL,
	[Task] [varchar](max) NOT NULL,
	[CreatedDate] [smalldatetime] NOT NULL,
	[IDUser] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Subject] [varchar](120) NULL,
	[Comments] [varchar](1024) NULL,
	[IDWorkflowDefinition] [int] NOT NULL,
	[Finished] [bit] NOT NULL,
	[ModifiedDate] [smalldatetime] NULL,
	[ModifiedUser] [int] NULL,
	[ExpirationDate] [smalldatetime] NULL,
 CONSTRAINT [PK_WorkflowTask] PRIMARY KEY CLUSTERED 
(
	[IDWorkflowTask] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetFields]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetFields]
(	
	-- Add the parameters for the function here
	@IDTable INT = NULL,
	@Tablename VARCHAR(50) = NULL
)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	SELECT mf.IDField,
		   mf.Fieldname AS [Name],
		   mf.FieldCaption0 AS [Title],
		   ISNULL(mf.FieldDescription0, '') AS [Description],
		   mf.FieldType,
		   mf.FieldSize,
		   mf.[PrimaryKey] AS IsPrimaryKey,
		   mf.[ReadOnly] AS IsReadOnly,
		   mf.[AutoIncrement] AS IsAutoIncrement,
		   mf.[Required] AS IsRequired,
		   ISNULL(mf.ControlType, 'TEXTBOX') AS ControlType, 
		   mf.DefaultValue,
		   mf.[Format],
		   mf.ValidationRule,
		   ISNULL(mf.ValidationText, '') AS ValidationText,		  
		   (CASE WHEN ISNULL(mf.RowSource, '') <> ''
		    THEN
				mf.RowSource 
			ELSE 
				'SELECT ' + mf.ForeignField + ', '  + mf.ForeignTable + ' ' +
				'FROM ' + mf.ForeignTable + ' ' +
				'ORDER BY ' + mf.ForeignTable + ' ASC'
			END) AS RowSource,
			mf.AuditSelect,
			mf.AuditInsert,
			mf.AuditUpdate,
			mf.AuditDelete
	FROM MetaTable mt
		INNER JOIN MetaField mf ON mf.IDTable = mt.IDTable
	WHERE (mt.IDTable = @IDTable OR @IDTable IS NULL)
		AND (mt.Tablename = @Tablename OR @Tablename IS NULL)
)
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetGroupsByUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetGroupsByUser] 
(	
	-- Add the parameters for the function here
	@IDUser INT
)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	SELECT mu.IDUser, mu.Username, mu.Fullname
	FROM MetaGroupUsers mgu
		INNER JOIN MetaUser mu ON mgu.IDGroup = mu.IDUser
	WHERE mgu.IDUser = @IDUser
)
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetTablename]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetTablename]
(	
	-- Add the parameters for the function here
	@IDTable INT = NULL,
	@Tablename VARCHAR(50) = NULL
)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	SELECT mt.IDTable, 
		   mt.Tablename AS [Name], 
		   mt.TableCaption0 AS [Description],
		   mt.AuditSelect,
		   mt.AuditInsert,
		   mt.AuditUpdate,
		   mt.AuditDelete
	FROM MetaTable mt
	WHERE (mt.IDTable = @IDTable OR @IDTable IS NULL)
		AND (mt.Tablename = @Tablename OR @Tablename IS NULL)
)
GO
/****** Object:  View [dbo].[vw_AllActiveGroups]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_AllActiveGroups]
AS
SELECT   TOP (100) PERCENT IDUser, Username, Fullname
FROM         dbo.MetaUser
WHERE     (IsGroup = 1) AND (M_IsDeleted = 0)
GO
/****** Object:  View [dbo].[vw_AllActiveUsers]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_AllActiveUsers]
AS
SELECT        IDUser, Username, Fullname, Address, City, ZipCode, Phone, Mobile, Email, IsAuditable, IDApplication
FROM            dbo.MetaUser
WHERE        (M_IsDeleted = 0) AND (IsGroup = 0)
GO
ALTER TABLE [dbo].[MailServer] ADD  CONSTRAINT [DF_Mail_Port]  DEFAULT ((25)) FOR [Port]
GO
ALTER TABLE [dbo].[MailServer] ADD  CONSTRAINT [DF_Mail_IsDefault]  DEFAULT ((0)) FOR [IsDefault]
GO
ALTER TABLE [dbo].[MailServer] ADD  CONSTRAINT [DF_Mail_Sending]  DEFAULT ((0)) FOR [Sending]
GO
ALTER TABLE [dbo].[MailServer] ADD  CONSTRAINT [DF_Mail_Receiving]  DEFAULT ((0)) FOR [Receiving]
GO
ALTER TABLE [dbo].[MailServer] ADD  CONSTRAINT [DF_Mail_M_IsDeleted]  DEFAULT ((0)) FOR [M_IsDeleted]
GO
ALTER TABLE [dbo].[MetaApplication] ADD  CONSTRAINT [DF_MetaApplication_Installed]  DEFAULT ((1)) FOR [Installed]
GO
ALTER TABLE [dbo].[MetaApplication] ADD  CONSTRAINT [DF_MetaApplication_DBAppVersion]  DEFAULT ('1.00.00.00') FOR [DBAppVersion]
GO
ALTER TABLE [dbo].[MetaContext] ADD  CONSTRAINT [DF_MetaContext_ContextUrl]  DEFAULT ('#') FOR [ContextUrl]
GO
ALTER TABLE [dbo].[MetaContext] ADD  CONSTRAINT [DF_MetaContext_ContextTarget]  DEFAULT ('_top') FOR [ContextTarget]
GO
ALTER TABLE [dbo].[MetaContext] ADD  CONSTRAINT [DF_MetaContext_Visible]  DEFAULT ((1)) FOR [Visible]
GO
ALTER TABLE [dbo].[MetaContext] ADD  CONSTRAINT [DF_MetaContext_ItemOrder]  DEFAULT ((0)) FOR [ItemOrder]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DF_MetaDayView_BeginDateTime]  DEFAULT (getdate()) FOR [BeginDateTime]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DF_MetaDayView_AllDay]  DEFAULT ((0)) FOR [AllDay]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DF_MetaDayView_ResourceID]  DEFAULT ((1)) FOR [ResourceID]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DF_MetaDayView_Type]  DEFAULT ((0)) FOR [TypeID]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DF_MetaDayView_Status]  DEFAULT ((1)) FOR [StatusID]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DEFAULT_MetaDayView_M_IDUser]  DEFAULT ((0)) FOR [M_IDUser]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DEFAULT_MetaDayView_M_IsDeleted]  DEFAULT ((0)) FOR [M_IsDeleted]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DEFAULT_MetaDayView_M_Locked]  DEFAULT ((0)) FOR [M_Locked]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DEFAULT_MetaDayView_M_LockedBy]  DEFAULT ((0)) FOR [M_LockedBy]
GO
ALTER TABLE [dbo].[MetaDayView] ADD  CONSTRAINT [DEFAULT_MetaDayView_M_Guid]  DEFAULT (newid()) FOR [M_Guid]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_FieldType]  DEFAULT ((1)) FOR [FieldType]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_FieldSize]  DEFAULT ((4)) FOR [FieldSize]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_PrimaryKey]  DEFAULT ((0)) FOR [PrimaryKey]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_ReadOnly]  DEFAULT ((0)) FOR [ReadOnly]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_AutoIncrement]  DEFAULT ((0)) FOR [AutoIncrement]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_Required]  DEFAULT ((0)) FOR [Required]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_Updatable]  DEFAULT ((1)) FOR [Updatable]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_Searchable]  DEFAULT ((0)) FOR [Searchable]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_SearchResult]  DEFAULT ((0)) FOR [SearchResult]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_SearchOrder]  DEFAULT ((0)) FOR [SearchOrder]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_AuditSelect]  DEFAULT ((0)) FOR [AuditSelect]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_AuditInsert]  DEFAULT ((0)) FOR [AuditInsert]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_AuditUpdate]  DEFAULT ((0)) FOR [AuditUpdate]
GO
ALTER TABLE [dbo].[MetaField] ADD  CONSTRAINT [DF_MetaField_AuditDelete]  DEFAULT ((0)) FOR [AuditDelete]
GO
ALTER TABLE [dbo].[MetaFieldAudit] ADD  CONSTRAINT [DF_MetaFieldAudit_DateTime]  DEFAULT (getdate()) FOR [DateTime]
GO
ALTER TABLE [dbo].[MetaGraph] ADD  CONSTRAINT [DF_MetaGraph_ShowReport]  DEFAULT ((0)) FOR [ShowReport]
GO
ALTER TABLE [dbo].[MetaGraph] ADD  CONSTRAINT [DF_MetaGraph_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [dbo].[MetaGraphSearch] ADD  CONSTRAINT [DF_MetaGraphSearch_Operator]  DEFAULT ('=') FOR [Operator]
GO
ALTER TABLE [dbo].[MetaGraphSearch] ADD  CONSTRAINT [DF_MetaGraphSearch_ItemOrder]  DEFAULT ((0)) FOR [ItemOrder]
GO
ALTER TABLE [dbo].[MetaGraphSearch] ADD  CONSTRAINT [DF_MetaGraphSearch_IsTitle]  DEFAULT ((0)) FOR [IsTitle]
GO
ALTER TABLE [dbo].[MetaMenuItem] ADD  CONSTRAINT [DF_MetaMenuItem_MenuType]  DEFAULT ('H') FOR [MenuType]
GO
ALTER TABLE [dbo].[MetaMenuItem] ADD  CONSTRAINT [DF_MetaMenuItem_ItemOrder]  DEFAULT ((0)) FOR [ItemOrder]
GO
ALTER TABLE [dbo].[MetaMenuItem] ADD  CONSTRAINT [DF_MetaMenuItem_Visible]  DEFAULT ((1)) FOR [Visible]
GO
ALTER TABLE [dbo].[MetaModule] ADD  CONSTRAINT [DF_MetaModule_Visible]  DEFAULT ((1)) FOR [Visible]
GO
ALTER TABLE [dbo].[MetaModule] ADD  CONSTRAINT [DF_MetaModule_ItemOrder]  DEFAULT ((0)) FOR [ItemOrder]
GO
ALTER TABLE [dbo].[MetaProfile] ADD  CONSTRAINT [DEFAULT_MetaProfile_M_IsDeleted]  DEFAULT ((0)) FOR [M_IsDeleted]
GO
ALTER TABLE [dbo].[MetaReport] ADD  CONSTRAINT [DF_MetaReport_ScheduledDate]  DEFAULT (getdate()) FOR [ExportDate]
GO
ALTER TABLE [dbo].[MetaScripts] ADD  CONSTRAINT [DF_MetaScripts_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [dbo].[MetaScripts] ADD  CONSTRAINT [DF_MetaScripts_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[MetaScripts] ADD  CONSTRAINT [DF_MetaScripts_ModifiedAt]  DEFAULT (getdate()) FOR [ModifiedAt]
GO
ALTER TABLE [dbo].[MetaSequence] ADD  CONSTRAINT [DF_MetaSequence_InitialValue]  DEFAULT ((1)) FOR [InitialValue]
GO
ALTER TABLE [dbo].[MetaSequence] ADD  CONSTRAINT [DF_MetaSequence_CurrentValue]  DEFAULT ((1)) FOR [CurrentValue]
GO
ALTER TABLE [dbo].[MetaTable] ADD  CONSTRAINT [DF_MetaTable_AuditSelect]  DEFAULT ((0)) FOR [AuditSelect]
GO
ALTER TABLE [dbo].[MetaTable] ADD  CONSTRAINT [DF_MetaTable_AuditInsert]  DEFAULT ((0)) FOR [AuditInsert]
GO
ALTER TABLE [dbo].[MetaTable] ADD  CONSTRAINT [DF_MetaTable_AuditUpdate]  DEFAULT ((0)) FOR [AuditUpdate]
GO
ALTER TABLE [dbo].[MetaTable] ADD  CONSTRAINT [DF_MetaTable_AuditDelete]  DEFAULT ((0)) FOR [AuditDelete]
GO
ALTER TABLE [dbo].[MetaTableAudit] ADD  CONSTRAINT [DF_MetaTableAudit_DateTime]  DEFAULT (getdate()) FOR [DateTime]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DF_MetaUser_IsGroup]  DEFAULT ((0)) FOR [IsGroup]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DF_MetaUser_IsAuditable]  DEFAULT ((0)) FOR [IsAuditable]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DEFAULT_MetaUser_M_IDUser]  DEFAULT ((0)) FOR [M_IDUser]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DEFAULT_MetaUser_M_IsDeleted]  DEFAULT ((0)) FOR [M_IsDeleted]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DEFAULT_MetaUser_M_Locked]  DEFAULT ((0)) FOR [M_Locked]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DEFAULT_MetaUser_M_LockedBy]  DEFAULT ((0)) FOR [M_LockedBy]
GO
ALTER TABLE [dbo].[MetaUser] ADD  CONSTRAINT [DEFAULT_MetaUser_M_Guid]  DEFAULT (newid()) FOR [M_Guid]
GO
ALTER TABLE [dbo].[Workflow] ADD  CONSTRAINT [DF_Workflow_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Workflow] ADD  CONSTRAINT [DF_Workflow_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[WorkflowAttachment] ADD  CONSTRAINT [DF_WorkflowAttachment_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WorkflowDefinition] ADD  CONSTRAINT [DF_Workflow_Deprecated]  DEFAULT ((0)) FOR [Deprecated]
GO
ALTER TABLE [dbo].[WorkflowField] ADD  CONSTRAINT [DF_WorkflowField_EditorType]  DEFAULT ((1)) FOR [EditorType]
GO
ALTER TABLE [dbo].[WorkflowField] ADD  CONSTRAINT [DF_WorkflowField_ReadOnly]  DEFAULT ((0)) FOR [ReadOnly]
GO
ALTER TABLE [dbo].[WorkflowField] ADD  CONSTRAINT [DF_WorkflowField_Required]  DEFAULT ((0)) FOR [Required]
GO
ALTER TABLE [dbo].[WorkflowTask] ADD  CONSTRAINT [DF_WorkflowTask_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WorkflowTask] ADD  CONSTRAINT [DF_WorkflowTask_Finished]  DEFAULT ((0)) FOR [Finished]
GO
/****** Object:  StoredProcedure [dbo].[sys_CreateTable]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sys_CreateTable] -- sys_CreateTable 'xxxx'
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	IF (SELECT COUNT(object_id) FROM sys.objects WHERE Name = @Tablename and type = 'U') = 0
	BEGIN
		DECLARE @cmd NVARCHAR(MAX)
		SET @cmd = 'CREATE TABLE ' + @Tablename + ' (ID' + @Tablename + ' INT PRIMARY KEY IDENTITY(1,1), Cod' + @Tablename + ' VARCHAR(30), ' + @Tablename + ' VARCHAR(120));'
		exec sp_executesql  @cmd
		exec xp_UpdateMetaFields
	END
END
GO
/****** Object:  StoredProcedure [dbo].[sys_GetColumnsByTable]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sys_GetColumnsByTable] -- sp_GetSysColumns 'MetaUser'
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(50),
	@Schema VARCHAR(10) = 'dbo'
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select c.column_id as ID, c.name as Fieldname, ts.name as user_type, c.max_length, c.[precision], c.scale, c.is_nullable, c.is_identity, c.is_computed
	from sys.columns c
		inner join sys.tables t on t.object_id = c.object_id
		inner join sys.schemas s on s.schema_id = t.schema_id
		inner join sys.types ts on ts.user_type_id = c.user_type_id
	where t.name = @Tablename AND s.name = @Schema

END
GO
/****** Object:  StoredProcedure [dbo].[sys_GetForeignTables]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sys_GetForeignTables] -- sys_GetForeignTables 'MetaUser'
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select fk.name as FK_name, tp.name AS PT_name, cp.name, cp.column_id, tr.name  AS RT_name, cr.name, cr.column_id
	from  sys.foreign_keys fk
		inner join sys.tables tp ON fk.parent_object_id = tp.object_id
		inner join sys.tables tr ON fk.referenced_object_id = tr.object_id
		inner join sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
		inner join sys.columns cp ON fkc.parent_column_id = cp.column_id AND fkc.parent_object_id = cp.object_id
		inner join sys.columns cr ON fkc.referenced_column_id = cr.column_id AND fkc.referenced_object_id = cr.object_id
	where tp.name = @Tablename
	order by tp.name, cp.column_id
END
GO
/****** Object:  StoredProcedure [dbo].[sys_GetTables]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sys_GetTables] -- sys_GetTables
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(50) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select t.object_id as ID, s.name as [Schema], t.name as Tablename, t.[type] AS [Type]
	from sys.tables t
		inner join sys.schemas s ON s.schema_id = t.schema_id
	where t.[type] IN ('U')
		and t.name = @Tablename OR @Tablename is null
	order by t.name asc
END
GO
/****** Object:  StoredProcedure [dbo].[xp_BackupDB]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_BackupDB] -- xp_BackupDB 
	-- Add the parameters for the stored procedure here
	@DB_NAME VARCHAR(50) = NULL,
	@Filename VARCHAR(255) = NULL,
	@Result BIT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET FMTONLY ON

    -- Insert statements for procedure here
	DECLARE @Date SMALLDATETIME
	SET @Date = GETDATE();

	IF @DB_NAME IS NULL
	BEGIN
		SET @DB_NAME = DB_NAME()
	END

	IF @Filename IS NULL
	BEGIN
		SET @Filename = 'C:\Backups\' + @DB_NAME + '_' + CAST(Year(@Date) AS VARCHAR(4)) + CAST(FORMAT(MONTH(@Date), '0#') AS VARCHAR(2)) + '.bak'
	END

	DECLARE @Exists INT
	EXEC master.dbo.xp_fileexist @Filename, @Exists OUTPUT

	DECLARE @SQL NVARCHAR(MAX)
	SET @SQL = N'BACKUP DATABASE ' + QUOTENAME(@DB_NAME) + ' TO DISK = ''' + @Filename + ''''

	IF DAY(@Date) > 1 AND @Exists <> 0
	BEGIN
		 SET @SQL = @SQL + ' WITH DIFFERENTIAL'	
	END

	BEGIN TRY
		EXEC sp_executesql @SQL
		SET @Result = 1
	END TRY
	BEGIN CATCH
		SET @Result = 0
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[xp_CleanMetaPermissionGranted]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_CleanMetaPermissionGranted]
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM MetaPermissionGranted
	WHERE IDPermissionGranted IN (
		SELECT x.IDPermissionGranted
		FROM (
			SELECT ROW_NUMBER() OVER (PARTITION BY IDTypePermission, IDRelatedTable, IDPermission, IDUser, IDProfile ORDER BY IDPermissionGranted ASC) AS ROW, IDPermissionGranted
			FROM MetaPermissionGranted
		) x
		WHERE x.ROW > 1
	)
END
GO
/****** Object:  StoredProcedure [dbo].[xp_ConfigureMailServer]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_ConfigureMailServer] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert statements for procedure here
	DECLARE @Name VARCHAR(50), 
			@Server VARCHAR(50), 
			@Port INT, 
			@Username VARCHAR(120),
			@Password VARCHAR(120), 
			@Sender VARCHAR(120)

	DECLARE c CURSOR FOR 
	SELECT [Name], LTRIM(RTRIM([Server])) AS [Server], [Port], [Username], [Password], [Sender]
	FROM MailServer
	WHERE Sending = 1 AND M_IsDeleted = 0

	OPEN c  
	FETCH NEXT FROM c INTO @Name, @Server, @Port, @Username, @Password, @Sender  

	WHILE @@FETCH_STATUS = 0  
	BEGIN  
		DECLARE @UseSSL BIT
		SET @UseSSL = (CASE WHEN @Port = 25 THEN 0 ELSE 1 END)
		
		EXECUTE msdb.dbo.sysmail_delete_profileaccount_sp @profile_name = @Name
		EXECUTE msdb.dbo.sysmail_delete_principalprofile_sp @profile_name = @Name
		EXECUTE msdb.dbo.sysmail_delete_account_sp @account_name = @Name
		EXECUTE msdb.dbo.sysmail_delete_profile_sp @profile_name = @Name
		
		EXECUTE msdb.dbo.sysmail_add_profile_sp  
			@profile_name = @Name,  
			@description = 'Profile used for sending outgoing notifications using Gmail.' ;  
	
		EXECUTE msdb.dbo.sysmail_add_principalprofile_sp  
			@profile_name = @Name,  
			@principal_name = 'public',  
			@is_default = 1;
	
		-- Create a Database Mail account  
		EXECUTE msdb.dbo.sysmail_add_account_sp  
			@account_name = @Name,  
			@description = 'Mail account for sending outgoing notifications.',  
			@email_address = @Sender,  
			@display_name = @Sender,  
			@mailserver_name = @Server,
			@port = @Port,
			@enable_ssl = @UseSSL,
			@username = @Username,
			@password = @Password;  
	
		EXECUTE msdb.dbo.sysmail_add_profileaccount_sp  
			@profile_name = @Name,  
			@account_name = @Name,  
			@sequence_number = 1;  

	FETCH NEXT FROM c INTO @Name, @Server, @Port, @Username, @Password, @Sender 
	END 

	CLOSE c  
	DEALLOCATE c

END
GO
/****** Object:  StoredProcedure [dbo].[xp_CreateAuditEntry]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_CreateAuditEntry] -- xp_CreateAuditEntry 3, 'INSERT', 'MetaUser', 'Username', 4, 'Admin'
	-- Add the parameters for the stored procedure here
	@IDUser INT,
	@Permission VARCHAR(20) = 'INSERT',
	@Tablename VARCHAR(50),
	@Fieldname VARCHAR(50),		
	@ID INT,
	@NewValue VARCHAR(MAX)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @Date SMALLDATETIME
	SET @Date = GETDATE();

	DECLARE @IDTable INT
	DECLARE @IDField INT

	SELECT 
		@IDTable = mt.IDTable,
		@IDField = mf.IDField
	FROM MetaField mf
		INNER JOIN MetaTable mt ON mf.IDTable = mt.IDTable
	WHERE mt.Tablename = @Tablename AND mf.Fieldname = @Fieldname

	IF 
	   UPPER(@Permission) = 'SELECT' AND (SELECT AuditSelect FROM MetaTable WHERE IDTable = @IDTable) = 1 OR
	   UPPER(@Permission) = 'INSERT' AND (SELECT AuditInsert FROM MetaTable WHERE IDTable = @IDTable) = 1 OR
	   UPPER(@Permission) = 'UPDATE' AND (SELECT AuditUpdate FROM MetaTable WHERE IDTable = @IDTable) = 1 OR
	   UPPER(@Permission) = 'DELETE' AND (SELECT AuditDelete FROM MetaTable WHERE IDTable = @IDTable) = 1
	BEGIN
		
		DECLARE @IDPermission INT

		SELECT 
			@IDPermission = mp.IDPermission
		FROM MetaPermission mp
		WHERE mp.CodPermission = @Permission

		INSERT INTO MetaTableAudit (IDUser, [DateTime], IDTable, IDRelatedTable, IDPermission, Comments)
			VALUES (@IDUser, @Date, @IDTable, @ID, @IDPermission, '')
	
	END

	IF 
	   UPPER(@Permission) = 'SELECT' AND (SELECT AuditSelect FROM MetaField WHERE IDField = @IDField) = 1 OR
	   UPPER(@Permission) = 'INSERT' AND (SELECT AuditInsert FROM MetaField WHERE IDField = @IDField) = 1 OR
	   UPPER(@Permission) = 'UPDATE' AND (SELECT AuditUpdate FROM MetaField WHERE IDField = @IDField) = 1 OR
	   UPPER(@Permission) = 'DELETE' AND (SELECT AuditDelete FROM MetaField WHERE IDField = @IDField) = 1
	BEGIN

		DECLARE @LastVersion INT
		DECLARE @OldValue VARCHAR(MAX)

		SELECT @LastVersion = MAX(ISNULL(mfa.[Version], 0))
		FROM MetaFieldAudit mfa
		WHERE mfa.IDField = @IDField 
			AND mfa.IDRelatedField = @ID

		IF ISNULL(@LastVersion, 0) = 0
		BEGIN
			SET @LastVersion = 0
		END		

		SELECT @OldValue = mfa.OldValue
		FROM MetaFieldAudit mfa
		WHERE mfa.IDField = @IDField 
			AND mfa.IDRelatedField = @ID
			AND mfa.[Version] = @LastVersion

		INSERT INTO MetaFieldAudit (IDUser, [DateTime], [Version], IDTable, IDField, IDRelatedField, OldValue, NewValue)
			VALUES (@IDUser, @Date, @LastVersion + 1, @IDTable, @IDField, @ID, @OldValue, @NewValue)
	
	END
	
END
GO
/****** Object:  StoredProcedure [dbo].[xp_DeleteUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_DeleteUser]
	-- Add the parameters for the stored procedure here
	@IDUser INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE MetaUser
		SET M_IsDeleted = 1
	WHERE IDUser = @IDUser OR @IDUser IS NULL
	 
END
GO
/****** Object:  StoredProcedure [dbo].[xp_DeleteUserProfile]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_DeleteUserProfile]
	-- Add the parameters for the stored procedure here
	@IDUser INT,
	@IDProfile INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM MetaPermissionGranted
	WHERE IDUser = @IDUser AND IDProfile = @IDProfile
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetAllActiveUsers]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetAllActiveUsers]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IDUser, Username, Fullname, Email
	FROM MetaUser
	WHERE IsGroup = 0 AND M_IsDeleted = 0
	ORDER BY Fullname ASC

	SELECT mgu.IDUser, mgu.IDGroup, mg.Username
	FROM MetaGroupUsers mgu
		INNER JOIN MetaUser mg ON mgu.IDGroup = mg.IDUser
	WHERE mg.M_IsDeleted = 0 AND mgu.IDUser IN (
		SELECT IDUser
		FROM MetaUser
		WHERE IsGroup = 0 AND M_IsDeleted = 0
	)
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetCustomValuesFromTable]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetCustomValuesFromTable] -- xp_GetCustomValuesFromTable 'xxx', 1
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(50),
	@ID INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @SQLStr VARCHAR(5000)
	SET @SQLStr = ''

	SELECT @SQLStr = @SQLStr + '[' + [a].[Column] + '], '
	FROM
	(
		SELECT DISTINCT cv.Name as [Column]
		FROM CustomValues cv
		WHERE cv.Tablename = @Tablename
			AND cv.IDRelatedTable = @ID
	) AS a

	SET @SQLStr = LEFT(@SQLStr, LEN(@SQLStr) - 1)

	DECLARE @SQL NVARCHAR(MAX)
	SET @SQL = N'
		SELECT * FROM   
		(
			SELECT cv.[Name], cv.[Value]
			FROM CustomValues cv
		) t 
		PIVOT(
			MAX(Value)
			FOR Name IN (' + @SQLStr + ')
		) AS pivot_table;
	';

	EXECUTE sp_executesql @SQL;
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetFieldSnapshot]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetFieldSnapshot] -- xp_GetFieldSnapshot 'MetaUser', 3
	-- Add the parameters for the stored procedure here
	@Tablename VARCHAR(50),
	@ID INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @table TABLE (
		[ROW] INT,
		[Tablename] VARCHAR(50),
		[Fieldname] VARCHAR(50),
		[FieldCaption0] VARCHAR(255),
		[IDUser] INT,
		[Username] VARCHAR(50),
		[DateTime] SMALLDATETIME,
		[Version] VARCHAR(10),
		[OldValue] NVARCHAR(MAX),
		[NewValue] NVARCHAR(MAX)
	)

    -- Insert statements for procedure here
	INSERT INTO @table (
		[ROW], 
		[Tablename], 
		[Fieldname], 
		[FieldCaption0], 
		[IDUser], 
		[Username], 
		[DateTime], 
		[Version],
		[OldValue], 
		[NewValue]
	)
	SELECT ROW_NUMBER() OVER (PARTITION BY mfa.IDField ORDER BY mfa.DateTime) AS ROW,
		   mt.Tablename, 
		   mf.Fieldname, 
		   mf.FieldCaption0, 
		   mu.IDUser,
		   mu.Username, 
		   mfa.[DateTime], 
		   mfa.[Version],
		   (CASE WHEN mf.ForeignTable IS NOT NULL THEN 'SELECT ' + mf.ForeignDescription + ' FROM ' + mf.ForeignTable + ' WHERE ' + mf.ForeignField + ' = ' + CAST(mfa.OldValue AS VARCHAR(MAX)) ELSE mfa.OldValue END) AS OldValue,
		   (CASE WHEN mf.ForeignTable IS NOT NULL THEN 'SELECT ' + mf.ForeignDescription + ' FROM ' + mf.ForeignTable + ' WHERE ' + mf.ForeignField + ' = ' + CAST(mfa.NewValue AS VARCHAR(MAX)) ELSE mfa.NewValue END) AS NewValue
	FROM MetaFieldAudit mfa	
		INNER JOIN MetaTable mt ON mt.IDTable = mfa.IDTable
		INNER JOIN MetaField mf ON mf.IDField = mfa.IDField
		INNER JOIN MetaUser mu ON mu.IDUser = mfa.IDUser
	WHERE mt.Tablename = @Tablename
		AND mfa.IDRelatedField = @ID

	DECLARE @ROW AS INT
	DECLARE @Tablename1 AS VARCHAR(50)
	DECLARE @Fieldname AS VARCHAR(50)
	DECLARE @FieldCaption0 AS VARCHAR(255)
	DECLARE @IDUser AS INT
	DECLARE @Username AS VARCHAR(50)
	DECLARE @DateTime AS SMALLDATETIME
	DECLARE @Version AS VARCHAR(10)
	DECLARE @OldValue AS NVARCHAR(MAX)
	DECLARE @NewValue AS NVARCHAR(MAX)

	DECLARE cursor_product CURSOR
    FOR	SELECT * FROM @table;

	OPEN cursor_product;

	FETCH NEXT FROM cursor_product INTO 
		@ROW, 
		@Tablename1,
		@Fieldname,
		@FieldCaption0,
		@IDUser,
		@Username,
		@DateTime,
		@Version,
		@OldValue,
		@NewValue;	
 
	WHILE @@FETCH_STATUS = 0
    BEGIN
		DECLARE @vi VARCHAR(MAX)
		DECLARE @query NVARCHAR(MAX)

		IF @OldValue IS NOT NULL AND SUBSTRING(@OldValue, 1, 6) = 'SELECT'
		BEGIN
			SET @query = REPLACE(@OldValue, 'SELECT ', 'SELECT @vi = ')
			EXEC sp_executesql @query, N'@vi VARCHAR(MAX) OUTPUT', @vi = @vi OUTPUT
			UPDATE @table SET OldValue = @vi WHERE [ROW] = @ROW
		END

		IF @NewValue IS NOT NULL AND SUBSTRING(@NewValue, 1, 6) = 'SELECT'
		BEGIN
			SET @query = REPLACE(@NewValue, 'SELECT ', 'SELECT @vi = ')
			EXEC sp_executesql @query, N'@vi VARCHAR(MAX) OUTPUT', @vi = @vi OUTPUT
			UPDATE @table SET NewValue = @vi WHERE [ROW] = @ROW
		END
      
        FETCH NEXT FROM cursor_product INTO 
            @ROW, 
			@Tablename1,
			@Fieldname,
			@FieldCaption0,
			@IDUser,
			@Username,
			@DateTime,
			@Version,
			@OldValue,
			@NewValue;
    END;

	CLOSE cursor_product;
	DEALLOCATE cursor_product;

	SELECT * FROM @table

END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetFileContent]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetFileContent]
	-- Add the parameters for the stored procedure here
	@Path VARCHAR(max),
	@Content VARCHAR(max) OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @sql NVARCHAR(max);

	SET @sql = N'SELECT f.BulkColumn 
	FROM OPENROWSET
	(
		BULK ''' + @Path + ''',
		SINGLE_CLOB 
	) f'

	DECLARE @ReturnTable TABLE (x VARCHAR(max))
	INSERT INTO @ReturnTable (x)
		EXEC (@sql);

	SELECT @Content = x
	FROM @ReturnTable
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetGraphInfo]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetGraphInfo] -- xp_GetGraphInfo 1
	-- Add the parameters for the stored procedure here
	@IDGraph INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT mg.IDGraph, 
		   mg.CodGraph, 
		   mg.GraphName AS [Name], 
		   mg.GraphCaption0 AS [Title], 
		   mg.GraphType, 
		   mg.ShowReport, 
		   mg.SQLSyntax
	FROM MetaGraph mg
	WHERE mg.IDGraph = @IDGraph
		AND mg.[Enabled] = 1

	SELECT mgs.IDGraphSearch, 
		   mgs.FieldCaption0 AS [Title], 
		   mgs.ParameterName AS [Name], 
		   mgs.Operator, 
		   mgs.DefaultValue, 
		   mgs.ControlType, 
		   mgs.IsTitle
	FROM MetaGraphSearch mgs
	WHERE mgs.IDGraph = @IDGraph
	ORDER BY mgs.ItemOrder
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetMailCredentials]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetMailCredentials]
	-- Add the parameters for the stored procedure here
	@Name VARCHAR(50) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF ISNULL(@Name, '') = ''
	BEGIN
		SELECT TOP 1 Id, [Name], [Server], [Port], [Username], [Password], [Sender]
		FROM MailServer
		WHERE Sending = 1 AND IsDefault = 1 AND M_IsDeleted = 0
		ORDER BY Id DESC
	END
	ELSE
	BEGIN
		SELECT Id, [Name], [Server], [Port], [Username], [Password], [Sender]
		FROM MailServer
		WHERE Sending = 1 AND [Name] = @Name
	END
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetNavBar]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetNavBar] -- xp_GetNavBar NULL, 3
	-- Add the parameters for the stored procedure here
	@CodApplication VARCHAR(50) = NULL,
	@IDUser INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @IDApplication INT

	SELECT @IDApplication = IDApplication 
	FROM MetaApplication 
	WHERE CodApplication = @CodApplication

	DECLARE @IsAdmin BIT
	SET @IsAdmin = (SELECT COUNT(mg.IDUser)
		FROM MetaUser mg
			INNER JOIN MetaGroupUsers mgu ON mgu.IDGroup = mg.IDUser
		WHERE mgu.IDUser = @IDUser 
			AND mg.IsGroup = 1 
			AND mg.Username = 'Administradores')
		
    -- Insert statements for procedure here
	DECLARE @permissions TABLE (
		IDPermissionGranted INT,
		Tablename VARCHAR(50),
		CodPermission VARCHAR(50),
		IDRelatedTable INT
	);

	IF @IsAdmin = 0
	BEGIN
		INSERT INTO @permissions(IDPermissionGranted, Tablename, CodPermission, IDRelatedTable)
			SELECT DISTINCT IDPermissionGranted, mtp.Tablename, mp.CodPermission, mpg.IDRelatedTable
			FROM MetaPermissionGranted mpg
				INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
				INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
			WHERE mpg.IDUser = @IDUser
				AND mp.CodPermission = 'SELECT'
				AND mtp.Tablename IN ('MetaModule', 'MetaContext')
	END
	ELSE
	BEGIN
		INSERT INTO @permissions(IDPermissionGranted, Tablename, CodPermission, IDRelatedTable)
			SELECT DISTINCT 0 AS IDPermissionGranted, mtp.Tablename, mp.CodPermission, 
				  (CASE mtp.Tablename					
					WHEN 'MetaModule' THEN mm.IDModule 
					WHEN 'MetaContext' THEN mc.IDContext 
					END) AS IDRelatedTable
			FROM MetaPermissionGranted mpg, 
				 MetaTypePermission mtp, 
				 MetaPermission mp,
				 MetaModule mm,
				 MetaContext mc
			WHERE mp.CodPermission = 'SELECT'
				AND mtp.Tablename IN ('MetaModule', 'MetaContext')
	END

	SELECT DISTINCT mm.IDModule, mm.ModuleCaption0, mm.ItemOrder
	FROM MetaModule mm
		INNER JOIN @permissions p ON p.IDRelatedTable = mm.IDModule AND p.Tablename = 'MetaModule'
	WHERE mm.Visible = 1
		AND (mm.IDApplication = @IDApplication OR @IDApplication IS NULL)
	ORDER BY mm.ItemOrder ASC

	SELECT DISTINCT mc.IDContext, mc.IDModule, mc.ContextCaption0, mc.ContextUrl, mc.ContextImageUrl, mc.ContextTarget, mc.ItemOrder
	FROM MetaContext mc
		INNER JOIN @permissions p ON p.IDRelatedTable = mc.IDContext AND p.Tablename = 'MetaContext'
	WHERE mc.Visible = 1
	ORDER BY mc.ItemOrder, mc.ContextCaption0 ASC
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetProfiles]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetProfiles]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IDProfile, CodProfile, [Profile]
	FROM MetaProfile
	WHERE M_IsDeleted = 0
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetReportInfo]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetReportInfo] -- xp_GetReportInfo 1
	-- Add the parameters for the stored procedure here
	@IDReport INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT mr.IDReport,
		   mr.ReportName AS [Name], 
		   ISNULL(mr.[Description], '') AS [Description], 
		   mrc.[Description] AS [Category], 
		   mrv.[Description] AS [View],		   
		   mr.Stream
	FROM MetaReport mr
		LEFT JOIN MetaReportCategory mrc ON mrc.IDReportCategory = mr.IDReportCategory
		LEFT JOIN MetaReportView mrv ON mrv.IDReportView = mr.IDReportView
	WHERE mr.IDReport = @IDReport

	SELECT mrp.IDParameter, 
		   mrp.ParameterName, 
		   ISNULL(mrp.[Description], '') AS [Description], 
		   mrp.ParameterType, 
		   mrp.MinValue, 
		   mrp.MaxValue, 
		   mrp.DataSourceTable, 
		   mrp.ParameterValue
	FROM MetaReportParameter mrp
	WHERE mrp.IDReport = @IDReport

	SELECT mr.IDReportView AS IDView, mrv.[Name], mrv.[Description], mrv.ConnectionString
	FROM MetaReportView mrv
		INNER JOIN MetaReport mr ON mr.IDReportView = mrv.IDReportView
	WHERE mr.IDReport = @IDReport

	SELECT mrvi.IDReportViewInfo AS IDView, mt.Tablename, mf.Fieldname
	FROM MetaReportViewInfo mrvi
		INNER JOIN MetaReportView mrv ON mrv.IDReportView = mrvi.IDReportView
		INNER JOIN MetaTable mt ON mt.IDTable = mrvi.IDTable
		INNER JOIN MetaField mf ON mf.IDField = mrvi.IDField
		INNER JOIN MetaReport mr ON mr.IDReportView = mrv.IDReportView
	WHERE mr.IDReport = @IDReport
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetScheduler]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetScheduler] -- sp_GetScheduler NULL, '2010-01-01', '2020-03-12'
	-- Add the parameters for the stored procedure here
	@IDUser INT = NULL,
	@BeginDateTime SMALLDATETIME = NULL,
	@EndDateTime SMALLDATETIME = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT mdv.IDDayView,
		   mdv.DayView AS [Subject],
		   mdv.[Description],
		   mdv.[Location],
		   mdv.RecurrenceInfo,
		   mdv.RememberInfo,
		   mdv.BeginDateTime,
		   mdv.EndDateTime,
		   mdv.AllDay, 
		   mdv.ResourceID,
		   rs.Color,
		   rs.ResourceName AS [ResourceName],
		   mdv.LabelID,
		   mdv.TypeID,
		   mdv.StatusID,
		   mdv.IDUser,
		   mu2.Fullname AS MeetingWith,
		   mdv.OutlookEntryID,
		   ISNULL(PercentageComplete, 0) AS PercentageComplete,
		   mdv.M_IDUser AS CreatedByUserID,
		   mu1.Fullname AS CreatedByUser
	FROM MetaDayView mdv
		INNER JOIN ResourcesScheduler rs ON rs.ResourceID = mdv.ResourceID
		LEFT JOIN MetaUser mu1 ON mu1.IDUser = mdv.M_IDUser
		LEFT JOIN MetaUser mu2 ON mu2.IDUser = mdv.IDUser
	WHERE mdv.M_IsDeleted = 0
		AND (mdv.BeginDateTime >= @BeginDateTime OR @BeginDateTime IS NULL) 
		AND (mdv.EndDateTime <= @EndDateTime OR @EndDateTime IS NULL)
		AND (mdv.IDUser = @IDUser OR @IDUser IS NULL)
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUser] -- xp_GetUser 11
	-- Add the parameters for the stored procedure here
	@IDUser INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IDUser, Username, Fullname, Address, City, ZipCode, Phone, Mobile, Email, IsAuditable
	FROM MetaUser
	WHERE IsGroup = 0 AND IDUser = @IDUser
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetUserByToken]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUserByToken]
	-- Add the parameters for the stored procedure here
	@Token VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IDUser, Username
	FROM MetaUser
	WHERE IsGroup = 0 AND M_IsDeleted = 0 AND M_Guid = @Token
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetUserGroups]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUserGroups] -- xp_GetUserGroups 3
	-- Add the parameters for the stored procedure here
	@IDUser INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT g.IDGroup, u.Username AS Groupname, CAST(1 AS BIT) AS InGroup
	FROM MetaGroupUsers g
		INNER JOIN MetaUser u ON g.IDGroup = u.IDUser AND u.IsGroup = 1
	WHERE g.IDUser = @IDUser

	UNION

	SELECT u.IDUser AS IDGroup, u.Username AS Groupname, CAST(0 AS BIT) AS InGroup
	FROM MetaUser u
	WHERE u.IsGroup = 1 
		AND u.IDUser NOT IN (
			SELECT g.IDGroup 
			FROM MetaGroupUsers g
			WHERE g.IDUser = @IDUser
		)
END







GO
/****** Object:  StoredProcedure [dbo].[xp_GetUserInfo]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUserInfo] -- xp_GetUserInfo 1
	-- Add the parameters for the stored procedure here
	@IDUser INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @IsAdmin BIT
	SET @IsAdmin = (SELECT COUNT(mg.IDUser)
		FROM MetaUser mg
			INNER JOIN MetaGroupUsers mgu ON mgu.IDGroup = mg.IDUser
		WHERE mgu.IDUser = @IDUser 
			AND mg.IsGroup = 1 
			AND mg.Username = 'Administradores')

    -- Insert statements for procedure here
	SELECT IDUser,
		   Username,
		   Fullname,
		   Address,
		   City,
		   ZipCode,
		   Email,
		   Picture,
		   IsAuditable,
		   @IsAdmin AS IsAdmin
	FROM MetaUser	
	WHERE IDUser = @IDUser

	SELECT mg.IDUser, mg.Username, mg.Fullname
	FROM MetaGroupUsers mgu
		INNER JOIN MetaUser mg ON mg.IDUser = mgu.IDGroup
	WHERE mgu.IDUser = @IDUser

    -- Insert statements for procedure here
	DECLARE @permissions TABLE (
		IDPermissionGranted INT,
		Tablename VARCHAR(50),
		CodPermission VARCHAR(50),
		IDRelatedTable INT
	);

	IF @IsAdmin = 0
	BEGIN
		INSERT INTO @permissions(IDPermissionGranted, Tablename, CodPermission, IDRelatedTable)
			SELECT DISTINCT IDPermissionGranted, mtp.Tablename, mp.CodPermission, mpg.IDRelatedTable
			FROM MetaPermissionGranted mpg
				INNER JOIN MetaTypePermission mtp ON mtp.IDTypePermission = mpg.IDTypePermission
				INNER JOIN MetaPermission mp ON mp.IDPermission = mpg.IDPermission
			WHERE mpg.IDUser = @IDUser
	END
	ELSE
	BEGIN
		INSERT INTO @permissions(IDPermissionGranted, Tablename, CodPermission, IDRelatedTable)
			SELECT DISTINCT 0 AS IDPermissionGranted, mtp.Tablename, mp.CodPermission, 
				   (CASE mtp.Tablename					
					WHEN 'MetaModule' THEN mm.IDModule 
					WHEN 'MetaContext' THEN mc.IDContext 
					WHEN 'MetaTable' THEN mt.IDTable 
					END) AS IDRelatedTable
			FROM MetaPermissionGranted mpg, 
				 MetaTypePermission mtp, 
				 MetaPermission mp,
				 MetaModule mm,
				 MetaContext mc,
				 MetaTable mt
			WHERE mp.CodPermission = 'SELECT'
				AND mtp.Tablename IN ('MetaModule', 'MetaContext', 'MetaTable')
	END

	SELECT *
	FROM @permissions
END

GO
/****** Object:  StoredProcedure [dbo].[xp_GetUserProfiles]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUserProfiles]
	-- Add the parameters for the stored procedure here
	@IDUser INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DISTINCT  mp.IDProfile, mp.CodProfile, mp.[Profile]
	FROM MetaPermissionGranted mpg
		INNER JOIN MetaProfile mp ON mp.IDProfile = mpg.IDProfile
	WHERE mpg.IDUser = @IDUser OR @IDUser IS NULL
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetUsers]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetUsers]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IDUser, Username, Fullname, Email
	FROM MetaUser
	WHERE IsGroup = 0 AND M_IsDeleted = 0
	ORDER BY Fullname
END
GO
/****** Object:  StoredProcedure [dbo].[xp_GetWorkflowInfo]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_GetWorkflowInfo] -- xp_GetWorkflowInfo 1
	-- Add the parameters for the stored procedure here
	@IDWorkflow INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TOP 1 
		   w.IDWorkflow,	
		   wd.IDWorkflowDefinition,
		   wd.Name,
		   wd.Label,
		   w.NextRun, 
		   w.FinishedDate, 
		   w.CreatedDate, 
		   w.ModifiedDate, 
		   ISNULL(w.Diagram, wd.Diagram) AS Diagram
	FROM Workflow w
		INNER JOIN WorkflowDefinition wd ON wd.IDWorkflowDefinition = w.IDWorkflowDefinition
	WHERE wd.Deprecated = 0 AND w.IDWorkflow = @IDWorkflow

	SELECT 
		wt.IDWorkflowTask,	
		wt.Task,
		wt.Name,
		wt.[Subject],
		wt.Comments,		
		wt.IDUser,
		wt.CreatedDate,
		wt.ModifiedDate,
		wt.ModifiedUser,		
		wt.Finished,
		(CASE WHEN wt.Finished = 1 THEN wt.ModifiedDate ELSE wt.ExpirationDate END) AS ExpirationDate
	FROM WorkflowTask wt
	WHERE wt.IDWorkflow = @IDWorkflow
	ORDER BY wt.IDWorkflowTask DESC

	SELECT 
		wf.IDWorkflowField,
		wf.IDWorkflowTask,
		wf.Name,
		wf.Label,
		wf.EditorType,
		wf.[ReadOnly], 
		wf.[Required],
		wf.Value
	FROM WorkflowField wf
	WHERE wf.IDWorkflowTask IN (
		SELECT IDWorkflowTask
		FROM WorkflowTask wt
		WHERE wt.IDWorkflow = @IDWorkflow
	)

	SELECT 
		wa.IDAttachment,
		wa.Name,
		wa.[Filename],
		wa.CreatedDate
	FROM WorkflowAttachment wa
	WHERE wa.IDWorkflow = @IDWorkflow 

	SELECT 
		wh.IDWorkflowHistory,
		wh.IDWorkflowTask,
		wh.IDUser,
		wh.[Date],
		wh.State1,
		wh.State2
	FROM WorkflowHistory wh
	WHERE wh.IDWorkflowTask IN (
		SELECT IDWorkflowTask
		FROM WorkflowTask wt
		WHERE wt.IDWorkflow = @IDWorkflow
	)
END
GO
/****** Object:  StoredProcedure [dbo].[xp_InsertGroup]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_InsertGroup]
	-- Add the parameters for the stored procedure here
	@Username VARCHAR(30),
	@Fullname VARCHAR(120)	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO MetaUser (Username, Fullname, Email, IsGroup, IsAuditable, M_Guid, M_IsDeleted)
		VALUES (@Username, @Fullname, '@', 1, 0, NEWID(), 0)

	SELECT @@IDENTITY AS IDUser
END
GO
/****** Object:  StoredProcedure [dbo].[xp_InsertOrUpdateSequence]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_InsertOrUpdateSequence]
	-- Add the parameters for the stored procedure here
	@Name VARCHAR(50),
	@Tablename VARCHAR(50),
	@InitialValue INT = 1,
	@CurrentValue INT = 1
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF (SELECT COUNT(IDSequence) FROM MetaSequence WHERE [Name] = @Name) = 0
	BEGIN
		INSERT INTO MetaSequence ([Name], Tablename, InitialValue, CurrentValue)
			VALUES (@Name, @Tablename, @InitialValue, @CurrentValue)
	END
	ELSE
	BEGIN
		UPDATE MetaSequence
			SET CurrentValue = @CurrentValue
		WHERE [Name] = @Name
	END

	SELECT IDSequence, CurrentValue
	FROM MetaSequence
	WHERE [Name] = @Name
END
GO
/****** Object:  StoredProcedure [dbo].[xp_InsertUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_InsertUser]
	-- Add the parameters for the stored procedure here
	@Username VARCHAR(30),
	@Fullname VARCHAR(120),
	@Address VARCHAR(255),
	@City VARCHAR(80),
	@ZipCode VARCHAR(8),
	@Phone VARCHAR(15),
	@Mobile VARCHAR(15),
	@Email VARCHAR(120),
	@IsAuditable BIT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO MetaUser (Username, Fullname, Address, City, ZipCode, Phone, Mobile, Email, IsGroup, IsAuditable, M_Guid, M_IsDeleted)
		VALUES (@Username, @Fullname, @Address, @City, @ZipCode, @Phone, @Mobile, @Email, 0, @IsAuditable, NEWID(), 0)

	SELECT @@IDENTITY AS IDUser
END
GO
/****** Object:  StoredProcedure [dbo].[xp_InsertUserProfile]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_InsertUserProfile]
	-- Add the parameters for the stored procedure here
	@IDUser INT,
	@IDProfile INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

		-- Insert statements for procedure here
	
	INSERT INTO MetaPermissionGranted (IDPermission, IDTypePermission, IDRelatedTable, IDUser, IDProfile)
		SELECT mp.IDPermission, mdp.IDTypePermission, mdp.IDRelatedTable, @IDUser AS IDUser, mdp.IDProfile
		FROM MetaDefineProfile mdp, MetaPermission mp
		WHERE mdp.IDProfile = @IDProfile

	
	
END
GO
/****** Object:  StoredProcedure [dbo].[xp_Login]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[xp_Login] 
    @Username VARCHAR(100),
	@Password VARCHAR(100) = NULL
AS 
	SELECT Username, [Password], Email, M_Guid AS Token
	FROM  MetaUser
	WHERE IsGroup = 0 
		AND M_IsDeleted = 0 
		AND [Username] = @Username 
		AND ([Password] = dbo.fn_ToMD5(@Password) OR @Password IS NULL) 
	
	

GO
/****** Object:  StoredProcedure [dbo].[xp_ReplaceTemplateVars]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_ReplaceTemplateVars]
	-- Add the parameters for the stored procedure here
	@Content VARCHAR(max),
	@VarsTable dbo.TemplateVars READONLY,
	@ContentOut VARCHAR(max) OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Name VARCHAR(50), @Value VARCHAR(max)
	SET @ContentOut = @Content

	DECLARE c CURSOR FOR 
	SELECT t.[Name], t.[Value]
	FROM @VarsTable t

	OPEN c  
	FETCH NEXT FROM c INTO @Name, @Value

	WHILE @@FETCH_STATUS = 0  
	BEGIN  
		SET @ContentOut = REPLACE(@ContentOut, '<%=' + @Name + '%>', @Value)
		FETCH NEXT FROM c INTO @Name, @Value
	END

	CLOSE c  
	DEALLOCATE c
END
GO
/****** Object:  StoredProcedure [dbo].[xp_SendMail]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_SendMail]
	-- Add the parameters for the stored procedure here
	@profile_name VARCHAR(50) = NULL,
	@recipients VARCHAR(max),
	@reply_to VARCHAR(max) = NULL,
	@subject VARCHAR(1024),
	@body VARCHAR(max),
	@is_html BIT = 1,
	@file_attachments VARCHAR(max) = NULL,
	@query VARCHAR(max) = NULL,
	@attach_query_result_as_file BIT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @body_format VARCHAR(20), @mailitem_id INT
	SET @body_format = (CASE WHEN @is_html = 1 THEN 'HTML' ELSE 'TEXT' END)

    -- Insert statements for procedure here
	IF @profile_name IS NULL
	BEGIN
		SELECT TOP 1 @profile_name = [Name]
		FROM MailServer
		WHERE Sending = 1 AND IsDefault = 1
		ORDER BY Id DESC
	END

	EXEC msdb.dbo.sp_send_dbmail
		@profile_name = @profile_name,
		@recipients = @recipients,
		@subject = @subject,
		@body = @body,
		@reply_to = @reply_to,
		@body_format = @body_format,
		@file_attachments = @file_attachments,
		@query = @query,
		@attach_query_result_as_file = @attach_query_result_as_file,
		@mailitem_id = @mailitem_id OUTPUT

	SELECT @mailitem_id as mailitem_id
END
GO
/****** Object:  StoredProcedure [dbo].[xp_UpdateMetaFields]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_UpdateMetaFields]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert new Tables in MetaTable --

	INSERT INTO MetaTable (
		Tablename, 
		TableCaption0, 
		TableCaption1)
	SELECT t.name, 
		   t.name, 
		   t.name
	FROM sys.tables t
	WHERE t.type = 'U'
		and t.name NOT IN (SELECT Tablename FROM MetaTable)


	-- Insert Fields new Tables --

	INSERT INTO MetaField (
		IDTable, 
		Fieldname, 
		FieldType, 
		FieldSize, 
		FieldCaption0,
		FieldCaption1, 
		PrimaryKey, 
		[ReadOnly], 
		AutoIncrement, 
		[Required])
	SELECT 
		mt.IDTable, 
		d.name AS Fieldname, 
		d.FieldType, 
		d.max_length AS FieldSize, 
		d.name AS FieldCaption0, 
		d.name AS FieldCaption1, 
		d.is_identity AS PrimaryKey, 
		d.is_computed AS ReadOnly, 
		d.is_computed AS AutoIncrement, 
		CAST((CASE WHEN d.is_nullable = 1 THEN 0 ELSE 1 END) AS BIT) AS Required
	FROM (
		SELECT t.name AS Tablename, c.column_id, c.name, dbo.fn_GetFieldType(ts.name) as FieldType, c.max_length, c.is_identity, c.is_computed, c.is_nullable
		FROM sys.columns c
			INNER JOIN sys.tables t ON c.object_id = t.object_id
			INNER JOIN sys.types ts ON ts.user_type_id = c.user_type_id
		WHERE t.name IN (
			SELECT Tablename
			FROM MetaTable mt 
			WHERE mt.IDTable NOT IN (SELECT IDTable FROM MetaField)
		) 
	) d
		INNER JOIN MetaTable mt ON mt.Tablename = d.Tablename
	ORDER BY mt.IDTable, d.column_id

	-- Insert new Field from exising Tables --

	INSERT INTO MetaField (
		IDTable, 
		Fieldname, 
		FieldType, 
		FieldSize, 
		FieldCaption0, 
		FieldCaption1, 
		PrimaryKey, 
		[ReadOnly], 
		AutoIncrement, 
		[Required])
	SELECT 
		mt2.IDTable, 
		c.name AS Fieldname, 
		dbo.fn_GetFieldType(ts.name) as FieldType,
		c.max_length AS FieldSize, 
		c.name AS FieldCaption0, 
		c.name AS FieldCaption1,
		c.is_identity AS PrimaryKey, 
		c.is_computed AS [ReadOnly], 
		c.is_identity AS AutoIncrement, 
		CAST((CASE WHEN c.is_nullable = 1 THEN 0 ELSE 1 END) AS BIT) AS [Required]
	FROM sys.columns c
		INNER JOIN sys.tables t ON t.object_id = c.object_id
		INNER JOIN sys.types ts ON ts.user_type_id = c.user_type_id
		FULL OUTER JOIN (
			SELECT mt.IDTable, mt.Tablename, mf.IDField, mf.Fieldname 
			FROM MetaField mf
				INNER JOIN MetaTable mt ON mt.IDTable = mf.IDTable
		) d ON d.Tablename = t.name AND d.Fieldname = c.name
		INNER JOIN MetaTable mt2 ON mt2.Tablename = t.name
	WHERE d.Fieldname IS NULL


	-- Update existing Tables --

	UPDATE MetaField	
		SET [FieldType] = t.FieldType,
			[FieldSize] = t.FieldSize,
			[PrimaryKey] = t.PrimaryKey,
			[ReadOnly] = t.[ReadOnly],
			[AutoIncrement] = t.PrimaryKey,
			[Required] = t.[Required]
	FROM MetaField mf
		INNER JOIN MetaTable mt ON mf.IDTable = mt.IDTable
		INNER JOIN (
			SELECT 
				t.name AS Tablename,
				c.Name AS Fieldname, 
				dbo.fn_GetFieldType(ts.name) as FieldType, 
				c.max_length AS FieldSize, 
				c.is_identity AS PrimaryKey, 
				c.is_computed AS [ReadOnly], 
				CAST((CASE WHEN c.is_nullable = 1 THEN 0 ELSE 1 END) AS BIT) AS [Required]
			FROM sys.columns c
				INNER JOIN sys.tables t ON t.object_id = c.object_id
				INNER JOIN sys.types ts ON ts.user_type_id = c.user_type_id
		) t ON t.Tablename = mt.Tablename AND t.Fieldname = mf.Fieldname

	-- Delete non existing fields

	DELETE FROM MetaField
	WHERE IDTable NOT IN (SELECT IDTable FROM MetaTable)
	   
END
GO
/****** Object:  StoredProcedure [dbo].[xp_UpdatePasswordUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_UpdatePasswordUser]
	-- Add the parameters for the stored procedure here
	@IDUser INT,
	@Password VARCHAR(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE MetaUser
		SET [Password] = dbo.fn_ToMD5(@Password)
	WHERE IDUser = @IDUser
END
GO
/****** Object:  StoredProcedure [dbo].[xp_UpdateUser]    Script Date: 30/09/2026 14:24:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[xp_UpdateUser]
	-- Add the parameters for the stored procedure here
	@IDUser INT,
	@Username VARCHAR(30),
	@Fullname VARCHAR(120),
	@Address VARCHAR(255),
	@City VARCHAR(80),
	@ZipCode VARCHAR(8),
	@Phone VARCHAR(15),
	@Mobile VARCHAR(15),
	@Email VARCHAR(120),
	@IsAuditable BIT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE MetaUser
		SET [Username] = @Username,
			[Fullname] = @Fullname,
			[Address] = @Address,
			[City] = @City,
			[ZipCode] = @ZipCode,
			[Phone] = @Phone,
			[Mobile] = @Mobile,
			[Email] = @Email,
			[IsAuditable] = @IsAuditable
	WHERE IDUser = @IDuser

	SELECT @IDUser AS IDUser
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "MetaUser"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 12
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vw_AllActiveGroups'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vw_AllActiveGroups'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "MetaUser"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 10
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vw_AllActiveUsers'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vw_AllActiveUsers'
GO
