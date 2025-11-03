import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export default async function globalSetup(config: FullConfig) {
  const logPath = path.join(__dirname, '../data/errorLog.json');
  fs.writeFileSync(logPath, '[]', 'utf-8');
  console.log('✅ errorLog.json dikosongkan sebelum test dimulai');
}
