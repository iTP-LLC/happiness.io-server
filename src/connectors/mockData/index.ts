import { randomText, randomIds, sequentialIds } from './utils'
import { createTestActions } from './actionTable'

export const testSize = {
  user: 20,
  article: 50,
  comment: 100,
  action: 50, // for each type of action
}

const createTestUser = (id: string) => ({
  id,
  name: {
    displayName: randomText(2).join(' '),
    userName: randomText(2).join('-'),
  },
  description: randomText(25).join(' '),
  email: `${randomText(2).join('')}@${randomText(1)}.com`,
})

const createTestComment = (id: string) => {
  let parentId: string | null = randomIds(1, testSize.comment)[0]
  if (parentId === id || Math.round(Math.random())) {
    parentId = null
  }

  return {
    id,
    articleId: randomIds(1, testSize.article)[0],
    text: randomText(20).join(' '),
    timestamp: new Date().toISOString(),
    authorId: randomIds(1, testSize.user)[0],
    achieved: false,
    upvotes: 0, // rely on action table?
    downvotes: 0,
    mentionIds: randomIds(3, testSize.user),
    parentId,
  }
}

const createTestArticle = (id: string) => ({
  id,
  form: ['article', 'course'][Math.round(Math.random())],
  authorId: randomIds(1, testSize.user)[0],
  title: randomText(5).join(' '),
  cover: 'im a test cover',
  tags: randomText(3),
  upstreamId: randomIds(1, testSize.article, id)[0],
  downstreamIds: randomIds(5, testSize.article, id),
  relatedArticleIds: randomIds(10, testSize.article, id),
  MAT: Math.round(Math.random() * 100),
  timestamp: new Date().toISOString(),
  pinnedCommentIds: randomIds(3, testSize.comment),
  subscriberIds: randomIds(10, testSize.user), // should be moved to action table
  publishState: 'published',
})

export const tables = {
  user: sequentialIds(testSize.user).map((id) => createTestUser(id)),
  article: sequentialIds(testSize.article).map((id) => createTestArticle(id)),
  comment: sequentialIds(testSize.comment).map((id) => createTestComment(id)),
  action: createTestActions(testSize),
}
