const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟故事数据存储
let stories = [
  {
    id: 1,
    title: 'Mystery Manor',
    content: 'You find yourself in front of a mysterious manor. What do you want to do?',
    choices: [
      { id: 1, text: 'Enter the manor', nextStoryId: 2 },
      { id: 2, text: 'Walk away', nextStoryId: 3 },
    ],
  },
  {
    id: 2,
    title: 'Dark Hallway',
    content: 'You enter a dark hallway. Suddenly, you hear a creaking sound behind you. What will you do?',
    choices: [
      { id: 1, text: 'Turn around and investigate', nextStoryId: 4 },
      { id: 2, text: 'Continue down the hallway', nextStoryId: 5 },
    ],
  },
  // 添加更多故事分支...
];

// 处理获取故事内容的请求
app.get('/stories/:storyId', (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const story = stories.find((s) => s.id === storyId);

  if (story) {
    res.json({ story });
  } else {
    res.status(404).json({ message: 'Story not found' });
  }
});

// 处理用户选择的请求
app.post('/stories/:storyId/choose', (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const { choiceId } = req.body;

  const story = stories.find((s) => s.id === storyId);

  if (story) {
    const choice = story.choices.find((c) => c.id === choiceId);

    if (choice) {
      // 根据用户选择的下一个故事分支ID获取下一个故事
      const nextStory = stories.find((s) => s.id === choice.nextStoryId);

      if (nextStory) {
        res.json({ nextStory });
      } else {
        res.status(404).json({ message: 'Next story not found' });
      }
    } else {
      res.status(404).json({ message: 'Choice not found' });
    }
  } else {
    res.status(404).json({ message: 'Story not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
