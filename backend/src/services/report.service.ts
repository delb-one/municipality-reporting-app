import { reportRepository } from '../repositories/report.repository';
import { categoryRepository } from '../repositories/category.repository';
import { dashboardRepository } from '../repositories/dashboard.repository';
import { officeRepository } from '../repositories/office.repository';
import { statusRepository } from '../repositories/status.repository';
import { AppError } from '../utils/app-error';
import { buildPracticeCode } from '../utils/practice-code';
import type {
  ReportAssignmentBody,
  ReportInput,
  ReportStatusBody,
  ReportUpdateInput,
} from '../types/api';
import { prisma } from '../config/prisma';

const ACTIVE_STATUS_NAMES = ['Ricevuta', 'Presa in carico', 'Assegnata', 'In lavorazione'];
const CLOSED_STATUS_NAMES = ['Risolta', 'Chiusa'];

function ensureNonEmpty(value: string | null | undefined, fieldName: string) {
  if (!value || !value.trim()) {
    throw new AppError(`${fieldName} obbligatorio`, 400);
  }

  return value.trim();
}

export const reportService = {
  async list() {
    return reportRepository.findMany();
  },

  async getById(id: string) {
    const report = await reportRepository.findById(id);

    if (!report) {
      throw new AppError('Segnalazione non trovata', 404);
    }

    return report;
  },

  async getByPracticeCode(code: string) {
    const report = await reportRepository.findByPracticeCode(code);

    if (!report) {
      throw new AppError('Segnalazione non trovata', 404);
    }

    return report;
  },

  async getHistoryById(id: string) {
    await this.getById(id);
    return reportRepository.findHistoryByReportId(id);
  },

  async create(input: ReportInput) {
    const firstname = ensureNonEmpty(input.firstname, 'Nome');
    const lastname = ensureNonEmpty(input.lastname, 'Cognome');
    const email = ensureNonEmpty(input.email, 'Email');
    const street = ensureNonEmpty(input.street, 'Indirizzo');
    const description = ensureNonEmpty(input.description, 'Descrizione');

    if (!input.privacyConsent) {
      throw new AppError('Consenso privacy obbligatorio', 400);
    }

    const category = await categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new AppError('Categoria non valida', 400);
    }

    if (input.officeId != null) {
      const office = await officeRepository.findById(input.officeId);
      if (!office) {
        throw new AppError('Ufficio non valido', 400);
      }
    }

    const status = await statusRepository.findById(input.statusId);
    if (!status) {
      throw new AppError('Stato non valido', 400);
    }

    const createdAt = new Date();
    const yearPrefix = `SEG-${createdAt.getFullYear()}-`;
    const sequence = (await reportRepository.countByYearPrefix(yearPrefix)) + 1;
    const practiceCode = buildPracticeCode(createdAt, sequence);

    return prisma.$transaction(async (tx) => {
      const report = await tx.report.create({
        data: {
          practiceCode,
          firstname,
          lastname,
          email,
          phone: input.phone?.trim() || null,
          street,
          description,
          privacyConsent: true,
          category: {
            connect: { id: input.categoryId },
          },
          office:
            input.officeId != null
              ? { connect: { id: input.officeId } }
              : undefined,
          status: {
            connect: { id: input.statusId },
          },
        },
        include: {
          category: true,
          office: true,
          status: true,
          histories: {
            orderBy: { createdAt: 'asc' },
            include: { status: true },
          },
        },
      });

      await tx.reportHistory.create({
        data: {
          report: {
            connect: { id: report.id },
          },
          status: {
            connect: { id: report.statusId },
          },
          note: 'Creazione segnalazione',
        },
      });

      return tx.report.findUniqueOrThrow({
        where: { id: report.id },
        include: {
          category: true,
          office: true,
          status: true,
          histories: {
            orderBy: { createdAt: 'asc' },
            include: { status: true },
          },
        },
      });
    });
  },

  async update(id: string, input: ReportUpdateInput) {
    await this.getById(id);

    if (input.categoryId != null) {
      const category = await categoryRepository.findById(input.categoryId);
      if (!category) {
        throw new AppError('Categoria non valida', 400);
      }
    }

    if (input.officeId != null) {
      const office = await officeRepository.findById(input.officeId);
      if (!office) {
        throw new AppError('Ufficio non valido', 400);
      }
    }

    return reportRepository.update(id, {
      firstname: input.firstname !== undefined ? ensureNonEmpty(input.firstname, 'Nome') : undefined,
      lastname: input.lastname !== undefined ? ensureNonEmpty(input.lastname, 'Cognome') : undefined,
      email: input.email !== undefined ? ensureNonEmpty(input.email, 'Email') : undefined,
      phone: input.phone !== undefined ? input.phone?.trim() || null : undefined,
      street: input.street !== undefined ? ensureNonEmpty(input.street, 'Indirizzo') : undefined,
      description: input.description !== undefined ? ensureNonEmpty(input.description, 'Descrizione') : undefined,
      privacyConsent: input.privacyConsent !== undefined ? input.privacyConsent : undefined,
      category:
        input.categoryId != null
          ? { connect: { id: input.categoryId } }
          : undefined,
      office:
        input.officeId !== undefined
          ? input.officeId === null
            ? { disconnect: true }
            : { connect: { id: input.officeId } }
          : undefined,
    });
  },

  async updateStatus(id: string, input: ReportStatusBody) {
    const report = await this.getById(id);
    const status = await statusRepository.findById(input.statusId);

    if (!status) {
      throw new AppError('Stato non valido', 400);
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.report.update({
        where: { id: report.id },
        data: {
          status: {
            connect: { id: input.statusId },
          },
        },
        include: {
          category: true,
          office: true,
          status: true,
          histories: {
            orderBy: { createdAt: 'asc' },
            include: { status: true },
          },
        },
      });

      await tx.reportHistory.create({
        data: {
          report: {
            connect: { id: report.id },
          },
          status: {
            connect: { id: input.statusId },
          },
          note: input.note?.trim() || null,
        },
      });

      return updated;
    });
  },

  async assignOffice(id: string, input: ReportAssignmentBody) {
    await this.getById(id);

    if (input.officeId == null) {
      return reportRepository.update(id, {
        office: {
          disconnect: true,
        },
      });
    }

    const office = await officeRepository.findById(input.officeId);
    if (!office) {
      throw new AppError('Ufficio non valido', 400);
    }

    return reportRepository.update(id, {
      office: {
        connect: { id: input.officeId },
      },
    });
  },

  async remove(id: string) {
    await this.getById(id);
    return reportRepository.delete(id);
  },

  async getDashboardStats() {
    const [reports, statuses] = await Promise.all([
      reportRepository.findMany(),
      statusRepository.findMany(),
    ]);

    const statusByName = new Map(statuses.map((status) => [status.name, status]));
    const closedStatusIds = CLOSED_STATUS_NAMES.map((name) => statusByName.get(name)?.id).filter(
      (value): value is number => typeof value === 'number',
    );
    const openStatusIds = ACTIVE_STATUS_NAMES.map((name) => statusByName.get(name)?.id).filter(
      (value): value is number => typeof value === 'number',
    );
    const inWorkingStatusId = statusByName.get('In lavorazione')?.id;
    const groupedStatus = await dashboardRepository.getStats();
    const closedCount = groupedStatus
      .filter((group) => closedStatusIds.includes(group.statusId))
      .reduce((sum, group) => sum + group._count.statusId, 0);
    const openCount = groupedStatus
      .filter((group) => openStatusIds.includes(group.statusId))
      .reduce((sum, group) => sum + group._count.statusId, 0);
    const inWorkingCount =
      inWorkingStatusId != null
        ? groupedStatus.find((group) => group.statusId === inWorkingStatusId)?._count.statusId ?? 0
        : 0;

    const resolutionDurations = reports
      .filter((report) => closedStatusIds.includes(report.statusId))
      .map((report) => {
        const closedHistory = report.histories.find((history) =>
          CLOSED_STATUS_NAMES.includes(history.status.name),
        );

        if (!closedHistory) {
          return null;
        }

        return closedHistory.createdAt.getTime() - report.createdAt.getTime();
      })
      .filter((value): value is number => typeof value === 'number' && value >= 0);

    const averageResolutionHours =
      resolutionDurations.length > 0
        ? Number(
            (
              resolutionDurations.reduce((sum, value) => sum + value, 0) /
              resolutionDurations.length /
              3_600_000
            ).toFixed(1),
          )
        : 0;

    return {
      totalReports: reports.length,
      openReports: openCount,
      inWorkingReports: inWorkingCount,
      closedReports: closedCount,
      averageResolutionHours,
    };
  },

  async getReportsByCategory() {
    const [grouped, categories] = await Promise.all([
      dashboardRepository.getReportsByCategory(),
      categoryRepository.findMany(),
    ]);

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      total: grouped.find((group) => group.categoryId === category.id)?._count.categoryId ?? 0,
    }));
  },

  async getReportsByStatus() {
    const [grouped, statuses] = await Promise.all([
      dashboardRepository.getReportsByStatus(),
      statusRepository.findMany(),
    ]);

    return statuses.map((status) => ({
      id: status.id,
      name: status.name,
      color: status.color,
      total: grouped.find((group) => group.statusId === status.id)?._count.statusId ?? 0,
    }));
  },

  async getReportsByMonth() {
    return dashboardRepository.getReportsByMonth();
  },
};
