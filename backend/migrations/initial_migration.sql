-- =====================================================
-- Database Migration: Initial Schema for GradeBox
-- =====================================================
-- IMPORTANT: Always use [dbo] schema in this file.
-- The migration-runner will automatically replace [dbo] with [project_gradebox]
-- at runtime based on the PROJECT_ID environment variable.
-- DO NOT hardcode [project_gradebox] - always use [dbo]!
-- DO NOT create schema here - migration-runner creates it programmatically.
-- =====================================================

-- =====================================================
-- TABLES
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[grades]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[grades] (
    [id] INT IDENTITY(1,1) NOT NULL,
    [studentName] NVARCHAR(100) NOT NULL,
    [subject] NVARCHAR(50) NOT NULL,
    [gradeValue] DECIMAL(5, 2) NOT NULL,
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'pkGrades' AND object_id = OBJECT_ID(N'[dbo].[grades]'))
BEGIN
ALTER TABLE [dbo].[grades]
ADD CONSTRAINT [pkGrades] PRIMARY KEY CLUSTERED ([id]);
END
GO

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

CREATE OR ALTER PROCEDURE [dbo].[spGradeCreate]
    @studentName NVARCHAR(100),
    @subject NVARCHAR(50),
    @gradeValue DECIMAL(5, 2)
AS
BEGIN
    SET NOCOUNT ON;

    -- Parameter Validation
    IF @studentName IS NULL OR LTRIM(RTRIM(@studentName)) = ''
    BEGIN
        ;THROW 51000, 'StudentNameRequired', 1;
    END

    IF @subject IS NULL OR LTRIM(RTRIM(@subject)) = ''
    BEGIN
        ;THROW 51000, 'SubjectRequired', 1;
    END

    IF @gradeValue IS NULL
    BEGIN
        ;THROW 51000, 'GradeValueRequired', 1;
    END

    IF @gradeValue < 0.00 OR @gradeValue > 100.00
    BEGIN
        ;THROW 51000, 'GradeValueOutOfRange', 1;
    END

    -- Insert new grade
    INSERT INTO [dbo].[grades] ([studentName], [subject], [gradeValue])
    VALUES (@studentName, @subject, @gradeValue);

    -- Return the ID of the newly created grade
    SELECT SCOPE_IDENTITY() AS id;
END;
GO
