const fs = require('fs');
const path = require('path');

const modelsDir = './models';
const assetsDir = './assets' // Path to assets folder

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
const modelsMappingContent = `
  // Mapping of model names to 'require' statements
  const modelMapping: { [key: string]: any } = {
    ${modelFiles.map(model => `'${model.name}': require('../../models/${model.filename}')`).join(',\n    ')}
  };

  export default modelMapping;
`;

fs.writeFileSync(modelsOutputFile, modelsMappingContent);
console.log(`Generated models static mapping at ${modelsOutputFile}`);

const defaultAsset = 'default.png';

const getAsset = (assetName) => {
  const assetPath = path.join(assetsDir, assetName);
  if (fs.existsSync(assetPath)) {
    return assetName; 
  }
  return defaultAsset; 
};

const assetsMappingContent = `
  const assetMapping: { [key: string]: any } = {
    ${modelFiles.map(model => {
      const asset = getAsset(model.asset); 
      return `'${model.asset}': require('../../assets/${asset}')`;
    }).join(',\n    ')}
  };

  export default assetMapping;
`;

fs.writeFileSync(assetsOutputFile, assetsMappingContent);
console.log(`Generated assets static mapping at ${assetsOutputFile}`);

fs.writeFileSync(assetsOutputFile, assetsMappingContent);
console.log(`Generated assets static mapping at ${assetsOutputFile}`);
