const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, image } = context;

  if (record.isValid() && image) {
    const filePath = path.join('uploads', record.id().toString(), image.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    // Faylni nusxalash va keyin temp faylni o'chirish
    await fs.promises.copyFile(image.path, filePath);
    await fs.promises.unlink(image.path); // Eski temp faylni o'chirish

    await record.update({ image: `/${filePath}` }); // image nomi Project modelingizga mos ravishda o'zgartirildi
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { image, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.image = image;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
