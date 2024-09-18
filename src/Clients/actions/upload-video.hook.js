const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, video } = context;

  if (record.isValid() && video) {
    const filePath = path.join('uploads', record.id().toString(), video.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(video.path, filePath);

    await record.update({ video: `/${filePath}` }); // video nomi Client modelingizga mos ravishda o'zgartirildi
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { video, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.video = video;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
