export default class Select {
  constructor(opts, hasAll = false) {
    this.options = [];
    let tempArr = opts.split(',');
    tempArr.forEach(i => {
      this.options.push({
        title: i.split(':')[1],
        key: i.split(':')[0]
      });
    });
    if ( hasAll === true ) {
      this.options.unshift({
        title: '全部',
        key: ''
      });
    }
  }
}
