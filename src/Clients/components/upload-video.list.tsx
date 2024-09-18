import React from 'react';
import { Box, BasePropertyProps } from 'admin-bro';

const List: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;

  const srcVideo = record.params.video; // Bu qismni yangi modelingizga mos ravishda o'zgartiring

  return (
    <Box>
      {srcVideo ? (
        <video width="320" height="240" controls>
          <source src={srcVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : 'no video'}
    </Box>
  );
};

export default List;
