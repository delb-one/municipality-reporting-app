import { prisma } from '../src/config/prisma';

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
