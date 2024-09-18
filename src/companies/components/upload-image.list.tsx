// upload-image.list.tsx
import React from 'react';
import { Box, BasePropertyProps } from 'admin-bro';

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;

  const srcImg = record.params['profilePhotoLocation'];
  const projectImage = record.params['image'];

  return (
    <Box>
      {srcImg ? (
        <img src={srcImg} width="100px" />
      ) : 'no image'}
      {projectImage && (
        <img src={projectImage} width="100px" />
      )}
    </Box>
  );
};

export default Edit;
