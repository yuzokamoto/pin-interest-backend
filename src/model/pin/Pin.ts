export class Pin {
  constructor(
    private id: number,
    private author: string,
    private title: string,
    private subtitle: string,
    private date: Date,
    private file: string,
    private tags: string[]
  ) {}

  getId() {
    return this.id;
  }

  getAuthor() {
    return this.author;
  }

  getTitle() {
    return this.title;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getDate() {
    return this.date;
  }

  getFile() {
    return this.file;
  }

  getTags() {
    return this.tags;
  }

  setId(newId: number) {
    this.id = newId;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  setSubtitle(newSubtitle: string) {
    this.subtitle = newSubtitle;
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  setfile(newfile: string) {
    this.file = newfile;
  }

  setTags(newTags: string[]) {
    this.tags = newTags;
  }
}
