const fs = require('fs');
const path = require('path');

// Directories for models and assets
const modelsDir = './models';
const assetsDir = './components/assets';

const modelsOutputFile = './components/models/modelMapping.tsx';
const modelsJsonOutputFile = './models/models.json';

const assetsOutputFile = './components/assets/assetMapping.tsx';


const modelFiles = fs.readdirSync(modelsDir)
  .filter(file => path.extname(file) === '.obj')
  .map(file => {
    const baseName = path.basename(file, '.obj');
    return {
      name: baseName,
      filename: file,
      asset: `${baseName}.png`
    };
  });

fs.writeFileSync(modelsJsonOutputFile, JSON.stringify(modelFiles, null, 2));
// Generate models.tsx
const modelsMappingContent = `
  // Mapping of model names to 'require' statements
  const modelMapping: { [key: string]: any } = {
    ${modelFiles.map(model => `'${model.name}': require('../../models/${model.filename}')`).join(',\n    ')}
  };

  export default modelMapping;
`;

fs.writeFileSync(modelsOutputFile, modelsMappingContent);
console.log(`Generated models static mapping at ${modelsOutputFile}`);

// Generate assets.tsx
const assetsMappingContent = `
  // Mapping of asset names to 'require' statements
  const assetMapping: { [key: string]: any } = {
    ${modelFiles.map(model => `'${model.asset}': require('../../assets/${model.asset}')`).join(',\n    ')}
  };

  export default assetMapping;
`;

fs.writeFileSync(assetsOutputFile, assetsMappingContent);
console.log(`Generated assets static mapping at ${assetsOutputFile}`);
