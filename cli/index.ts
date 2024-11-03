// cli/index.ts
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

program.name('project-cli').description('CLI para gerar novos serviços, entidades e rotas').version('1.0.0');

const templatesDir = path.join(__dirname, 'templates');

const createFileFromTemplate = (templatePath: string, destinationPath: string, replacements: Record<string, string>) => {
  let content = fs.readFileSync(templatePath, 'utf-8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  fs.outputFileSync(destinationPath, content);
};

const generateService = async (name: string) => {
  const serviceDir = path.join('src', 'services', name);
  const replacements = { name };

  createFileFromTemplate(path.join(templatesDir, 'service', 'IService.ts.template'), path.join(serviceDir, `I${name}Service.ts`), replacements);

  createFileFromTemplate(path.join(templatesDir, 'service', 'Service.ts.template'), path.join(serviceDir, `${name}Service.ts`), replacements);

  console.log(`Serviço ${name} gerado com sucesso!`);
};

const generateEntity = async (name: string) => {
  const entityDir = path.join('src', 'entities', name);
  const replacements = { name };

  createFileFromTemplate(path.join(templatesDir, 'entity', 'Entity.ts.template'), path.join(entityDir, `${name}.Entity.ts`), replacements);

  createFileFromTemplate(path.join(templatesDir, 'entity', 'Entity.test.ts.template'), path.join(entityDir, `${name}.test.ts`), replacements);

  console.log(`Entidade ${name} gerada com sucesso!`);
};

const generateRoute = async (name: string, isProtected: boolean) => {
  const controllerDir = path.join('src', 'controllers');
  const routeDir = path.join('src', 'routes');
  const replacements = { name, nameLower: name.toLowerCase() };

  createFileFromTemplate(path.join(templatesDir, 'route', 'Controller.ts.template'), path.join(controllerDir, `${name}Controller.ts`), replacements);

  const routeTemplate = isProtected ? 'protectedRoute.ts.template' : 'route.ts.template';
  createFileFromTemplate(path.join(templatesDir, 'route', routeTemplate), path.join(routeDir, `${name.toLowerCase()}Routes.ts`), replacements);

  console.log(`Rota ${name} gerada com sucesso!`);
};

const promptUser = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você gostaria de gerar?',
      choices: ['Serviço', 'Entidade', 'Rota', 'Sair'],
    },
  ]);

  if (action === 'Sair') {
    console.log('Saindo...');
    process.exit(0);
  }

  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Digite o nome do ${action.toLowerCase()}:`,
    },
  ]);

  if (action === 'Rota') {
    const { isProtected } = await inquirer.prompt([
      {
        type: 'list',
        name: 'isProtected',
        message: 'A rota é protegida?',
        choices: ['Sim', 'Não'],
      },
    ]);

    await generateRoute(name, isProtected === 'Sim');
  } else if (action === 'Serviço') {
    await generateService(name);
  } else if (action === 'Entidade') {
    await generateEntity(name);
  }
};

// Verifica se nenhum comando foi fornecido e exibe o menu interativo
if (!process.argv.slice(2).length) {
  promptUser().then(() => process.exit(0));
}

program.parse(process.argv);
