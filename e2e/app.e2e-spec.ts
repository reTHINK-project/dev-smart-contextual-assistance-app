import { RethinkPage } from './app.po';

describe('rethink App', () => {
  let page: RethinkPage;

  beforeEach(() => {
    page = new RethinkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
