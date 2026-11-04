#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/42709948a78062f4aa45d12ca74178004602cfd50e7147bc900e7d1e37b01198/contract';
import endContract from '../../snapshots/42709948a78062f4aa45d12ca74178004602cfd50e7147bc900e7d1e37b01198/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a51b4833fdaffe730572670ccc27dd89af7e0726ab3de7f428d21702d687cc15/contract';
import startContract from '../../snapshots/a51b4833fdaffe730572670ccc27dd89af7e0726ab3de7f428d21702d687cc15/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  placeholder,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.dropDefault({ schema: 'public', table: 'User', column: 'id' }),
      this.dropColumn({ schema: 'public', table: 'User', column: 'username' }),
      this.createTable({
        schema: 'public',
        table: 'ActivityLog',
        columns: [
          col('action', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('actorId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('entityId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('entityType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('metadata', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'AiExtraction',
        columns: [
          col('confidence', 'numeric(4,2)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 4, scale: 2 } },
          }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('enquiryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('error', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('missingFields', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('model', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('payload', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'AiExtraction_status_check_9d1d62c0',
            sql`"status" IN ('PENDING', 'COMPLETE', 'FAILED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Destination',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('region', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Enquiry',
        columns: [
          col('adults', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('aiStatus', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('assigneeId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('children', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('packageId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('packageVersionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('priceSnapshot', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('NEW'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('whatsappConsent', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('whatsappConsentAt', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Enquiry_aiStatus_check_868a4cc0',
            sql`"aiStatus" IN ('PENDING', 'COMPLETE', 'FAILED')`,
          ),
          checkExpression(
            'Enquiry_status_check_aca4d283',
            sql`"status" IN ('NEW', 'IN_REVIEW', 'REPLIED', 'CLOSED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'EnquiryNote',
        columns: [
          col('authorId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('body', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('enquiryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Package',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('publishedVersionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'PackageSuggestion',
        columns: [
          col('budgetAssessment', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('enquiryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('explanation', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('packageVersionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('reasonCodes', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
          col('score', 'numeric(5,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 5, scale: 2 } },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'PackageSuggestion_budgetAssessment_check_3cf5a93f',
            sql`"budgetAssessment" IN ('WITHIN_KNOWN_COSTS', 'EXCEEDS_KNOWN_LOWER_BOUND', 'UNCERTAIN')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'PackageVersion',
        columns: [
          col('authorId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('changeNote', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('content', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('durationDays', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('durationNights', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('packageId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('starRating', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('summary', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('versionNumber', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'PackageVersion_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'PackageVersionDestination',
        columns: [
          col('destinationId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('packageVersionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['packageVersionId', 'destinationId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ReplyDraft',
        columns: [
          col('body', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('enquiryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('source', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('ReplyDraft_source_check_6819da6d', sql`"source" IN ('AI', 'MANUAL')`),
          checkExpression(
            'ReplyDraft_status_check_b60556cb',
            sql`"status" IN ('DRAFT', 'APPROVED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'SeasonalPrice',
        columns: [
          col('basis', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('gstMode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('gstRate', 'numeric(4,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 4, scale: 2 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('label', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('months', 'int4[]', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1', many: true },
          }),
          col('packageVersionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pricePerPerson', 'numeric(10,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 2 } },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'SeasonalPrice_basis_check_17377059',
            sql`"basis" IN ('PER_PERSON_TWIN')`,
          ),
          checkExpression(
            'SeasonalPrice_gstMode_check_b299eb86',
            sql`"gstMode" IN ('EXTRA', 'INCLUDED')`,
          ),
          checkExpression(
            'SeasonalPrice_months_elem_not_null_365a74e3',
            sql`array_position("months", NULL) IS NULL`,
          ),
        ],
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'User',
        column: 'createdAt',
        type: 'timestamptz(3)',
        using: sql`"createdAt"::timestamptz(3)`,
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'User',
        column: 'updatedAt',
        type: 'timestamptz(3)',
        using: sql`"createdAt"::timestamptz(3)`,
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'User',
        column: 'id',
        type: 'text',
        operationClass: 'widening',
      }),
      this.setNotNull({ schema: 'public', table: 'User', column: 'name' }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'User',
        column: 'passwordHash',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'User',
        column: 'role',
        type: 'text',
      }),
      this.addUnique({
        schema: 'public',
        table: 'AiExtraction',
        constraint: 'AiExtraction_enquiryId_key',
        columns: ['enquiryId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Destination',
        constraint: 'Destination_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Package',
        constraint: 'Package_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Package',
        constraint: 'Package_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Package',
        constraint: 'Package_publishedVersionId_key',
        columns: ['publishedVersionId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'PackageVersion',
        constraint: 'PackageVersion_packageId_versionNumber_key',
        columns: ['packageId', 'versionNumber'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'User',
        constraint: 'User_role_check_3f2d0246',
        expression: sql`"role" IN ('ADMIN', 'CONSULTANT')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'ActivityLog',
        index: 'ActivityLog_actorId_idx_a58f6b4b',
        columns: ['actorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ActivityLog',
        index: 'ActivityLog_createdAt_idx_9575dbd7',
        columns: ['createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ActivityLog',
        index: 'ActivityLog_entityType_entityId_idx_ea0fa809',
        columns: ['entityType', 'entityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Enquiry',
        index: 'Enquiry_assigneeId_idx_fd12ae38',
        columns: ['assigneeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Enquiry',
        index: 'Enquiry_createdAt_idx_9575dbd7',
        columns: ['createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Enquiry',
        index: 'Enquiry_packageId_idx_51f866f4',
        columns: ['packageId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Enquiry',
        index: 'Enquiry_packageVersionId_idx_7293cf28',
        columns: ['packageVersionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Enquiry',
        index: 'Enquiry_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'EnquiryNote',
        index: 'EnquiryNote_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'EnquiryNote',
        index: 'EnquiryNote_enquiryId_idx_a42a357a',
        columns: ['enquiryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageSuggestion',
        index: 'PackageSuggestion_enquiryId_idx_a42a357a',
        columns: ['enquiryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageSuggestion',
        index: 'PackageSuggestion_packageVersionId_idx_7293cf28',
        columns: ['packageVersionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageVersion',
        index: 'PackageVersion_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageVersion',
        index: 'PackageVersion_packageId_idx_51f866f4',
        columns: ['packageId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageVersion',
        index: 'PackageVersion_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageVersionDestination',
        index: 'PackageVersionDestination_destinationId_idx_1646ee5c',
        columns: ['destinationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PackageVersionDestination',
        index: 'PackageVersionDestination_packageVersionId_idx_7293cf28',
        columns: ['packageVersionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ReplyDraft',
        index: 'ReplyDraft_enquiryId_idx_a42a357a',
        columns: ['enquiryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SeasonalPrice',
        index: 'SeasonalPrice_packageVersionId_idx_7293cf28',
        columns: ['packageVersionId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ActivityLog',
        foreignKey: {
          name: 'ActivityLog_actorId_fkey',
          columns: ['actorId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AiExtraction',
        foreignKey: {
          name: 'AiExtraction_enquiryId_fkey',
          columns: ['enquiryId'],
          references: { schema: 'public', table: 'Enquiry', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Enquiry',
        foreignKey: {
          name: 'Enquiry_packageId_fkey',
          columns: ['packageId'],
          references: { schema: 'public', table: 'Package', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Enquiry',
        foreignKey: {
          name: 'Enquiry_packageVersionId_fkey',
          columns: ['packageVersionId'],
          references: { schema: 'public', table: 'PackageVersion', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Enquiry',
        foreignKey: {
          name: 'Enquiry_assigneeId_fkey',
          columns: ['assigneeId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'EnquiryNote',
        foreignKey: {
          name: 'EnquiryNote_enquiryId_fkey',
          columns: ['enquiryId'],
          references: { schema: 'public', table: 'Enquiry', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'EnquiryNote',
        foreignKey: {
          name: 'EnquiryNote_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Package',
        foreignKey: {
          name: 'Package_publishedVersionId_fkey',
          columns: ['publishedVersionId'],
          references: { schema: 'public', table: 'PackageVersion', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageSuggestion',
        foreignKey: {
          name: 'PackageSuggestion_enquiryId_fkey',
          columns: ['enquiryId'],
          references: { schema: 'public', table: 'Enquiry', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageSuggestion',
        foreignKey: {
          name: 'PackageSuggestion_packageVersionId_fkey',
          columns: ['packageVersionId'],
          references: { schema: 'public', table: 'PackageVersion', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageVersion',
        foreignKey: {
          name: 'PackageVersion_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageVersion',
        foreignKey: {
          name: 'PackageVersion_packageId_fkey',
          columns: ['packageId'],
          references: { schema: 'public', table: 'Package', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageVersionDestination',
        foreignKey: {
          name: 'PackageVersionDestination_packageVersionId_fkey',
          columns: ['packageVersionId'],
          references: { schema: 'public', table: 'PackageVersion', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PackageVersionDestination',
        foreignKey: {
          name: 'PackageVersionDestination_destinationId_fkey',
          columns: ['destinationId'],
          references: { schema: 'public', table: 'Destination', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ReplyDraft',
        foreignKey: {
          name: 'ReplyDraft_enquiryId_fkey',
          columns: ['enquiryId'],
          references: { schema: 'public', table: 'Enquiry', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SeasonalPrice',
        foreignKey: {
          name: 'SeasonalPrice_packageVersionId_fkey',
          columns: ['packageVersionId'],
          references: { schema: 'public', table: 'PackageVersion', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
