import type { Request, Response } from 'express';
import Mock from 'mockjs';

const getTags = (_: Request, res: Response) => {
  return res.json({
    data: Mock.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
  });
};

export default {
  'GET  /tags': getTags,
};
