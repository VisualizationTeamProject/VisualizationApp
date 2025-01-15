
  // Mapping of model names to 'require' statements
  const modelMapping: { [key: string]: any } = {
    'bamboo_house': require('../../models/bamboo_house.obj'),
    'big_building': require('../../models/big_building.obj'),
    'castle': require('../../models/castle.obj'),
    'cyprys_house': require('../../models/cyprys_house.obj'),
    'family_house': require('../../models/family_house.obj'),
    'family_house_open': require('../../models/family_house_open.obj'),
    'gropius_house_habitatnow': require('../../models/gropius_house_habitatnow.obj'),
    'modern_house': require('../../models/modern_house.obj'),
    'modern_house_open_1': require('../../models/modern_house_open_1.obj'),
    'modern_house_open_2': require('../../models/modern_house_open_2.obj'),
    'pawilon_barcelona_habitatnow': require('../../models/pawilon_barcelona_habitatnow.obj'),
    'shed': require('../../models/shed.obj'),
    'shed_open': require('../../models/shed_open.obj'),
    'steiner_house_habitatnow': require('../../models/steiner_house_habitatnow.obj'),
    'the_glass_house_habitatnow': require('../../models/the_glass_house_habitatnow.obj'),
    'villa_savoye_habitatnow': require('../../models/villa_savoye_habitatnow.obj')
  };

  export default modelMapping;
