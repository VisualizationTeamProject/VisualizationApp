
  // Mapping of model names to 'require' statements
  const modelMapping: { [key: string]: any } = {
    'Bambo_House': require('../../models/Bambo_House.obj'),
    'building_04': require('../../models/building_04.obj'),
    'Cyprys_House': require('../../models/Cyprys_House.obj'),
    'house1': require('../../models/house1.obj'),
    'house1_open1': require('../../models/house1_open1.obj'),
    'house1_open2': require('../../models/house1_open2.obj')
  };

  export default modelMapping;
