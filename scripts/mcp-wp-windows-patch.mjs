import fs from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';

const originalMkdirSync = fs.mkdirSync.bind(fs);
const originalAppendFileSync = fs.appendFileSync.bind(fs);

function fixDuplicatedDrivePath(pathLike) {
  if (typeof pathLike !== 'string' && !(pathLike instanceof String)) return pathLike;
  const pathText = String(pathLike);
  if (/^[\\/][A-Z]:[\\/]/i.test(pathText)) {
    return pathText.slice(1);
  }
  const secondDriveIndex = pathText.slice(2).search(/[A-Z]:[\\/]/i);
  if (/^[A-Z]:[\\/]/i.test(pathText) && secondDriveIndex >= 0) {
    return pathText.slice(secondDriveIndex + 2);
  }
  return pathLike;
}

fs.mkdirSync = function mkdirSyncPatched(pathLike, options) {
  const fixedPath = fixDuplicatedDrivePath(pathLike);
  return originalMkdirSync(fixedPath, options);
};

fs.appendFileSync = function appendFileSyncPatched(file, data, options) {
  const fixedFile = fixDuplicatedDrivePath(file);
  if (typeof fixedFile === 'string' && fixedFile.endsWith('wordpress-api.log')) {
    return;
  }
  return originalAppendFileSync(fixedFile, data, options);
};

syncBuiltinESMExports();
