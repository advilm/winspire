import prisma from '../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const post = await prisma.post.create({
      data: {
        name: req.body.name,
        age: +req.body.age,
        career: req.body.career,
        description: req.body.story,
        region: req.body.region
      },
    });

    res.status(200).json(post);
  } else if (req.method === 'GET') {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  }
}
