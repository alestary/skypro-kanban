import { chromium, devices, expect } from '@playwright/test';
import { randomUUID, randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

if (!process.argv.includes('--run')) {
 console.error('This optional live check creates a disposable account and temporary tasks. Start Vite, then run with --run.');
 process.exit(1);
}
const baseUrl = process.env.KANBAN_BASE_URL || 'http://127.0.0.1:4174';
const output = process.env.KANBAN_QA_OUTPUT || 'test-results/live-api';
await mkdir(output, { recursive: true });

// One disposable QA identity, generated only in memory. No personal account.
const login = `kanban-qa-${randomUUID()}@example.test`;
const password = randomBytes(24).toString('base64url');
const result = { account: 'new disposable QA account', accountCreated: false, transport: 'real HTTPS API via Node relay using session proxy; no substituted data', checks: [], api: [], errors: [] };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless: true });
let cleanupToken = '', createdId = '';
const host = 'https://wedev-api.sky.pro/api';
let currentTitle = '';
try {
 for (const mode of ['desktop', 'mobile']) {
  const context = await browser.newContext(mode === 'mobile' ? { ...devices['iPhone 13'], locale: 'ru-RU' } : { viewport: { width:1440,height:1000 }, locale:'ru-RU' });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const pageErrors = [], consoleErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  page.on('console', m => { if(m.type()==='error') consoleErrors.push(m.text()); });
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({contentType:'text/css',body:''}));
  await page.route(`${host}/**`, async route => {
   const request=route.request();
   const headers={};
   for(const name of ['authorization','content-type','accept']) if(request.headers()[name]) headers[name]=request.headers()[name];
   try {
    const response=await fetch(request.url(),{method:request.method(),headers,body:request.postData()||undefined,signal:AbortSignal.timeout(15000)});
    const body=await response.text();
    result.api.push({method:request.method(),resource:new URL(request.url()).pathname.replace(/\/kanban\/.+$/,'/kanban/:id'),status:response.status});
    try {
     const data=JSON.parse(body);
     if(request.method()==='POST'&&new URL(request.url()).pathname==='/api/kanban'&&data.tasks) createdId=data.tasks.find(t=>t.title===currentTitle)?._id||'';
    } catch { /* Evidence contains no response body or credentials. */ }
    await route.fulfill({status:response.status,headers:{'content-type':response.headers.get('content-type')||'text/plain'},body});
   } catch {
    await route.fulfill({status:502,json:{error:'Live API network request failed'}});
   }
  });
  if(!result.accountCreated) {
   await page.goto(baseUrl+'/register');
   await page.getByPlaceholder('Имя',{exact:true}).fill('Kanban QA');
   await page.getByPlaceholder('Эл. почта',{exact:true}).fill(login);
   await page.getByPlaceholder('Пароль',{exact:true}).fill(password);
   await page.getByRole('button',{name:'Зарегистрироваться',exact:true}).click();
   await expect(page).toHaveURL(/\/login$/); result.accountCreated=true;
  } else await page.goto(baseUrl+'/login');
  await page.getByPlaceholder('Эл. почта',{exact:true}).fill(login);
  await page.getByPlaceholder('Пароль',{exact:true}).fill(password);
  await page.getByRole('button',{name:'Войти',exact:true}).click();
  await expect(page.getByRole('button',{name:'Создать новую задачу',exact:true})).toBeVisible();
  cleanupToken=await page.evaluate(()=>localStorage.getItem('token'));
  result.checks.push(`${mode}: login passed`);
  await page.getByRole('button',{name:'Создать новую задачу',exact:true}).click();
  currentTitle=`Временная QA ${mode} ${randomUUID().slice(0,8)}`;
  await page.getByLabel('Название задачи',{exact:true}).fill(currentTitle);
  await page.getByLabel('Описание задачи',{exact:true}).fill('Временная карточка автоматической проверки.');
  await page.getByLabel('Срок выполнения',{exact:true}).fill('2026-11-11');
  await page.getByLabel('Статус',{exact:true}).selectOption('Нужно сделать');
  await page.getByRole('button',{name:'Research',exact:true}).click();
  await page.getByRole('button',{name:'Создать задачу',exact:true}).click();
  await expect(page.getByRole('link',{name:currentTitle,exact:true})).toBeVisible();
  if(!createdId) throw new Error('API did not return a real task _id');
  result.checks.push(`${mode}: create with server ID passed`);
  await page.getByRole('link',{name:currentTitle,exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('11.11.2026');
  await expect(page.getByRole('dialog')).toContainText('Нужно сделать');
  await page.getByRole('button',{name:'Редактировать задачу',exact:true}).click();
  await expect(page.getByLabel('Название задачи',{exact:true})).toHaveValue(currentTitle);
  await expect(page.getByLabel('Описание задачи',{exact:true})).toHaveValue('Временная карточка автоматической проверки.');
  await expect(page.getByLabel('Срок выполнения',{exact:true})).toHaveValue('2026-11-11');
  currentTitle+=' изменена';
  await page.getByLabel('Название задачи',{exact:true}).fill(currentTitle);
  await page.getByLabel('Описание задачи',{exact:true}).fill('Изменённое описание QA.');
  await page.getByLabel('Статус',{exact:true}).selectOption('Готово');
  await page.getByLabel('Срок выполнения',{exact:true}).fill('2026-11-12');
  await page.getByRole('button',{name:'Copywriting',exact:true}).click();
  await page.screenshot({path:join(output,`live-${mode}-edit.png`)});
  await page.getByRole('button',{name:'Сохранить изменения',exact:true}).click();
  await expect(page.getByRole('link',{name:currentTitle,exact:true})).toBeVisible();
  await page.reload();
  await page.getByRole('link',{name:currentTitle,exact:true}).click();
  for(const text of ['12.11.2026','Copywriting','Готово','Изменённое описание QA.']) await expect(page.getByRole('dialog')).toContainText(text);
  await page.getByRole('button',{name:'Закрыть',exact:true}).click();
  result.checks.push(`${mode}: view, edit all fields, server persistence after refresh passed`);
  await page.getByRole('button',{name:`Открыть задачу «${currentTitle}»`,exact:true}).click();
  await expect(page.getByLabel('Название задачи',{exact:true})).toHaveValue(currentTitle);
  page.once('dialog',d=>d.dismiss());
  await page.getByRole('dialog').getByRole('button',{name:'Удалить задачу',exact:true}).click();
  await expect(page.getByLabel('Название задачи',{exact:true})).toHaveValue(currentTitle);
  page.once('dialog',d=>d.accept());
  await page.getByRole('dialog').getByRole('button',{name:'Удалить задачу',exact:true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.reload();
  await expect(page.getByText('Задач пока нет. Создайте новую задачу.')).toBeVisible();
  await expect(page.getByRole('link',{name:currentTitle,exact:true})).toHaveCount(0);
  createdId=''; result.checks.push(`${mode}: ellipsis, cancel deletion, confirmed deletion and refresh passed`);
  await page.goto(baseUrl+'/exit');
  await page.getByRole('button',{name:'Да, выйти',exact:true}).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(()=>localStorage.getItem('token'))).toBeNull();
  await page.goto(baseUrl+'/card/missing');
  await expect(page).toHaveURL(/\/login$/);
  expect(pageErrors).toEqual([]); expect(consoleErrors).toEqual([]);
  result.checks.push(`${mode}: logout, protected route and clean console passed`);
  await context.close();
 }
 result.status='passed';
} catch(error) {
 result.status='failed'; result.errors.push(error.message.replaceAll(login,'[test login]').replaceAll(password,'[test password]'));
 process.exitCode=1;
} finally {
 if(createdId&&cleanupToken) {
  const response=await fetch(`${host}/kanban/${encodeURIComponent(createdId)}`,{method:'DELETE',headers:{Authorization:`Bearer ${cleanupToken}`}});
  result.cleanupHttpStatus=response.status;
 }
 await browser.close();
 await writeFile(join(output,'live-api-result.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}
