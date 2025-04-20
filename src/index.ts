import PLazy from "p-lazy";

export interface Factory<T> {
  create(): Promise<T>;
}

export class Singleton<T> {
  private refreshing = false;

  constructor(
    private factory: Factory<T>,
    private value: Promise<T> = PLazy.from(() => factory.create()),
  ) {}

  get(): Promise<T> {
    return this.value;
  }

  async invalidate(): Promise<T> {
    if (this.refreshing) {
      return await this.value;
    }

    try {
      this.refreshing = true;
      return await (this.value = this.factory.create());
    } finally {
      this.refreshing = false;
    }
  }
}
