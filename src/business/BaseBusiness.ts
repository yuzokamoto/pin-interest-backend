export abstract class BaseBusiness {
  protected validateInput(input: any) {
    let errors = [];
    for (const key in input) {
      if (input[key] !== false && !input[key]) {
        errors.push({ key, value: input[key] });
      }
    }
    const isValid = errors.length === 0 ? true : false;
    if (!isValid) {
      throw new Error(
        `Request error: invalid body params (${errors.map((e) => e.key)}).`
      );
    }
  }
}
