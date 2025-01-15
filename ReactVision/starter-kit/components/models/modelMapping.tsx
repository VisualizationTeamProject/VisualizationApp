  // Mapping of model names to 'require' statements
  const modelMapping: { [key: string]: any } = {
    'Bamboo House': require('../../models/bamboo_house/bamboo_house.obj'),
    'Cyprys House': require('../../models/cyprys_house/cyprys_house.obj'),
    'Big Building': require('../../models/big_building/big_building.obj'),
    'Castle': require('../../models/castle/castle.obj'),
    'Family House': require('../../models/family_house/family_house.obj'),
    'Family House (No roof)': require('../../models/family_house/family_house_open.obj'),
    'Modern House': require('../../models/modern_house/modern_house.obj'),
    'Modern House (No roof)': require('../../models/modern_house/modern_house_open_1'),
    'Modern House (No top floor)': require('../../models/modern_house/modern_house_open_2'),
    'Shed': require('../../models/shed/shed.obj'),
    'Gropius House': require('../../models/gropius_house/gropius_house.obj'),
    'Barcelona Pavilion': require('../../models/pawilon_barcelona/pawilon_barcelona.obj'),
    'Steiner House': require('../../models/steiner_house/steiner_house.obj'),
    'The Glass House': require('../../models/the_glass_house/the_glass_house.obj'),
    'Villa Savoye': require('../../models/villa_savoye/villa_savoye.obj'),
  };

  export default modelMapping;
