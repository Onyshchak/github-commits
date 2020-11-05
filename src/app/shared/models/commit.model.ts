class User {
  userName: string; // committer.login
  userImage: string; // committer.avatar_url
  userUrl: string; // committer.html_url
}

export class Commit {
  user: User;
  text: string; // commit.message
  url: string; // html_url
  date: Date; // commit.committer.date
}
