import { prisma } from '../src/config/prisma';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  const categories = [
    { name: 'Illuminazione', description: 'Guasti e malfunzionamenti della pubblica illuminazione' },
    { name: 'Viabilita', description: 'Problemi relativi a strade, traffico e segnaletica' },
    { name: 'Verde pubblico', description: 'Aree verdi, parchi e alberature' },
    { name: 'Rifiuti e decoro urbano', description: 'Abbandono rifiuti e pulizia urbana' },
    { name: 'Marciapiedi', description: 'Dissesti e ostacoli su percorsi pedonali' },
    { name: 'Acqua e fognature', description: 'Perdite, allagamenti e criticita idrauliche' },
  ];

  const offices = [
    { name: 'Ufficio Tecnico' },
    { name: 'Ambiente' },
    { name: 'Viabilita' },
    { name: 'Illuminazione' },
    { name: 'Verde Pubblico' },
  ];

  const statuses = [
    { name: 'Ricevuta', color: '#0d6efd' },
    { name: 'Presa in carico', color: '#6f42c1' },
    { name: 'Assegnata', color: '#fd7e14' },
    { name: 'In lavorazione', color: '#ffc107' },
    { name: 'Risolta', color: '#198754' },
    { name: 'Chiusa', color: '#6c757d' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: { description: category.description },
      create: category,
    });
  }

  for (const office of offices) {
    await prisma.office.upsert({
      where: { name: office.name },
      update: {},
      create: office,
    });
  }

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: { color: status.color },
      create: status,
    });
  }

  // Seed utenti iniziali
  const adminPasswordHash = await hashPassword('admin123');
  const responsabilePasswordHash = await hashPassword('responsabile123');
  const operatorePasswordHash = await hashPassword('operatore123');

  await prisma.user.upsert({
    where: { email: 'admin@comune.it' },
    update: {},
    create: {
      email: 'admin@comune.it',
      passwordHash: adminPasswordHash,
      firstname: 'Amministratore',
      lastname: 'Sistema',
      role: 'AMMINISTRATORE',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'responsabile@comune.it' },
    update: {},
    create: {
      email: 'responsabile@comune.it',
      passwordHash: responsabilePasswordHash,
      firstname: 'Responsabile',
      lastname: 'Uffici',
      role: 'RESPONSABILE',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'operatore@comune.it' },
    update: {},
    create: {
      email: 'operatore@comune.it',
      passwordHash: operatorePasswordHash,
      firstname: 'Mario',
      lastname: 'Rossi',
      role: 'OPERATORE',
      isActive: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
