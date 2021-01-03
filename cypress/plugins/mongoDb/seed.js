const { PaintCan } = require('../../../server/models');
const config = require('../../../server/config');

const uri = config.mongoUri;

const Seed = async () => {
  return new Promise((resolve) => {
    debugger;
    const docs = [
      {
        brand: 'Behr',
        name: 'WithoutConfirmedEmail',
        quantity: 'less than two gallons',
        sheen: 'eggshell',
        email:
          'da99b7afb9f9ae8c11b659feb07d615a:0d6a668653d846f35d76f74fb11288286049d9267e743bdce52a08103c8c810a',
        zipCode: '98122-4929',
        rgb: '4B7',
        secret: '9a933639-c7a5-4a3f-8f32-2a51041866b8',
        imageName: '',
      },
      {
        brand: 'Glidden',
        name: 'WithConfirmedEmail',
        quantity: 'less than five gallons',
        sheen: 'gloss',
        email:
          '1ac36bc34a98d7a19d8dc9d456372114:b055445b9252cc704c12e9938663cf1fcc34aa5d7b77fb85212a30fe45b5196c',
        emailConfirmed: true,
        zipCode: '98122',
        rgb: 'C57',
        secret: '5d81d0b4-88a3-41dc-bc8e-8e88c3f7b8fa',
        imageName: '',
      },
    ];
    let paintChip0 = new PaintCan(docs[0]);
    const result0 = paintChip0.save();
    let paintChip1 = new PaintCan(docs[1]);
    const result1 = paintChip1.save();

    resolve(result1);
  });
};

module.exports = Seed;
