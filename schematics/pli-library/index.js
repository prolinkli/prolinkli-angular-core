const { chain, externalSchematic, Rule } = require('@angular-devkit/schematics');

function pliLibrary(options) {
  return chain([
    // First, generate the standard Angular library
    externalSchematic('@schematics/angular', 'library', {
      name: options.name,
      prefix: options.prefix || 'pli'
    }),
    
    // Then modify it to use index.ts
    (tree, context) => {
      const libPath = tree.actions
        .filter(action => action.kind === 'c' && action.path.includes('/src/public-api.ts'))
        .map(action => action.path.replace('/src/public-api.ts', ''))[0];
      
      if (libPath) {
        const publicApiPath = `${libPath}/src/public-api.ts`;
        const indexPath = `${libPath}/src/index.ts`;
        const ngPackagePath = `${libPath}/ng-package.json`;
        
        // Rename public-api.ts to index.ts
        if (tree.exists(publicApiPath)) {
          const content = tree.read(publicApiPath);
          tree.create(indexPath, content);
          tree.delete(publicApiPath);
        }
        
        // Update ng-package.json
        if (tree.exists(ngPackagePath)) {
          const ngPackageContent = tree.read(ngPackagePath).toString();
          const ngPackageJson = JSON.parse(ngPackageContent);
          ngPackageJson.lib.entryFile = 'src/index.ts';
          tree.overwrite(ngPackagePath, JSON.stringify(ngPackageJson, null, 2) + '\n');
        }
        
        context.logger.info(`✅ Created library with index.ts at ${libPath}`);
      }
      
      return tree;
    }
  ]);
}

module.exports = { pliLibrary };