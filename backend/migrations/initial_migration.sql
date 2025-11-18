-- =====================================================
-- Database Migration: Initial Schema for GradeBox
-- =====================================================
-- IMPORTANT: Always use [dbo] schema in this file.
-- The migration-runner will automatically replace [dbo] with [project_gradebox]
-- at runtime based on the PROJECT_ID environment variable.
-- DO NOT hardcode [project_gradebox] - always use [dbo]!
-- DO NOT create schema here - migration-runner creates it programmatically.
-- =====================================================

-- This file is a placeholder for the initial database schema.
-- Feature-specific tables, stored procedures, and views will be added here.

-- Example Table (commented out):
/*
CREATE TABLE [dbo].[grades] (
    [id] INT IDENTITY(1,1) NOT NULL,
    [studentName] NVARCHAR(100) NOT NULL,
    [subject] NVARCHAR(100) NOT NULL,
    [grade] DECIMAL(4, 2) NOT NULL,
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

ALTER TABLE [dbo].[grades]
ADD CONSTRAINT [pkGrades] PRIMARY KEY CLUSTERED ([id]);
GO
*/
