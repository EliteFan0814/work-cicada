module.exports = {
  methods: {
// 周历
    getWeekFn(date) {
      let that = this;
      const timer = 1000 * 60 * 60 * 24;
      let weekShow = {};
      let week = []
      let today = new Date(date).getDay()
      if (today == 0) {
        today = 7
      }
      for (let i = 1; i <= 7; i++) {
        let tim = ''
        if (i < today) {
          tim = new Date(date - timer * (today - i));
        }
        if (i == today) {
          tim = new Date(date);
        }
        if (i > today) {
          tim = new Date(date + timer * (i - today));
        }
        week.push(tim.getFullYear() + '-' + String(tim.getMonth() + 1).padStart(2, '0') + '-' + String(tim.getDate()).padStart(2, '0'))
      }
      weekShow.next = date + timer * (8 - today);
      weekShow.prev = date - (timer * today);
      weekShow.week = week;
      return weekShow
    },
// 周历

// 日历 -- 使用的时候只需要调用getTImeFn即可
    getTimeFn(month = '', year = '') {
      const month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let date = {}
      let tmDate = '';
      let startDate = '';
      let monthList = [];
      let prevMonthList = [];
      let nextMonthList = [];
      if (month == '' || year == '') {
        date = this.getStartFn();
        startDate = this.getMonthStartFn(date.month, date.year)
      } else {
        date = {
          month: month,
          year: year,
          day: 99
        }
        startDate = this.getMonthStartFn(month, year)
      }
      startDate == 0 ? startDate = 7 : '';
      if (date['year'] % 4 == 0) {
        for (let i = 1; i <= month_olympic[date['month'] - 1]; i++) {
          // let day = { year: date['year'], month: date['month'], day: i}
          let day = `${date['year']}-${date['month']}-${i}`
          monthList.push(day)
        }
      } else {
        for (let i = 1; i <= month_normal[date['month'] - 1]; i++) {
          let day = `${date['year']}-${date['month']}-${i}`
          monthList.push(day)
        }
      }
      if (date['month'] >= 2) {
        if (year % 4 == 0) {
          prevMonthList = this.getPrevMonthFn(month_olympic[date['month'] - 2], startDate, date['month'] - 1, date['year']);
        } else {
          prevMonthList = this.getPrevMonthFn(month_normal[date['month'] - 2], startDate, date['month'] - 1, date['year']);
        }
      } else {
        prevMonthList = this.getPrevMonthFn(31, startDate, 12, date['year'] - 1);
      }
      let monthShow = { month: date.month, year: date.year };
      let prevMonth = { month: date.month > 1 ? date.month - 1 : 12, year: date.month > 1 ? date.year : date.year - 1 };
      let nextMonth = { month: date.month == 12 ? 1 : date.month + 1, year: date.month == 12 ? date.year + 1 : date.year };
      
      if (date['month'] == 12) {
        nextMonthList = this.getNextMonthFn(prevMonthList.length, monthList.length, 1, date['year'] + 1)
      } else {
        nextMonthList = this.getNextMonthFn(prevMonthList.length, monthList.length, date['month'] + 1, date['year'])
      }

      return ({ prevMonthList, monthList, nextMonthList })
    },
    // 获取当天
    getStartFn() {
      let tmDate = new Date();
      return { year: tmDate.getFullYear(), month: tmDate.getMonth() + 1, day: tmDate.getDate() }
    },
    // 获取月份第一天周几
    getMonthStartFn(month, year) {
      let tmDate = new Date(year, month - 1, 1)
      return tmDate.getDay();
    },
    // 下个月
    getNextMonthFn(prev, show, month, year) {
      let nextDate = []
      let last = 42 - prev - show
      // nextDate.unshift(`${year}-${month}-${last}`)
      let timer = setInterval(() => {
        if (last >= 1) {
          let day = `${year}-${month}-${last--}`
          nextDate.unshift(day)
        } else {
          clearInterval(timer)
          clearInterval(timer)
        }
      })
      return nextDate
    },
    // 获取上个月
    getPrevMonthFn(date, size, month, year) {
      let prevDate = []
      for (let i = 0; i < size - 1; i++) {
        // let day = { year: year, month: month, day: date - i}
        let day = `${year}-${month}-${date - i}`
        prevDate.unshift(day)
      }
      return prevDate
    },
// 日历 -- end
  },
}