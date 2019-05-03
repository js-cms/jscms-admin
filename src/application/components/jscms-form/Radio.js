export default class Radio {
  constructor(opts) {
    this.options = [];
    let tempArr = opts.split(',');
    tempArr.forEach(i => {
      let name = i.split(':')[1];
      let value = i.split(':')[0];
      this.options.push({
        name: name,
        val: value === 'false' ? false : true
      });
    });
  }
}
